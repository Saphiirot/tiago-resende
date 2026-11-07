"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const $ = <T extends Element>(sel: string) => document.querySelector<T>(sel);
const $$ = <T extends Element>(sel: string) => gsap.utils.toArray<T>(sel);

/**
 * Camada de movimento da página pública (GSAP + ScrollTrigger + SplitText, Lenis).
 * Os componentes continuam no servidor; aqui só se procuram os elementos por `data-m`.
 * Com `prefers-reduced-motion: reduce` não há scroll suave nem animações (só se revela o texto).
 */
export function LandingMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".m-hide", { opacity: 1 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Scroll suave sincronizado com o ScrollTrigger.
      const lenis = new Lenis({ anchors: true, lerp: 0.1 });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);

      // Título do hero: caracteres sobem de uma máscara.
      gsap.set(".m-hide", { opacity: 1 });
      $$<HTMLElement>("#hero-title > span").forEach((line, i) => {
        // Sem máscara: cortaria os acentos (Í, ê).
        const split = SplitText.create(line, { type: "chars" });
        gsap.from(split.chars, { yPercent: 60, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.035, delay: 0.15 + i * 0.25 });
      });
      gsap.from("[data-m=hero-in]", { y: 24, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.12, delay: 0.9 });

      // Citação: palavras acendem-se com o scroll.
      const quote = $<HTMLElement>("[data-m=words]");
      if (quote) {
        const split = SplitText.create(quote, { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.14 },
          { opacity: 1, stagger: 0.12, ease: "none", scrollTrigger: { trigger: quote, start: "top 82%", end: "bottom 50%", scrub: true } },
        );
      }

      // Profundidade: cada elemento sobe/desce a uma velocidade diferente.
      $$<HTMLElement>("[data-parallax]").forEach((el) => {
        const v = Number(el.dataset.parallax);
        gsap.fromTo(el, { y: v }, { y: -v, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // Abordagem: cada cartão recua quando o seguinte o cobre.
      const cards = $$<HTMLElement>("[data-m=stack] > li");
      cards.slice(0, -1).forEach((card, i) => {
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.45,
          ease: "none",
          scrollTrigger: { trigger: cards[i + 1], start: "top 80%", end: "top 20%", scrub: true },
        });
      });

      // Botões magnéticos (só com rato).
      mm.add("(hover: hover)", () => {
        const cleanups = $$<HTMLElement>("[data-m=magnet]").map((el) => {
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            gsap.to(el, { x: (e.clientX - (r.left + r.width / 2)) * 0.25, y: (e.clientY - (r.top + r.height / 2)) * 0.35, duration: 0.4, ease: "power3.out" });
          };
          const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          return () => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          };
        });
        return () => cleanups.forEach((c) => c());
      });

      // Processo: faixa horizontal fixada (só em ecrãs largos).
      mm.add("(min-width: 1024px)", () => {
        const wrap = $<HTMLElement>("[data-m=hscroll]");
        const track = $<HTMLElement>("[data-m=track]");
        if (!wrap || !track) return;
        const dist = () => Math.max(0, track.scrollWidth - wrap.clientWidth);
        gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: { trigger: wrap, pin: true, scrub: 0.6, start: "top 72px", end: () => `+=${dist()}`, invalidateOnRefresh: true },
        });
        gsap.fromTo(
          "[data-m=hbar]",
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { trigger: wrap, scrub: true, start: "top 72px", end: () => `+=${dist()}`, invalidateOnRefresh: true } },
        );
      });

      return () => {
        window.removeEventListener("load", refresh);
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    return () => mm.revert();
  }, []);

  return null;
}
