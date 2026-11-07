/**
 * Configuração central da marca e dos contactos.
 *
 * Apenas informação confirmada no perfil público de Instagram
 * (@tiagoresende10, consultado a 2026-10-20) está preenchida.
 * Campos vazios / `null` estão pendentes de confirmação — ver docs/PENDENTES.md.
 * Método, modalidades, planos e testemunhos: src/config/commercial.ts.
 * Imagens: src/config/media.ts.
 */
export const site = {
  name: "Tiago Resende",
  handle: "tiagoresende10",
  /** Confirmado: localização indicada na biografia do Instagram ("📍Porto"). */
  location: "Porto",
  description:
    "Personal trainer no Porto. Treino de musculação, disciplina e consistência — acompanhamento com plano, vídeos e calendário numa plataforma própria.",

  instagram: {
    url: "https://www.instagram.com/tiagoresende10/",
    /** Ligação de mensagem direta do Instagram (perfil público com botão "Enviar mensagem"). */
    dmUrl: "https://ig.me/m/tiagoresende10",
  },

  whatsapp: {
    /**
     * Número indicado pelo responsável do projeto (2026-11-07): +351 912 086 476.
     * Formato internacional, só dígitos. Se ficar vazio, o botão passa ao estado
     * "por configurar" e nunca gera uma ligação.
     */
    number: "351912086476",
    defaultMessage:
      "Olá Tiago! Vi o teu site e gostava de saber mais sobre o acompanhamento.",
  },

  /** PENDENTE: email profissional não publicado. */
  email: null as string | null,

  /**
   * PENDENTE: formação, certificações e cédula profissional.
   * Não foram apresentadas no perfil. Não preencher sem documento de suporte.
   */
  credentials: [] as string[],

  /**
   * Componente alimentar. CONFIRMADO: é da responsabilidade do Tiago.
   * PENDENTE: as qualificações que definem o âmbito dessa responsabilidade.
   * Enquanto `qualificationsConfirmed` for falso: não apresentar o Tiago como
   * nutricionista, não anunciar consultas de nutrição nem dietas individuais
   * e manter o módulo de plano alimentar como estrutura de demonstração.
   */
  nutrition: {
    responsible: "Tiago Resende",
    qualificationsConfirmed: false,
    /** Âmbito confirmado (ex.: título e entidade emissora). `null` até haver documento de suporte. */
    scope: null as string | null,
  },

  /**
   * Protótipo: mostra notas de revisão (textos propostos, conteúdos por
   * confirmar) diretamente na página pública. Desligar antes de publicar.
   */
  prototype: {
    showReviewNotes: false,
  },

  /**
   * Fotógrafo creditado nas sessões "PRIME" / "SECOND ROUND" / "PRIMEIRO CAPÍTULO".
   * Nenhuma dessas imagens é usada: falta confirmar que a autorização abrange o
   * uso comercial (ver src/config/media.ts e docs/RECURSOS.md).
   */
  photoCredit: {
    name: "@ricardodoalmeida.media",
    url: "https://www.instagram.com/ricardodoalmeida.media/",
  },
} as const;

export type SiteConfig = typeof site;
