import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { getSessionToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const adminCookie = cookieStore.get("admin_auth")?.value;
    const adminSecret = process.env.ADMIN_SECRET;
    const expectedToken = adminSecret ? await getSessionToken(adminSecret) : null;

    if (!expectedToken || adminCookie !== expectedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from("briefs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch leads" },
        { status: 500 },
      );
    }

    return NextResponse.json({ leads: data ?? [] });
  } catch (err) {
    console.error("Leads API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
