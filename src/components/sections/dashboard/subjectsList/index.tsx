import SubjectCard from "@/components/ui/cards/subjectCard";
import { listMock } from "@/services/subjects/list/dataMock";
import { getNextDelivery } from "@/utils/date";

async function getSubjectsData() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return listMock;
}

export default async function SubjectsList() {
  const data = await getSubjectsData();

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full opacity-50">
        <p className="text-lg font-medium text-oxford">No tienes materias registradas aún.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8 w-full">
      {data.map((subject) => (
        <SubjectCard
          key={subject.id}
          id={subject.id}
          title={subject.name}
          icon={subject.icon}
          progress={subject.progress}
          color={subject.color}
          nextDelivery={getNextDelivery(subject.next_delivery)}
        />
      ))}
    </div>
  );
}