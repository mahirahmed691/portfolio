import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import { Resend } from "resend";
import twilio from "twilio";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook not configured" },
      { status: 500 },
    );
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2026-02-25.clover",
  });

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFromEmail = process.env.RESEND_FROM_EMAIL;
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioFrom = process.env.TWILIO_FROM_NUMBER;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const name = session.metadata?.name || "there";
    const email = session.metadata?.email || "";
    const phone = session.metadata?.phone || "";
    const recommendedPackage =
      session.metadata?.recommendedPackage || "package";
    const projectType = session.metadata?.projectType || "";
    const budget = session.metadata?.budget || "";
    const timeline = session.metadata?.timeline || "";

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { error } = await supabase
          .from("briefs")
          .update({
            status: "paid",
            stripe_payment_status: session.payment_status || "paid",
          })
          .eq("stripe_session_id", session.id);

        if (error) console.error("Supabase webhook update error:", error);
      } catch (err) {
        console.error("Supabase webhook crash:", err);
      }
    }

    if (slackWebhookUrl) {
      try {
        await fetch(slackWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `💰 Payment received

Name: ${name}
Email: ${email}
Package: ${recommendedPackage}
Project: ${projectType}
Budget: ${budget}
Timeline: ${timeline}
Amount: £${((session.amount_total || 0) / 100).toFixed(2)}`,
          }),
        });
      } catch (err) {
        console.error("Slack webhook payment crash:", err);
      }
    }

    if (resendApiKey && resendFromEmail && email) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: resendFromEmail,
          to: email,
          subject: "Payment received — next steps",
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2>Thanks, ${name}</h2>
              <p>Your payment has been received for the <strong>${recommendedPackage}</strong> package.</p>
              <p>The next step is to book your kickoff call or reply with any extra context.</p>
              <p><a href="${baseUrl}#contact">Return to site</a></p>
            </div>
          `,
        });
      } catch (err) {
        console.error("Resend payment email crash:", err);
      }
    }

    if (twilioSid && twilioToken && twilioFrom && phone) {
      try {
        const client = twilio(twilioSid, twilioToken);
        await client.messages.create({
          from: twilioFrom,
          to: phone,
          body: `Payment received for your ${recommendedPackage} package. Next step: book your kickoff or reply with any extra context.`,
        });
      } catch (err) {
        console.error("Twilio payment SMS crash:", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
