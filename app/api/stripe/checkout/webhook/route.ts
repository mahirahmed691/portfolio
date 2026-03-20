import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getStripeClient() {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }

  const { default: Stripe } = await import("stripe");

  return new Stripe(stripeSecretKey, {
    apiVersion: "2026-02-25.clover",
  });
}

async function getResendClient() {
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    throw new Error("Missing RESEND_API_KEY");
  }

  const { Resend } = await import("resend");

  return new Resend(key);
}

async function getTwilioClient() {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;

  if (!sid || !token) {
    throw new Error("Missing Twilio credentials");
  }

  const twilio = (await import("twilio")).default;

  return twilio(sid, token);
}

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook not configured" },
      { status: 500 },
    );
  }

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  let event: any;

  try {
    const stripe = await getStripeClient();
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    const resendFromEmail = process.env.RESEND_FROM_EMAIL;
    const twilioFrom = process.env.TWILIO_FROM_NUMBER;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const name =
      session.metadata?.name || session.customer_details?.name || "there";
    const email =
      session.metadata?.email || session.customer_details?.email || "";
    const phone = session.metadata?.phone || "";
    const recommendedPackage =
      session.metadata?.recommendedPackage ||
      session.metadata?.package_name ||
      "package";
    const projectType = session.metadata?.projectType || "";
    const budget = session.metadata?.budget || "";
    const timeline = session.metadata?.timeline || "";

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);

        const { data: brief, error } = await supabase
          .from("briefs")
          .update({
            status: "paid",
            stripe_payment_status: session.payment_status || "paid",
          })
          .eq("stripe_session_id", session.id)
          .select("referral_code")
          .maybeSingle();

        if (error) {
          console.error("Supabase webhook update error:", error);
        }

        if (brief?.referral_code) {
          const { error: rpcError } = await supabase.rpc("increment_leads", {
            ref_code: brief.referral_code,
          });

          if (rpcError) {
            console.error("Referral increment error:", rpcError);
          } else {
            console.log("Referral leads incremented for:", brief.referral_code);
          }
        }
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
            text: "💰 Payment received",
            blocks: [
              {
                type: "header",
                text: {
                  type: "plain_text",
                  text: "💰 Payment confirmed",
                },
              },
              {
                type: "section",
                fields: [
                  { type: "mrkdwn", text: `*Name:*\n${name}` },
                  { type: "mrkdwn", text: `*Email:*\n${email || "-"}` },
                  { type: "mrkdwn", text: `*Package:*\n${recommendedPackage}` },
                  {
                    type: "mrkdwn",
                    text: `*Amount:*\n£${((session.amount_total || 0) / 100).toFixed(2)}`,
                  },
                  { type: "mrkdwn", text: `*Project:*\n${projectType || "-"}` },
                  { type: "mrkdwn", text: `*Budget:*\n${budget || "-"}` },
                  { type: "mrkdwn", text: `*Timeline:*\n${timeline || "-"}` },
                ],
              },
            ],
          }),
        });
      } catch (err) {
        console.error("Slack webhook payment crash:", err);
      }
    }

    if (resendFromEmail && email) {
      try {
        const resend = await getResendClient();

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

    // Onboarding email to the client after deposit
    if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL && email) {
      try {
        const resend = await getResendClient();
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: email,
          subject: "Welcome aboard — here's what happens next",
          html: `<div style="font-family: Arial, sans-serif; max-width: 600px; line-height: 1.7; color: #1a1a1a;">
  <h2 style="color: #7c3aed;">Welcome aboard, ${name} 👋</h2>
  <p>Your deposit has been received — thank you. I'm excited to get started on your project.</p>
  <h3>What happens next</h3>
  <ol>
    <li><strong>Within 24 hours:</strong> I'll send a short project questionnaire to help me understand your goals in more detail.</li>
    <li><strong>Within 2 business days:</strong> We'll schedule a kickoff call to align on scope, timeline, and design direction.</li>
    <li><strong>Week 1:</strong> First designs or concepts shared for your feedback.</li>
  </ol>
  <h3>In the meantime</h3>
  <p>If you have any assets ready — logos, brand guidelines, copy, images — feel free to reply to this email with them. The more you can share upfront, the faster we move.</p>
  <p>You can also book a call directly: <a href="https://calendly.com/mahirahmed691">calendly.com/mahirahmed691</a></p>
  <p style="margin-top: 32px;">Talk soon,<br/><strong>Mahir Ahmed</strong><br/>mahirahmed.co.uk</p>
</div>`,
        });
      } catch (err) {
        console.error("Resend onboarding email crash:", err);
      }
    }

    if (twilioFrom && phone) {
      try {
        const client = await getTwilioClient();

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
