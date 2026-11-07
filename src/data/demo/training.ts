// ⚠️ DADOS FICTÍCIOS — prescrições de exemplo para desenhar a interface. Não são recomendações de treino.
import type { TrainingPlan, WorkoutSession } from "@/lib/types";

export const demoPlans: TrainingPlan[] = [
  {
    id: "demo-plan-01",
    name: "Bloco 1 · Base",
    phase: "Adaptação",
    startsOn: "2026-10-06",
    endsOn: "2026-11-02",
    sessionIds: ["demo-ses-a", "demo-ses-b", "demo-ses-c", "demo-ses-d"],
    assignedClientIds: ["demo-cli-01", "demo-cli-02"],
  },
  {
    id: "demo-plan-02",
    name: "Bloco 2 · Volume",
    phase: "Acumulação",
    startsOn: "2026-11-03",
    endsOn: "2026-12-07",
    sessionIds: ["demo-ses-a", "demo-ses-c"],
    assignedClientIds: ["demo-cli-03", "demo-cli-04"],
  },
];

export const demoSessions: WorkoutSession[] = [
  {
    id: "demo-ses-a",
    planId: "demo-plan-01",
    code: "A",
    name: "Costas & Bíceps",
    focus: ["Costas", "Braços"],
    estimatedMinutes: 60,
    coachNotes:
      "Exemplo de nota do treinador: controla a fase excêntrica e mantém a escápula estável. Regista as cargas no fim de cada exercício.",
    exercises: [
      { id: "ex-a1", name: "Puxada à frente", muscleGroup: "Costas", sets: 4, reps: "10–12", restSeconds: 90, tempo: "3-1-1", videoId: "demo-vid-02" },
      { id: "ex-a2", name: "Remada com barra", muscleGroup: "Costas", sets: 4, reps: "8–10", restSeconds: 120, videoId: "demo-vid-01" },
      { id: "ex-a3", name: "Remada unilateral com haltere", muscleGroup: "Costas", sets: 3, reps: "10 / lado", restSeconds: 75 },
      { id: "ex-a4", name: "Pullover na polia", muscleGroup: "Costas", sets: 3, reps: "12–15", restSeconds: 60, note: "Exemplo: amplitude completa, sem balanço." },
      { id: "ex-a5", name: "Curl com barra EZ", muscleGroup: "Braços", sets: 3, reps: "10", restSeconds: 60 },
      { id: "ex-a6", name: "Curl martelo", muscleGroup: "Braços", sets: 2, reps: "12", restSeconds: 60 },
    ],
  },
  {
    id: "demo-ses-b",
    planId: "demo-plan-01",
    code: "B",
    name: "Pernas",
    focus: ["Pernas", "Glúteos"],
    estimatedMinutes: 70,
    coachNotes:
      "Exemplo de nota do treinador: aquece bem as ancas antes do agachamento. Se sentires desconforto articular, para e avisa.",
    exercises: [
      { id: "ex-b1", name: "Agachamento livre", muscleGroup: "Pernas", sets: 4, reps: "6–8", restSeconds: 150, tempo: "3-0-1", videoId: "demo-vid-03" },
      { id: "ex-b2", name: "Prensa inclinada", muscleGroup: "Pernas", sets: 3, reps: "10–12", restSeconds: 120 },
      { id: "ex-b3", name: "Peso morto romeno", muscleGroup: "Glúteos", sets: 3, reps: "8–10", restSeconds: 120, videoId: "demo-vid-04" },
      { id: "ex-b4", name: "Extensão de joelhos", muscleGroup: "Pernas", sets: 3, reps: "12–15", restSeconds: 60 },
      { id: "ex-b5", name: "Flexão de joelhos sentado", muscleGroup: "Pernas", sets: 3, reps: "12", restSeconds: 60 },
      { id: "ex-b6", name: "Gémeos em pé", muscleGroup: "Pernas", sets: 4, reps: "15", restSeconds: 45 },
    ],
  },
  {
    id: "demo-ses-c",
    planId: "demo-plan-01",
    code: "C",
    name: "Peito & Ombros",
    focus: ["Peito", "Ombros"],
    estimatedMinutes: 55,
    coachNotes: "Exemplo de nota do treinador: prioriza a técnica no supino antes de aumentar a carga.",
    exercises: [
      { id: "ex-c1", name: "Supino inclinado com halteres", muscleGroup: "Peito", sets: 4, reps: "8–10", restSeconds: 120, videoId: "demo-vid-05" },
      { id: "ex-c2", name: "Aberturas na polia", muscleGroup: "Peito", sets: 3, reps: "12–15", restSeconds: 60 },
      { id: "ex-c3", name: "Press militar sentado", muscleGroup: "Ombros", sets: 3, reps: "8–10", restSeconds: 90 },
      { id: "ex-c4", name: "Elevações laterais", muscleGroup: "Ombros", sets: 4, reps: "12–15", restSeconds: 45 },
      { id: "ex-c5", name: "Face pull", muscleGroup: "Ombros", sets: 3, reps: "15", restSeconds: 45 },
    ],
  },
  {
    id: "demo-ses-d",
    planId: "demo-plan-01",
    code: "D",
    name: "Corpo inteiro & Core",
    focus: ["Corpo inteiro", "Core"],
    estimatedMinutes: 45,
    coachNotes: "Exemplo de nota do treinador: sessão mais leve — foco em qualidade de movimento.",
    exercises: [
      { id: "ex-d1", name: "Hip thrust", muscleGroup: "Glúteos", sets: 3, reps: "10", restSeconds: 90 },
      { id: "ex-d2", name: "Flexões", muscleGroup: "Peito", sets: 3, reps: "máx. técnico", restSeconds: 60 },
      { id: "ex-d3", name: "Prancha", muscleGroup: "Core", sets: 3, reps: "40 s", restSeconds: 45, videoId: "demo-vid-06" },
      { id: "ex-d4", name: "Dead bug", muscleGroup: "Core", sets: 3, reps: "10 / lado", restSeconds: 45 },
    ],
  },
];

export function getDemoSession(id: string) {
  return demoSessions.find((s) => s.id === id);
}

export function getDemoPlan(id: string | null) {
  return id ? demoPlans.find((p) => p.id === id) : undefined;
}
