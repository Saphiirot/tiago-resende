import { ArrowUpRight, Check } from "lucide-react";
import { site } from "@/config/site";
import { modalities, plans, type Plan } from "@/config/commercial";
import { WhatsAppButton } from "@/components/brand/contact-buttons";
import { InstagramIcon } from "@/components/brand/icons";
import { Section, SectionTitle } from "./section";
import { LandingPending } from "./review-note";

const price = new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

/**
 * Modalidades e planos. Conteúdo vindo de src/config/commercial.ts:
 * sem planos configurados mostra apenas o pedido de informação — nunca preços de exemplo.
 */
export function Plans() {
  return (
    <Section id="planos" label="Modalidades e planos" tone="bone">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle id="planos-title">Formato e valores.</SectionTitle>
        <p className="reveal max-w-sm text-lg leading-relaxed text-ink/80">
          A modalidade depende das tuas necessidades e da tua localização — é um dos pontos da conversa inicial.
        </p>
      </div>

      {/* Painéis divididos: em ecrãs largos o que tem o rato por cima expande-se. */}
      <ul className="mt-14 flex flex-col gap-4 lg:h-[26rem] lg:flex-row">
        {modalities.map((m, i) => (
          <li
            key={m.id}
            className="group relative flex min-h-[16rem] flex-1 flex-col justify-between overflow-hidden rounded-[var(--radius-media)] bg-ink p-7 text-bone transition-[flex-grow] duration-700 ease-[var(--ease-out-expo)] lg:p-10 lg:hover:flex-[1.5]"
          >
            <span aria-hidden className="display absolute -bottom-10 -right-2 text-[clamp(10rem,18vw,18rem)] leading-none text-transparent [-webkit-text-stroke:1px_var(--color-line-strong)] transition-transform duration-700 group-hover:-translate-y-3">
              {i === 0 ? "A" : "B"}
            </span>
            {m.status !== "confirmado" ? (
              <span className="relative w-fit rounded-full border border-dashed border-bone/40 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-bone-dim">
                {m.status === "por-validar" ? "Por validar" : "Pendente"}
              </span>
            ) : <span />}
            <div className="relative">
              <h3 className="display text-d1">{m.title}</h3>
              <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-bone-dim">{m.detail}</p>
            </div>
          </li>
        ))}
      </ul>

      {plans.length > 0 ? (
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => (
            <li key={p.name}>
              <PlanCard plan={p} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="reveal mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink/70">Planos e valores</p>
            <p className="mt-3 max-w-lg text-[1.0625rem] leading-relaxed text-ink">
              Ainda não estão publicados. Para saber valores e disponibilidade, pede informação diretamente ao Tiago.
            </p>
            <div className="mt-7 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
              <WhatsAppButton variant="dark" label="Pedir informação" />
              <InstagramDmLink />
            </div>
          </div>
          <LandingPending tone="light" title="Planos, preços e condições" className="lg:col-span-6 lg:self-start">
            Campos previstos: nome do plano, modalidade, preço, periodicidade, o que inclui, condições e chamada para
            ação. Configurar em <code className="font-mono text-xs">plans</code> (src/config/commercial.ts) só com
            valores indicados pelo Tiago.
          </LandingPending>
        </div>
      )}
    </Section>
  );
}

function InstagramDmLink() {
  return (
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
  );
}

/** Cartão de plano — só é usado quando existirem planos confirmados em `plans`. */
function PlanCard({ plan }: { plan: Plan }) {
  const modality = modalities.find((m) => m.id === plan.modality);
  return (
    <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-ink/15 bg-bone/60 p-6">
      <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink/70">{modality?.title ?? plan.modality}</p>
      <h3 className="display mt-2 text-d3 text-ink">{plan.name}</h3>
      <p className="mt-4 text-ink">
        {plan.price === null ? (
          <span className="text-lg font-medium">Sob consulta</span>
        ) : (
          <>
            <span className="display text-4xl">{price.format(plan.price)}</span>
            <span className="text-sm text-ink/70"> / {plan.period}</span>
          </>
        )}
      </p>
      {plan.includes.length > 0 ? (
        <ul className="mt-5 space-y-2 text-sm text-ink/80">
          {plan.includes.map((item) => (
            <li key={item} className="flex gap-2">
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-ink/60" />
              {item}
            </li>
          ))}
        </ul>
      ) : null}
      {plan.conditions ? <p className="mt-5 text-xs leading-relaxed text-ink/70">{plan.conditions}</p> : null}
      <div className="mt-auto pt-6">
        {plan.cta.channel === "whatsapp" ? <WhatsAppButton variant="dark" size="md" label={plan.cta.label} /> : <InstagramDmLink />}
      </div>
    </article>
  );
}
