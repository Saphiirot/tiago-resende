import { ShieldAlert } from "lucide-react";
import { site } from "@/config/site";
import { DEMO_CURRENT_CLIENT_ID, getDemoClient, getDemoMealPlan } from "@/data/demo";
import { PageHeader } from "@/components/ui/page-header";
import { DemoBadge, DemoNotice } from "@/components/ui/demo";
import { EmptyState } from "@/components/ui/empty-state";
import { MealPlanView } from "@/components/nutrition/meal-plan-view";

export const metadata = { title: "Plano alimentar" };

export default function MealPlanPage() {
  const client = getDemoClient(DEMO_CURRENT_CLIENT_ID)!;
  const plan = getDemoMealPlan(client.mealPlanId);

  return (
    <>
      <PageHeader
        eyebrow={<>Alimentação <DemoBadge /></>}
        title="Plano alimentar"
        description={`Organização por dia e refeição. A componente alimentar é da responsabilidade do ${site.nutrition.responsible}.`}
      />

      {!site.nutrition.qualificationsConfirmed ? (
        <div role="note" className="mb-8 flex gap-3 rounded-[var(--radius-card)] border border-oxide/40 bg-oxide/[0.07] p-5 text-sm">
          <ShieldAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-oxide" />
          <div className="text-bone-dim">
            <p className="font-medium text-bone">Módulo em preparação — não é uma recomendação alimentar.</p>
            <p className="mt-1 leading-relaxed">
              A estrutura abaixo é ilustrativa e usa dados fictícios. O âmbito da componente alimentar depende das
              qualificações do responsável, ainda por confirmar.
            </p>
          </div>
        </div>
      ) : null}

      {plan ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <MealPlanView plan={plan} />
          <aside className="space-y-4 lg:pt-14">
            <div className="rounded-[var(--radius-card)] border border-line bg-ink-2 p-5 text-sm">
              <p className="eyebrow">Plano</p>
              <p className="mt-1.5 text-bone">{plan.name}</p>
              <p className="eyebrow mt-5">Responsável</p>
              <p className="mt-1.5 text-bone-dim">
                {plan.responsibleProfessional ?? site.nutrition.responsible}
                {site.nutrition.qualificationsConfirmed ? null : <span className="block text-xs text-mute">Âmbito por confirmar</span>}
              </p>
            </div>
            <DemoNotice>Itens genéricos, sem quantidades nem indicações individuais.</DemoNotice>
          </aside>
        </div>
      ) : (
        <EmptyState icon={ShieldAlert} title="Sem plano alimentar atribuído" />
      )}
    </>
  );
}
