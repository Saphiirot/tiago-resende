import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/demo-auth";

export function GET(request: NextRequest) {
  const admin = request.nextUrl.searchParams.get("area") === "admin";
  const res = NextResponse.redirect(new URL(admin ? "/admin/login" : "/login", request.url));
  res.cookies.delete(SESSION_COOKIE);
  return res;
}
