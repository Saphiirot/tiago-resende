import { ShieldAlert, Users } from "lucide-react";
import { site } from "@/config/site";
import { demoClients, demoMealPlans } from "@/data/demo";
import { PageHeader } from "@/components/ui/page-header";
import { DemoBadge } from "@/components/ui/demo";
import { Card, CardHeader } from "@/components/ui/card";
import { DemoEditor } from "@/components/ui/demo-editor";
import { Field, Select, TextInput } from "@/components/ui/form";
import { MealPlanView } from "@/components/nutrition/meal-plan-view";

export const metadata = { title: "Planos alimentares" };

export default function AdminMealPlansPage() {
  return (
    <>
      <PageHeader
        eyebrow={<>Conteúdos <DemoBadge /></>}
        title="Planos alimentares"
        description={`Estrutura por dia e refeição. Responsável: ${site.nutrition.responsible} — dentro do âmbito das qualificações confirmadas.`}
        actions={
          <DemoEditor triggerLabel="Novo plano" title="Novo plano alimentar">
            <Field id="np-nome" label="Nome do plano"><TextInput id="np-nome" /></Field>
            <Field id="np-prof" label="Responsável" hint="Âmbito sujeito à confirmação das qualificações.">
              <TextInput id="np-prof" defaultValue={site.nutrition.responsible} />
            </Field>
            <Field id="np-cli" label="Cliente">
              <Select id="np-cli" defaultValue="">
                <option value="" disabled>Escolher cliente</option>
                {demoClients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
            </Field>
          </DemoEditor>
        }
      />

      {!site.nutrition.qualificationsConfirmed ? (
        <div role="note" className="mb-8 flex gap-3 rounded-[var(--radius-card)] border border-oxide/40 bg-oxide/[0.07] p-5 text-sm text-bone-dim">
          <ShieldAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-oxide" />
          <p>
            <strong className="font-medium text-bone">Requisito pendente:</strong> confirmar as qualificações que definem o
            âmbito da componente alimentar antes de tornar este módulo operacional. Até lá, não usar planos alimentares
            reais nem dietas individuais.
          </p>
        </div>
      ) : null}

      {demoMealPlans.map((plan) => (
        <Card key={plan.id}>
          <CardHeader
            eyebrow="Plano"
            title={plan.name}
            action={
              <span className="flex items-center gap-1.5 text-xs text-mute">
                <Users aria-hidden className="size-3.5" />
                {plan.assignedClientIds.length} clientes
              </span>
            }
          />
          <p className="mb-6 text-sm text-bone-dim">Responsável: {plan.responsibleProfessional ?? site.nutrition.responsible} · âmbito por confirmar</p>
          <MealPlanView plan={plan} />
        </Card>
      ))}
    </>
  );
}
