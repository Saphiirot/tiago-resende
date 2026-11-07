import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, isValidSession } from "@/lib/demo-auth";

// Protege a área de cliente e o painel; o ecrã de login do treinador fica acessível.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();
  if (isValidSession(request.cookies.get(SESSION_COOKIE)?.value)) return NextResponse.next();
  const login = pathname.startsWith("/admin") ? "/admin/login" : "/login";
  return NextResponse.redirect(new URL(login, request.url));
}

export const config = { matcher: ["/app/:path*", "/admin/:path*"] };
