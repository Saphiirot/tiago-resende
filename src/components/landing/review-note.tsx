import { Hourglass, PenLine } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

/** Nota de revisão visível apenas enquanto `site.prototype.showReviewNotes` estiver ativo. */
export function ReviewNote({ children, className, tone = "dark" }: { children: ReactNode; className?: string; tone?: "dark" | "light" }) {
  if (!site.prototype.showReviewNotes) return null;
  return (
    <p
      className={cn(
        "inline-flex items-start gap-2 rounded-full border border-dashed px-3 py-1.5 text-xs leading-snug",
        tone === "light" ? "border-ink/25 text-ink/70" : "border-line-strong text-mute",
        className,
      )}
    >
      <PenLine aria-hidden className="mt-px size-3.5 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

/** Conteúdo em falta na página pública — oculto quando as notas de revisão estão desligadas. */
export function LandingPending({
  title,
  children,
  className,
  tone = "dark",
}: {
  title: string;
  children?: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  if (!site.prototype.showReviewNotes) return null;
  return (
    <div
      className={cn(
        "flex gap-3 rounded-[var(--radius-card)] border border-dashed p-4 text-sm",
        tone === "light" ? "border-ink/25 text-ink/70" : "border-line-strong text-bone-dim",
        className,
      )}
    >
      <Hourglass aria-hidden className={cn("mt-0.5 size-4 shrink-0", tone === "light" ? "text-ink/60" : "text-bone-dim")} />
      <div>
        <p className={cn("font-medium", tone === "light" ? "text-ink" : "text-bone")}>
          <span className="mr-2 font-mono text-[0.625rem] font-normal uppercase tracking-[0.14em] opacity-70">A confirmar</span>
          {title}
        </p>
        {children ? <div className="mt-1 leading-relaxed">{children}</div> : null}
      </div>
    </div>
  );
}
