import { ArrowUpRight, Play } from "lucide-react";
import { site } from "@/config/site";
import { media } from "@/config/media";
import { MediaFrame } from "@/components/ui/media-frame";
import { InstagramIcon } from "@/components/brand/icons";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Section } from "./section";

// Publicações reais do perfil, com capa do inventário (src/config/media.ts).
// Só entram publicações cuja imagem pode ser usada; as restantes ficam no Instagram.
const posts = [
  { href: media.coverBackIsBuilt.source, type: "Reel", title: "Back is built. Not given.", cover: media.coverBackIsBuilt, video: true, aspect: "aspect-[3/4]", span: "sm:col-span-6", depth: "30" },
  { href: media.coverMirror.source, type: "Publicação", title: "Construído no silêncio.", cover: media.coverMirror, video: false, aspect: "aspect-[4/5]", span: "sm:col-span-4 sm:col-start-8 sm:-mb-10", depth: "-50" },
];

export function Journal() {
  return (
    <Section id="conteudos" label="Do Instagram">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <h2 id="conteudos-title" className="reveal editorial max-w-3xl text-[clamp(2.75rem,5.6vw,5.5rem)] leading-[1] text-bone">
          Disciplina, em público.
        </h2>
        <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={buttonClasses({ variant: "secondary" })}>
          <InstagramIcon className="size-4" />@{site.handle}
        </a>
      </div>

      <ul className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-12 sm:items-end sm:gap-5">
        {posts.map((p) => (
          <li key={p.href} data-parallax={p.depth} className={p.span}>
            <a href={p.href} target="_blank" rel="noopener noreferrer" className="group block">
              <div className="relative overflow-hidden rounded-[var(--radius-card)]">
                <MediaFrame
                  alt={p.cover.alt}
                  src={p.cover.src}
                  objectPosition={p.cover.focus}
                  sizes="(min-width: 640px) 46vw, 100vw"
                  className={cn("w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]", p.aspect)}
                />
                {p.video ? (
                  <span aria-hidden className="absolute bottom-3 right-3 z-10 grid size-9 place-items-center rounded-full bg-ink/70 text-bone backdrop-blur-sm">
                    <Play className="ml-0.5 size-3.5 fill-current" />
                  </span>
                ) : null}
              </div>
              <div className="mt-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-mute">{p.type}</p>
                  <p className="display mt-1.5 text-2xl text-bone transition-colors group-hover:text-bronze-bright sm:text-3xl">
                    {p.title}
                  </p>
                </div>
                <ArrowUpRight aria-hidden className="mt-1 size-4 shrink-0 text-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bone" />
              </div>
              <span className="sr-only">(abre o Instagram numa nova janela)</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
