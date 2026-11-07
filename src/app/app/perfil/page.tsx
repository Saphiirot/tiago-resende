import { Download, LogOut, Trash2 } from "lucide-react";
import { DEMO_CURRENT_CLIENT_ID, demoProfile, getDemoClient } from "@/data/demo";
import { formatDay } from "@/lib/format";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardHeader } from "@/components/ui/card";
import { DemoBadge, DemoNotice } from "@/components/ui/demo";
import { Avatar } from "@/components/ui/avatar";
import { Field, Select, TextInput } from "@/components/ui/form";
import { Toggle } from "@/components/ui/toggle";
import { Button, ButtonLink } from "@/components/ui/button";

export const metadata = { title: "Perfil" };

export default function ProfilePage() {
  const client = getDemoClient(DEMO_CURRENT_CLIENT_ID)!;
  const p = demoProfile;

  return (
    <>
      <PageHeader eyebrow={<>Conta <DemoBadge /></>} title="Perfil" />

      <div className="mb-8 flex items-center gap-5">
        <Avatar initials={client.initials} size="lg" />
        <div>
          <p className="text-xl font-medium text-bone">{p.displayName}</p>
          <p className="text-sm text-mute">Cliente desde {formatDay(client.startedOn)} · {client.goal}</p>
        </div>
      </div>

      <DemoNotice className="mb-8">Os campos estão desativados: nesta fase não são recolhidos nem guardados dados pessoais.</DemoNotice>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader eyebrow="Secção 1" title="Informação pessoal" />
          <form className="grid gap-4" aria-label="Informação pessoal (demonstração)">
            <Field id="pf-nome" label="Nome">
              <TextInput id="pf-nome" defaultValue={p.displayName} disabled />
            </Field>
            <Field id="pf-email" label="Email" hint="Domínio example.com reservado para demonstração.">
              <TextInput id="pf-email" type="email" defaultValue={p.email} disabled />
            </Field>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field id="pf-ano" label="Ano de nascimento" hint="Opcional">
                <TextInput id="pf-ano" inputMode="numeric" placeholder="—" disabled />
              </Field>
              <Field id="pf-altura" label="Altura (cm)" hint="Opcional">
                <TextInput id="pf-altura" inputMode="numeric" placeholder="—" disabled />
              </Field>
            </div>
          </form>
        </Card>

        <Card>
          <CardHeader eyebrow="Secção 2" title="Preferências de treino" />
          <div className="grid gap-4">
            <Field id="pf-dias" label="Dias de treino por semana">
              <Select id="pf-dias" defaultValue={String(p.trainingDaysPerWeek)} disabled>
                {[2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} dias</option>)}
              </Select>
            </Field>
            <Field id="pf-hora" label="Horário preferido">
              <Select id="pf-hora" defaultValue={p.preferredTime} disabled>
                <option value="manhã">Manhã</option>
                <option value="tarde">Tarde</option>
                <option value="noite">Noite</option>
              </Select>
            </Field>
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow="Secção 3" title="Notificações" />
          <div className="divide-y divide-line">
            <Toggle label="Lembretes de sessões" description="Interruptor visual — não envia notificações." defaultOn={p.notifications.sessions} />
            <Toggle label="Novos conteúdos" description="Interruptor visual — não envia notificações." defaultOn={p.notifications.newContent} />
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow="Secção 4" title="Privacidade e dados" />
          <p className="text-sm leading-relaxed text-bone-dim">
            Quando a plataforma estiver operacional, poderás consultar, exportar e pedir a eliminação dos teus dados, de acordo com o RGPD.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" disabled icon={<Download aria-hidden className="size-4" />}>Exportar dados</Button>
            <Button variant="ghost" size="sm" disabled icon={<Trash2 aria-hidden className="size-4" />}>Pedir eliminação</Button>
          </div>
          <p className="mt-3 text-xs text-mute">Ações desativadas: requerem autenticação real.</p>
        </Card>
      </div>

      <div className="mt-8">
        <ButtonLink href="/login" variant="secondary" icon={<LogOut aria-hidden className="size-4" />}>Sair do protótipo</ButtonLink>
      </div>
    </>
  );
}
