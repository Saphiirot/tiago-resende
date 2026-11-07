"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Ellipsis, FlaskConical, LogOut, X } from "lucide-react";
import { Monogram, Wordmark } from "@/components/brand/wordmark";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/cn";
import { isActive, shellConfig, type ShellArea } from "./nav-config";

interface ShellUser {
  name: string;
  initials: string;
  caption: string;
}

/**
 * Estrutura comum à área de cliente e ao painel do treinador.
 * Protótipo: não há sessão — o utilizador apresentado é fictício.
 */
export function AppShell({ area, user, children }: { area: ShellArea; user: ShellUser; children: ReactNode }) {
  const cfg = shellConfig[area];
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const accent = area === "cliente" ? "text-bronze-bright" : "text-bone";
  const exitHref = area === "cliente" ? "/login" : "/admin/login";

  // Fecha a folha "Mais" sempre que a rota muda.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMoreOpen(false);
  }

  useEffect(() => {
    if (!moreOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMoreOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [moreOpen]);

  const groups = Object.entries(
    cfg.nav.reduce<Record<string, typeof cfg.nav>>((acc, n) => {
      const g = n.group ?? "";
      (acc[g] ??= []).push(n);
      return acc;
    }, {}),
  ).map(([g, items]) => [g || null, items] as const);

  const primary = cfg.nav.filter((n) => cfg.mobilePrimary.includes(n.href));
  const secondary = cfg.nav.filter((n) => !cfg.mobilePrimary.includes(n.href));
  const moreActive = secondary.some((n) => isActive(pathname, n));

  return (
    <div className="min-h-dvh bg-ink lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
      {/* Barra lateral — desktop */}
      <aside className="sticky top-0 hidden h-dvh flex-col border-r border-line bg-ink-2 px-5 py-6 lg:flex">
        <Wordmark href={cfg.home} suffix={cfg.label} />

        <nav aria-label={cfg.label} className="-mx-1 mt-10 flex-1 overflow-y-auto px-1">
          {groups.map(([group, items]) => (
            <div key={group ?? "main"} className="mb-6">
              {group ? <p className="eyebrow mb-2 px-3 text-[0.625rem]">{group}</p> : null}
              <ul className="space-y-0.5">
                {items.map((item) => {
                  const active = isActive(pathname, item);
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                          active ? "bg-ink-4 font-medium text-bone" : "text-bone-dim hover:bg-ink-3 hover:text-bone",
                        )}
                      >
                        {active ? (
                          <span aria-hidden className={cn("absolute -left-5 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full", area === "cliente" ? "bg-bronze" : "bg-bone")} />
                        ) : null}
                        <Icon aria-hidden className={cn("size-[1.15rem] transition-colors", active ? accent : "text-mute group-hover:text-bone-dim")} />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <PrototypeCard />

        <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
          <Avatar initials={user.initials} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-bone">{user.name}</p>
            <p className="truncate text-xs text-mute">{user.caption}</p>
          </div>
          <Link href={exitHref} className="grid size-9 place-items-center rounded-full text-mute hover:bg-ink-4 hover:text-bone" title="Sair do protótipo">
            <LogOut aria-hidden className="size-4" />
            <span className="sr-only">Sair do protótipo</span>
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        {/* Barra superior — mobile */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-line bg-ink/90 px-4 backdrop-blur-md lg:hidden">
          <Link href={cfg.home} className="flex items-center gap-2.5" aria-label={`${cfg.label} — início`}>
            <Monogram className="size-8 text-sm" />
            <span className="eyebrow text-bone-dim">{cfg.label}</span>
          </Link>
          {area === "cliente" ? (
            <Link href="/app/perfil" aria-label="Perfil">
              <Avatar initials={user.initials} size="sm" />
            </Link>
          ) : (
            <Avatar initials={user.initials} size="sm" />
          )}
        </header>

        <div role="note" className="flex items-center justify-center gap-2 border-b border-line bg-ink-2 px-4 py-1.5 text-center font-mono text-[0.625rem] uppercase tracking-[0.14em] text-mute">
          <FlaskConical aria-hidden className="size-3 text-bone-dim" />
          Protótipo sem autenticação · dados fictícios
        </div>

        <main id="conteudo" className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-8 sm:px-8 lg:pb-16 lg:pt-12">
          {children}
        </main>
      </div>

      {/* Navegação inferior — mobile */}
      <nav aria-label={`${cfg.label} (móvel)`} className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
        <ul className="mx-auto grid max-w-lg grid-cols-5">
          {primary.map((item) => {
            const active = isActive(pathname, item);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn("relative flex h-16 flex-col items-center justify-center gap-1 text-[0.6875rem]", active ? accent : "text-mute")}
                >
                  {active ? <span aria-hidden className={cn("absolute top-0 h-[2px] w-8 rounded-b-full", area === "cliente" ? "bg-bronze" : "bg-bone")} /> : null}
                  <Icon aria-hidden className="size-5" />
                  {item.short ?? item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              type="button"
              aria-expanded={moreOpen}
              aria-controls="shell-mais"
              onClick={() => setMoreOpen((v) => !v)}
              className={cn("flex h-16 w-full flex-col items-center justify-center gap-1 text-[0.6875rem]", moreActive || moreOpen ? accent : "text-mute")}
            >
              {moreOpen ? <X aria-hidden className="size-5" /> : <Ellipsis aria-hidden className="size-5" />}
              Mais
            </button>
          </li>
        </ul>
      </nav>

      {moreOpen ? (
        <div className="fixed inset-0 z-30 lg:hidden">
          <button type="button" aria-label="Fechar" className="absolute inset-0 bg-black/60" onClick={() => setMoreOpen(false)} />
          <div id="shell-mais" className="absolute inset-x-0 bottom-16 animate-rise rounded-t-3xl border-t border-line bg-ink-2 px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5">
            <ul className="space-y-1">
              {secondary.map((item) => {
                const Icon = item.icon;
                const active = isActive(pathname, item);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn("flex items-center gap-3 rounded-xl px-3 py-3.5 text-base", active ? "bg-ink-4 text-bone" : "text-bone-dim")}
                    >
                      <Icon aria-hidden className={cn("size-5", active ? accent : "text-mute")} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="border-t border-line pt-1">
                <Link href={exitHref} className="flex items-center gap-3 rounded-xl px-3 py-3.5 text-base text-bone-dim">
                  <LogOut aria-hidden className="size-5 text-mute" />
                  Sair do protótipo
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PrototypeCard() {
  return (
    <p className="flex items-start gap-2 rounded-xl border border-dashed border-line-strong px-3 py-2.5 text-xs leading-relaxed text-mute">
      <FlaskConical aria-hidden className="mt-0.5 size-3.5 shrink-0 text-bone-dim" />
      <span>
        <span className="text-bone-dim">Protótipo.</span> Sem autenticação nem gravação de dados.
      </span>
    </p>
  );
}
