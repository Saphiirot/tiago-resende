import { ButtonLink } from "@/components/ui/button";
import { Wordmark } from "@/components/brand/wordmark";

export default function NotFound() {
  return (
    <main id="conteudo" className="relative flex min-h-dvh flex-col overflow-hidden px-4 py-8 sm:px-10">
      <Wordmark />
      <div className="relative mx-auto flex max-w-xl flex-1 flex-col items-start justify-center">
        <p className="eyebrow">Erro 404</p>
        <h1 className="display mt-4 text-d1 text-bone">Página não<br />encontrada.</h1>
        <p className="mt-5 text-bone-dim">O endereço pode estar errado ou o conteúdo já não existir.</p>
        <ButtonLink href="/" className="mt-8">Voltar ao início</ButtonLink>
      </div>
    </main>
  );
}
