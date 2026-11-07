import type { Metadata } from "next";
import { AppShell } from "@/components/shell/app-shell";
import { demoProfile } from "@/data/demo";

export const metadata: Metadata = {
  title: { default: "Área de cliente", template: "%s · Área de cliente" },
  // Protótipo não protegido: não indexar.
  robots: { index: false, follow: false },
};

/**
 * ⚠️ Protótipo sem autenticação. Quando existir autenticação real, este
 * layout NÃO é o local de controlo de acesso: cada página/consulta tem de
 * verificar a sessão e a autorização no servidor (ver docs/ARQUITETURA-SEGURANCA.md).
 */
export default function ClientLayout({ children }: LayoutProps<"/app">) {
  return (
    <AppShell area="cliente" user={{ name: demoProfile.displayName, initials: "AD", caption: "Cliente · demo" }}>
      {children}
    </AppShell>
  );
}
