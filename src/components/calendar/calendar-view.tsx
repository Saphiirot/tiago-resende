"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { CalendarEvent, CalendarEventKind } from "@/lib/types";
import { formatLongDate, formatMonthYear, formatTime, parseLocal, toISODate } from "@/lib/format";
import { cn } from "@/lib/cn";
import { eventKindMeta, shortEventLabel } from "./calendar-meta";
import { EventMarker } from "./event-marker";

const WEEKDAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const KIND_ORDER: CalendarEventKind[] = ["sessao", "outro", "treino"];
const CHIP_TYPE: Record<CalendarEventKind, string> = { sessao: "sessão", treino: "autónomo", outro: "outro" };

type Mode = "cliente" | "treinador";

function startOfWeek(d: Date) {
  const r = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  r.setDate(r.getDate() - ((r.getDay() + 6) % 7));
  return r;
}
function addDays(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}
/** "Rui Exemplo" → "Rui E." */
function shortName(name: string) {
  const [first, ...rest] = name.split(" ");
  return rest.length ? `${first} ${rest[rest.length - 1][0]}.` : first;
}

/**
 * Texto apresentado para um evento, conforme quem está a ver.
 * O nome de cliente só aparece quando o evento tem `clientId` (nunca é inferido).
 */
function describe(e: CalendarEvent, mode: Mode, names: Record<string, string>) {
  const client = e.clientId ? names[e.clientId] : undefined;
  if (mode === "cliente") {
    if (e.kind === "sessao") return { who: null, what: "Sessão com o Tiago", chip: "Sessão" };
    return { who: null, what: e.title, chip: shortEventLabel(e) };
  }
  if (e.kind === "sessao") {
    const who = client ?? e.title;
    return { who, what: "Sessão acompanhada", chip: shortName(who) };
  }
  if (e.kind === "treino") {
    return { who: client ?? null, what: `Treino autónomo · ${e.title.split(" · ")[0]}`, chip: client ? shortName(client) : shortEventLabel(e) };
  }
  const what = client ? e.title.replace(` · ${client}`, "") : e.title;
  return { who: client ?? null, what, chip: what.split(" · ")[0] };
}

/**
 * Calendário de demonstração com vistas mensal e semanal.
 * Sem sincronização, persistência, reservas ou notificações.
 */
