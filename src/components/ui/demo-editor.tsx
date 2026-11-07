"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { FlaskConical, Plus, X } from "lucide-react";
import { Button } from "./button";

/**
 * Painel lateral com um formulário de demonstração. "Guardar" não executa
 * nenhuma operação: apenas mostra o estado de confirmação de exemplo.
 */
export function DemoEditor({
  triggerLabel,
  title,
  children,
}: {
  triggerLabel: string;
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "saving" | "done">("idle");
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (state !== "saving") return;
    const t = setTimeout(() => setState("done"), 900);
    return () => clearTimeout(t);
  }, [state]);

  return (
    <>
      <Button onClick={() => { setOpen(true); setState("idle"); }} icon={<Plus aria-hidden className="size-4" />}>
        {triggerLabel}
      </Button>
      {open ? (
        <div className="fixed inset-0 z-50">
          <button type="button" aria-label="Fechar" className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-t`}
            className="absolute inset-y-0 right-0 flex w-full max-w-lg animate-fade flex-col border-l border-line bg-ink-2"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <div>
                <p className="flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-bone-dim">
                  <FlaskConical aria-hidden className="size-3" /> Formulário de demonstração
                </p>
                <h2 id={`${id}-t`} className="mt-1 text-lg font-semibold text-bone">{title}</h2>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="grid size-10 place-items-center rounded-full text-bone-dim hover:bg-ink-4 hover:text-bone" autoFocus>
                <X aria-hidden className="size-5" />
                <span className="sr-only">Fechar</span>
              </button>
            </div>
            <form
              className="flex flex-1 flex-col overflow-y-auto"
              onSubmit={(e) => {
                e.preventDefault();
                setState("saving");
              }}
            >
              <div className="flex-1 space-y-4 px-6 py-6">{children}</div>
              <div className="sticky bottom-0 border-t border-line bg-ink-2 px-6 py-4">
                <p aria-live="polite" className="mb-3 min-h-5 text-xs text-bone-dim">
                  {state === "done" ? "Demonstração: nada foi criado nem guardado." : null}
                </p>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
                  <Button type="submit" disabled={state === "saving"}>
                    {state === "saving" ? "A guardar…" : "Guardar"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
