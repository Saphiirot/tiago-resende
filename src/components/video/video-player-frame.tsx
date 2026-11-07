import { Lock, Play } from "lucide-react";
import type { Video } from "@/lib/types";
import { MediaFrame } from "@/components/ui/media-frame";

/**
 * Área do leitor de vídeo. Na Fase 01 não há ficheiro nem streaming:
 * mostra o enquadramento final e explica o estado.
 */
export function VideoPlayerFrame({ video }: { video: Video }) {
  return (
    <div className="relative overflow-hidden rounded-[var(--radius-card)] ring-1 ring-inset ring-line">
      <MediaFrame src={video.thumbnail} alt={`Vídeo: ${video.title}`} showLabel={false} className="aspect-video" sizes="(min-width: 1024px) 66vw, 100vw" />
      {!video.thumbnail ? (
        <span aria-hidden className="display pointer-events-none absolute left-6 top-5 z-10 text-[clamp(3rem,9vw,7.5rem)] text-bone/[0.08]">
          {video.muscleGroup ?? video.category}
        </span>
      ) : null}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 p-6 text-center">
        <span aria-hidden className="grid size-16 place-items-center rounded-full border border-bone/25 bg-ink/40 text-bone/70 backdrop-blur-sm sm:size-20">
          <Play className="ml-1 size-6 fill-current" />
        </span>
        <p className="max-w-sm text-sm text-bone-dim">Leitor de demonstração — ainda sem ficheiro de vídeo.</p>
      </div>
      {/* Barra de controlo ilustrativa */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-4 bg-gradient-to-t from-ink/90 to-transparent px-5 pb-4 pt-10">
        <span className="h-1 flex-1 rounded-full bg-bone/15">
          <span className="block h-full w-0 rounded-full bg-bronze" />
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-mute">
          <Lock className="size-3" /> Streaming privado por implementar
        </span>
      </div>
    </div>
  );
}
