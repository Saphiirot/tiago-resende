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
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Título no topo da coluna; o espaço abaixo fica como espaço negativo. */}
        <div className="lg:col-span-5">
          <SectionTitle id="abordagem-title" accent="Sem comparação.">
            Sem pressa.
          </SectionTitle>
        </div>

        <ol className="border-t border-line lg:col-span-7 lg:col-start-6 lg:mt-3">
          {principles.map((p, i) => (
            <li
              key={p.word}
              className="reveal group grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 gap-y-4 border-b border-line py-9 sm:grid-cols-[3rem_minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-x-8"
            >
              <span className="pt-2 font-mono text-xs text-bronze">0{i + 1}</span>
              <h3 className="display text-d3 text-bone transition-colors duration-300 group-hover:text-bronze-bright">{p.word}</h3>
              <p className="editorial col-start-2 text-2xl leading-snug text-bone sm:col-start-3">“{p.quote}”</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
