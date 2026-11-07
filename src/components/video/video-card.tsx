import Link from "next/link";
import { Play } from "lucide-react";
import type { Video } from "@/lib/types";
import { formatDuration } from "@/lib/format";
import { MediaFrame } from "@/components/ui/media-frame";
import { Badge } from "@/components/ui/badge";

/** Miniatura de vídeo; sem imagem, mostra o grupo muscular/categoria em grande. */
export function VideoThumb({ video, size = "md", className }: { video: Video; size?: "md" | "lg"; className?: string }) {
  const duration = formatDuration(video.durationSeconds);
  return (
    <div className={className}>
      <div className="relative">
        <MediaFrame
          src={video.thumbnail}
          alt={`Miniatura: ${video.title}`}
          showLabel={false}
          tone={video.category === "Execução" ? "warm" : "cold"}
          sizes={size === "lg" ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"}
          className="aspect-video rounded-[var(--radius-card)] ring-1 ring-inset ring-line"
        />
        {!video.thumbnail ? (
          <span
            aria-hidden
            className={
              size === "lg"
                ? "display pointer-events-none absolute left-6 top-5 z-10 text-[clamp(3rem,8vw,6.5rem)] text-bone/[0.09]"
                : "display pointer-events-none absolute left-4 top-3 z-10 text-5xl text-bone/[0.09]"
            }
          >
            {video.muscleGroup ?? video.category}
          </span>
        ) : null}
        {!video.thumbnail ? (
          <span title="Miniatura por fornecer (16:9)" className="absolute right-3 top-3 z-10 rounded-md bg-ink/70 px-1.5 py-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-bone/70">
            <span className="sr-only">Miniatura por fornecer, formato </span>16:9
          </span>
        ) : null}
        <span aria-hidden className="absolute bottom-3 left-3 z-10 grid size-10 place-items-center rounded-full bg-bone text-ink transition-transform duration-300 group-hover:scale-110">
          <Play className="ml-0.5 size-4 fill-current" />
        </span>
        <span className="absolute bottom-3 right-3 z-10 rounded-md bg-ink/80 px-2 py-0.5 font-mono text-[0.6875rem] text-bone">
          {duration ?? "—:—"}
          <span className="sr-only">{duration ? " de duração" : "duração desconhecida"}</span>
        </span>
      </div>
    </div>
  );
}

export function VideoCard({ video, href }: { video: Video; href: string }) {
  return (
    <Link href={href} className="group flex h-full flex-col">
      <VideoThumb video={video} />
      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center gap-2">
          <Badge tone="outline">{video.category}</Badge>
          {video.muscleGroup ? <span className="text-xs text-mute">{video.muscleGroup}</span> : null}
        </div>
        <h3 className="mt-2.5 font-medium text-bone transition-colors group-hover:text-bronze-bright">{video.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-bone-dim">{video.description}</p>
      </div>
    </Link>
  );
}
