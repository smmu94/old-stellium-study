// src/app/dashboard/components/reminders/ReminderAside.tsx
import ReminderCard from "@/components/ui/cards/reminderCard";
import { ReminderCardProps } from "@/components/ui/cards/reminderCard/types";

// Estos mocks eventualmente vendrán de una base de datos o una API
const events: ReminderCardProps["events"] = [
  { icon: 3, name: "Clase de Matemáticas", dateTime: "10:00 AM - 11:30 AM" },
  { icon: 4, name: "Laboratorio Física", dateTime: "1:00 PM - 3:00 PM" },
  { icon: 1, name: "Reunión Robótica", dateTime: "3:30 PM - 4:30 PM" },
];

const deadlines: ReminderCardProps["events"] = [
  { name: "Tarea Cálculo", dateTime: "Enero 25", dotColor: 4 },
  { name: "Proyecto Final", dateTime: "Enero 28", dotColor: 1 },
  { name: "Examen Física", dateTime: "Febrero 2", dotColor: 2 },
];

export default function Reminders() {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <ReminderCard 
          title="Eventos de Hoy" 
          events={events} 
        />
      </section>
      
      <section>
        <ReminderCard 
          title="Próximas Entregas" 
          events={deadlines} 
        />
      </section>

      {/* Tip A1: Puedes agregar un CTA rápido aquí si no hay recordatorios */}
      {events.length === 0 && deadlines.length === 0 && (
        <div className="p-4 text-center border-2 border-dashed border-oxford/10 rounded-xl">
          <p className="text-sm text-oxford/50">No tienes pendientes para hoy</p>
        </div>
      )}
    </div>
  );
}