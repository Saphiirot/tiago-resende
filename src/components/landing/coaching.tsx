import { method } from "@/config/commercial";
import { Section, SectionTitle } from "./section";

export function Coaching() {
  return (
    <Section id="acompanhamento" label="Acompanhamento">
      <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
        <SectionTitle id="acompanhamento-title" className="lg:col-span-7">
          Um processo simples.
        </SectionTitle>
        <p className="reveal max-w-md text-lg leading-relaxed text-bone-dim lg:col-span-4 lg:col-start-9">
          <span className="text-bone">Um plano que é teu.</span> Perceber primeiro, planear depois.
        </p>
      </div>

      {/* Linha temporal — etapas confirmadas em src/config/commercial.ts (não acrescentar etapas). */}
      <ol className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5 lg:gap-8">
        <span aria-hidden className="absolute left-0 right-0 top-[1.1875rem] hidden h-px bg-line-strong lg:block" />
        {method.steps.map((s, i) => (
          <li key={s.title} className="reveal relative">
            <span className="relative z-10 grid size-10 place-items-center rounded-full border border-line-strong bg-ink font-mono text-xs text-bronze">
              0{i + 1}
            </span>
            <h3 className="display mt-6 text-d3 text-bone lg:text-[clamp(1.5rem,2.1vw,2.25rem)]">{s.title}</h3>
            <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-bone-dim">{s.detail}</p>
          </li>
        ))}
      </ol>

      <div className="mt-24 grid grid-cols-1 gap-14 lg:mt-32 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="reveal lg:col-span-5">
          <p className="eyebrow">A aplicação · em desenvolvimento</p>
          <h3 className="display mt-4 text-d2">Tudo num só lugar.</h3>
          <p className="mt-5 max-w-md leading-relaxed text-bone-dim">
            O que treinar em cada dia, como executar e quando é a próxima sessão. Tudo na aplicação.
          </p>
        </div>

        <div className="reveal lg:col-span-6 lg:col-start-7">
          <AppPreview />
        </div>
      </div>

    </Section>
  );
}

/** Pré-visualização ilustrativa da área de cliente (sem dados reais). */
function AppPreview() {
  const rows: [string, number, string, string][] = [
    ["Puxada à frente", 4, "10–12", "90 s"],
    ["Remada com barra", 4, "8–10", "2 min"],
    ["Remada unilateral", 3, "10", "75 s"],
    ["Pullover na polia", 3, "12–15", "60 s"],
  ];
  return (
    <figure className="relative">
      <div aria-hidden className="absolute -inset-10 -z-10 bg-[radial-gradient(55%_55%_at_60%_45%,rgba(207,138,79,0.14),transparent_70%)]" />
      <div className="overflow-hidden rounded-[var(--radius-media)] border border-line-strong bg-ink shadow-[var(--shadow-lift)]" aria-hidden>
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <span className="flex items-center gap-2.5">
            <span className="display grid size-7 place-items-center rounded-full bg-bronze text-xs text-ink">TR</span>
            <span className="text-sm text-bone-dim">Área de cliente</span>
          </span>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-mute">Sexta · 18:30</span>
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex items-end gap-5">
            <span className="display text-[5.5rem] leading-[0.75] text-bronze">A</span>
            <div>
              <p className="eyebrow">Próximo treino</p>
              <p className="display mt-1.5 text-4xl text-bone sm:text-5xl">Costas & Bíceps</p>
            </div>
          </div>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {rows.map(([n, sets, reps, rest], i) => (
              <li key={n} className="flex items-center gap-4 py-3.5 text-sm">
                <span className="w-5 font-mono text-xs text-mute">0{i + 1}</span>
                <span className="flex-1 text-bone">{n}</span>
                <span className="hidden gap-1 sm:flex">
                  {Array.from({ length: sets }, (_, k) => (
                    <span key={k} className="h-3 w-1 rounded-full bg-bone/35" />
                  ))}
                </span>
                <span className="w-14 text-right font-mono text-xs text-bone-dim">{reps}</span>
                <span className="w-12 text-right font-mono text-xs text-mute">{rest}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-mute">
        Ilustração da interface · dados fictícios
      </figcaption>
    </figure>
  );
}
