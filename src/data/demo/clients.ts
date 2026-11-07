// ⚠️ DADOS FICTÍCIOS — nomes e emails inventados para demonstração (domínio reservado example.com).
import type { ActivityItem, Client, Profile } from "@/lib/types";

export const demoClients: Client[] = [
  {
    id: "demo-cli-01",
    name: "Ana Demo",
    initials: "AD",
    email: "ana.demo@example.com",
    status: "ativo",
    goal: "Ganhar força nos membros inferiores",
    startedOn: "2026-09-01",
    activePlanId: "demo-plan-01",
    mealPlanId: "demo-meal-01",
  },
  {
    id: "demo-cli-02",
    name: "Rui Exemplo",
    initials: "RE",
    email: "rui.exemplo@example.com",
    status: "ativo",
    goal: "Retomar a rotina de treino",
    startedOn: "2026-08-18",
    activePlanId: "demo-plan-01",
    mealPlanId: null,
  },
  {
    id: "demo-cli-03",
    name: "Carla Teste",
    initials: "CT",
    email: "carla.teste@example.com",
    status: "pausa",
    goal: "Melhorar a técnica nos exercícios base",
    startedOn: "2026-06-03",
    activePlanId: "demo-plan-02",
    mealPlanId: null,
  },
  {
    id: "demo-cli-04",
    name: "Pedro Fictício",
    initials: "PF",
    email: "pedro.ficticio@example.com",
    status: "ativo",
    goal: "Hipertrofia — tronco superior",
    startedOn: "2026-10-06",
    activePlanId: "demo-plan-02",
    mealPlanId: "demo-meal-01",
  },
  {
    id: "demo-cli-05",
    name: "Sofia Amostra",
    initials: "SA",
    email: "sofia.amostra@example.com",
    status: "pendente",
    goal: "A definir na conversa inicial",
    startedOn: "2026-10-19",
    activePlanId: null,
    mealPlanId: null,
  },
];

export const demoProfile: Profile = {
  clientId: "demo-cli-01",
  displayName: "Ana Demo",
  email: "ana.demo@example.com",
  birthYear: null,
  heightCm: null,
  trainingDaysPerWeek: 4,
  preferredTime: "tarde",
  notifications: { sessions: true, newContent: false },
};

export const demoActivity: ActivityItem[] = [
  { id: "act-1", clientId: "demo-cli-01", text: "concluiu o treino B — Pernas", at: "2026-10-19T19:12" },
  { id: "act-2", clientId: "demo-cli-05", text: "pedido de contacto inicial", at: "2026-10-19T11:40" },
  { id: "act-3", clientId: "demo-cli-04", text: "viu o vídeo “Remada com barra — execução”", at: "2026-10-18T21:05" },
  { id: "act-4", clientId: "demo-cli-02", text: "remarcou a sessão de quinta-feira", at: "2026-10-18T09:30" },
  { id: "act-5", clientId: "demo-cli-03", text: "plano colocado em pausa", at: "2026-10-16T17:00" },
];

export function getDemoClient(id: string) {
  return demoClients.find((c) => c.id === id);
}
