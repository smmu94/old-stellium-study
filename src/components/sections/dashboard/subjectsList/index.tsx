import SubjectCard from "@/components/ui/cards/subjectCard";
import { authOptions } from "@/lib/auth";
import { getSubjects } from "@/lib/data";
import { getServerSession } from "next-auth";

export default async function SubjectsList() {
  const session = await getServerSession(authOptions);
  
  // Si no hay sesión, no intentamos pedir datos
  if (!session?.user?.id) return null;
  const data = await getSubjects(session.user.id);

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 text-center">
        <p className="text-lg font-medium text-oxford/60">
          No tienes materias registradas aún.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8 w-full">
      {data.map((subject) => (
        <SubjectCard
          key={subject.id}
          {...subject}
          title={subject.name}
          nextDelivery={subject.next_delivery} 
        />
      ))}
    </div>
  );

}