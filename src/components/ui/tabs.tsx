"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Separadores acessíveis (setas esquerda/direita, Home/End). */
export function Tabs({
  items,
  label,
  defaultIndex = 0,
}: {
  items: { id: string; label: ReactNode; content: ReactNode }[];
  label: string;
  defaultIndex?: number;
}) {
  const [active, setActive] = useState(defaultIndex);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(e: KeyboardEvent) {
    const last = items.length - 1;
    const next =
      e.key === "ArrowRight" ? (active === last ? 0 : active + 1)
      : e.key === "ArrowLeft" ? (active === 0 ? last : active - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKey}
        className="scrollbar-none -mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
      >
        {items.map((item, i) => (
          <button
            key={item.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={`${base}-t-${item.id}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`${base}-p-${item.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
              i === active
                ? "border-bone bg-bone text-ink"
                : "border-line-strong text-bone-dim hover:border-bone-dim hover:text-bone",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item, i) => (
        <div
          key={item.id}
          id={`${base}-p-${item.id}`}
          role="tabpanel"
          aria-labelledby={`${base}-t-${item.id}`}
          hidden={i !== active}
          tabIndex={0}
          className="mt-6 focus-visible:outline-offset-8"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
