// src/components/sections/dashboard/reminders/index.tsx
import ReminderCard from "@/components/ui/cards/reminderCard";
import { getRemindersData } from "@/lib/data";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Reminders() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const { events, deadlines } = await getRemindersData(session.user.id);

  const isEmpty = events.length === 0 && deadlines.length === 0;

  return (
    <div className="flex flex-col gap-6">
      <ReminderCard title="Eventos de Hoy" events={events} />
      <ReminderCard title="Próximas Entregas" events={deadlines} />
      {isEmpty && (
        <div className="p-4 text-center border-2 border-dashed border-oxford/10 rounded-xl">
          <p className="text-sm text-oxford/50">Todo al día por aquí 🚀</p>
        </div>
      )}
    </div>
  );
}