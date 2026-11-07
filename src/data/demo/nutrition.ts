// ⚠️ DADOS FICTÍCIOS — estrutura de exemplo. NÃO é um plano alimentar nem uma recomendação individual.
// Sem quantidades, calorias ou indicações terapêuticas de propósito.
import type { MealPlan } from "@/lib/types";

export const demoMealPlans: MealPlan[] = [
  {
    id: "demo-meal-01",
    name: "Estrutura de exemplo · Semana tipo",
    responsibleProfessional: null,
    assignedClientIds: ["demo-cli-01", "demo-cli-04"],
    days: [
      {
        weekday: "seg",
        label: "Segunda",
        meals: [
          { slot: "Pequeno-almoço", time: "08:00", items: ["Exemplo de refeição 1", "Fruta da época"] },
          { slot: "Almoço", time: "13:00", items: ["Fonte de proteína", "Hidratos de carbono", "Legumes"] },
          { slot: "Lanche", time: "16:30", items: ["Exemplo de lanche"] , note: "Espaço para nota do responsável (exemplo fictício)." },
          { slot: "Jantar", time: "20:30", items: ["Fonte de proteína", "Legumes", "Azeite"] },
        ],
      },
      {
        weekday: "ter",
        label: "Terça",
        meals: [
          { slot: "Pequeno-almoço", time: "08:00", items: ["Exemplo de refeição 2"] },
          { slot: "Almoço", time: "13:00", items: ["Fonte de proteína", "Leguminosas", "Salada"] },
          { slot: "Lanche", time: "17:00", items: ["Exemplo de lanche pré-treino"] },
          { slot: "Jantar", time: "21:00", items: ["Fonte de proteína", "Hidratos de carbono", "Legumes"] },
        ],
      },
      {
        weekday: "qua",
        label: "Quarta",
        meals: [
          { slot: "Pequeno-almoço", time: "08:00", items: ["Exemplo de refeição 1"] },
          { slot: "Almoço", time: "13:00", items: ["Fonte de proteína", "Hidratos de carbono", "Legumes"] },
          { slot: "Jantar", time: "20:30", items: ["Sopa de legumes", "Fonte de proteína"] },
        ],
      },
      { weekday: "qui", label: "Quinta", meals: [] },
      { weekday: "sex", label: "Sexta", meals: [] },
      { weekday: "sáb", label: "Sábado", meals: [] },
      { weekday: "dom", label: "Domingo", meals: [] },
    ],
  },
];

export function getDemoMealPlan(id: string | null) {
  return id ? demoMealPlans.find((p) => p.id === id) : undefined;
}
