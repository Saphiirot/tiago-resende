import { site } from "@/config/site";
import { Suspense } from "react";
import { DetailSkeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, NotebookPen, Utensils } from "lucide-react";
import { DEMO_TODAY, demoClients, demoSessions, eventsForClient, getDemoClient, getDemoMealPlan, getDemoPlan } from "@/data/demo";
import { formatDay } from "@/lib/format";
import { Card, CardHeader } from "@/components/ui/card";
import { DemoBadge } from "@/components/ui/demo";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { TextArea } from "@/components/ui/form";
import { CalendarView } from "@/components/calendar/calendar-view";
import { ClientStatusBadge } from "@/components/admin/client-status";

export function generateStaticParams() {
  return demoClients.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: PageProps<"/admin/clientes/[id]">) {
  const { id } = await params;
  return { title: getDemoClient(id)?.name ?? "Cliente" };
}

export default function ClientDetailPage({ params }: PageProps<"/admin/clientes/[id]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <ClientDetailPageContent params={params} />
    </Suspense>
  );
}

async function ClientDetailPageContent({ params }: { params: PageProps<"/admin/clientes/[id]">["params"] }) {
  const { id } = await params;
  const client = getDemoClient(id);
  if (!client) notFound();
  const plan = getDemoPlan(client.activePlanId);
  const meal = getDemoMealPlan(client.mealPlanId);
  const events = eventsForClient(client.id);

  return (
    <>
      <Link href="/admin/clientes" className="mb-8 inline-flex items-center gap-2 text-sm text-bone-dim hover:text-bone">
        <ArrowLeft aria-hidden className="size-4" /> Clientes
      </Link>

      <header className="mb-10 flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-center">
        <Avatar initials={client.initials} size="lg" />
        <div className="flex-1">
          <p className="eyebrow flex items-center gap-2">Ficha de cliente <DemoBadge /></p>
          <h1 className="display mt-2 text-5xl text-bone sm:text-6xl">{client.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-bone-dim">
            <ClientStatusBadge status={client.status} />
            <span className="flex items-center gap-1.5"><Mail aria-hidden className="size-3.5" />{client.email}</span>
            <span>Desde {formatDay(client.startedOn)}</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader eyebrow="Objetivo" title="Declarado pelo cliente" />
          <p className="editorial text-2xl leading-snug text-bone">“{client.goal}”</p>
        </Card>

        <Card>
          <CardHeader eyebrow="Treino" title={plan?.name ?? "Sem plano atribuído"} />
          {plan ? (
            <>
              <Badge tone="outline">{plan.phase}</Badge>
              <p className="mt-2 text-xs text-mute">{formatDay(plan.startsOn)} – {formatDay(plan.endsOn)}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {plan.sessionIds.map((sid) => {
                  const s = demoSessions.find((x) => x.id === sid)!;
                  return (
                    <li key={sid}>
                      <Link href={`/admin/treinos/${sid}`} className="flex items-center gap-2 rounded-lg border border-line px-2.5 py-1.5 text-xs text-bone-dim hover:border-line-strong hover:text-bone">
                        <span className="display text-lg text-bone">{s.code}</span>{s.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <p className="text-sm text-mute">Atribuição de planos disponível numa fase seguinte.</p>
          )}
        </Card>

        <Card>
          <CardHeader eyebrow="Alimentação" title={meal?.name ?? "Sem plano alimentar"} />
          {meal ? (
            <p className="flex items-start gap-2 text-sm text-bone-dim">
              <Utensils aria-hidden className="mt-0.5 size-4 shrink-0 text-mute" />
              Responsável: {meal.responsibleProfessional ?? site.nutrition.responsible} · âmbito por confirmar
            </p>
          ) : (
            <p className="text-sm text-mute">Nenhum plano associado.</p>
          )}
        </Card>
      </div>

      <section aria-labelledby="agenda-cliente" className="mt-12">
        <h2 id="agenda-cliente" className="mb-6 text-lg font-semibold text-bone">Calendário do cliente</h2>
        {events.length ? (
          <CalendarView events={events} today={DEMO_TODAY} mode="treinador" clientNames={{ [client.id]: client.name }} workoutHref="/admin/treinos" />
        ) : (
          <EmptyState icon={NotebookPen} title="Sem eventos" description="Este cliente ainda não tem sessões ou treinos agendados." />
        )}
      </section>

      <section aria-labelledby="notas-privadas" className="mt-12">
        <Card>
          <CardHeader eyebrow="Privado" title={<span id="notas-privadas">Notas do treinador</span>} />
          <TextArea aria-labelledby="notas-privadas" placeholder="Campo visual — as notas não são guardadas nesta fase." disabled />
          <p className="mt-3 text-xs text-mute">
            Notas sobre saúde ou condição física são dados sensíveis: só devem ser recolhidas com base legal, consentimento e controlo de acesso adequados.
          </p>
        </Card>
      </section>
    </>
  );
}
