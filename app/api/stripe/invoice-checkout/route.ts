import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error("Missing STRIPE_SECRET_KEY");
  const { default: Stripe } = await import("stripe");
  return new Stripe(secretKey, { apiVersion: "2026-02-25.clover" });
}

export async function POST(req: Request) {
  try {
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "mahirahmed.co.uk";
    const proto = req.headers.get("x-forwarded-proto") || "https";
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || `${proto}://${host}`).trim().replace(/\/$/, "");

    const body = await req.json().catch(() => ({}));
    const { invoice_id, client_name, client_email, amount_pence, description } = body;

    if (!amount_pence || amount_pence < 100) {
      return NextResponse.json({ error: "Invalid invoice amount" }, { status: 400 });
    }

    const stripe = await getStripeClient();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "pay",
      customer_email: client_email || undefined,
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/admin/invoices`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "gbp",
            product_data: {
              name: description || `Invoice — ${client_name || "Client"}`,
            },
            unit_amount: amount_pence,
          },
        },
      ],
      metadata: {
        invoice_id: invoice_id || "",
        client_name: client_name || "",
        client_email: client_email || "",
        source: "invoice",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Invoice checkout error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
