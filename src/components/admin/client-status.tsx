import type { ClientStatus } from "@/lib/types";
import { Badge, type BadgeTone } from "@/components/ui/badge";

const map: Record<ClientStatus, { label: string; tone: BadgeTone }> = {
  ativo: { label: "Ativo", tone: "sage" },
  pausa: { label: "Em pausa", tone: "slate" },
  pendente: { label: "Pendente", tone: "bronze" },
};

export function ClientStatusBadge({ status }: { status: ClientStatus }) {
  return <Badge tone={map[status].tone}>{map[status].label}</Badge>;
}

export const clientStatusLabel = (s: ClientStatus) => map[s].label;
