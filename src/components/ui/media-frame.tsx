import Image from "next/image";
import { Camera } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Enquadramento para fotografia/miniaturas.
 *
 * Sem `src` (fotografia ainda não autorizada/fornecida) mostra um espaço
 * reservado intencional: luz de ginásio, textura de chapa xadrez, marcas de
 * corte e a indicação da imagem esperada. Nunca usa fotografias de outra pessoa.
 */
export function MediaFrame({
  src,
  alt,
  label,
  brief,
  ratio,
  className,
  sizes = "100vw",
  priority,
  tone = "warm",
  showLabel = true,
  labelPosition = "bottom",
  pendingText = "Fotografia a fornecer",
  objectPosition = "50% 30%",
  compact = false,
}: {
  src?: string | null;
  alt: string;
  /** Nome curto do recurso esperado (ex.: "Retrato · sessão PRIME"). */
  label?: string;
  /** Indicação de direção de arte para a fotografia final. */
  brief?: string;
  /** Formato pretendido, apresentado no espaço reservado (ex.: "3:4"). */
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  tone?: "warm" | "cold";
  showLabel?: boolean;
  /** Posição do texto do espaço reservado (usar "top" quando houver sobreposições em baixo). */
  labelPosition?: "top" | "bottom";
  /** Texto do espaço reservado (ex.: "Capa a fornecer"). */
  pendingText?: string;
  /** Ponto focal da imagem real (object-position) — por defeito ligeiramente acima do centro, para preservar rostos. */
  objectPosition?: string;
  /** Rótulo compacto para cartões estreitos: formato numa linha e texto pendente noutra, sem ícone. */
  compact?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-ink-3", !src && "grain", src && "reveal-img", className)}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} quality={90} className="object-cover" style={{ objectPosition }} />
      ) : (
        <div role="img" aria-label={`${alt} (fotografia por fornecer)`} className="absolute inset-0">
          {/* Luz: janela fria + foco quente, como nas sessões observadas */}
          <div
            className={cn(
              "absolute inset-0",
              tone === "warm"
                ? "bg-[radial-gradient(90%_70%_at_68%_28%,rgba(159,195,230,0.20),transparent_60%),radial-gradient(70%_90%_at_0%_10%,rgba(143,165,187,0.12),transparent_55%),linear-gradient(180deg,#1f2327_0%,#121417_100%)]"
                : "bg-[radial-gradient(90%_70%_at_30%_20%,rgba(143,165,187,0.18),transparent_60%),linear-gradient(180deg,#1d2125_0%,#111316_100%)]",
            )}
          />
          <div aria-hidden className="plate absolute inset-x-0 bottom-0 h-2/5 [mask-image:linear-gradient(to_top,black,transparent)]" />

          {showLabel ? (
            <>
              {/* Marcas de corte */}
              <span aria-hidden className="absolute left-4 top-4 size-4 border-l border-t border-bone/25" />
              <span aria-hidden className="absolute right-4 top-4 size-4 border-r border-t border-bone/25" />
              <span aria-hidden className="absolute bottom-4 left-4 size-4 border-b border-l border-bone/25" />
              <span aria-hidden className="absolute bottom-4 right-4 size-4 border-b border-r border-bone/25" />

              {compact ? (
                <div className="absolute inset-x-6 top-7 flex flex-col gap-0.5 font-mono uppercase text-bone/60">
                  {ratio ? <span className="text-xs tracking-[0.12em] text-bone/75">{ratio}</span> : null}
                  <span className="text-[0.5625rem] tracking-[0.12em]">{pendingText}</span>
                </div>
              ) : (
                <div className={cn("absolute inset-x-6 flex flex-col gap-2 sm:inset-x-8", labelPosition === "top" ? "top-8 sm:top-10" : "bottom-6 sm:bottom-8")}>
                  <span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-bone/60">
                    <Camera aria-hidden className="size-3.5 shrink-0" />
                    {pendingText}
                    {ratio ? ` · ${ratio}` : ""}
                  </span>
                  {label ? <span className="text-sm font-medium text-bone/85">{label}</span> : null}
                  {brief ? <span className="max-w-xs text-xs leading-relaxed text-bone/50">{brief}</span> : null}
                </div>
              )}
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
