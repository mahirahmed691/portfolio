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

export async function POST(req: Request) {
  const supabase = await getAuthedSupabase();
  if (!supabase) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, action, ...fields } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  if (action === "delete") {
    const { error } = await supabase
      .from("maintenance_clients")
      .delete()
      .eq("id", id);
    if (error) {
      return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  }

  // Default: update allowed fields (status, notes, next_renewal)
  const allowed: Record<string, unknown> = {};
  if (typeof fields.status === "string") allowed.status = fields.status;
  if (typeof fields.notes === "string") allowed.notes = fields.notes;
  if (typeof fields.next_renewal === "string")
    allowed.next_renewal = fields.next_renewal;

  if (Object.keys(allowed).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  const { error } = await supabase
    .from("maintenance_clients")
    .update(allowed)
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
