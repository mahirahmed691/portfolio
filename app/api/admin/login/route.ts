import { NextResponse } from "next/server";
import { getSessionToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminSecret) {
      return NextResponse.json(
        { error: "Admin secret not configured" },
        { status: 500 },
      );
    }

    if (password !== adminSecret) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const sessionToken = await getSessionToken(adminSecret);
    const res = NextResponse.json({ success: true });

    res.cookies.set("admin_auth", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
