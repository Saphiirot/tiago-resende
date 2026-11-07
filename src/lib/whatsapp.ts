import { site } from "@/config/site";

/**
 * Devolve a ligação wa.me apenas quando existe um número configurado e com
 * formato plausível (8–15 dígitos, E.164 sem "+"). Caso contrário devolve
 * `null` — nunca se gera uma ligação inválida.
 */
export function getWhatsAppHref(message: string = site.whatsapp.defaultMessage) {
  const digits = site.whatsapp.number.replace(/\D/g, "");
  if (!/^\d{8,15}$/.test(digits)) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
