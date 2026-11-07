import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { site } from "@/config/site";
import { media } from "@/config/media";
import { WhatsAppButton } from "@/components/brand/contact-buttons";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-end overflow-hidden bg-ink">
      {/*
        Fotografia em plano inteiro: fundo total <1024 px; ≥1024 px ocupa a metade direita
        (até 640 px, para manter ~2× com o original de 1200 px) e funde-se no preto à esquerda.
      */}
      <div className="parallax absolute inset-0 -z-10 animate-fade lg:left-auto lg:w-[44%] lg:max-w-[40rem]">
        <Image
          src={media.hero.src}
          alt={media.hero.alt}
          fill
          priority
          quality={90}
          sizes="(min-width: 1456px) 640px, (min-width: 1024px) 44vw, 100vw"
          className="kenburns object-cover"
          style={{ objectPosition: media.hero.focus }}
        />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-ink)_8%,rgba(14,15,17,0.55)_45%,rgba(14,15,17,0.1)_75%)] lg:bg-[linear-gradient(to_right,var(--color-ink)_0%,rgba(14,15,17,0.35)_35%,transparent_70%),linear-gradient(to_top,var(--color-ink)_0%,transparent_30%)]" />
      </div>

      <div className="mx-auto w-full max-w-[88rem] px-4 pb-12 pt-40 sm:px-8 lg:px-12 lg:pb-20">
        <p className="animate-fade font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone-dim">
          Personal trainer · {site.location}
        </p>

        <h1 id="hero-title" className="mt-6">
          <span className="display block animate-rise text-[clamp(3rem,14vw,7rem)] text-bone lg:text-[8vw] xl:text-hero">Construído</span>
          <span className="editorial -mt-1 block animate-rise pl-[0.06em] text-[clamp(2.9rem,13.5vw,6.5rem)] leading-[0.95] text-bronze [animation-delay:90ms] lg:text-[7vw] xl:text-[clamp(3.1rem,7vw,7.5rem)]">
            no silêncio.
          </span>
        </h1>

        <p className="mt-8 max-w-md animate-rise text-lg text-bone/85 [animation-delay:180ms] sm:text-xl">
          Treino com direção. Acompanhamento com método.
        </p>

        <div className="mt-10 flex animate-rise flex-col items-start gap-5 [animation-delay:260ms] sm:flex-row sm:items-center sm:gap-7">
          <WhatsAppButton size="lg" label="Falar com o Tiago" />
          <a href="#acompanhamento" className="group inline-flex items-center gap-2 text-sm font-medium text-bone underline decoration-bone/30 underline-offset-8 transition-colors hover:decoration-bronze">
            Como funciona
            <ArrowDown aria-hidden className="size-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
