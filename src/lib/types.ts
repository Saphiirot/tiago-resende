/**
 * Modelos de domínio — apenas os campos necessários para a interface da
 * Fase 01. Quando existir base de dados, estes tipos devem ser derivados do
 * esquema (e validados no servidor), não o contrário.
 */

export type ISODate = string; // "2026-10-20"
export type ISODateTime = string; // "2026-10-20T18:30"

export type ClientStatus = "ativo" | "pausa" | "pendente";

export interface Client {
  id: string;
  name: string;
  initials: string;
  email: string;
  status: ClientStatus;
  /** Objetivo declarado pelo cliente, em texto livre. */
  goal: string;
  startedOn: ISODate;
  activePlanId: string | null;
  mealPlanId: string | null;
}

export interface Profile {
  clientId: string;
  displayName: string;
  email: string;
  birthYear: number | null;
  heightCm: number | null;
  trainingDaysPerWeek: number;
  preferredTime: "manhã" | "tarde" | "noite";
  notifications: { sessions: boolean; newContent: boolean };
}

export type MuscleGroup =
  | "Costas"
  | "Peito"
  | "Pernas"
  | "Ombros"
  | "Braços"
  | "Core"
  | "Glúteos"
  | "Corpo inteiro";

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  sets: number;
  /** Texto para permitir intervalos ("8–10") ou tempo ("40 s"). */
  reps: string;
  restSeconds: number;
  tempo?: string;
  videoId?: string;
  note?: string;
}

export interface WorkoutSession {
  id: string;
  planId: string;
  /** Ordem dentro do plano (A, B, C…). */
  code: string;
  name: string;
  focus: MuscleGroup[];
  estimatedMinutes: number;
  exercises: Exercise[];
  coachNotes: string;
}

export interface TrainingPlan {
  id: string;
  name: string;
  phase: string;
  startsOn: ISODate;
  endsOn: ISODate;
  sessionIds: string[];
  assignedClientIds: string[];
}

export type MealSlot = "Pequeno-almoço" | "Almoço" | "Lanche" | "Jantar" | "Ceia";

export interface Meal {
  slot: MealSlot;
  time: string;
  items: string[];
  note?: string;
}

export interface MealPlanDay {
  weekday: string;
  label: string;
  meals: Meal[];
}

export interface MealPlan {
  id: string;
  name: string;
  /** Responsável pelo plano (por defeito `site.nutrition.responsible`); âmbito sujeito às qualificações confirmadas. */
  responsibleProfessional: string | null;
  days: MealPlanDay[];
  assignedClientIds: string[];
}

export type VideoCategory = "Execução" | "Mobilidade" | "Aquecimento" | "Bastidores";

export interface Video {
  id: string;
  title: string;
  category: VideoCategory;
  /** Em segundos; `null` quando ainda não é conhecida. */
  durationSeconds: number | null;
  description: string;
  muscleGroup?: MuscleGroup;
  /** Caminho/URL da miniatura; `null` mostra o enquadramento de substituição. */
  thumbnail: string | null;
  visibility: "clientes" | "publico";
}

export type CalendarEventKind = "sessao" | "treino" | "outro";

export interface CalendarEvent {
  id: string;
  kind: CalendarEventKind;
  title: string;
  start: ISODateTime;
  end?: ISODateTime;
  clientId?: string;
  workoutSessionId?: string;
  location?: string;
}

export interface ActivityItem {
  id: string;
  clientId: string;
  text: string;
  at: ISODateTime;
}
