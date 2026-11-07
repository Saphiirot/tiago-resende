"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

/** Interruptor visual. O estado é local e não é guardado (Fase 01). */
export function Toggle({ label, description, defaultOn = false }: { label: string; description?: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  const id = useId();
  return (
    <div className="flex items-center justify-between gap-6 py-4">
      <div>
        <p id={`${id}-l`} className="text-sm font-medium text-bone">
          {label}
        </p>
        {description ? <p className="mt-0.5 text-xs text-mute">{description}</p> : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-labelledby={`${id}-l`}
        onClick={() => setOn((v) => !v)}
        className={cn(
          "relative h-7 w-12 shrink-0 rounded-full border transition-colors",
          on ? "border-bronze bg-bronze" : "border-line-strong bg-ink-4",
        )}
      >
        <span
          className={cn(
            "absolute top-1/2 size-5 -translate-y-1/2 rounded-full transition-[left,background-color] duration-200",
            on ? "left-[1.4rem] bg-ink" : "left-1 bg-bone-dim",
          )}
        />
      </button>
    </div>
  );
}
