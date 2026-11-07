import { UploadCloud } from "lucide-react";
import { demoVideos } from "@/data/demo";
import { PageHeader } from "@/components/ui/page-header";
import { DemoBadge } from "@/components/ui/demo";
import { DemoEditor } from "@/components/ui/demo-editor";
import { Field, Select, TextArea, TextInput } from "@/components/ui/form";
import { VideoLibrary } from "@/components/video/video-library";

export const metadata = { title: "Vídeos" };

export default function AdminVideosPage() {
  return (
    <>
      <PageHeader
        eyebrow={<>Conteúdos <DemoBadge /></>}
        title="Vídeos"
        description="Organização da biblioteca. Uploads, armazenamento e streaming privado ainda não estão implementados."
        actions={
          <DemoEditor triggerLabel="Novo vídeo" title="Novo vídeo">
            <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-dashed border-line-strong px-6 py-10 text-center">
              <UploadCloud aria-hidden className="size-8 text-mute" />
              <p className="text-sm text-bone">Área de carregamento</p>
              <p className="text-xs text-mute">Desativada nesta fase — nenhum ficheiro é enviado.</p>
            </div>
            <Field id="nv-titulo" label="Título"><TextInput id="nv-titulo" /></Field>
            <Field id="nv-cat" label="Categoria">
              <Select id="nv-cat" defaultValue="Execução">
                {["Execução", "Mobilidade", "Aquecimento", "Bastidores"].map((c) => <option key={c}>{c}</option>)}
              </Select>
            </Field>
            <Field id="nv-vis" label="Visibilidade" hint="Vídeos de clientes exigirão acesso autenticado e URLs assinados.">
              <Select id="nv-vis" defaultValue="clientes">
                <option value="clientes">Apenas clientes</option>
                <option value="publico">Público</option>
              </Select>
            </Field>
            <Field id="nv-desc" label="Descrição"><TextArea id="nv-desc" /></Field>
          </DemoEditor>
        }
      />
      <VideoLibrary videos={demoVideos} hrefBase="/admin/videos" />
    </>
  );
}
