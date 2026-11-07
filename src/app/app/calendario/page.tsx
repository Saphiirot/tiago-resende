import { DEMO_CURRENT_CLIENT_ID, DEMO_TODAY, eventsForClient } from "@/data/demo";
import { PageHeader } from "@/components/ui/page-header";
import { DemoBadge } from "@/components/ui/demo";
import { CalendarView } from "@/components/calendar/calendar-view";

export const metadata = { title: "Calendário" };

export default function CalendarPage() {
  return (
    <>
      <PageHeader
        eyebrow={<>Agenda <DemoBadge /></>}
        title="Calendário"
        description="Sessões acompanhadas, dias de treino e outros eventos. Sem sincronização nem notificações nesta fase."
      />
      <CalendarView events={eventsForClient(DEMO_CURRENT_CLIENT_ID)} today={DEMO_TODAY} workoutHref="/app/treinos" />
    </>
  );
}
