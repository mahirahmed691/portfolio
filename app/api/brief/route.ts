import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import { Resend } from "resend";
import twilio from "twilio";

export const runtime = "nodejs";

type PackageTier = "starter" | "standard" | "premium";

function getRecommendedPackage(budget: string): PackageTier {
  if (budget === "1000+") return "premium";
  if (budget === "500-1000") return "standard";
  return "starter";
}

function getPackageDetails(tier: PackageTier) {
  switch (tier) {
    case "starter":
      return {
        name: "Starter Package",
        amount: 25000,
        description: "Initial payment for smaller scoped work",
      };
    case "standard":
      return {
        name: "Standard Package",
        amount: 50000,
        description: "Initial payment for full website builds",
      };
    case "premium":
      return {
        name: "Premium Package",
        amount: 100000,
        description: "Initial payment for advanced/custom builds",
      };
  }
}

function calculateLeadScore(body: Record<string, string>) {
  let score = 0;
  if (body.budget === "1000+") score += 3;
  if (body.timeline === "ASAP") score += 2;
  if (body.urgency === "High") score += 2;
  if (body.goal === "Launch") score += 1;
  return score;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      company,
      website,
      projectType,
      goal,
      budget,
      timeline,
      urgency,
      description,
    } = body as {
      name?: string;
      email?: string;
      phone?: string;
      company?: string;
      website?: string;
      projectType?: string;
      goal?: string;
      budget?: string;
      timeline?: string;
      urgency?: string;
      description?: string;
    };

    if (!projectType || !budget || !timeline || !email || !phone || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const recommendedPackage = getRecommendedPackage(budget);
    const leadScore = calculateLeadScore({
      budget,
      timeline,
      urgency: urgency || "",
      goal: goal || "",
    });

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const origin = req.headers.get("origin");
    const baseUrl =
      origin || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFromEmail = process.env.RESEND_FROM_EMAIL;
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioFrom = process.env.TWILIO_FROM_NUMBER;

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "Stripe not configured" },
        { status: 500 },
      );
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2026-02-25.clover",
    });

    const pkg = getPackageDetails(recommendedPackage);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "gbp",
            unit_amount: pkg.amount,
            product_data: {
              name: pkg.name,
              description: pkg.description,
            },
          },
        },
      ],
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/contact`,
      metadata: {
        name,
        email,
        phone,
        company: company || "",
        website: website || "",
        projectType,
        goal: goal || "",
        budget,
        timeline,
        urgency: urgency || "",
        recommendedPackage,
        leadScore: String(leadScore),
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe checkout URL missing" },
        { status: 500 },
      );
    }

    const sideEffects: Promise<void>[] = [];

    if (supabaseUrl && supabaseKey) {
      sideEffects.push(
        (async () => {
          try {
            const supabase = createClient(supabaseUrl, supabaseKey);
            const { error } = await supabase.from("briefs").insert({
              name,
              email,
              phone,
              company,
              website,
              project_type: projectType,
              goal,
              budget,
              timeline,
              urgency,
              description,
              recommended_package: recommendedPackage,
              lead_score: leadScore,
              status: "brief_submitted",
              stripe_session_id: session.id,
              stripe_payment_status: "pending",
              created_at: new Date().toISOString(),
            });

            if (error) {
              console.error("Supabase insert error:", error);
            }
          } catch (err) {
            console.error("Supabase crash:", err);
          }
        })(),
      );
    }

    if (slackWebhookUrl) {
      sideEffects.push(
        (async () => {
          try {
            const slackRes = await fetch(slackWebhookUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                text: `New lead: ${name} (${recommendedPackage})`,
                blocks: [
                  {
                    type: "header",
                    text: {
                      type: "plain_text",
                      text: `New Lead (${leadScore}/8)`,
                    },
                  },
                  {
                    type: "section",
                    fields: [
                      { type: "mrkdwn", text: `*Name:*\n${name}` },
                      { type: "mrkdwn", text: `*Email:*\n${email}` },
                      { type: "mrkdwn", text: `*Phone:*\n${phone}` },
                      { type: "mrkdwn", text: `*Company:*\n${company || "—"}` },
                      { type: "mrkdwn", text: `*Website:*\n${website || "—"}` },
                      { type: "mrkdwn", text: `*Project:*\n${projectType}` },
                      { type: "mrkdwn", text: `*Goal:*\n${goal || "—"}` },
                      { type: "mrkdwn", text: `*Budget:*\n${budget}` },
                      { type: "mrkdwn", text: `*Timeline:*\n${timeline}` },
                      { type: "mrkdwn", text: `*Urgency:*\n${urgency || "—"}` },
                    ],
                  },
                  {
                    type: "section",
                    fields: [
                      {
                        type: "mrkdwn",
                        text: `*Recommended:*\n${recommendedPackage.toUpperCase()}`,
                      },
                      {
                        type: "mrkdwn",
                        text: `*Lead score:*\n${leadScore}/8`,
                      },
                    ],
                  },
                  {
                    type: "section",
                    text: {
                      type: "mrkdwn",
                      text: `*Notes:*\n${description || "—"}`,
                    },
                  },
                ],
              }),
            });

            if (!slackRes.ok) {
              const slackBody = await slackRes.text();
              console.error("Slack webhook error:", {
                status: slackRes.status,
                body: slackBody,
              });
            } else {
              console.log("Slack webhook sent", {
                name,
                email,
                recommendedPackage,
              });
            }
          } catch (err) {
            console.error("Slack async error:", err);
          }
        })(),
      );
    } else {
      console.warn("SLACK_WEBHOOK_URL is not configured");
    }

    if (resendApiKey && resendFromEmail) {
      sideEffects.push(
        (async () => {
          try {
            const resend = new Resend(resendApiKey);
            await resend.emails.send({
              from: resendFromEmail,
              to: email,
              subject: "Got your project brief",
              html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                  <h2>Thanks, ${name}</h2>
                  <p>I’ve received your project brief.</p>
                  <p><strong>Recommended package:</strong> ${recommendedPackage}</p>
                  <p>Your next step is to continue securely here:</p>
                  <p><a href="${session.url}">Continue to checkout</a></p>
                  <p>If you'd rather talk first, you can reply to this email.</p>
                </div>
              `,
            });
          } catch (err) {
            console.error("Resend async error:", err);
          }
        })(),
      );
    }

    if (twilioSid && twilioToken && twilioFrom) {
      sideEffects.push(
        (async () => {
          try {
            const client = twilio(twilioSid, twilioToken);
            await client.messages.create({
              from: twilioFrom,
              to: phone,
              body: `Thanks ${name}, I’ve received your brief. Recommended package: ${recommendedPackage}. Continue here: ${session.url}`,
            });
          } catch (err) {
            console.error("Twilio async error:", err);
          }
        })(),
      );
    }

    await Promise.allSettled(sideEffects);

    return NextResponse.json({
      success: true,
      recommendedPackage,
      url: session.url,
    });
  } catch (error) {
    console.error("Brief route error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
}
