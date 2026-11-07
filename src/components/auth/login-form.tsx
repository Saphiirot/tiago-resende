"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff, FlaskConical, LoaderCircle } from "lucide-react";
import { Field, TextInput } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { entrar } from "@/lib/auth-actions";

type Errors = Partial<Record<"email" | "password" | "code", string>>;

/**
 * Formulário de início de sessão do protótipo. A verificação é feita no servidor (`entrar`),
 * com credenciais de demonstração — ver src/lib/demo-auth.ts. Nada é guardado no navegador
 * além do cookie de sessão httpOnly.
 */
export function LoginForm({ variant }: { variant: "cliente" | "treinador" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "loading">("idle");
  const [formError, setFormError] = useState("");
  const isAdmin = variant === "treinador";

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
    setFormError("");
    entrar(variant, email, password).then((res) => {
      // Sem erro, o servidor redireciona; só chega aqui se as credenciais falharem.
      setFormError(res?.error ?? "");
      setPassword("");
      setState("idle");
    });
  }

  return (
    <div>
      <form noValidate onSubmit={onSubmit} className="space-y-5" aria-describedby={`${variant}-aviso`}>
        <Field id={`${variant}-email`} label="Email" error={errors.email}>
          <TextInput
            id={`${variant}-email`}
            type="email"
            inputMode="email"
            autoComplete="username"
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
              autoComplete="current-password"
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
        {formError ? <p className="mt-4 text-sm text-oxide">{formError}</p> : null}
      </div>

      <p id={`${variant}-aviso`} className="mt-8 flex items-start gap-2 text-xs leading-relaxed text-mute">
        <FlaskConical aria-hidden className="mt-0.5 size-3.5 shrink-0 text-bone-dim" />
        Acesso de demonstração ao protótipo: dados fictícios, sem pagamentos nem dados pessoais reais.
      </p>
    </div>
  );
}
