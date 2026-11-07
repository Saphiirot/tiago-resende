"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff, FlaskConical, LoaderCircle } from "lucide-react";
import { Field, TextInput } from "@/components/ui/form";
import { Button, buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type Errors = Partial<Record<"email" | "password" | "code", string>>;

/**
 * Formulário de início de sessão EXCLUSIVAMENTE VISUAL.
 * - Não envia dados para nenhum servidor (sem `action`, sem fetch).
 * - Não guarda nada no navegador (sem cookies, localStorage ou sessionStorage).
 * - Limpa a palavra-passe após a submissão de demonstração.
 * A autenticação real deverá ser validada no servidor — ver docs/ARQUITETURA-SEGURANCA.md.
 */
export function LoginForm({ variant }: { variant: "cliente" | "treinador" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const isAdmin = variant === "treinador";
  const prototypeHref = isAdmin ? "/admin" : "/app";

  function validate(): Errors {
    const e: Errors = {};
    if (!email.trim()) e.email = "Indica o teu email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Formato de email inválido.";
    if (!password) e.password = "Indica a palavra-passe.";
    else if (password.length < 8) e.password = "Mínimo de 8 caracteres (exemplo de validação).";
    if (isAdmin && code && !/^\d{6}$/.test(code)) e.code = "O código tem 6 dígitos.";
    return e;
  }

  function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      document.getElementById(`${variant}-${first}`)?.focus();
      return;
    }
    setState("loading");
    setTimeout(() => {
      setPassword("");
      setCode("");
      setState("done");
    }, 1100);
  }

  return (
    <div>
      <form noValidate onSubmit={onSubmit} className="space-y-5" aria-describedby={`${variant}-aviso`}>
        <Field id={`${variant}-email`} label="Email" error={errors.email}>
          <TextInput
            id={`${variant}-email`}
            type="email"
            inputMode="email"
            autoComplete="off"
            placeholder={isAdmin ? "treinador@dominio.pt" : "o.teu@email.pt"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            invalid={!!errors.email}
            aria-describedby={errors.email ? `${variant}-email-error` : undefined}
          />
        </Field>

        <Field id={`${variant}-password`} label="Palavra-passe" error={errors.password}>
          <div className="relative">
            <TextInput
              id={`${variant}-password`}
              type={show ? "text" : "password"}
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              invalid={!!errors.password}
              aria-describedby={errors.password ? `${variant}-password-error` : undefined}
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute right-1.5 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-mute hover:text-bone"
              aria-label={show ? "Ocultar palavra-passe" : "Mostrar palavra-passe"}
              aria-pressed={show}
            >
              {show ? <EyeOff aria-hidden className="size-4" /> : <Eye aria-hidden className="size-4" />}
            </button>
          </div>
        </Field>

        {isAdmin ? (
          <Field id={`${variant}-code`} label="Código de verificação" hint="Opcional nesta demonstração — preparado para verificação em dois passos." error={errors.code}>
            <TextInput
              id={`${variant}-code`}
              inputMode="numeric"
              autoComplete="off"
              maxLength={6}
              placeholder="000000"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              invalid={!!errors.code}
              className="font-mono tracking-[0.4em]"
            />
          </Field>
        ) : (
          <div className="flex justify-end">
            <span className="text-sm text-mute" title="Recuperação de palavra-passe por implementar">
              Esqueceste a palavra-passe? <span className="font-mono text-[0.625rem] uppercase tracking-wider">(em breve)</span>
            </span>
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          variant={isAdmin ? "light" : "primary"}
          className="w-full"
          disabled={state === "loading"}
          iconRight={state === "loading" ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : <ArrowRight aria-hidden className="size-4" />}
        >
          {state === "loading" ? "A verificar…" : "Entrar"}
        </Button>
      </form>

      <div aria-live="polite">
        {state === "done" ? (
          <div className="mt-6 rounded-xl border border-dashed border-line-strong bg-ink-3/60 p-4 text-sm">
            <p className="font-medium text-bone">Autenticação ainda não implementada.</p>
            <p className="mt-1 text-bone-dim">Nenhum dado foi enviado nem guardado. Podes continuar a navegar pelo protótipo.</p>
            <Link href={prototypeHref} className={cn(buttonClasses({ variant: "secondary", size: "sm" }), "mt-4")}>
              Continuar para o protótipo <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        ) : null}
      </div>

      <p id={`${variant}-aviso`} className="mt-8 flex items-start gap-2 text-xs leading-relaxed text-mute">
        <FlaskConical aria-hidden className="mt-0.5 size-3.5 shrink-0 text-bone-dim" />
        Ecrã de demonstração: a validação é apenas visual e nenhuma credencial é verificada ou armazenada.
      </p>
    </div>
  );
}
