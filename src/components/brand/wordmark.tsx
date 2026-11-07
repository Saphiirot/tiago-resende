import Link from "next/link";
import { cn } from "@/lib/cn";

export function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "display grid size-9 shrink-0 place-items-center rounded-full bg-bronze text-[1.05rem] leading-none text-ink",
        className,
      )}
    >
      TR
    </span>
  );
}

export function Wordmark({
  href = "/",
  className,
  suffix,
}: {
  href?: string;
  className?: string;
  /** Texto auxiliar (ex.: "Cliente", "Treinador"). */
  suffix?: string;
}) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-3", className)} aria-label="Tiago Resende — início">
      <Monogram className="transition-transform duration-300 group-hover:-rotate-6" />
      <span className="flex flex-col leading-none">
        <span className="display whitespace-nowrap text-[1.35rem] tracking-[0.01em] text-bone">Tiago Resende</span>
        {suffix ? <span className="eyebrow mt-1 text-[0.5625rem]">{suffix}</span> : null}
      </span>
    </Link>
  );
}
