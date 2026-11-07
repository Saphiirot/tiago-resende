import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Video } from "@/lib/types";
import { demoSessions, demoVideos } from "@/data/demo";
import { formatDuration } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { DemoBadge } from "@/components/ui/demo";
import { VideoPlayerFrame } from "./video-player-frame";
import { VideoCard } from "./video-card";

/** Visualização individual de vídeo — partilhada entre cliente e painel. */
export function VideoDetail({ video, base, sessionBase }: { video: Video; base: string; sessionBase: string }) {
  const usedIn = demoSessions.filter((s) => s.exercises.some((e) => e.videoId === video.id));
  const more = demoVideos.filter((v) => v.id !== video.id && v.category === video.category).slice(0, 3);
  return (
    <article>
      <Link href={base} className="mb-8 inline-flex items-center gap-2 text-sm text-bone-dim hover:text-bone">
        <ArrowLeft aria-hidden className="size-4" /> Biblioteca
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <VideoPlayerFrame video={video} />
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge tone="outline">{video.category}</Badge>
            {video.muscleGroup ? <span className="text-sm text-mute">{video.muscleGroup}</span> : null}
            <span className="font-mono text-sm text-mute">{formatDuration(video.durationSeconds) ?? "Duração por definir"}</span>
            <DemoBadge />
          </div>
          <h1 className="display mt-4 text-5xl text-bone sm:text-6xl">{video.title}</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-bone-dim">{video.description}</p>
        </div>

        <aside className="space-y-4">
          <div className="rounded-[var(--radius-card)] border border-line bg-ink-2 p-5">
            <p className="eyebrow">Usado nas sessões</p>
            {usedIn.length ? (
              <ul className="mt-3 space-y-2">
                {usedIn.map((s) => (
                  <li key={s.id}>
                    <Link href={`${sessionBase}/${s.id}`} className="flex items-center gap-3 text-sm text-bone hover:text-bronze-bright">
                      <span className="display grid size-8 place-items-center rounded-md bg-ink-4 text-xl">{s.code}</span>
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-mute">Não associado a nenhuma sessão.</p>
            )}
          </div>
        </aside>
      </div>

      {more.length ? (
        <section aria-labelledby="mais-videos" className="mt-14">
          <h2 id="mais-videos" className="mb-6 text-lg font-semibold text-bone">Mais em {video.category}</h2>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((v) => (
              <li key={v.id}><VideoCard video={v} href={`${base}/${v.id}`} /></li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
