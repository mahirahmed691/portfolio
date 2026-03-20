import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEPOSIT_OPTIONS: Record<string, { name: string; amount: number }> = {
  starter: { name: "Starter project deposit", amount: 25000 },
  standard: { name: "Standard project deposit", amount: 50000 },
  premium: { name: "Premium project deposit", amount: 100000 },
};

async function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }

  const { default: Stripe } = await import("stripe");

  return new Stripe(secretKey, {
    apiVersion: "2026-02-25.clover",
  });
}

export async function POST(req: Request) {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!siteUrl) {
      return NextResponse.json(
        { error: "Missing NEXT_PUBLIC_SITE_URL" },
        { status: 500 },
      );
    }

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Missing Supabase config" },
        { status: 500 },
      );
    }

    const body = await req.json().catch(() => ({}));

    const stripe = await getStripeClient();
    const supabase = createClient(supabaseUrl, supabaseKey);

    const tier = typeof body?.tier === "string" ? body.tier : "standard";
    const selected = DEPOSIT_OPTIONS[tier] ?? DEPOSIT_OPTIONS.standard;

    const name = typeof body?.name === "string" ? body.name : "";
    const email = typeof body?.email === "string" ? body.email : "";
    const phone = typeof body?.phone === "string" ? body.phone : "";
    const company = typeof body?.company === "string" ? body.company : "";
    const website = typeof body?.website === "string" ? body.website : "";
    const projectType =
      typeof body?.projectType === "string" ? body.projectType : "";
    const goal = typeof body?.goal === "string" ? body.goal : "";
    const budget = typeof body?.budget === "string" ? body.budget : "";
    const timeline = typeof body?.timeline === "string" ? body.timeline : "";
    const urgency = typeof body?.urgency === "string" ? body.urgency : "";
    const description =
      typeof body?.description === "string" ? body.description : "";
    const referralCode =
      typeof body?.referral_code === "string" ? body.referral_code : "";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "pay",
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/?deposit=cancelled`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "gbp",
            product_data: {
              name: selected.name,
              description: "Initial project payment",
            },
            unit_amount: selected.amount,
          },
        },
      ],
      metadata: {
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
        referral_code: referralCode,
        package_tier: tier,
        package_name: selected.name,
      },
    });

    const { error: updateError } = await supabase
      .from("briefs")
      .update({
        stripe_session_id: session.id,
        recommended_package: tier,
        stripe_payment_status: "pending",
      })
      .eq("email", email)
      .eq("phone", phone)
      .is("stripe_session_id", null);

    if (updateError) {
      console.error(
        "Failed to attach stripe_session_id to brief:",
        updateError,
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create checkout session",
      },
      { status: 500 },
    );
  }
}
