import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSessionToken } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get("admin_auth")?.value;
  const adminSecret = process.env.ADMIN_SECRET;
  const expectedToken = adminSecret ? await getSessionToken(adminSecret) : null;

  if (!expectedToken || adminCookie !== expectedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const key = process.env.ANTHROPIC_API_KEY;

  if (!key) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not set" },
      { status: 500 },
    );
  }

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
