import type { ISODate, ISODateTime } from "./types";

/** Interpreta "AAAA-MM-DD" ou "AAAA-MM-DDTHH:mm" como hora local (evita desvios de UTC). */
export function parseLocal(value: ISODate | ISODateTime) {
  const [d, t = "00:00"] = value.split("T");
  const [y, m, day] = d.split("-").map(Number);
  const [hh, mm] = t.split(":").map(Number);
  return new Date(y, m - 1, day, hh, mm);
}

export function toISODate(date: Date): ISODate {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`;
}

const fmt = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("pt-PT", opts);
const upperFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const formatDay = (v: ISODate | ISODateTime) => fmt({ day: "numeric", month: "short" }).format(parseLocal(v));
export const formatWeekday = (v: ISODate | ISODateTime) => fmt({ weekday: "long" }).format(parseLocal(v));
export const formatLongDate = (v: ISODate | ISODateTime) =>
  upperFirst(fmt({ weekday: "long", day: "numeric", month: "long" }).format(parseLocal(v)));
export const formatMonthYear = (d: Date) => upperFirst(fmt({ month: "long", year: "numeric" }).format(d));
export const formatTime = (v: ISODateTime) => v.split("T")[1] ?? "";

export function formatDuration(seconds: number | null) {
  if (seconds == null) return null;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function formatRest(seconds: number) {
  return seconds >= 60 && seconds % 60 === 0 ? `${seconds / 60} min` : `${seconds} s`;
}

/** "Hoje", "Amanhã" ou o dia da semana, relativo a uma data de referência. */
export function relativeDay(value: ISODate | ISODateTime, today: ISODate) {
  const a = parseLocal(today);
  const b = parseLocal(value.slice(0, 10));
  const diff = Math.round((b.getTime() - a.getTime()) / 86400000);
  if (diff === 0) return "Hoje";
  if (diff === 1) return "Amanhã";
  if (diff === -1) return "Ontem";
  return upperFirst(fmt({ weekday: "long" }).format(b));
}

export const formatShortDate = (v: ISODate | ISODateTime) =>
  fmt({ day: "numeric", month: "long" }).format(parseLocal(v));
