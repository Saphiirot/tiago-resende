/**
 * Conteúdo comercial do site: método, modalidades, planos, testemunhos e resultados.
 *
 * Fonte única para a página pública, o painel do treinador e docs/PENDENTES.md.
 * Regra: só se preenche com informação confirmada pelo Tiago. Listas vazias
 * significam "por confirmar" — os componentes tratam esse estado sem inventar
 * conteúdo (sem preços, testemunhos ou resultados de exemplo).
 */

export type ContentStatus = "confirmado" | "por-validar" | "pendente";

/**
 * Método de acompanhamento — CONFIRMADO pelo responsável do projeto (Fase 05).
 * Cinco etapas, por esta ordem. Não acrescentar etapas nem prometer resultados.
 * `detail` é texto de apresentação proposto (a validar com o Tiago).
 */
export const method = {
  status: "confirmado" as ContentStatus,
  steps: [
    {
      title: "Conversa inicial",
      detail: "Objetivos, disponibilidade e historial de treino.",
    },
    {
      title: "Avaliação inicial",
      detail: "O teu ponto de partida, dentro do âmbito profissional aplicável.",
    },
    {
      title: "Planeamento",
      detail: "Treino e alimentação, conforme as qualificações confirmadas.",
    },
    {
      title: "Acompanhamento",
      detail: "Orientado para os teus objetivos, semana a semana.",
    },
    {
      title: "Plano na aplicação",
      detail: "Treinos, vídeos de execução e calendário, sempre à mão.",
    },
  ],
} as const;

/**
 * Modalidades — POR VALIDAR. Dependem das necessidades de cada cliente e da
 * localização. Mudar `status` para "confirmado" e completar `detail` só com
 * informação dada pelo Tiago (local, disponibilidade, condições).
 */
export const modalities: { id: string; title: string; detail: string; status: ContentStatus }[] = [
  {
    id: "presencial",
    title: "Presencial",
    detail: "Treino acompanhado em pessoa. Local e disponibilidade por validar.",
    status: "por-validar",
  },
  {
    id: "online",
    title: "Online",
    detail: "Acompanhamento à distância, com o plano na aplicação. Condições por validar.",
    status: "por-validar",
  },
];

/**
 * Planos e valores — PENDENTE. Nenhum preço foi indicado: não inventar preços,
 * descontos, mensalidades nem condições contratuais. Estrutura pronta a preencher.
 */
export type Plan = {
  name: string;
  /** `id` de uma entrada em `modalities`. */
  modality: string;
  /** Valor em euros, IVA incluído; `null` = "sob consulta" (só se o Tiago o indicar). */
  price: number | null;
  /** Ex.: "mês", "sessão", "pacote de 10 sessões". */
  period: string;
  includes: string[];
  conditions?: string;
  cta: { label: string; channel: "whatsapp" | "instagram" };
};

export const plans: Plan[] = [];

/**
 * Testemunhos — PENDENTE. Só com texto real, nome (ou forma de identificação)
 * e consentimento escrito do cliente para esta finalidade. Nunca fictícios.
 */
export type Testimonial = {
  quote: string;
  author: string;
  /** Ex.: "Cliente desde 2025" — opcional e só se confirmado. */
  context?: string;
  /** Data do consentimento escrito (AAAA-MM-DD). Obrigatório para publicar. */
  consentDate: string;
};

export const testimonials: Testimonial[] = [];

/**
 * Resultados de clientes — PENDENTE. Só com consentimento escrito, imagens
 * autorizadas e sem apresentar resultados como garantidos ou típicos.
 */
export type ClientResult = {
  title: string;
  description: string;
  image?: { src: string; alt: string };
  consentDate: string;
};

export const results: ClientResult[] = [];
