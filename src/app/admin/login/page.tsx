import type { Metadata } from "next";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { Monogram } from "@/components/brand/wordmark";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Acesso do treinador",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main id="conteudo" className="relative grid min-h-dvh place-items-center overflow-hidden px-4 py-12">
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" aria-label="Voltar ao site"><Monogram /></Link>
          <span className="flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-bone-dim">
            <LockKeyhole aria-hidden className="size-3" /> Acesso restrito
          </span>
        </div>
        <div className="rounded-[var(--radius-media)] border border-line-strong bg-ink-2 p-6 shadow-[var(--shadow-lift)] sm:p-10">
          <p className="eyebrow">Painel do treinador</p>
          <h1 className="display mt-3 text-5xl text-bone">Iniciar sessão</h1>
          <p className="mt-3 text-sm text-bone-dim">Gestão de clientes, conteúdos e calendário.</p>
          <div className="mt-8">
            <LoginForm variant="treinador" />
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-mute">
          <Link href="/login" className="hover:text-bone-dim">És cliente? Entra na área de cliente</Link>
        </p>
      </div>
    </main>
  );
}
