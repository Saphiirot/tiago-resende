import { FlaskConical, Hourglass } from "lucide-react";
import type { ReactNode } from "react";
import { DEMO_NOTICE } from "@/data/demo";
import { cn } from "@/lib/cn";

/** Etiqueta compacta que identifica um bloco com dados fictícios. */
export function DemoBadge({ className, label = "Demo" }: { className?: string; label?: string }) {
  return (
    <span
      title={DEMO_NOTICE}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-dashed border-line-strong px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-bone-dim",
        className,
      )}
    >
      <FlaskConical aria-hidden className="size-3" />
      {label}
    </span>
  );
}

/** Aviso em linha para ecrãs que apresentam dados fictícios. */
export function DemoNotice({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <p
      role="note"
      className={cn(
        "flex items-start gap-2.5 rounded-xl border border-dashed border-line-strong bg-ink-3/60 px-4 py-3 text-sm text-bone-dim",
        className,
      )}
    >
      <FlaskConical aria-hidden className="mt-0.5 size-4 shrink-0 text-bone-dim" />
      <span>
        <strong className="font-medium text-bone">{DEMO_NOTICE}.</strong>{" "}
        {children ?? "Nenhuma informação apresentada corresponde a pessoas, planos ou resultados reais."}
      </span>
    </p>
  );
}

/** Marca conteúdo que ainda tem de ser confirmado pelo Tiago antes de publicar. */
export function PendingContent({
  title,
  children,
  className,
}: {
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-line-strong bg-ink-2/60 p-5 text-sm text-bone-dim",
        className,
      )}
    >
      <p className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-mute">
        <Hourglass aria-hidden className="size-3.5" /> A confirmar
      </p>
      <p className="mt-2 font-medium text-bone">{title}</p>
      {children ? <div className="mt-1.5 leading-relaxed">{children}</div> : null}
    </div>
  );
}
