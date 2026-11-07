import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "neutral" | "bronze" | "sage" | "oxide" | "slate" | "outline";

const tones: Record<BadgeTone, string> = {
  neutral: "bg-ink-4 text-bone-dim",
  bronze: "bg-bronze/15 text-bronze-bright",
  sage: "bg-sage/15 text-sage",
  oxide: "bg-oxide/15 text-oxide",
  slate: "bg-slate/15 text-slate",
  outline: "border border-line-strong text-bone-dim",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
