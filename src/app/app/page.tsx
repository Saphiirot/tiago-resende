import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, LineChart, Utensils } from "lucide-react";
import {
  DEMO_CURRENT_CLIENT_ID,
  DEMO_TODAY,
  demoProfile,
  demoSessions,
  demoVideos,
  eventsForClient,
  getDemoClient,
  getDemoPlan,
  getDemoSession,
} from "@/data/demo";
import { formatLongDate, formatShortDate, formatTime, parseLocal, relativeDay } from "@/lib/format";
import { DemoBadge } from "@/components/ui/demo";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VideoCard } from "@/components/video/video-card";
import { eventKindMeta } from "@/components/calendar/calendar-meta";
import { EventMarker } from "@/components/calendar/event-marker";
import { cn } from "@/lib/cn";

export const metadata = { title: "Início" };

export default function ClientDashboard() {
  const client = getDemoClient(DEMO_CURRENT_CLIENT_ID)!;
  const plan = getDemoPlan(client.activePlanId);
  const events = eventsForClient(client.id);
  const upcoming = events.filter((e) => e.start.slice(0, 10) >= DEMO_TODAY).sort((a, b) => a.start.localeCompare(b.start));
  const nextWorkout = upcoming.find((e) => e.kind === "treino" && e.workoutSessionId);
  const nextWorkoutSession = nextWorkout?.workoutSessionId ? getDemoSession(nextWorkout.workoutSessionId) : undefined;

  const nextVideoIds = new Set(nextWorkoutSession?.exercises.map((e) => e.videoId).filter(Boolean));
  const featuredVideos = nextVideoIds.size ? demoVideos.filter((v) => nextVideoIds.has(v.id)) : demoVideos.slice(0, 3);

  const planWeek = plan
    ? Math.min(4, Math.floor((parseLocal(DEMO_TODAY).getTime() - parseLocal(plan.startsOn).getTime()) / (7 * 86400000)) + 1)
    : null;

  return (
    <div className="space-y-10 lg:space-y-14">
      {/* 1 — Saudação */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow flex flex-wrap items-center gap-2">
            {formatLongDate(DEMO_TODAY)} <DemoBadge />
          </p>
          <h1 className="display mt-3 text-d1 text-bone">Olá, {demoProfile.displayName.split(" ")[0]}.</h1>
        </div>
        <p className="editorial text-2xl text-bone-dim sm:text-right">Mais um dia de trabalho.</p>
      </header>

      {/* 2 — O que vem a seguir: o próximo treino é a ação principal */}
      <section aria-labelledby="a-seguir" className="grid grid-cols-1 overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink-2 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        <h2 id="a-seguir" className="sr-only">A seguir</h2>

        {nextWorkout && nextWorkoutSession ? (
          <div className="relative overflow-hidden p-6 sm:p-8 lg:p-10">
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(80%_100%_at_0%_0%,rgba(159,195,230,0.16),transparent_60%)]" />
            <div className="relative flex h-full flex-col">
              <p className="flex items-start gap-2 text-sm text-bronze-bright">
                <EventMarker kind="treino" className="mt-[0.3rem] border-bronze" />
                <span>
                  Próximo treino · {relativeDay(nextWorkout.start, DEMO_TODAY)}, {formatShortDate(nextWorkout.start)} ·{" "}
                  <span className="font-mono">{formatTime(nextWorkout.start)}</span>
                </span>
              </p>
              <div className="mt-6 flex items-end gap-5">
                <span aria-hidden className="display text-[clamp(5rem,9vw,7.5rem)] leading-[0.75] text-bronze">
                  {nextWorkoutSession.code}
                </span>
                <p className="display text-[clamp(2.5rem,5vw,4.25rem)] text-bone">
                  <span className="sr-only">Treino {nextWorkoutSession.code}: </span>
                  {nextWorkoutSession.name}
                </p>
              </div>
              <p className="mt-4 text-sm text-bone-dim">
                {nextWorkoutSession.exercises.length} exercícios · ~{nextWorkoutSession.estimatedMinutes} min ·{" "}
                {nextWorkoutSession.focus.join(", ")}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 lg:mt-auto lg:pt-10">
                <ButtonLink
                  href={`/app/treinos/${nextWorkoutSession.id}`}
                  size="lg"
                  iconRight={<ArrowRight aria-hidden className="size-4 transition-transform group-hover/btn:translate-x-0.5" />}
                >
                  Abrir treino
                </ButtonLink>
                <Link href="/app/calendario" className="inline-flex items-center gap-2 text-sm text-bone-dim underline decoration-line-strong underline-offset-8 hover:text-bone">
                  <CalendarDays aria-hidden className="size-4" />
                  Ver calendário
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="text-bone-dim">Sem treinos agendados.</p>
            <ButtonLink href="/app/treinos" variant="secondary" className="mt-6">
              Ver treinos
            </ButtonLink>
          </div>
        )}

        <div className="border-t border-line p-6 sm:p-8 lg:border-l lg:border-t-0">
          <p className="eyebrow">Próximos dias</p>
          <ol className="relative mt-6 space-y-6 before:absolute before:bottom-2 before:left-[0.3125rem] before:top-2 before:w-px before:bg-line">
            {upcoming.slice(0, 4).map((e) => (
              <li key={e.id} className="relative flex gap-4">
                <span className="relative z-10 mt-1 grid size-3 shrink-0 place-items-center bg-ink-2">
                  <EventMarker kind={e.kind} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-mute">
                    {relativeDay(e.start, DEMO_TODAY)} · <span className="font-mono">{formatTime(e.start)}</span> ·{" "}
                    {eventKindMeta[e.kind].label}
                  </p>
                  {e.workoutSessionId ? (
                    <Link href={`/app/treinos/${e.workoutSessionId}`} className="mt-0.5 block truncate text-bone hover:text-bronze-bright">
                      {e.title}
                    </Link>
                  ) : (
                    <p className="mt-0.5 truncate text-bone">
                      {e.kind === "sessao" ? "Sessão com o Tiago" : e.title}
                      {e.kind === "sessao" && e.location ? <span className="text-mute"> · {e.location}</span> : null}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3 — Plano em curso */}
      <section aria-labelledby="plano" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Plano de treino</p>
              <h2 id="plano" className="mt-1.5 text-lg font-semibold text-bone">
                {plan?.name ?? "Sem plano ativo"}
              </h2>
            </div>
            {plan && planWeek ? (
              <div className="flex items-center gap-3">
                <Badge tone="outline">{plan.phase}</Badge>
                <span className="text-sm text-bone-dim">
                  Semana <span className="font-mono text-bone">{planWeek}</span> de 4
                </span>
              </div>
            ) : null}
          </div>
          {plan && planWeek ? (
            <>
              <div className="mb-5 grid grid-cols-4 gap-1.5" aria-hidden>
                {[1, 2, 3, 4].map((w) => (
                  <span key={w} className={cn("h-1 rounded-full", w < planWeek ? "bg-bone-dim" : w === planWeek ? "bg-bronze" : "bg-ink-4")} />
                ))}
              </div>
              <ul className="grid grid-cols-2 gap-3">
                {plan.sessionIds.map((id) => {
                  const s = demoSessions.find((x) => x.id === id)!;
                  const isNext = s.id === nextWorkoutSession?.id;
                  return (
                    <li key={id}>
                      <Link
                        href={`/app/treinos/${s.id}`}
                        className={cn(
                          "group flex h-full flex-col gap-5 rounded-[var(--radius-card)] border p-4 transition-colors sm:flex-row sm:items-center sm:p-5",
                          isNext ? "border-bronze/50 bg-bronze/[0.06]" : "border-line bg-ink-2 hover:border-line-strong hover:bg-ink-3",
                        )}
                      >
                        <span className={cn("display text-5xl leading-none", isNext ? "text-bronze" : "text-bone/70")}>{s.code}</span>
                        <span className="min-w-0 flex-1">
                          {isNext ? <span className="mb-1 block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-bronze-bright">Próximo</span> : null}
                          <span className="block font-medium text-bone">{s.name}</span>
                          <span className="mt-0.5 block text-xs text-mute">
                            {s.exercises.length} exercícios · ~{s.estimatedMinutes} min
                          </span>
                        </span>
                        <ArrowRight aria-hidden className="hidden size-4 text-mute transition-transform group-hover:translate-x-0.5 group-hover:text-bone sm:block" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:pt-[3.75rem]">
          <Link href="/app/plano-alimentar" className="group flex flex-col rounded-[var(--radius-card)] border border-line bg-ink-2 p-5 transition-colors hover:border-line-strong hover:bg-ink-3">
            <span className="flex items-center justify-between">
              <Utensils aria-hidden className="size-5 text-bone-dim" />
              <ArrowUpRight aria-hidden className="size-4 text-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone" />
            </span>
            <span className="mt-6 font-medium text-bone">Plano alimentar</span>
            <span className="mt-1 text-sm text-bone-dim">Estrutura por dia e refeição — em preparação.</span>
          </Link>
          <div className="flex flex-col rounded-[var(--radius-card)] border border-dashed border-line-strong p-5">
            <span className="flex items-center justify-between">
              <LineChart aria-hidden className="size-5 text-mute" />
              <DemoBadge label="Sem dados" />
            </span>
            <span className="mt-6 font-medium text-bone">Registos de progresso</span>
            <span className="mt-1 text-sm text-bone-dim">Nesta demonstração não é apresentado nenhum resultado ou medida.</span>
          </div>
        </div>
      </section>

      {/* 4 — Vídeos */}
      <section aria-labelledby="videos-destaque">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Biblioteca</p>
            <h2 id="videos-destaque" className="mt-1.5 text-lg font-semibold text-bone">
              {nextVideoIds.size ? "Para o próximo treino" : "Em destaque"}
            </h2>
          </div>
          <Link href="/app/videos" className="inline-flex items-center gap-1.5 text-sm text-bronze-bright hover:underline">
            Ver biblioteca <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredVideos.slice(0, 3).map((v) => (
            <li key={v.id}>
              <VideoCard video={v} href={`/app/videos/${v.id}`} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
