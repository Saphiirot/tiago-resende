import Link from "next/link";
import { PlayCircle } from "lucide-react";
import type { Exercise } from "@/lib/types";
import { formatRest } from "@/lib/format";

/** Lista de exercícios: grelha em ecrãs largos, cartões compactos no mobile. */
export function ExerciseList({ exercises, videoBase }: { exercises: Exercise[]; videoBase?: string }) {
  return (
    <ol className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink-2">
      <li aria-hidden className="eyebrow hidden grid-cols-[3rem_minmax(0,1fr)_6rem_6rem_5rem_7.5rem] gap-4 border-b border-line px-5 py-3.5 text-[0.625rem] md:grid">
        <span>#</span>
        <span>Exercício</span>
        <span>Séries</span>
        <span>Reps</span>
        <span>Descanso</span>
        <span className="text-right">Vídeo</span>
      </li>
      {exercises.map((ex, i) => (
        <li key={ex.id} className="border-b border-line/70 px-5 py-4 last:border-0 md:grid md:grid-cols-[3rem_minmax(0,1fr)_6rem_6rem_5rem_7.5rem] md:items-center md:gap-4">
          <span className="hidden font-mono text-xs text-mute md:block">{String(i + 1).padStart(2, "0")}</span>
          <div className="min-w-0">
            <p className="font-medium text-bone">
              <span className="mr-2 font-mono text-xs text-mute md:hidden">{String(i + 1).padStart(2, "0")}</span>
              {ex.name}
            </p>
            <p className="mt-0.5 text-xs text-mute">
              {ex.muscleGroup}
              {ex.tempo ? ` · cadência ${ex.tempo}` : ""}
            </p>
            {ex.note ? <p className="mt-1.5 text-xs text-bone-dim">{ex.note}</p> : null}
          </div>
          <dl className="mt-3 grid grid-cols-3 gap-2 font-mono text-sm md:contents">
            <div className="rounded-lg bg-ink-3 px-3 py-2 md:bg-transparent md:p-0">
              <dt className="eyebrow text-[0.5625rem] md:sr-only">Séries</dt>
              <dd className="flex items-center gap-2 text-bone">
                {ex.sets}
                <span aria-hidden className="flex gap-0.5">
                  {Array.from({ length: ex.sets }, (_, k) => (
                    <span key={k} className="h-3 w-1 rounded-full bg-bronze/70" />
                  ))}
                </span>
              </dd>
            </div>
            <div className="rounded-lg bg-ink-3 px-3 py-2 md:bg-transparent md:p-0">
              <dt className="eyebrow text-[0.5625rem] md:sr-only">Reps</dt>
              <dd className="text-bone">{ex.reps}</dd>
            </div>
            <div className="rounded-lg bg-ink-3 px-3 py-2 md:bg-transparent md:p-0">
              <dt className="eyebrow text-[0.5625rem] md:sr-only">Descanso</dt>
              <dd className="text-bone-dim">{formatRest(ex.restSeconds)}</dd>
            </div>
          </dl>
          <div className="mt-3 md:mt-0 md:text-right">
            {ex.videoId && videoBase ? (
              <Link href={`${videoBase}/${ex.videoId}`} className="inline-flex items-center gap-1.5 text-xs text-bronze-bright hover:underline">
                <PlayCircle aria-hidden className="size-4" /> Ver execução
              </Link>
            ) : (
              <span className="text-xs text-mute">—</span>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
