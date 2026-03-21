import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function GET() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ available: true });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "available")
      .single();

    if (error || !data) {
      return NextResponse.json({ available: true });
    }

    return NextResponse.json({ available: data.value === "true" });
  } catch {
    return NextResponse.json({ available: true });
  }
}
