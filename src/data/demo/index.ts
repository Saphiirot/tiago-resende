/**
 * ⚠️ DADOS FICTÍCIOS DE DEMONSTRAÇÃO
 *
 * Tudo o que é exportado a partir de `src/data/demo` serve apenas para
 * representar a interface na Fase 01. Não são clientes, planos, prescrições,
 * dietas nem métricas reais. Substituir por uma camada de dados no servidor
 * (com autorização por função e por cliente) antes de qualquer uso real.
 */
export const DEMO_NOTICE = "Dados fictícios de demonstração";

/** Data de referência fixa para os ecrãs de demonstração (evita depender do relógio). */
export const DEMO_TODAY = "2026-10-20";

/** Cliente "com sessão iniciada" nas páginas /app (apenas para o protótipo). */
export const DEMO_CURRENT_CLIENT_ID = "demo-cli-01";

export * from "./clients";
export * from "./training";
export * from "./nutrition";
export * from "./videos";
export * from "./calendar";
