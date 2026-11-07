import { ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
import { media } from "@/config/media";
import { MediaFrame } from "@/components/ui/media-frame";
import { Section } from "./section";
import { LandingPending } from "./review-note";

export function About() {
  return (
    <Section id="sobre" label="O treinador">
      <h2 id="sobre-title" className="sr-only">
        Sobre o Tiago Resende
      </h2>

      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-end lg:gap-10">
        <figure className="reveal lg:col-span-5">
          <MediaFrame
            src={media.about.src}
            alt={media.about.alt}
            objectPosition={media.about.focus}
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="aspect-[4/5] w-full rounded-[var(--radius-media)]"
          />
        </figure>

        <div className="reveal lg:col-span-5 lg:col-start-8 lg:pb-4">
          <blockquote className="editorial text-[clamp(2.1rem,3.6vw,3.5rem)] leading-[1.05] text-bone">
            “O trabalho verdadeiro aconteceu todos os dias, quando ninguém estava a ver.”
          </blockquote>
          <p className="mt-10 max-w-md text-[1.0625rem] leading-relaxed text-bone-dim">
            Tiago Resende é personal trainer no {site.location}. No próprio treino segue a lógica do bodybuilding: semanas
            de consistência e atenção ao detalhe, da execução à proporção.
          </p>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-bone underline decoration-bone/30 underline-offset-8 hover:decoration-bronze"
          >
            @{site.handle}
            <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          {site.credentials.length === 0 ? (
            <LandingPending title="Formação, certificações e título profissional" className="mt-10">
              Não apresentados no perfil público. Preencher em <code className="font-mono text-xs">site.credentials</code> apenas com documentos de suporte.
            </LandingPending>
          ) : (
            <p className="mt-10 text-sm text-bone-dim">{site.credentials.join(" · ")}</p>
          )}
        </div>
      </div>
    </Section>
  );
}
