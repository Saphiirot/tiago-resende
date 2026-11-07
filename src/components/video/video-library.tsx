"use client";

import { useState } from "react";
import { Film } from "lucide-react";
import type { Video, VideoCategory } from "@/lib/types";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/cn";
import { VideoCard } from "./video-card";

const categories: (VideoCategory | "Todos")[] = ["Todos", "Execução", "Mobilidade", "Aquecimento", "Bastidores"];

export function VideoLibrary({ videos, hrefBase }: { videos: Video[]; hrefBase: string }) {
  const [cat, setCat] = useState<(typeof categories)[number]>("Todos");
  const list = cat === "Todos" ? videos : videos.filter((v) => v.category === cat);

  return (
    <div>
      <div role="group" aria-label="Filtrar por categoria" className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        {categories.map((c) => {
          const count = c === "Todos" ? videos.length : videos.filter((v) => v.category === c).length;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
                cat === c ? "border-bone bg-bone text-ink" : "border-line-strong text-bone-dim hover:text-bone",
              )}
            >
              {c} <span className="ml-1 font-mono text-xs opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {list.length ? (
        <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((v) => (
            <li key={v.id}>
              <VideoCard video={v} href={`${hrefBase}/${v.id}`} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState className="mt-8" icon={Film} title="Sem vídeos nesta categoria" description="Quando o Tiago publicar conteúdos nesta categoria, aparecem aqui." />
      )}
    </div>
  );
}
