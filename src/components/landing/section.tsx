import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "dark" | "bone" | "raised";

export function Section({
  id,
  label,
  children,
  className,
  tone = "dark",
}: {
  id?: string;
  label?: string;
  children: ReactNode;
  className?: string;
  tone?: Tone;
}) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      className={cn(
        "relative z-10 overflow-x-clip px-4 py-24 sm:px-8 lg:px-12 lg:py-32",
        tone === "bone" && "bg-concrete text-ink",
        tone === "dark" && "bg-ink text-bone",
        tone === "raised" && "bg-ink-2 text-bone",
        className,
      )}
    >
      <div className="mx-auto max-w-[88rem]">
        {label ? <SectionLabel label={label} tone={tone} /> : null}
        {children}
      </div>
    </section>
  );
}

export function SectionLabel({ label, tone = "dark" }: { label: string; tone?: Tone }) {
  return (
    <div
      className={cn(
        "mb-8 flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] sm:mb-12",
        tone === "bone" ? "text-ink/70" : "text-mute",
      )}
    >
      <span aria-hidden className={cn("h-px w-10", tone === "bone" ? "bg-ink/25" : "bg-line-strong")} />
      <span>{label}</span>
    </div>
  );
}

/** Título de secção com escala única para todo o site público. */
export function SectionTitle({
  id,
  children,
  accent,
  size = "d1",
  className,
}: {
  id: string;
  children: ReactNode;
  /**
   * Segunda linha em serifa itálica bronze. Reservada às secções em que é
   * assinatura própria (Abordagem, CTA final) — não usar por defeito.
   */
  accent?: ReactNode;
  /** d1 para secções de abertura; d2 para secções de apoio (ex.: Perguntas). */
  size?: "d1" | "d2";
  className?: string;
}) {
  return (
    <h2 id={id} className={cn("reveal", className)}>
      <span className={cn("display block", size === "d1" ? "text-d1" : "text-d2")}>{children}</span>
      {accent ? <span className="editorial mt-1 block text-[clamp(2.25rem,4.6vw,4.5rem)] leading-[1] text-bronze">{accent}</span> : null}
    </h2>
  );
}
