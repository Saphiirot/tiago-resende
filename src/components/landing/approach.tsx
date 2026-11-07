import { Section, SectionTitle } from "./section";

// Citações reais (legendas do Instagram).
const principles = [
  {
    word: "Disciplina",
    quote: "Sem desculpas. Sem atalhos. Sem dias perdidos.",
  },
  {
    word: "Consistência",
    quote: "…e, acima de tudo, consistência.",
  },
  {
    word: "O teu ritmo",
    quote: "Sem pressa. Sem comparação.",
  },
  {
    word: "Mentalidade",
    quote: "Não pelo físico que conquistei, mas pelo homem que me tornei.",
  },
];

export function Approach() {
  return (
    <Section id="abordagem" label="Abordagem" tone="raised">
      <SectionTitle id="abordagem-title" accent="Sem comparação.">
        Sem pressa.
      </SectionTitle>

      {/* Cartões empilhados: cada um fica fixo e é coberto pelo seguinte (ver landing-motion.tsx). */}
      <ol data-m="stack" className="mt-14 space-y-6 lg:mt-20">
        {principles.map((p, i) => (
          <li
            key={p.word}
            style={{ top: `${5.5 + i * 0.75}rem` }}
            className="sticky grid min-h-[16rem] origin-top grid-cols-1 content-between gap-10 overflow-hidden rounded-[var(--radius-media)] border border-line-strong bg-ink-3 p-7 sm:p-10 lg:min-h-[19rem] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:p-12"
          >
            <span aria-hidden className="display absolute -right-4 -top-6 text-[clamp(9rem,22vw,20rem)] leading-none text-transparent [-webkit-text-stroke:1px_var(--color-line-strong)]">
              0{i + 1}
            </span>
            <h3 className="display relative text-d1 text-bone">{p.word}</h3>
            <p className="editorial relative self-end text-[clamp(1.5rem,2.4vw,2.25rem)] leading-snug text-bone-dim lg:text-right">
              “{p.quote}”
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
