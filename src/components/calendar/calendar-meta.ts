import type { CalendarEvent, CalendarEventKind } from "@/lib/types";

export const eventKindMeta: Record<CalendarEventKind, { label: string; chip: string; dot: string }> = {
  sessao: {
    label: "Sessão acompanhada",
    chip: "bg-bronze text-ink",
    dot: "bg-bronze",
  },
  treino: {
    label: "Treino autónomo",
    chip: "bg-bone/[0.08] text-bone ring-1 ring-inset ring-bone/25",
    dot: "border border-bone bg-transparent",
  },
  outro: {
    label: "Outro evento",
    chip: "bg-slate/15 text-slate",
    dot: "bg-slate",
  },
};

/** Etiqueta curta para células de calendário ("Treino A", "Sessão", "Check-in quinzenal"). */
export function shortEventLabel(e: CalendarEvent) {
  if (e.kind === "sessao" && e.title === "Sessão acompanhada") return "Sessão";
  return e.title.split(" · ")[0];
}
