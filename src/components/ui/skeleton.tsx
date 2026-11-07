/** Estado de carregamento das páginas de detalhe (enquanto os parâmetros da rota são resolvidos). */
export function DetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="A carregar" className="animate-pulse space-y-6">
      <div className="h-4 w-32 rounded-full bg-ink-3" />
      <div className="h-16 w-3/4 max-w-xl rounded-xl bg-ink-3" />
      <div className="flex gap-2">
        <div className="h-6 w-20 rounded-full bg-ink-3" />
        <div className="h-6 w-24 rounded-full bg-ink-3" />
      </div>
      <div className="h-72 rounded-[var(--radius-card)] bg-ink-2" />
    </div>
  );
}
