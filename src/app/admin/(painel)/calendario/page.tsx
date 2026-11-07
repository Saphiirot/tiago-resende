import { DEMO_TODAY, demoClients, demoEvents } from "@/data/demo";
import { PageHeader } from "@/components/ui/page-header";
import { DemoBadge } from "@/components/ui/demo";
import { CalendarView } from "@/components/calendar/calendar-view";

export const metadata = { title: "Calendário" };

export default function AdminCalendarPage() {
  return (
    <>
      <PageHeader
        eyebrow={<>Agenda <DemoBadge /></>}
        title="Calendário"
        description="Sessões acompanhadas, treinos autónomos dos clientes e outros eventos. Reservas, sincronização e notificações ainda não estão implementadas."
      />
      <CalendarView
        events={demoEvents}
        today={DEMO_TODAY}
        mode="treinador"
        clientNames={Object.fromEntries(demoClients.map((c) => [c.id, c.name]))}
        workoutHref="/admin/treinos"
        initialHidden={["treino"]}
      />
    </>
  );
}
