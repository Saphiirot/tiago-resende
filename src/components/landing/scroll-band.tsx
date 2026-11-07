/** Faixa decorativa que corre na horizontal com o scroll e liga "O treinador" à "Abordagem". Palavras da legenda do Tiago. */
export function ScrollBand() {
  const words = ["Disciplina", "Consistência", "Densidade", "Separação", "Proporção"];
  return (
    <div aria-hidden className="relative z-10 overflow-hidden bg-ink py-6 sm:py-10">
      <p className="slide-x display flex w-max gap-10 whitespace-nowrap text-[clamp(3.5rem,11vw,9rem)] text-transparent [-webkit-text-stroke:1px_var(--color-line-strong)]">
        {[...words, ...words].map((w, i) => (
          <span key={i} className={i % 5 === 0 ? "text-bronze [-webkit-text-stroke:0]" : ""}>
            {w}
          </span>
        ))}
      </p>
    </div>
  );
}
