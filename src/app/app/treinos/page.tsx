import { CalendarRange, History } from "lucide-react";
import { DEMO_CURRENT_CLIENT_ID, demoSessions, getDemoClient, getDemoPlan } from "@/data/demo";
import { formatDay } from "@/lib/format";
import { PageHeader } from "@/components/ui/page-header";
import { DemoBadge } from "@/components/ui/demo";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { WorkoutCard } from "@/components/training/workout-card";

export const metadata = { title: "Treinos" };

export default function WorkoutsPage() {
  const client = getDemoClient(DEMO_CURRENT_CLIENT_ID)!;
  const plan = getDemoPlan(client.activePlanId);
  const sessions = plan ? demoSessions.filter((s) => plan.sessionIds.includes(s.id)) : [];

  return (
    <>
      <PageHeader
        eyebrow={<>Plano de treino <DemoBadge /></>}
        title="Treinos"
        description="As sessões do teu bloco atual. Abre uma sessão para ver exercícios, séries, descanso e notas do treinador."
      />

      {plan ? (
        <section aria-labelledby="bloco-atual">
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <h2 id="bloco-atual" className="text-lg font-semibold text-bone">{plan.name}</h2>
            <Badge tone="outline">{plan.phase}</Badge>
            <span className="flex items-center gap-1.5 text-sm text-mute">
              <CalendarRange aria-hidden className="size-4" />
              {formatDay(plan.startsOn)} – {formatDay(plan.endsOn)}
            </span>
          </div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {sessions.map((s, i) => (
              <li key={s.id}>
                <WorkoutCard session={s} href={`/app/treinos/${s.id}`} highlight={i === 0} meta={i === 0 ? "Próximo" : undefined} />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <EmptyState icon={CalendarRange} title="Ainda sem plano atribuído" description="O teu plano aparece aqui assim que o Tiago o publicar." />
      )}

      <section aria-labelledby="historico" className="mt-14">
        <h2 id="historico" className="mb-4 text-lg font-semibold text-bone">Histórico</h2>
        <EmptyState
          icon={History}
          title="Sem registos de treino"
          description="O registo de sessões concluídas ainda não está implementado nesta fase."
        />
      </section>
    </>
  );
}
