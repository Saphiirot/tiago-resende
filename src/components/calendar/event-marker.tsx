import type { CalendarEventKind } from "@/lib/types";
import { cn } from "@/lib/cn";

/**
 * Marcador de tipo de evento — forma + cor (não depende só da cor):
 * sessão acompanhada = círculo cheio bronze; treino autónomo = anel betão; outro = losango aço.
 */
export function EventMarker({ kind, className }: { kind: CalendarEventKind; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block size-2.5 shrink-0",
        kind === "sessao" && "rounded-full bg-bronze",
        kind === "treino" && "rounded-full border-[1.5px] border-bone bg-transparent",
        kind === "outro" && "size-2 rotate-45 bg-slate",
        className,
      )}
    />
  );
}
