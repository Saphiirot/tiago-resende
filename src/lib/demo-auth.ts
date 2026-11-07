import { createHash } from "node:crypto";

/**
 * Acesso de demonstração à área de cliente e ao painel (protótipo apresentado ao cliente).
 * Credenciais FICTÍCIAS e partilhadas. Não é autenticação de produção: sem utilizadores, sem
 * base de dados, sem limite de tentativas. Ver docs/ARQUITETURA-SEGURANCA.md para a versão real.
 *
 * O repositório só guarda o email de demonstração e a verificação (SHA-256 do SHA-256 da
 * palavra-passe), nunca a palavra-passe nem o valor do cookie.
 */
export const DEMO_EMAIL = "demo@tiagoresende.pt";
const VERIFIER = "c3414ef0e4c5a51e3a9aa61c313c53098f1d65b2315b8fb7d78fdc92b765d659";

export const SESSION_COOKIE = "tr_demo";

const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");

/** Valor do cookie de sessão para uma palavra-passe. */
export const sessionToken = (password: string) => sha256(`tr-demo:${password}`);

export const isValidSession = (token: string | undefined) => !!token && sha256(token) === VERIFIER;

export const isValidLogin = (email: string, password: string) =>
  email.trim().toLowerCase() === DEMO_EMAIL && isValidSession(sessionToken(password));
