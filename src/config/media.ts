/**
 * Inventário das imagens usadas no site (fonte única para componentes e docs/RECURSOS.md).
 *
 * Todas as imagens abaixo vêm do perfil público @tiagoresende10, não têm crédito
 * de fotógrafo ou de terceiros na publicação de origem e estão cobertas pela
 * autorização dada pelo responsável do projeto (Fase 05). Foram recortadas,
 * redimensionadas e guardadas sem metadados em `public/media/` — nunca se usam
 * URLs do CDN do Instagram.
 *
 * Imagens com crédito de terceiros (ex.: sessões de @ricardodoalmeida.media)
 * NÃO entram aqui enquanto a autorização do autor não estiver confirmada.
 */

export type MediaAuthorization =
  /** Sem crédito de terceiros; abrangida pela autorização do responsável do projeto. */
  | "autorizada-projeto"
  /** Com crédito de fotógrafo/terceiros: falta confirmar que a autorização abrange o uso comercial. */
  | "por-confirmar-autor";

export type MediaAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Ponto focal para `object-position` quando o enquadramento corta a imagem. */
  focus: string;
  /** Publicação de origem. */
  source: string;
  credit: string;
  authorization: MediaAuthorization;
};

export const media = {
  about: {
    src: "/media/tiago-sobre-em-treino.jpg",
    alt: "Tiago Resende suspenso numa barra a fazer elevação de pernas, num ginásio amplo",
    width: 1200,
    height: 1600,
    focus: "50% 35%",
    source: "https://www.instagram.com/tiagoresende10/reel/DdCUvyWRcBc/",
    credit: "@tiagoresende10",
    authorization: "autorizada-projeto",
  },
  coverBackIsBuilt: {
    src: "/media/capa-back-is-built.jpg",
    alt: "Tiago Resende de costas, em pose de dorsais, num ginásio com bolas de pilates ao fundo",
    width: 1200,
    height: 1600,
    focus: "50% 30%",
    source: "https://www.instagram.com/tiagoresende10/reel/DcrMShJR2Bq/",
    credit: "@tiagoresende10",
    authorization: "autorizada-projeto",
  },
  hero: {
    src: "/media/tiago-hero.jpg",
    alt: "Tiago Resende em pose frontal junto a uma parede do ginásio",
    width: 1200,
    height: 2133,
    focus: "50% 22%",
    source: "https://www.instagram.com/tiagoresende10/reel/DdKE8NJxw5O/",
    credit: "@tiagoresende10",
    authorization: "autorizada-projeto",
  },
  coverMirror: {
    src: "/media/capa-construido-no-silencio.jpg",
    alt: "Tiago Resende de tronco nu, a fotografar-se ao espelho num ginásio de tons grafite",
    width: 760,
    height: 950,
    focus: "38% 30%",
    source: "https://www.instagram.com/tiagoresende10/p/DcyN-egsoSj/",
    credit: "@tiagoresende10",
    authorization: "autorizada-projeto",
  },
} as const satisfies Record<string, MediaAsset>;

/** Créditos efetivamente apresentados (derivados das imagens em uso). */
export const mediaCredits = [...new Set(Object.values(media).map((m) => m.credit))];
