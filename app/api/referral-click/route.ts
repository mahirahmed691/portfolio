import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  if (!code || typeof code !== "string") {
    return NextResponse.json({ ok: false });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Validate the code exists and is active before incrementing.
  // This prevents fake or inactive codes from inflating counts.
  const { data: referral } = await supabase
    .from("referrals")
    .select("id")
    .eq("code", code)
    .eq("active", true)
    .single();

  if (!referral) {
    return NextResponse.json({ ok: false });
  }

  // Basic IP-based deduplication: one increment per IP per code per hour.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  const { data: recentClick } = await supabase
    .from("referral_click_log")
    .select("id")
    .eq("code", code)
    .eq("ip", ip)
    .gte("clicked_at", oneHourAgo)
    .limit(1)
    .maybeSingle();

  if (recentClick) {
    // Already counted this IP for this code in the last hour — skip
    return NextResponse.json({ ok: true });
  }

  // Log the click and increment the counter
  await supabase
    .from("referral_click_log")
    .insert({ code, ip, clicked_at: new Date().toISOString() });

  await supabase.rpc("increment_clicks", { ref_code: code });

  return NextResponse.json({ ok: true });
}
