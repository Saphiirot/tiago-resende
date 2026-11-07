import { Plus } from "lucide-react";
import { site } from "@/config/site";
import { modalities, plans } from "@/config/commercial";
import { Section, SectionTitle } from "./section";
import { LandingPending } from "./review-note";

const faqs = [
  {
    q: "Como começo?",
    a: "Com uma conversa inicial, por WhatsApp ou Instagram, para perceber os teus objetivos, a tua disponibilidade e o teu historial de treino. Segue-se a avaliação inicial e só depois o planeamento.",
  },
  {
    q: "Porque é que há uma avaliação inicial?",
    a: "Porque o plano tem de partir da tua realidade: o teu momento atual, limitações e preferências. A avaliação é feita dentro do âmbito profissional aplicável.",
  },
  {
    q: "O acompanhamento é presencial ou online?",
    a: `Depende das tuas necessidades e da tua localização. O Tiago está baseado no ${site.location}; as modalidades e as condições de cada uma estão a ser validadas.`,
    pending: modalities.some((m) => m.status !== "confirmado"),
  },
  {
    q: "Quanto custa?",
    a: "Os planos e valores ainda não estão publicados. Pede informação diretamente ao Tiago.",
    pending: plans.length === 0,
  },
  {
    q: "A alimentação está incluída?",
    a: "A componente alimentar faz parte do planeamento e é da responsabilidade do Tiago, sempre dentro do âmbito das qualificações confirmadas e dos serviços que podem ser legitimamente prestados.",
    pending: !site.nutrition.qualificationsConfirmed,
  },
  {
    q: "O que encontro na aplicação?",
    a: "O teu plano: treinos com exercícios, séries e descanso, vídeos de execução e o calendário de sessões. A aplicação está em desenvolvimento.",
  },
];

export function Faq() {
  return (
    <Section id="faq" label="Perguntas" tone="raised">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionTitle id="faq-title" size="d2">
            Antes de começar.
          </SectionTitle>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <ul className="border-t border-line">
            {faqs.map((f) => (
              <li key={f.q} className="border-b border-line">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg text-bone transition-colors hover:text-bronze-bright sm:text-xl [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full border border-line-strong transition-colors group-open:border-bronze group-open:bg-bronze group-open:text-ink"><Plus className="size-4 transition-transform duration-300 group-open:rotate-45" /></span>
                  </summary>
                  <div className="pb-6 pr-10 leading-relaxed text-bone-dim">
                    <p>{f.a}</p>
                    {f.pending ? <LandingPending title="Por confirmar com o Tiago" className="mt-4" /> : null}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
