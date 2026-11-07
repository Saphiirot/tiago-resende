import { results, testimonials } from "@/config/commercial";
import { Section } from "./section";

/**
 * Testemunhos e resultados de clientes. Só é apresentado quando existir conteúdo
 * real com consentimento escrito em src/config/commercial.ts — sem dados, não
 * ocupa espaço na página (a falta é assinalada em docs/PENDENTES.md e no painel).
 */
export function Testimonials() {
  const published = testimonials.filter((t) => t.consentDate);
  const publishedResults = results.filter((r) => r.consentDate);
  if (published.length === 0 && publishedResults.length === 0) return null;

  return (
    <Section id="testemunhos" label="Testemunhos">
      <h2 id="testemunhos-title" className="sr-only">
        Testemunhos de clientes
      </h2>
      <ul className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2">
        {published.map((t) => (
          <li key={t.author} className="reveal">
            <figure>
              <blockquote className="editorial text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.08] text-bone">“{t.quote}”</blockquote>
              <figcaption className="mt-5 text-sm text-bone-dim">
                <span className="font-medium text-bone">{t.author}</span>
                {t.context ? <> · {t.context}</> : null}
              </figcaption>
            </figure>
          </li>
        ))}
        {publishedResults.map((r) => (
          <li key={r.title} className="reveal">
            <h3 className="display text-d3 text-bone">{r.title}</h3>
            <p className="mt-3 max-w-md leading-relaxed text-bone-dim">{r.description}</p>
          </li>
        ))}
      </ul>
      <p className="mt-12 text-xs text-mute">Publicado com o consentimento escrito de cada cliente. Cada percurso é individual.</p>
    </Section>
  );
}
