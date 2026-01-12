import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SubjectCard from "@/components/ui/cards/subjectCard";
import Reminders from "@/components/sections/dashboard/reminders";
import SubjectsList from "@/components/sections/dashboard/subjectsList";
import Header from "@/components/sections/dashboard/header";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions); 
  const username = session?.user?.name || "Estudiante";
  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

  return (
    <div className="flex flex-col gap-6 h-full min-h-0">
      <Header username={username} today={today} />
      <section className="flex flex-1 min-h-0 relative border border-oxford/10 rounded-2xl overflow-hidden shadow-inner bg-white/40">
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto p-6 pb-12 custom-scrollbar">
          <Suspense fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SubjectCard key={i} loading />
              ))}
            </div>
          }>
            <SubjectsList />
          </Suspense>
        </div>
        {/* Aside de Recordatorios (Servidor por ahora, luego puede ser Async) */}
        <aside className="hidden xl:flex xl:w-xs flex-col gap-6 bg-jasmine/20 border-l border-oxford/10 p-6 overflow-y-auto">
          <h3 className="text-preset-3-bolder text-oxford">Recordatorios</h3>
          <Reminders />
        </aside>
        {/* El Aside móvil sí debe ser un Client Component por el estado isAsideOpen */}
      </section>
    </div>
  );
}