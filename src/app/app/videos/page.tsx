import { demoVideos } from "@/data/demo";
import { PageHeader } from "@/components/ui/page-header";
import { DemoBadge } from "@/components/ui/demo";
import { VideoLibrary } from "@/components/video/video-library";

export const metadata = { title: "Vídeos" };

export default function VideosPage() {
  return (
    <>
      <PageHeader
        eyebrow={<>Biblioteca <DemoBadge /></>}
        title="Vídeos"
        description="Execução, mobilidade e aquecimento. Os vídeos são de demonstração e ainda não têm ficheiro associado."
      />
      <VideoLibrary videos={demoVideos.filter((v) => v.visibility === "clientes" || v.visibility === "publico")} hrefBase="/app/videos" />
    </>
  );
}
