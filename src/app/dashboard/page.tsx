// src/app/dashboard/page.tsx
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SubjectsList from "@/components/sections/dashboard/subjectsList";
import Reminders from "@/components/sections/dashboard/reminders";
import Header from "@/components/sections/dashboard/header";
import SubjectCard from "@/components/ui/cards/subjectCard";
import MobileRemindersWrapper from "@/components/sections/dashboard/reminders/MobileRemindersWrapper";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const username = session?.user?.name || "Estudiante";
  
  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Renderizamos el componente de recordatorios una sola vez
  const remindersNode = (
    <Suspense fallback={<div className="animate-pulse space-y-4">
      <div className="h-32 bg-oxford/5 rounded-sm" />
      <div className="h-32 bg-oxford/5 rounded-sm" />
    </div>}>
      <Reminders />
    </Suspense>
  );

  return (
    <div className="flex flex-col gap-6 h-full min-h-0">
      {/* Header con el Trigger para móviles inyectado */}
      <Header 
        username={username} 
        today={today} 
        mobileTrigger={
          <MobileRemindersWrapper>
            {remindersNode}
          </MobileRemindersWrapper>
        }
      />

      <section className="flex flex-1 min-h-0 relative border border-oxford/10 rounded-2xl overflow-hidden shadow-inner bg-white/40">
        {/* Lado Izquierdo: Lista de Materias */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto p-6 pb-12 custom-scrollbar">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SubjectCard key={i} loading />
                ))}
              </div>
            }
          >
            <SubjectsList />
          </Suspense>
        </div>

        {/* Lado Derecho: Aside Fijo (Solo Desktop) */}
        <aside className="hidden xl:flex xl:w-xs flex-col gap-6 bg-jasmine/20 border-l border-oxford/10 p-6 overflow-y-auto custom-scrollbar">
          <h3 className="text-preset-3-bolder text-oxford">Recordatorios</h3>
          {remindersNode}
        </aside>
      </section>
    </div>
  );
}