import { site } from "@/config/site";
import { WhatsAppButton } from "@/components/brand/contact-buttons";
import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { About } from "@/components/landing/about";
import { Approach } from "@/components/landing/approach";
import { Coaching } from "@/components/landing/coaching";
import { Plans } from "@/components/landing/plans";
import { Journal } from "@/components/landing/journal";
import { Testimonials } from "@/components/landing/testimonials";
import { Faq } from "@/components/landing/faq";
import { FinalCta } from "@/components/landing/final-cta";
import { SiteFooter } from "@/components/landing/site-footer";

export default function HomePage() {
  return (
    <>
      {site.prototype.showReviewNotes ? (
        <p className="border-b border-line bg-ink-2 px-4 py-2 text-center font-mono text-[0.625rem] uppercase tracking-[0.16em] text-mute">
          Protótipo · conteúdos em validação
        </p>
      ) : null}
      <SiteHeader whatsapp={<WhatsAppButton size="sm" label="WhatsApp" showPendingHint={false} />} />
      <main id="conteudo">
        <Hero />
        <About />
        <Approach />
        <Coaching />
        <Plans />
        <Journal />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
