"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, isValidLogin, sessionToken } from "@/lib/demo-auth";

export async function entrar(variant: "cliente" | "treinador", email: string, password: string) {
  if (!isValidLogin(email, password)) return { error: "Email ou palavra-passe incorretos." };
  (await cookies()).set(SESSION_COOKIE, sessionToken(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  redirect(variant === "treinador" ? "/admin" : "/app");
}
