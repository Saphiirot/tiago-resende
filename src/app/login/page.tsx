import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Wordmark } from "@/components/brand/wordmark";
import { MediaFrame } from "@/components/ui/media-frame";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Entrar · Área de cliente",
  robots: { index: false, follow: false },
};

export default function ClientLoginPage() {
  return (
    <main id="conteudo" className="grid grid-cols-1 min-h-dvh lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <div className="relative hidden lg:block">
        <div className="absolute inset-0">
          <MediaFrame alt="Tiago Resende em treino" label="Em treino — plano aberto" brief="Vertical, luz natural do ginásio; espaço livre em baixo para o texto." ratio="3:4" labelPosition="top" className="h-full w-full" sizes="55vw" />
        </div>
        <div className="absolute inset-x-0 bottom-10 z-10 p-12">
          <p className="display text-d1 text-bone">Never<br />finished.</p>
          <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-bone/60">Área de cliente · Tiago Resende</p>
        </div>
      </div>

      <div className="flex flex-col px-4 py-8 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          <Wordmark />
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-bone-dim hover:text-bone">
            <ArrowLeft aria-hidden className="size-4" /> Site
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-16">
          <p className="eyebrow">Área de cliente</p>
          <h1 className="display mt-3 text-6xl text-bone">De volta<br />ao treino.</h1>
          <p className="mt-4 text-bone-dim">Entra para veres os teus treinos, vídeos e calendário.</p>
          <div className="mt-10">
            <LoginForm variant="cliente" />
          </div>
        </div>

        <p className="text-center text-xs text-mute">
          Ainda não és cliente? <Link href="/#contacto" className="text-bone-dim underline underline-offset-4 hover:text-bone">Fala com o Tiago</Link>
        </p>
      </div>
    </main>
  );
}
