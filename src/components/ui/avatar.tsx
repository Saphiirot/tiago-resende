import { cn } from "@/lib/cn";

export function Avatar({
  initials,
  size = "md",
  className,
}: {
  initials: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const s = { sm: "size-8 text-[0.6875rem]", md: "size-10 text-xs", lg: "size-16 text-base" }[size];
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-full border border-line-strong bg-ink-4 font-mono font-medium tracking-wider text-bone",
        s,
        className,
      )}
    >
      {initials}
    </span>
  );
}
