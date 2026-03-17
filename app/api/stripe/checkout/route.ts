import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const DEPOSIT_OPTIONS: Record<string, { name: string; amount: number }> = {
  starter: { name: "Starter project deposit", amount: 25000 },
  standard: { name: "Standard project deposit", amount: 50000 },
  premium: { name: "Premium project deposit", amount: 100000 },
};

export async function POST(req: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    if (!secretKey) {
      return NextResponse.json(
        { error: "Missing STRIPE_SECRET_KEY" },
        { status: 500 },
      );
    }

    if (!siteUrl) {
      return NextResponse.json(
        { error: "Missing NEXT_PUBLIC_SITE_URL" },
        { status: 500 },
      );
    }

    const stripe = new Stripe(secretKey);

    const body = await req.json().catch(() => ({}));
    const tier = typeof body?.tier === "string" ? body.tier : "standard";
    const selected = DEPOSIT_OPTIONS[tier] ?? DEPOSIT_OPTIONS.standard;

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
        package_tier: tier,
        package_name: selected.name,
      },
    });

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
