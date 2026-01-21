"use client";

import { SubjectColorEnum, SubjectIconEnum } from "@/services/subjects/enums";
import { FaBook } from "react-icons/fa";
import {
  BADGE_CLASSES,
  BG_CLASSES,
  colorMap,
  ICON_MAP,
  PROGRESS_CLASSES,
} from "./constants";
import { SubjectCardProps } from "./types";

// 1. Movemos el Skeleton fuera o lo declaramos como una constante estática
const SkeletonIcon = () => (
  <div className="h-6 w-6 bg-gray-300 rounded-full animate-pulse" />
);

export default function SubjectCard({
  title,
  icon = SubjectIconEnum.BOOK,
  progress = 0,
  color = SubjectColorEnum.BLUE,
  nextDelivery,
  onClick,
  loading = false,
}: SubjectCardProps) {
  // 2. Referenciamos el icono sin crear una función nueva en cada render
  const IconComponent = ICON_MAP[icon] || FaBook;
  const colorKey = colorMap[color];
  const tasks = nextDelivery?.tasks || [];

  const getDaysLeft = (dateStr: string) => {
    const due = new Date(dateStr);
    const today = new Date();
    due.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffInMs = due.getTime() - today.getTime();
    return Math.floor(diffInMs / 86400000);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
      className={`flex flex-col w-full gap-5 rounded-sm p-6 cursor-pointer transition-transform border border-oxford/50 bg-white shadow-[5px_5px_0px_#0a0f29] hover:scale-103 ${
        colorKey === "blue" ? "text-white" : "text-oxford"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-preset-3-bolder text-oxford capitalize truncate">
          {loading ? (
            <div className="w-32 h-6 bg-gray-200 animate-pulse rounded" />
          ) : (
            title
          )}
        </h2>

        <div
          className={`p-2.5 rounded-full border border-oxford ${loading ? "bg-gray-100" : BG_CLASSES[colorKey]}`}
        >
          {/* 3. Renderizado condicional simple en lugar de un componente dinámico */}
          {loading ? (
            <SkeletonIcon />
          ) : (
            <IconComponent className="text-preset-3" />
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-oxford text-preset-4-bolder">
          <span>Progress</span>
          <span>{loading ? "..." : `${progress}%`}</span>
        </div>
        <div className="w-full bg-platinum h-2 rounded-full overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${loading ? "bg-gray-200 w-full animate-pulse" : PROGRESS_CLASSES[colorKey]}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Deliveries */}
      <div className="text-preset-4-bolder flex flex-col gap-2">
        <span className="text-oxford">Next Deliveries:</span>

        <div className="flex flex-col gap-3 h-32 overflow-y-auto custom-scrollbar">
          {tasks.length > 0 ? (
            tasks.map((task, index) => {
              const days = getDaysLeft(task.due_date);
              const isToday = days <= 0;

              return (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2 border-b border-platinum pb-1 last:border-0"
                >
                  <span
                    className={`px-2 py-0.5 rounded text-preset-5-bolder truncate
                  ${BADGE_CLASSES[colorKey]}`}
                  >
                    {task.title}
                  </span>

                  <span
                    className={`text-preset-4-bolder whitespace-nowrap ${
                      isToday
                        ? "text-vermilion animate-pulse"
                        : "text-oxford/80 bg-jasmine px-4 py-1 rounded-2xl"
                    }`}
                  >
                    {isToday ? "TODAY!" : `in ${days}d`}
                  </span>
                </div>
              );
            })
          ) : (
            <span className="text-oxford/70 text-preset-4 italic">
                            No upcoming deliveries
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
