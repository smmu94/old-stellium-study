"use client";

import Button from "@/components/ui/button";
import ReminderCard from "@/components/ui/cards/reminderCard";
import { ReminderCardProps } from "@/components/ui/cards/reminderCard/types";
import SubjectCard from "@/components/ui/cards/subjectCard";
import { useGetSubjectList } from "@/services/subjects/list";
import { RootState } from "@/store/store";
import { getNextDelivery } from "@/utils/date";
import { useState } from "react";
import { FaBell, FaBook, FaFlask, FaRobot, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes/routes";

const events: ReminderCardProps["events"] = [
  { icon: 3, name: "Math Class", dateTime: "10:00 AM - 11:30 AM" },
  { icon: 4, name: "Physics Lab", dateTime: "1:00 PM - 3:00 PM" },
  { icon: 1, name: "Robotics Meeting", dateTime: "3:30 PM - 4:30 PM" },
  { icon: 1, name: "Robotics Meeting", dateTime: "3:30 PM - 4:30 PM" },
];

const deadlines: ReminderCardProps["events"] = [
  { name: "Math Homework", dateTime: "April 25", dotColor: 4 },
  { name: "Robotics Project", dateTime: "April 28", dotColor: 1 },
  { name: "Physics Exam", dateTime: "May 2", dotColor: 2 },
];

const ReminderAside = () => (
  <>
    <ReminderCard title="Events Today" events={events} />
    <ReminderCard title="Upcoming Deadlines" events={deadlines} />
  </>
);

export default function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { status, data, error } = useGetSubjectList();
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const username = user?.displayName || user?.email?.split("@")[0];
  const router = useRouter();

  const goToCreateSubject = () => {
    router.push(ROUTES.CREATE);
  }

  return (
    <div className="flex flex-col gap-10 min-h-0 h-full">
      <header className="flex flex-col items-start gap-4 lg:flex-row lg:justify-between lg:items-center mb-10">
        <div>
          <h1 className="text-preset-2 font-bold text-oxford">
            Welcome back, {username}!
          </h1>
          <p className="text-oxford mt-2">Monday, April 24, 2025</p>
        </div>
        <div className="flex items-center gap-4 w-sm lg:justify-end">
          <div className="xl:hidden">
            <Button onClick={() => setIsAsideOpen(true)}>
              <FaBell className="mr-2" /> Reminders
            </Button>
          </div>
          <Button onClick={goToCreateSubject}>Add New Subject</Button>
        </div>
      </header>
      <section className="flex flex-1 min-h-0 relative border border-oxford/50 rounded-xl">
        <div className="flex-1 flex flex-col gap-6 overflow-auto p-8 scrollbar-thin scrollbar-thumb-oxford scrollbar-track-transparent bg-oxford/20 rounded-l-xl">
          {status === "pending" && (
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              {Array.from({ length: 5 }).map((_, i) => (
                <SubjectCard key={i} loading />
              ))}
            </div>
          )}
          {status === "error" && (
            <p className="text-red-500 text-lg">Error: {error?.message}</p>
          )}
          {status === "success" && data && data.length > 0 && (
            <div className="flex flex-wrap gap-6 justify-center lg:justify-between">
              {data.map(({ id, icon, name, progress, color, next_delivery }) => (
                <SubjectCard
                  key={id}
                  id={id}
                  title={name}
                  icon={icon}
                  progress={progress}
                  color={color}
                  nextDelivery={getNextDelivery(next_delivery)}
                  onClick={() => console.log("Clicked subject:", id)}
                />
              ))}
            </div>
          )}
          {status === "success" && data && data.length === 0 && (
            <p className="text-gray-500 text-lg">No subjects found.</p>
          )}
        </div>
        <aside className="hidden xl:flex xl:w-xs flex-col gap-6 pl-6 border-l-2 border-oxford bg-jasmine/60 rounded-r-xl py-8 pr-8">
          <ReminderAside />
        </aside>
        <aside
          className={`fixed top-0 right-0 h-full w-xs max-w-sm bg-jasmine p-6 z-50 flex flex-col gap-6 transform transition-transform xl:hidden shadow-lg ${
            isAsideOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-preset-3-bolder text-oxford">Reminders</h3>
            <button
              onClick={() => setIsAsideOpen(false)}
              className="text-oxford hover:text-oxford/70 transition-colors"
              aria-label="Close reminders"
            >
              <FaTimes size={20} />
            </button>
          </div>
          <ReminderAside />
        </aside>
      </section>
    </div>
  );
}
