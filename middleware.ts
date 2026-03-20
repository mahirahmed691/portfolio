import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow the login page through
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  const cookie = req.cookies.get("admin_auth")?.value;
  const expected = await getSessionToken(adminSecret);

  if (cookie !== expected) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
