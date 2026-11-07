import { ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
import { WhatsAppButton } from "@/components/brand/contact-buttons";
import { InstagramIcon } from "@/components/brand/icons";

export function FinalCta() {
  return (
    <section aria-labelledby="contacto-title" id="contacto" className="grain relative overflow-hidden bg-bronze px-4 py-24 text-ink sm:px-8 lg:px-12 lg:py-36">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_90%_at_90%_0%,rgba(232,245,255,0.4),transparent_60%),radial-gradient(60%_80%_at_0%_100%,rgba(10,30,52,0.3),transparent_60%)]" />
      <div aria-hidden className="plate-dark absolute inset-y-0 right-0 hidden w-1/3 [mask-image:linear-gradient(to_left,black,transparent)] lg:block" />
      <div className="relative z-10 mx-auto grid max-w-[88rem] grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink/75">Contacto</p>
          <h2 id="contacto-title" className="reveal mt-8">
            <span className="display block text-hero">O primeiro passo</span>
            <span className="editorial mt-1 block text-[clamp(2.75rem,6.4vw,6.5rem)] leading-[0.95]">é uma conversa.</span>
          </h2>
        </div>
        <div className="reveal lg:col-span-4">
          <p className="max-w-md text-lg leading-relaxed text-ink/80">
            Conta o teu objetivo e o teu ponto de partida. A conversa inicial serve para perceber se faz sentido
            trabalharmos juntos.
          </p>
          {/* WhatsApp é o contacto principal (mesmo por configurar); o Instagram fica como alternativa discreta. */}
          <div className="mt-8 flex flex-col items-start gap-5">
            <WhatsAppButton size="lg" variant="dark" label="Falar com o Tiago" />
            <a
              href={site.instagram.dmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-ink/35 underline-offset-8 hover:decoration-ink"
            >
              <InstagramIcon className="size-4" />
              ou envia mensagem no Instagram
              <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
