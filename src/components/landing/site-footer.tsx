import Link from "next/link";
import { site } from "@/config/site";
import { mediaCredits } from "@/config/media";
import { Wordmark } from "@/components/brand/wordmark";
import { InstagramIcon } from "@/components/brand/icons";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink px-4 pb-10 pt-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[88rem]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-bone-dim">
              Personal trainer · {site.location}.
              <br />
              <span className="editorial text-base text-bone">Never finished.</span>
            </p>
          </div>

          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-8 text-sm md:col-span-7 md:grid-cols-3">
            <div>
              <p className="eyebrow mb-4">Site</p>
              <ul className="space-y-2.5 text-bone-dim">
                <li><a className="hover:text-bone" href="#abordagem">Abordagem</a></li>
                <li><a className="hover:text-bone" href="#acompanhamento">Acompanhamento</a></li>
                <li><a className="hover:text-bone" href="#planos">Planos</a></li>
                <li><a className="hover:text-bone" href="#conteudos">Conteúdos</a></li>
                <li><a className="hover:text-bone" href="#faq">Perguntas</a></li>
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4">Plataforma</p>
              <ul className="space-y-2.5 text-bone-dim">
                <li><Link className="hover:text-bone" href="/login">Área de cliente</Link></li>
                <li><Link className="hover:text-bone" href="/admin/login">Acesso do treinador</Link></li>
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4">Contacto</p>
              <ul className="space-y-2.5 text-bone-dim">
                <li>
                  <a className="inline-flex items-center gap-2 hover:text-bone" href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                    <InstagramIcon className="size-4" />@{site.handle}
                  </a>
                </li>
                <li>{site.location}</li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 text-xs text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.name}</p>
          <p>
            Fotografias: {mediaCredits.join(", ")} (Instagram)
            {" · "}Política de privacidade e termos — em preparação
          </p>
        </div>
      </div>
    </footer>
  );
}
