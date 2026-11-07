import Link from "next/link";
import { ArrowLeft, Clock, Layers, ListChecks } from "lucide-react";
import type { WorkoutSession } from "@/lib/types";
import { demoVideos } from "@/data/demo";
import { Badge } from "@/components/ui/badge";
import { DemoBadge } from "@/components/ui/demo";
import { ExerciseList } from "./exercise-list";
import { VideoCard } from "@/components/video/video-card";

/** Detalhe de uma sessão — partilhado entre a área de cliente e o painel. */
export function WorkoutDetail({
  session,
  backHref,
  videoBase,
}: {
  session: WorkoutSession;
  backHref: string;
  videoBase: string;
}) {
  const totalSets = session.exercises.reduce((n, e) => n + e.sets, 0);
  const videoIds = new Set(session.exercises.map((e) => e.videoId).filter(Boolean));
  const videos = demoVideos.filter((v) => videoIds.has(v.id));

  return (
    <article>
      <Link href={backHref} className="mb-8 inline-flex items-center gap-2 text-sm text-bone-dim hover:text-bone">
        <ArrowLeft aria-hidden className="size-4" /> Voltar aos treinos
      </Link>

      <header className="grid grid-cols-1 gap-8 border-b border-line pb-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-end">
        <span aria-hidden className="display text-[9rem] leading-[0.75] text-bronze sm:text-[12rem]">{session.code}</span>
        <div>
          <p className="eyebrow flex items-center gap-2">Treino {session.code} <DemoBadge /></p>
          <h1 className="display mt-3 text-6xl text-bone sm:text-7xl">{session.name}</h1>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {session.focus.map((f) => (
              <Badge key={f} tone="outline">{f}</Badge>
            ))}
          </div>
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Stat icon={<ListChecks aria-hidden className="size-4" />} label="Exercícios" value={session.exercises.length} />
            <Stat icon={<Layers aria-hidden className="size-4" />} label="Séries" value={totalSets} />
            <Stat icon={<Clock aria-hidden className="size-4" />} label="Duração estimada" value={`~${session.estimatedMinutes} min`} />
          </dl>
        </div>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <section aria-labelledby="exercicios">
          <h2 id="exercicios" className="mb-4 text-lg font-semibold text-bone">Exercícios</h2>
          <ExerciseList exercises={session.exercises} videoBase={videoBase} />
        </section>

        <aside aria-labelledby="notas" className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-[var(--radius-card)] border border-line bg-ink-2 p-6">
            <h2 id="notas" className="eyebrow">Notas do treinador</h2>
            <p className="editorial mt-4 text-2xl leading-snug text-bone">“{session.coachNotes}”</p>
            <p className="mt-5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-mute">— Texto de exemplo</p>
          </div>
        </aside>
      </div>

      {videos.length ? (
        <section aria-labelledby="videos-sessao" className="mt-14">
          <h2 id="videos-sessao" className="mb-6 text-lg font-semibold text-bone">Vídeos demonstrativos</h2>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <li key={v.id}><VideoCard video={v} href={`${videoBase}/${v.id}`} /></li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <dt className="flex items-center gap-1.5 text-mute">{icon}<span>{label}</span></dt>
      <dd className="font-mono text-bone">{value}</dd>
    </div>
  );
}
