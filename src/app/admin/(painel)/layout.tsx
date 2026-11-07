import type { Metadata } from "next";
import { AppShell } from "@/components/shell/app-shell";

export const metadata: Metadata = {
  title: { default: "Painel do treinador", template: "%s · Painel" },
  robots: { index: false, follow: false },
};

/**
 * ⚠️ Protótipo sem autenticação. A futura verificação de função
 * (administrador) tem de acontecer no servidor em cada página e operação —
 * não apenas neste layout. Ver docs/ARQUITETURA-SEGURANCA.md.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell area="treinador" user={{ name: "Tiago Resende", initials: "TR", caption: "Treinador · protótipo" }}>
      {children}
    </AppShell>
  );
}
