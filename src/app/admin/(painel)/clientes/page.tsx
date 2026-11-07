import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import type { Client } from "@/lib/types";
import { demoClients, getDemoPlan } from "@/data/demo";
import { formatDay } from "@/lib/format";
import { PageHeader } from "@/components/ui/page-header";
import { DemoBadge } from "@/components/ui/demo";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Avatar } from "@/components/ui/avatar";
import { TextInput, Field } from "@/components/ui/form";
import { DemoEditor } from "@/components/ui/demo-editor";
import { ClientStatusBadge } from "@/components/admin/client-status";

export const metadata = { title: "Clientes" };

const columns: Column<Client>[] = [
  {
    key: "name",
    header: "Cliente",
    mobile: "title",
    cell: (c) => (
      <span className="flex items-center gap-3">
        <Avatar initials={c.initials} size="sm" />
        <span className="min-w-0">
          <span className="block truncate font-medium text-bone">{c.name}</span>
          <span className="block truncate text-xs text-mute">{c.email}</span>
        </span>
      </span>
    ),
  },
  { key: "status", header: "Estado", mobile: "meta", cell: (c) => <ClientStatusBadge status={c.status} /> },
  { key: "goal", header: "Objetivo", className: "max-w-56", cell: (c) => <span className="line-clamp-1">{c.goal}</span> },
  { key: "plan", header: "Plano", mobile: "meta", cell: (c) => getDemoPlan(c.activePlanId)?.name ?? <span className="text-mute">Sem plano</span> },
  { key: "since", header: "Desde", mobile: "meta", cell: (c) => <span className="font-mono text-xs">{formatDay(c.startedOn)}</span> },
];

export default function ClientsPage() {
  return (
    <>
      <PageHeader
        eyebrow={<>Gestão <DemoBadge /></>}
        title="Clientes"
        description="Lista de clientes fictícios. A pesquisa e os filtros são apenas visuais nesta fase."
        actions={
          <DemoEditor triggerLabel="Novo cliente" title="Novo cliente">
            <Field id="nc-nome" label="Nome"><TextInput id="nc-nome" placeholder="Nome do cliente" /></Field>
            <Field id="nc-email" label="Email"><TextInput id="nc-email" type="email" placeholder="nome@exemplo.pt" /></Field>
            <Field id="nc-obj" label="Objetivo" hint="Texto livre, definido na conversa inicial."><TextInput id="nc-obj" /></Field>
          </DemoEditor>
        }
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label htmlFor="pesquisa-clientes" className="sr-only">Pesquisar clientes</label>
        <div className="relative flex-1 sm:max-w-sm">
          <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-mute" />
          <TextInput id="pesquisa-clientes" placeholder="Pesquisar por nome ou email" className="pl-11" />
        </div>
      </div>

      <DataTable
        caption="Clientes (dados fictícios)"
        rows={demoClients}
        columns={columns}
        getKey={(c) => c.id}
        rowAction={(c) => (
          <Link href={`/admin/clientes/${c.id}`} className="inline-flex items-center gap-1 rounded-full border border-line-strong px-3 py-1.5 text-xs text-bone-dim hover:border-bone hover:text-bone">
            Abrir <ArrowUpRight aria-hidden className="size-3.5" />
            <span className="sr-only">ficha de {c.name}</span>
          </Link>
        )}
      />
    </>
  );
}
