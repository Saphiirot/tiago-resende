"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import { cn } from "@/lib/cn";

const links = [
  { href: "#abordagem", label: "Abordagem" },
  { href: "#acompanhamento", label: "Acompanhamento" },
  { href: "#planos", label: "Planos" },
  { href: "#conteudos", label: "Conteúdos" },
  { href: "#faq", label: "Perguntas" },
];

export function SiteHeader({ whatsapp }: { whatsapp: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-line bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-18 max-w-[88rem] items-center justify-between gap-6 px-4 sm:px-8 lg:px-12">
        <Wordmark />

        <nav aria-label="Secções" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm text-bone-dim xl:gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-bone">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/login" className="whitespace-nowrap rounded-full px-3 py-2 text-sm text-bone-dim transition-colors hover:text-bone">
            Área de cliente
          </Link>
          {whatsapp}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-movel"
          className="grid size-11 place-items-center rounded-full border border-line-strong text-bone lg:hidden"
        >
          {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
        </button>
      </div>

      <div
        id="menu-movel"
        hidden={!open}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-ink px-4 pb-10 pt-6 sm:px-8 lg:hidden"
      >
        <nav aria-label="Secções">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href} className="border-b border-line">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-5"
                >
                  <span className="display text-5xl text-bone">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 flex flex-col gap-3">
          {whatsapp}
          <Link href="/login" onClick={() => setOpen(false)} className="py-2 text-sm text-bone-dim underline-offset-4 hover:underline">
            Entrar na área de cliente
          </Link>
        </div>
      </div>
    </header>
  );
}
