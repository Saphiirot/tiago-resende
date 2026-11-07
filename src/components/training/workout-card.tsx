import Link from "next/link";
import { ArrowUpRight, Clock, ListChecks } from "lucide-react";
import type { WorkoutSession } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

export function WorkoutCard({
  session,
  href,
  highlight,
  meta,
}: {
  session: WorkoutSession;
  href?: string;
  highlight?: boolean;
  meta?: string;
}) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-4">
        <span
          aria-hidden
          className={cn("display text-7xl leading-[0.78]", highlight ? "text-bronze" : "text-bone/55 transition-colors group-hover:text-bone")}
        >
          {session.code}
        </span>
        {href ? (
          <ArrowUpRight aria-hidden className="size-5 text-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone" />
        ) : null}
      </div>
      <div className="mt-6">
        {meta ? <p className="eyebrow mb-1.5">{meta}</p> : null}
        <h3 className="display text-3xl text-bone">{session.name}</h3>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {session.focus.map((f) => (
            <Badge key={f} tone={highlight ? "bronze" : "neutral"}>
              {f}
            </Badge>
          ))}
        </div>
      </div>
      <dl className="mt-6 flex gap-5 border-t border-line pt-4 text-xs text-bone-dim">
        <div className="flex items-center gap-1.5">
          <dt><ListChecks aria-label="Exercícios" className="size-3.5" /></dt>
          <dd>{session.exercises.length} exercícios</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <dt><Clock aria-label="Duração estimada" className="size-3.5" /></dt>
          <dd>~{session.estimatedMinutes} min</dd>
        </div>
      </dl>
    </>
  );

  const classes = cn(
    "group flex h-full flex-col rounded-[var(--radius-card)] border bg-ink-2 p-5 transition-colors sm:p-6",
    highlight ? "border-bronze/50 bg-bronze/[0.05]" : "border-line",
    href && "hover:border-line-strong hover:bg-ink-3",
  );

  return href ? (
    <Link href={href} className={classes} aria-label={`Treino ${session.code}: ${session.name}`}>
      {body}
    </Link>
  ) : (
    <div className={classes}>{body}</div>
  );
}
