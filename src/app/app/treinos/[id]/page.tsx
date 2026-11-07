import { Suspense } from "react";
import { DetailSkeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";
import { WorkoutDetail } from "@/components/training/workout-detail";
import { demoSessions, getDemoSession } from "@/data/demo";

export function generateStaticParams() {
  return demoSessions.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: PageProps<"/app/treinos/[id]">) {
  const { id } = await params;
  const s = getDemoSession(id);
  return { title: s ? `Treino ${s.code} · ${s.name}` : "Treino" };
}

export default function WorkoutPage({ params }: PageProps<"/app/treinos/[id]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <WorkoutPageContent params={params} />
    </Suspense>
  );
}

async function WorkoutPageContent({ params }: { params: PageProps<"/app/treinos/[id]">["params"] }) {
  const { id } = await params;
  const session = getDemoSession(id);
  if (!session) notFound();
  return <WorkoutDetail session={session} backHref="/app/treinos" videoBase="/app/videos" />;
}
