import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface Column<T> {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
  /** Mostra a coluna nos cartões em ecrãs pequenos. */
  mobile?: "title" | "meta" | "hidden";
}

/**
 * Tabela responsiva: tabela semântica a partir de `md`, lista de cartões
 * em ecrãs pequenos (sem scroll horizontal).
 */
export function DataTable<T>({
  rows,
  columns,
  getKey,
  caption,
  rowAction,
}: {
  rows: T[];
  columns: Column<T>[];
  getKey: (row: T) => string;
  caption: string;
  rowAction?: (row: T) => ReactNode;
}) {
  const title = columns.find((c) => c.mobile === "title");
  const meta = columns.filter((c) => c.mobile === "meta");

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink-2">
      <table className="hidden w-full text-left text-sm md:table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line">
            {columns.map((c) => (
              <th key={c.key} scope="col" className={cn("eyebrow px-5 py-3.5 font-normal", c.className)}>
                {c.header}
              </th>
            ))}
            {rowAction ? <th scope="col" className="sr-only">Ações</th> : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getKey(row)} className="border-b border-line/70 transition-colors last:border-0 hover:bg-ink-3">
              {columns.map((c) => (
                <td key={c.key} className={cn("px-5 py-4 align-middle text-bone-dim", c.className)}>
                  {c.cell(row)}
                </td>
              ))}
              {rowAction ? <td className="px-5 py-4 text-right">{rowAction(row)}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="divide-y divide-line md:hidden" aria-label={caption}>
        {rows.map((row) => (
          <li key={getKey(row)} className="flex items-center gap-4 p-4">
            <div className="min-w-0 flex-1">
              {title ? <div className="text-bone">{title.cell(row)}</div> : null}
              {meta.length ? (
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-bone-dim">
                  {meta.map((c) => (
                    <span key={c.key}>{c.cell(row)}</span>
                  ))}
                </div>
              ) : null}
            </div>
            {rowAction ? <div className="shrink-0">{rowAction(row)}</div> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