export function CalendarView({
  events,
  today,
  mode = "cliente",
  clientNames = {},
  workoutHref,
  initialHidden = [],
}: {
  events: CalendarEvent[];
  /** Data de referência fixa (AAAA-MM-DD). */
  today: string;
  /** Tipos ocultos ao abrir (ex.: treinos autónomos no calendário geral do treinador). */
  initialHidden?: CalendarEventKind[];
  /** "treinador" mostra o cliente de cada evento e filtros por tipo. */
  mode?: Mode;
  /** id → nome (dados demonstrativos). */
  clientNames?: Record<string, string>;
  /** Base da ligação "Abrir treino" (ex.: "/app/treinos"). */
  workoutHref?: string;
}) {
  const uid = useId();
  const agendaId = `${uid}-agenda`;
  const [view, setView] = useState<"mes" | "semana">("mes");
  const [cursor, setCursor] = useState(() => parseLocal(today));
  const [hidden, setHidden] = useState<Set<CalendarEventKind>>(() => new Set(initialHidden));

  const visible = useMemo(() => events.filter((e) => !hidden.has(e.kind)), [events, hidden]);
  const counts = useMemo(
    () => Object.fromEntries(KIND_ORDER.map((k) => [k, events.filter((e) => e.kind === k).length])) as Record<CalendarEventKind, number>,
    [events],
  );

  // Dia selecionado por defeito: o próximo dia com eventos visíveis (ou hoje).
  const [selected, setSelected] = useState(
    () => visible.map((e) => e.start.slice(0, 10)).filter((d) => d >= today).sort()[0] ?? today,
  );

  const byDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const e of [...visible].sort((a, b) => a.start.localeCompare(b.start))) {
      const key = e.start.slice(0, 10);
      map.set(key, [...(map.get(key) ?? []), e]);
    }
    return map;
  }, [visible]);

  const days = useMemo(() => {
    if (view === "semana") {
      const s = startOfWeek(cursor);
      return Array.from({ length: 7 }, (_, i) => addDays(s, i));
    }
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const s = startOfWeek(first);
    const last = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0);
    const total = Math.ceil(((last.getTime() - s.getTime()) / 86400000 + 1) / 7) * 7;
    return Array.from({ length: total }, (_, i) => addDays(s, i));
  }, [cursor, view]);

  function shift(dir: -1 | 1) {
    setCursor((c) => (view === "mes" ? new Date(c.getFullYear(), c.getMonth() + dir, 1) : addDays(c, 7 * dir)));
  }

  function toggle(kind: CalendarEventKind) {
    setHidden((h) => {
      const n = new Set(h);
      if (n.has(kind)) n.delete(kind);
      else n.add(kind);
      return n;
    });
  }

  const title =
    view === "mes" ? formatMonthYear(cursor) : `${days[0].getDate()} – ${days[6].getDate()} ${formatMonthYear(days[6])}`;
  const selectedEvents = byDay.get(selected) ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => shift(-1)} className="grid size-10 place-items-center rounded-full border border-line-strong text-bone-dim hover:text-bone" aria-label={view === "mes" ? "Mês anterior" : "Semana anterior"}>
            <ChevronLeft aria-hidden className="size-4" />
          </button>
          <button type="button" onClick={() => shift(1)} className="grid size-10 place-items-center rounded-full border border-line-strong text-bone-dim hover:text-bone" aria-label={view === "mes" ? "Mês seguinte" : "Semana seguinte"}>
            <ChevronRight aria-hidden className="size-4" />
          </button>
          <h2 aria-live="polite" className="display ml-2 text-3xl text-bone sm:text-4xl">
            {title}
          </h2>
        </div>
        <div role="group" aria-label="Vista do calendário" className="flex rounded-full border border-line-strong p-1">
          {(["mes", "semana"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={cn("rounded-full px-4 py-1.5 text-sm transition-colors", view === v ? "bg-bone text-ink" : "text-bone-dim hover:text-bone")}
            >
              {v === "mes" ? "Mês" : "Semana"}
            </button>
          ))}
        </div>
      </div>

      {mode === "treinador" ? (
        <div role="group" aria-label="Mostrar por tipo de atividade" className="flex flex-wrap gap-2">
          {KIND_ORDER.map((k) => {
            const on = !hidden.has(k);
            return (
              <button
                key={k}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(k)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs transition-colors",
                  on ? "border-line-strong bg-ink-3 text-bone" : "border-dashed border-line-strong text-mute hover:text-bone-dim",
                )}
              >
                <EventMarker kind={k} />
                {k === "sessao" ? "Sessões acompanhadas" : k === "treino" ? "Treinos autónomos dos clientes" : "Outros eventos"}
                <span className="font-mono text-mute">{counts[k]}</span>
                <span className="sr-only">{on ? "(visível)" : "(oculto)"}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <Legend />
      )}

      {view === "mes" ? (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink-2">
            <div className="grid grid-cols-7 border-b border-line">
              {WEEKDAYS.map((w) => (
                <div key={w} className="eyebrow py-3 text-center text-[0.625rem]">
                  {w}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {days.map((d) => {
                const iso = toISODate(d);
                const list = byDay.get(iso) ?? [];
                const inMonth = d.getMonth() === cursor.getMonth();
                const isToday = iso === today;
                const isSel = iso === selected;
                return (
                  <button
                    key={iso}
                    type="button"
                    onClick={() => setSelected(iso)}
                    aria-pressed={isSel}
                    aria-controls={agendaId}
                    aria-label={`${formatLongDate(iso)}${isToday ? " (hoje)" : ""}${list.length ? `, ${list.length} evento${list.length > 1 ? "s" : ""}` : ", sem eventos"}`}
                    className={cn(
                      "relative flex min-h-[4.25rem] flex-col items-stretch gap-1 border-b border-r border-line/70 p-1.5 text-left transition-colors sm:min-h-[7.25rem] sm:p-2 [&:nth-child(7n)]:border-r-0",
                      inMonth ? "bg-transparent" : "bg-ink/50 text-mute",
                      isSel ? "z-10 bg-ink-4 shadow-[inset_0_0_0_2px_var(--color-bronze)]" : "hover:bg-ink-3",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-7 place-items-center self-start rounded-full font-mono text-xs",
                        isToday ? "bg-bone text-ink" : isSel ? "font-semibold text-bone" : inMonth ? "text-bone-dim" : "text-mute/60",
                      )}
                    >
                      {d.getDate()}
                    </span>
                    {/* Mobile: marcadores por forma (o detalhe vai para a agenda abaixo) */}
                    <span className="flex flex-wrap items-center gap-1 px-1 sm:hidden">
                      {list.slice(0, 3).map((e) => (
                        <EventMarker key={e.id} kind={e.kind} className="size-2" />
                      ))}
                      {list.length > 3 ? <span className="font-mono text-[0.5625rem] text-mute">+{list.length - 3}</span> : null}
                    </span>
                    {/* ≥640 px: etiquetas com nome/atividade e hora */}
                    <span className="hidden flex-col gap-1 sm:flex">
                      {list.slice(0, 2).map((e) => {
                        const info = describe(e, mode, clientNames);
                        return (
                          <span
                            key={e.id}
                            title={`${formatTime(e.start)} · ${info.who ? `${info.who} — ` : ""}${info.what}`}
                            className={cn("flex min-w-0 flex-col rounded-md px-2 py-1 text-xs leading-tight", eventKindMeta[e.kind].chip)}
                          >
                            <span className="flex min-w-0 items-center gap-1.5 font-medium">
                              {mode === "treinador" ? (
                                <EventMarker kind={e.kind} className={cn("size-2", e.kind === "sessao" && "bg-ink", e.kind === "treino" && "border-bone")} />
                              ) : null}
                              <span className="truncate">{info.chip}</span>
                            </span>
                            <span className="truncate font-mono text-[0.625rem] opacity-80">
                              {formatTime(e.start)}
                              <span className="sr-only"> · {CHIP_TYPE[e.kind]}</span>
                            </span>
                          </span>
                        );
                      })}
                      {list.length > 2 ? <span className="px-1.5 text-[0.6875rem] text-mute">+{list.length - 2}</span> : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <section id={agendaId} aria-live="polite" aria-label="Agenda do dia selecionado" className="rounded-[var(--radius-card)] border border-line bg-ink-2 p-5">
            <p className="eyebrow">Dia selecionado</p>
            <p className="mt-1.5 flex items-baseline justify-between gap-3">
              <span className="font-medium text-bone">{formatLongDate(selected)}</span>
              <span className="shrink-0 text-xs text-mute">
                {selectedEvents.length ? `${selectedEvents.length} evento${selectedEvents.length > 1 ? "s" : ""}` : ""}
              </span>
            </p>
            <EventList events={selectedEvents} mode={mode} clientNames={clientNames} workoutHref={workoutHref} className="mt-5" />
          </section>
        </div>
      ) : (
        <ol className="grid grid-cols-1 gap-3 md:grid-cols-7 md:gap-2">
          {days.map((d) => {
            const iso = toISODate(d);
            const list = byDay.get(iso) ?? [];
            const isToday = iso === today;
            return (
              <li key={iso} className={cn("rounded-[var(--radius-card)] border bg-ink-2 p-4 md:min-h-72 md:p-3", isToday ? "border-bone/60" : "border-line")}>
                <p className="flex items-baseline gap-2 md:flex-col md:gap-0">
                  <span className="eyebrow text-[0.625rem]">{WEEKDAYS[(d.getDay() + 6) % 7]}</span>
                  <span className={cn("display text-3xl", isToday ? "text-bone" : "text-bone-dim")}>{d.getDate()}</span>
                </p>
                {list.length ? (
                  <ul className="mt-3 space-y-2">
                    {list.map((e) => {
                      const info = describe(e, mode, clientNames);
                      return (
                        <li key={e.id} className={cn("rounded-lg px-2.5 py-2 text-xs", eventKindMeta[e.kind].chip)}>
                          <span className="block font-mono opacity-80">
                            {formatTime(e.start)}
                            {e.end ? `–${formatTime(e.end)}` : ""}
                          </span>
                          <span className="mt-0.5 block font-medium leading-snug">{info.who ?? info.what}</span>
                          {info.who ? <span className="block opacity-80">{info.what}</span> : null}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="mt-3 text-xs text-mute">Sem eventos</p>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

export function Legend({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-5 gap-y-2 text-xs text-bone-dim", className)} aria-label="Legenda">
      {KIND_ORDER.map((k) => (
        <li key={k} className="flex items-center gap-2">
          <EventMarker kind={k} />
          {eventKindMeta[k].label}
        </li>
      ))}
    </ul>
  );
}

/** Agenda de um dia: hora, quem (treinador) / o quê, tipo e ação quando existe treino associado. */
export function EventList({
  events,
  mode = "cliente",
  clientNames = {},
  workoutHref,
  className,
}: {
  events: CalendarEvent[];
  mode?: Mode;
  clientNames?: Record<string, string>;
  workoutHref?: string;
  className?: string;
}) {
  if (!events.length) return <p className={cn("text-sm text-mute", className)}>Sem eventos neste dia.</p>;
  const ordered = mode === "treinador" ? [...events].sort((a, b) => KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind) || a.start.localeCompare(b.start)) : events;
  return (
    <ul className={cn("space-y-2.5", className)}>
      {ordered.map((e) => {
        const info = describe(e, mode, clientNames);
        return (
          <li key={e.id} className="flex gap-4 rounded-xl bg-ink-3 p-3.5">
            <span className="w-12 shrink-0 font-mono text-sm text-bone">
              {formatTime(e.start)}
              {e.end ? <span className="block text-[0.6875rem] text-mute">até {formatTime(e.end)}</span> : null}
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 text-sm font-medium text-bone">
                <EventMarker kind={e.kind} />
                <span className="truncate">{info.who ?? info.what}</span>
              </p>
              <p className="mt-1 text-xs text-bone-dim">
                {info.who ? info.what : eventKindMeta[e.kind].label}
                {e.location ? ` · ${e.location}` : ""}
              </p>
              {workoutHref && e.workoutSessionId ? (
                <Link href={`${workoutHref}/${e.workoutSessionId}`} className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-bronze-bright hover:underline">
                  Abrir treino <ArrowRight aria-hidden className="size-3.5" />
                </Link>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
