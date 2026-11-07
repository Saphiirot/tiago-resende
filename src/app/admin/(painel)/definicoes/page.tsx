import { site } from "@/config/site";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardHeader } from "@/components/ui/card";
import { DemoBadge } from "@/components/ui/demo";
import { Field, TextInput } from "@/components/ui/form";
import { Toggle } from "@/components/ui/toggle";
import { SetupStatusList } from "@/components/admin/setup-status";

export const metadata = { title: "Definições" };

export default function SettingsPage() {
  const wa = getWhatsAppHref();
  return (
    <>
      <PageHeader
        eyebrow={<>Conta <DemoBadge /></>}
        title="Definições"
        description="Valores lidos da configuração do projeto (src/config/site.ts). Editar aqui não tem efeito nesta fase."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader eyebrow="Marca" title="Contactos públicos" />
          <div className="grid gap-4">
            <Field id="df-ig" label="Instagram"><TextInput id="df-ig" defaultValue={`@${site.handle}`} disabled /></Field>
            <Field
              id="df-wa"
              label="WhatsApp"
              hint={wa ? "Ligação ativa." : "Por configurar em site.whatsapp.number — o botão do site está desativado."}
            >
              <TextInput id="df-wa" defaultValue={site.whatsapp.number} placeholder="351XXXXXXXXX" disabled />
            </Field>
            <Field id="df-local" label="Localização"><TextInput id="df-local" defaultValue={site.location} disabled /></Field>
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow="Segurança" title="Acesso do treinador" />
          <div className="divide-y divide-line">
            <Toggle label="Verificação em dois passos" description="Planeado para a fase de autenticação." />
            <Toggle label="Alertas de início de sessão" description="Planeado para a fase de autenticação." />
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader eyebrow="Projeto" title="Estado da configuração" />
          <SetupStatusList />
        </Card>
      </div>
    </>
  );
}
