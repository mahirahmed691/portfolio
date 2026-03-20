// -- create table maintenance_clients (
// --   id uuid default gen_random_uuid() primary key,
// --   client_name text not null,
// --   client_email text not null,
// --   website_url text,
// --   plan text not null,
// --   status text default 'active',
// --   notes text,
// --   next_renewal date,
// --   created_at timestamptz default now()
// -- );

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
    .from("maintenance_clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch maintenance clients" },
      { status: 500 },
    );
  }

  return NextResponse.json({ clients: data ?? [] });
}

export async function POST(req: Request) {
  const supabase = await getAuthedSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { client_name, client_email, website_url, plan, next_renewal } = body;

  if (!client_name || !client_email || !plan) {
    return NextResponse.json(
      { error: "client_name, client_email and plan are required" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("maintenance_clients")
    .insert([
      {
        client_name,
        client_email,
        website_url: website_url || null,
        plan,
        status: "active",
        next_renewal: next_renewal || null,
      },
    ])
    .select("*")
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Failed to create maintenance client" },
      { status: 500 },
    );
  }

  return NextResponse.json({ client: data });
}
