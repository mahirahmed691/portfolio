import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

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
        description:
          "Initial payment for a focused landing page or smaller site",
      };
    case "standard":
      return {
        name: "Standard Package",
        amount: 50000,
        description:
          "Initial payment for a polished website or portfolio build",
      };
    case "premium":
      return {
        name: "Premium Package",
        amount: 100000,
        description:
          "Initial payment for custom product UI or higher-touch frontend work",
      };
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { projectType, budget, timeline, description } = body;

    if (!projectType || !budget || !timeline) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const recommendedPackage = getRecommendedPackage(budget);

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

    // -----------------------------
    // 🔐 Validate env early
    // -----------------------------
    if (!stripeSecretKey) {
      console.error("❌ Missing STRIPE_SECRET_KEY");
      return NextResponse.json(
        { error: "Stripe not configured" },
        { status: 500 },
      );
    }

    if (!baseUrl) {
      console.error("❌ Missing NEXT_PUBLIC_BASE_URL");
      return NextResponse.json(
        { error: "Base URL not configured" },
        { status: 500 },
      );
    }

    // -----------------------------
    // 🗄️ Supabase (non-blocking)
    // -----------------------------
    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);

        const { error } = await supabase.from("briefs").insert({
          project_type: projectType,
          budget,
          timeline,
          description,
          recommended_package: recommendedPackage,
          created_at: new Date().toISOString(),
        });

        if (error) {
          console.error("❌ Supabase error:", error);
        }
      } catch (err) {
        console.error("❌ Supabase crash:", err);
      }
    }

    // -----------------------------
    // 💬 Slack (non-blocking)
    // -----------------------------
    if (slackWebhookUrl) {
      try {
        console.log("📡 Sending to Slack...");

        const slackRes = await fetch(slackWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: `🚀 New Lead

Project: ${projectType}
Budget: ${budget}
Timeline: ${timeline}
Recommended: ${recommendedPackage}

Notes:
${description || "—"}`,
          }),
        });

        const slackText = await slackRes.text();

        console.log("📬 Slack response:", slackRes.status, slackText);

        if (!slackRes.ok) {
          console.error("❌ Slack failed:", slackText);
        } else {
          console.log("✅ Slack sent successfully");
        }
      } catch (err) {
        console.error("❌ Slack crash:", err);
      }
    } else {
      console.warn("⚠️ SLACK_WEBHOOK_URL is missing");
    }

    // -----------------------------
    // 💳 Stripe (FIXED)
    // -----------------------------
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2024-06-20", // ✅ REQUIRED
    });

    const pkg = getPackageDetails(recommendedPackage);

    console.log("💳 Creating Stripe session:", pkg);

    let session;

    try {
      session = await stripe.checkout.sessions.create({
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
          projectType,
          budget,
          timeline,
          recommendedPackage,
          description: description || "",
        },
      });
    } catch (err) {
      console.error("❌ Stripe error:", err);

      return NextResponse.json(
        { error: "Stripe failed to create checkout session" },
        { status: 500 },
      );
    }

    if (!session?.url) {
      return NextResponse.json(
        { error: "Stripe checkout URL missing" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      recommendedPackage,
      url: session.url,
    });
  } catch (error) {
    console.error("❌ Brief route error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong processing the brief",
      },
      { status: 500 },
    );
  }
}
