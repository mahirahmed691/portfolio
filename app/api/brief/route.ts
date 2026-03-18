import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

export const runtime = "nodejs";

type PackageTier = "starter" | "standard" | "premium";

// -----------------------------
// 🎯 Package logic
// -----------------------------
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

// -----------------------------
// 🧠 Lead scoring
// -----------------------------
function calculateLeadScore(body: any) {
  let score = 0;

  if (body.budget === "1000+") score += 3;
  if (body.timeline === "ASAP") score += 2;
  if (body.urgency === "High") score += 2;
  if (body.goal === "Launch") score += 1;

  return score;
}

// -----------------------------
// 🚀 API
// -----------------------------
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      company,
      website,
      projectType,
      goal,
      budget,
      timeline,
      urgency,
      description,
    } = body;

    // -----------------------------
    // 🔒 Validation
    // -----------------------------
    if (!projectType || !budget || !timeline) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const recommendedPackage = getRecommendedPackage(budget);
    const leadScore = calculateLeadScore(body);

    // -----------------------------
    // 🔧 ENV
    // -----------------------------
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    const origin = req.headers.get("origin");
    const baseUrl =
      origin || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "Stripe not configured" },
        { status: 500 },
      );
    }

    // -----------------------------
    // 🗄️ Supabase (async)
    // -----------------------------
    if (supabaseUrl && supabaseKey) {
      (async () => {
        try {
          const supabase = createClient(supabaseUrl, supabaseKey);

          await supabase.from("briefs").insert({
            name,
            email,
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
            created_at: new Date().toISOString(),
          });
        } catch (err) {
          console.error("❌ Supabase async error:", err);
        }
      })();
    }

    // -----------------------------
    // 💬 Slack (async + upgraded)
    // -----------------------------
    if (slackWebhookUrl) {
      (async () => {
        try {
          await fetch(slackWebhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              blocks: [
                {
                  type: "header",
                  text: {
                    type: "plain_text",
                    text: `🚀 New Lead (${leadScore}/8)`,
                  },
                },
                {
                  type: "section",
                  fields: [
                    { type: "mrkdwn", text: `*Name:*\n${name || "—"}` },
                    { type: "mrkdwn", text: `*Email:*\n${email || "—"}` },
                    { type: "mrkdwn", text: `*Company:*\n${company || "—"}` },
                    { type: "mrkdwn", text: `*Website:*\n${website || "—"}` },
                  ],
                },
                { type: "divider" },
                {
                  type: "section",
                  fields: [
                    { type: "mrkdwn", text: `*Project:*\n${projectType}` },
                    { type: "mrkdwn", text: `*Goal:*\n${goal || "—"}` },
                    { type: "mrkdwn", text: `*Budget:*\n${budget}` },
                    { type: "mrkdwn", text: `*Timeline:*\n${timeline}` },
                    { type: "mrkdwn", text: `*Urgency:*\n${urgency || "—"}` },
                    {
                      type: "mrkdwn",
                      text: `*Recommended:*\n${recommendedPackage.toUpperCase()}`,
                    },
                  ],
                },
                { type: "divider" },
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
        } catch (err) {
          console.error("❌ Slack async error:", err);
        }
      })();
    }

    // -----------------------------
    // 💳 Stripe
    // -----------------------------
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
        projectType,
        budget,
        timeline,
        recommendedPackage,
        leadScore: String(leadScore),
      },
    });

    return NextResponse.json({
      success: true,
      recommendedPackage,
      leadScore,
      url: session.url,
    });
  } catch (error) {
    console.error("❌ API crash:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
}
