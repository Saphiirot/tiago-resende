import { CircleCheck, CircleDashed } from "lucide-react";
import { site } from "@/config/site";
import { modalities, plans, testimonials } from "@/config/commercial";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

/** Estado real da configuração do projeto (não são métricas de negócio). */
export function getSetupItems() {
  return [
    { label: "Número de WhatsApp", done: getWhatsAppHref() !== null, detail: "site.whatsapp.number" },
    { label: "Modalidades validadas", done: modalities.every((m) => m.status === "confirmado"), detail: "commercial.modalities" },
    { label: "Planos e preços", done: plans.length > 0, detail: "commercial.plans" },
    { label: "Formação e certificações", done: site.credentials.length > 0, detail: "site.credentials" },
    { label: "Qualificações para a componente alimentar", done: site.nutrition.qualificationsConfirmed, detail: "site.nutrition" },
    { label: "Testemunhos com consentimento", done: testimonials.length > 0, detail: "commercial.testimonials" },
    { label: "Fotografias de sessão (crédito de terceiros)", done: false, detail: "src/config/media.ts" },
    { label: "Autenticação e autorização no servidor", done: false, detail: "Fase seguinte" },
    { label: "Base de dados e persistência", done: false, detail: "Fase seguinte" },
    { label: "Política de privacidade (RGPD)", done: false, detail: "Conteúdo jurídico" },
  ];
}

export function SetupStatusList({ className, compact = false }: { className?: string; compact?: boolean }) {
  const items = getSetupItems();
  return (
    <ul className={cn("divide-y divide-line", className)}>
      {items.map((it) => (
        <li key={it.label} className={cn("flex items-center gap-3 text-sm", compact ? "py-2.5" : "py-3")}>
          {it.done ? (
            <CircleCheck aria-label="Concluído" className="size-4 shrink-0 text-sage" />
          ) : (
            <CircleDashed aria-label="Pendente" className="size-4 shrink-0 text-mute" />
          )}
          <span className={cn("flex-1", it.done ? "text-bone" : "text-bone-dim")}>{it.label}</span>
          {compact ? null : <code className="hidden font-mono text-[0.6875rem] text-mute sm:block">{it.detail}</code>}
        </li>
      ))}
    </ul>
  );
}
