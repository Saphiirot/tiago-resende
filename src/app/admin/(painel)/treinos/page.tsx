import { CalendarRange, Users } from "lucide-react";
import { demoClients, demoPlans, demoSessions } from "@/data/demo";
import { formatDay } from "@/lib/format";
import { PageHeader } from "@/components/ui/page-header";
import { DemoBadge } from "@/components/ui/demo";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DemoEditor } from "@/components/ui/demo-editor";
import { Field, Select, TextInput, TextArea } from "@/components/ui/form";
import { WorkoutCard } from "@/components/training/workout-card";

export const metadata = { title: "Treinos" };

export default function AdminWorkoutsPage() {
  return (
    <>
      <PageHeader
        eyebrow={<>Conteúdos <DemoBadge /></>}
        title="Treinos"
        description="Planos e sessões de exemplo. Criar, editar e atribuir ainda não está implementado."
        actions={
          <DemoEditor triggerLabel="Nova sessão" title="Nova sessão de treino">
            <Field id="ns-nome" label="Nome da sessão"><TextInput id="ns-nome" placeholder="Ex.: Costas & Bíceps" /></Field>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field id="ns-cod" label="Código"><TextInput id="ns-cod" placeholder="A" maxLength={2} /></Field>
              <Field id="ns-dur" label="Duração estimada (min)"><TextInput id="ns-dur" inputMode="numeric" placeholder="60" /></Field>
            </div>
            <Field id="ns-plano" label="Plano">
              <Select id="ns-plano" defaultValue="">
                <option value="" disabled>Escolher plano</option>
                {demoPlans.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </Select>
            </Field>
            <fieldset className="rounded-xl border border-line p-4">
              <legend className="px-1 text-sm font-medium text-bone">Exercício 1</legend>
              <div className="grid gap-3">
                <TextInput aria-label="Nome do exercício" placeholder="Nome do exercício" />
                <div className="grid grid-cols-3 gap-2">
                  <TextInput aria-label="Séries" placeholder="Séries" inputMode="numeric" />
                  <TextInput aria-label="Repetições" placeholder="Reps" />
                  <TextInput aria-label="Descanso em segundos" placeholder="Desc. (s)" inputMode="numeric" />
                </div>
              </div>
            </fieldset>
            <Field id="ns-notas" label="Notas do treinador"><TextArea id="ns-notas" /></Field>
          </DemoEditor>
        }
      />

      <div className="space-y-12">
        {demoPlans.map((plan) => {
          const sessions = demoSessions.filter((s) => plan.sessionIds.includes(s.id));
          const clients = demoClients.filter((c) => plan.assignedClientIds.includes(c.id));
          return (
            <section key={plan.id} aria-labelledby={`plan-${plan.id}`}>
              <Card className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 id={`plan-${plan.id}`} className="text-lg font-semibold text-bone">{plan.name}</h2>
                    <Badge tone="outline">{plan.phase}</Badge>
                  </div>
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-mute">
                    <CalendarRange aria-hidden className="size-4" />{formatDay(plan.startsOn)} – {formatDay(plan.endsOn)}
                  </p>
                </div>
                <p className="flex items-center gap-2 text-sm text-bone-dim">
                  <Users aria-hidden className="size-4 text-mute" />
                  {clients.map((c) => c.name).join(", ") || "Sem clientes"}
                </p>
              </Card>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {sessions.map((s) => (
                  <li key={s.id}><WorkoutCard session={s} href={`/admin/treinos/${s.id}`} /></li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
