import { site } from "@/config/site";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { WhatsAppIcon } from "./icons";

type Size = "sm" | "md" | "lg";

/**
 * Contacto principal por WhatsApp (destino único: site.whatsapp.number).
 * Sem número configurado mostra um estado "por configurar" com a mesma
 * posição e cor, sem gerar ligação — ver docs/PENDENTES.md.
 */
export function WhatsAppButton({
  size = "md",
  label = "Falar no WhatsApp",
  className,
  variant = "primary",
  showPendingHint = site.prototype.showReviewNotes,
}: {
  variant?: "primary" | "dark";
  size?: Size;
  label?: string;
  className?: string;
  showPendingHint?: boolean;
}) {
  const href = getWhatsAppHref();
  const classes = buttonClasses({ variant, size, className });
  const icon = <WhatsAppIcon className={size === "lg" ? "size-5" : "size-4"} />;

  if (!href) {
    // Estado "por configurar": mantém o lugar e a cor do CTA, legível a 100 %,
    // mas apresenta-se como estado (contorno + etiqueta) e não como ação —
    // sem verbo imperativo, sem papel de ligação e sem destino.
    const dark = variant === "dark";
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border",
          size === "lg" ? "h-14 pl-6 pr-2.5 text-base" : size === "md" ? "h-11 pl-5 pr-2 text-sm" : "h-9 pl-3.5 pr-1.5 text-sm",
          dark ? "border-[1.5px] border-ink/85 bg-ink/[0.08] text-ink" : "border-[1.5px] border-bronze bg-bronze/[0.12] text-bronze-bright",
          className,
        )}
        title="O número de WhatsApp ainda não foi configurado"
      >
        {icon}
        <span className="font-medium">WhatsApp</span>
        {showPendingHint || size !== "sm" ? (
          <span
            className={cn(
              "rounded-full px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em]",
              dark ? "bg-ink/15 text-ink" : "bg-bronze/20 text-bone",
            )}
          >
            por configurar
          </span>
        ) : (
          <span className="sr-only">(por configurar)</span>
        )}
      </span>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {icon}
      {label}
    </a>
  );
}
