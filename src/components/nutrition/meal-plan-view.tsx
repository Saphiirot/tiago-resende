import { CalendarX2, Clock } from "lucide-react";
import type { MealPlan } from "@/lib/types";
import { Tabs } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";

export function MealPlanView({ plan }: { plan: MealPlan }) {
  return (
    <Tabs
      label="Dias da semana"
      items={plan.days.map((day) => ({
        id: day.weekday,
        label: day.label,
        content: day.meals.length ? (
          <ol className="relative space-y-4 before:absolute before:bottom-4 before:left-[0.6875rem] before:top-4 before:w-px before:bg-line sm:before:left-[5.6875rem]">
            {day.meals.map((meal) => (
              <li key={meal.slot} className="relative grid grid-cols-[1.5rem_minmax(0,1fr)] gap-4 sm:grid-cols-[5rem_1.5rem_minmax(0,1fr)]">
                <span className="hidden pt-5 text-right font-mono text-xs text-mute sm:block">{meal.time}</span>
                <span aria-hidden className="relative z-10 mt-5 grid size-6 place-items-center rounded-full border border-line-strong bg-ink">
                  <span className="size-2 rounded-full bg-bronze" />
                </span>
                <div className="rounded-[var(--radius-card)] border border-line bg-ink-2 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-medium text-bone">{meal.slot}</h3>
                    <span className="flex items-center gap-1 font-mono text-xs text-mute sm:hidden">
                      <Clock aria-hidden className="size-3" /> {meal.time}
                    </span>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {meal.items.map((it) => (
                      <li key={it} className="rounded-full border border-line-strong px-3 py-1 text-sm text-bone-dim">
                        {it}
                      </li>
                    ))}
                  </ul>
                  {meal.note ? <p className="mt-3 border-t border-line pt-3 text-xs text-mute">{meal.note}</p> : null}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <EmptyState
            icon={CalendarX2}
            title="Sem refeições definidas para este dia"
            description="Estado vazio de demonstração: o responsável ainda não preencheu este dia."
          />
        ),
      }))}
    />
  );
}
