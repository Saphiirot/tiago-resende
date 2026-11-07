import { Suspense } from "react";
import { DetailSkeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";
import { demoVideos, getDemoVideo } from "@/data/demo";
import { VideoDetail } from "@/components/video/video-detail";

export function generateStaticParams() {
  return demoVideos.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: PageProps<"/app/videos/[id]">) {
  const { id } = await params;
  return { title: getDemoVideo(id)?.title ?? "Vídeo" };
}

export default function VideoPage({ params }: PageProps<"/app/videos/[id]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <VideoPageContent params={params} />
    </Suspense>
  );
}

async function VideoPageContent({ params }: { params: PageProps<"/app/videos/[id]">["params"] }) {
  const { id } = await params;
  const video = getDemoVideo(id);
  if (!video) notFound();
  return <VideoDetail video={video} base="/app/videos" sessionBase="/app/treinos" />;
}
