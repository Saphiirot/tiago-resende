// ⚠️ DADOS FICTÍCIOS — agenda de exemplo para outubro/novembro de 2026.
import type { CalendarEvent } from "@/lib/types";

export const demoEvents: CalendarEvent[] = [
  { id: "ev-01", kind: "treino", title: "Treino A · Costas & Bíceps", start: "2026-10-05T18:30", workoutSessionId: "demo-ses-a", clientId: "demo-cli-01" },
  { id: "ev-02", kind: "sessao", title: "Sessão acompanhada", start: "2026-10-07T19:00", end: "2026-10-07T20:00", clientId: "demo-cli-01", location: "Local a confirmar" },
  { id: "ev-03", kind: "treino", title: "Treino B · Pernas", start: "2026-10-09T18:30", workoutSessionId: "demo-ses-b", clientId: "demo-cli-01" },
  { id: "ev-04", kind: "treino", title: "Treino C · Peito & Ombros", start: "2026-10-12T18:30", workoutSessionId: "demo-ses-c", clientId: "demo-cli-01" },
  { id: "ev-05", kind: "outro", title: "Revisão do plano", start: "2026-10-14T12:00", clientId: "demo-cli-01" },
  { id: "ev-06", kind: "treino", title: "Treino D · Corpo inteiro", start: "2026-10-16T18:30", workoutSessionId: "demo-ses-d", clientId: "demo-cli-01" },
  { id: "ev-07", kind: "treino", title: "Treino B · Pernas", start: "2026-10-19T18:30", workoutSessionId: "demo-ses-b", clientId: "demo-cli-01" },
  { id: "ev-08", kind: "sessao", title: "Sessão acompanhada", start: "2026-10-21T19:00", end: "2026-10-21T20:00", clientId: "demo-cli-01", location: "Local a confirmar" },
  { id: "ev-09", kind: "treino", title: "Treino A · Costas & Bíceps", start: "2026-10-23T18:30", workoutSessionId: "demo-ses-a", clientId: "demo-cli-01" },
  { id: "ev-10", kind: "treino", title: "Treino C · Peito & Ombros", start: "2026-10-26T18:30", workoutSessionId: "demo-ses-c", clientId: "demo-cli-01" },
  { id: "ev-11", kind: "outro", title: "Check-in quinzenal", start: "2026-10-28T12:30", clientId: "demo-cli-01" },
  { id: "ev-12", kind: "treino", title: "Treino D · Corpo inteiro", start: "2026-10-30T18:30", workoutSessionId: "demo-ses-d", clientId: "demo-cli-01" },
  { id: "ev-13", kind: "sessao", title: "Sessão acompanhada", start: "2026-11-04T19:00", end: "2026-11-04T20:00", clientId: "demo-cli-01" },

  // Agenda do treinador (outros clientes fictícios)
  { id: "ev-20", kind: "sessao", title: "Rui Exemplo", start: "2026-10-20T08:00", end: "2026-10-20T09:00", clientId: "demo-cli-02" },
  { id: "ev-21", kind: "sessao", title: "Pedro Fictício", start: "2026-10-20T18:00", end: "2026-10-20T19:00", clientId: "demo-cli-04" },
  { id: "ev-22", kind: "outro", title: "Conversa inicial · Sofia Amostra", start: "2026-10-22T12:00", end: "2026-10-22T12:30", clientId: "demo-cli-05" },
  { id: "ev-23", kind: "sessao", title: "Rui Exemplo", start: "2026-10-23T08:00", end: "2026-10-23T09:00", clientId: "demo-cli-02" },
  { id: "ev-24", kind: "sessao", title: "Pedro Fictício", start: "2026-10-24T10:00", end: "2026-10-24T11:00", clientId: "demo-cli-04" },
  { id: "ev-25", kind: "outro", title: "Gravação de vídeos de execução", start: "2026-10-25T15:00", end: "2026-10-25T17:00" },
];

export function eventsForClient(clientId: string) {
  return demoEvents.filter((e) => e.clientId === clientId);
}
