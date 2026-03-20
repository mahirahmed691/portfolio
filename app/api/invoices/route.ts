// -- Required Supabase table:
// create table invoices (
//   id uuid default gen_random_uuid() primary key,
//   client_name text not null,
//   client_email text not null,
//   amount_pence integer not null,
//   description text,
//   due_date date,
//   status text default 'draft',
//   notes text,
//   paid_at timestamptz,
//   created_at timestamptz default now()
// );

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
    .from("invoices")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
  const supabase = await getAuthedSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { client_name, client_email, amount_pence, description, due_date } = body;

  if (!client_name || !client_email || amount_pence == null) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("invoices")
    .insert([{ client_name, client_email, amount_pence, description, due_date, status: "draft" }])
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 });
  }

  return NextResponse.json({ invoice: data });
}
