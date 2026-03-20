import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { getSessionToken } from "@/lib/auth";

export const runtime = "nodejs";

async function getAuthedSupabase() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("admin_auth")?.value;
  const adminSecret = process.env.ADMIN_SECRET;
  const expectedToken = adminSecret ? await getSessionToken(adminSecret) : null;

  if (!expectedToken || adminCookie !== expectedToken) return null;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) return null;

  return createClient(supabaseUrl, supabaseKey);
}

export async function GET() {
  const supabase = await getAuthedSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("referrals")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to fetch referrals" }, { status: 500 });
  }

  return NextResponse.json({ referrals: data ?? [] });
}

export async function POST(req: Request) {
  const supabase = await getAuthedSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const { data, error } = await supabase
    .from("referrals")
    .insert([body])
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: "Failed to create referral" }, { status: 500 });
  }

  return NextResponse.json({ referral: data });
}
