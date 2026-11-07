import Link from "next/link";
import { ArrowRight, ArrowUpRight, Dumbbell, PlayCircle, Utensils } from "lucide-react";
import {
  DEMO_TODAY,
  demoActivity,
  demoClients,
  demoEvents,
  demoMealPlans,
  demoSessions,
  demoVideos,
  getDemoClient,
} from "@/data/demo";
import type { CalendarEvent } from "@/lib/types";
import { formatDay, formatLongDate, formatTime, relativeDay } from "@/lib/format";
import { DemoBadge } from "@/components/ui/demo";
import { Avatar } from "@/components/ui/avatar";
import { eventKindMeta } from "@/components/calendar/calendar-meta";
import { EventMarker } from "@/components/calendar/event-marker";
import { SetupStatusList, getSetupItems } from "@/components/admin/setup-status";
import { cn } from "@/lib/cn";

export const metadata = { title: "Painel" };

/** Quem (cliente associado ao evento, nunca inferido) e o quê (tipo de atividade). */
function whoWhat(e: CalendarEvent) {
  const c = e.clientId ? getDemoClient(e.clientId) : undefined;
  if (!c) return { who: e.title, what: eventKindMeta[e.kind].label };
  const rest = e.title.replace(` · ${c.name}`, "");
  const what = e.kind === "outro" && rest !== c.name ? rest : eventKindMeta[e.kind].label;
  return { who: c.name, what };
}

export default function AdminDashboard() {
  const counts = {
    ativo: demoClients.filter((c) => c.status === "ativo").length,
    pausa: demoClients.filter((c) => c.status === "pausa").length,
    pendente: demoClients.filter((c) => c.status === "pendente").length,
  };
  const agenda = demoEvents.filter((e) => e.kind !== "treino").sort((a, b) => a.start.localeCompare(b.start));
  const today = agenda.filter((e) => e.start.startsWith(DEMO_TODAY));
  const nextDays = agenda.filter((e) => e.start.slice(0, 10) > DEMO_TODAY).slice(0, 5);
  const setup = getSetupItems();
  const setupDone = setup.filter((s) => s.done).length;

  const contents = [
    { href: "/admin/treinos", icon: Dumbbell, label: "Treinos", meta: `${demoSessions.length} sessões de exemplo` },
    { href: "/admin/planos-alimentares", icon: Utensils, label: "Planos alimentares", meta: `${demoMealPlans.length} estrutura de exemplo` },
    { href: "/admin/videos", icon: PlayCircle, label: "Vídeos", meta: `${demoVideos.length} vídeos · sem ficheiro` },
  ];

  return (
    <div className="space-y-10 lg:space-y-12">
      <header className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow flex flex-wrap items-center gap-2">
            {formatLongDate(DEMO_TODAY)} <DemoBadge />
          </p>
          <h1 className="display mt-3 text-d1 text-bone">Painel</h1>
        </div>
        <dl className="flex gap-8 text-sm">
          {[
            ["Ativos", counts.ativo, "text-sage"],
            ["Em pausa", counts.pausa, "text-slate"],
            ["Pendentes", counts.pendente, "text-bronze-bright"],
          ].map(([label, n, c]) => (
            <div key={label as string}>
              <dt className="text-mute">{label}</dt>
              <dd className={cn("display mt-1 text-4xl", c as string)}>{n}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section aria-labelledby="agenda" className="grid grid-cols-1 overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink-2 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="p-6 sm:p-8">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="eyebrow">Agenda</p>
              <h2 id="agenda" className="mt-1.5 text-lg font-semibold text-bone">Hoje</h2>
            </div>
            <Link href="/admin/calendario" className="inline-flex items-center gap-1.5 text-sm text-bone-dim hover:text-bone">
              Calendário <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          {today.length ? (
            <ol className="mt-6 space-y-3">
              {today.map((e) => (
                <li key={e.id} className="flex items-center gap-5 rounded-xl bg-ink-3 p-4">
                  <span className="w-20 shrink-0 font-mono text-lg text-bone">
                    {formatTime(e.start)}
                    {e.end ? <span className="block text-xs text-mute">até {formatTime(e.end)}</span> : null}
                  </span>
                  <EventMarker kind={e.kind} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-base font-medium text-bone">{whoWhat(e).who}</span>
                    <span className="block text-xs text-mute">{whoWhat(e).what}</span>
                  </span>
                  {e.clientId ? (
                    <Link href={`/admin/clientes/${e.clientId}`} className="hidden shrink-0 text-sm text-bone-dim hover:text-bone sm:inline">
                      Ficha
                    </Link>
                  ) : null}
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-6 text-bone-dim">Sem sessões hoje.</p>
          )}
        </div>
        <div className="border-t border-line p-6 sm:p-8 lg:border-l lg:border-t-0">
          <p className="eyebrow">Próximos dias</p>
          <ul className="mt-4 divide-y divide-line">
            {nextDays.map((e) => (
              <li key={e.id} className="flex items-center gap-4 py-3">
                <span className="w-24 shrink-0 text-xs text-mute">
                  {relativeDay(e.start, DEMO_TODAY)}
                  <span className="block font-mono text-sm text-bone">{formatTime(e.start)}</span>
                </span>
                <EventMarker kind={e.kind} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-bone">{whoWhat(e).who}</span>
                  <span className="block truncate text-xs text-mute">{whoWhat(e).what}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section aria-labelledby="atividade" className="rounded-[var(--radius-card)] border border-line bg-ink-2 p-6 sm:p-8 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 id="atividade" className="text-lg font-semibold text-bone">Atividade recente</h2>
            <DemoBadge />
          </div>
          <ul className="space-y-5">
            {demoActivity.map((a) => {
              const c = getDemoClient(a.clientId)!;
              return (
                <li key={a.id} className="flex items-center gap-4">
                  <Avatar initials={c.initials} size="sm" />
                  <p className="min-w-0 flex-1 text-sm text-bone-dim">
                    <Link href={`/admin/clientes/${c.id}`} className="font-medium text-bone hover:underline">
                      {c.name}
                    </Link>{" "}
                    {a.text}
                  </p>
                  <span className="shrink-0 font-mono text-xs text-mute">{formatDay(a.at)}</span>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="configuracao" className="rounded-[var(--radius-card)] border border-line bg-ink-2 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 id="configuracao" className="text-lg font-semibold text-bone">Configuração</h2>
            <span className="font-mono text-xs text-mute">
              {setupDone}/{setup.length}
            </span>
          </div>
          <div className="mt-4 h-1 rounded-full bg-ink-4" aria-hidden>
            <div className="h-full rounded-full bg-bronze" style={{ width: `${(setupDone / setup.length) * 100}%` }} />
          </div>
          <p className="mt-3 text-xs text-mute">Estado real do projeto — não são métricas de negócio.</p>
          <SetupStatusList compact className="mt-4" />
        </section>
      </div>

      <section aria-labelledby="conteudos">
        <h2 id="conteudos" className="eyebrow mb-4">
          Conteúdos
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {contents.map(({ href, icon: Icon, label, meta }) => (
            <li key={href}>
              <Link href={href} className="group flex items-center gap-4 rounded-[var(--radius-card)] border border-line bg-ink-2 p-5 transition-colors hover:border-line-strong hover:bg-ink-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ink-4 text-bone-dim">
                  <Icon aria-hidden className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-bone">{label}</span>
                  <span className="block text-xs text-mute">{meta}</span>
                </span>
                <ArrowUpRight aria-hidden className="size-4 text-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
