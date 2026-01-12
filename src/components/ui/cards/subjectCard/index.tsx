"use client";

import { SubjectColorEnum, SubjectIconEnum } from "@/services/subjects/enums";
import { FaBook } from "react-icons/fa";
import { BADGE_CLASSES, BG_CLASSES, colorMap, ICON_MAP, PROGRESS_CLASSES } from "./constants";
import { SubjectCardProps } from "./types";

const LoadingIcon = () => <div className="h-6 w-6 bg-gray-300 rounded-full animate-pulse" />;

export default function SubjectCard({
  title,
  icon = SubjectIconEnum.BOOK,
  progress,
  color = SubjectColorEnum.BLUE,
  nextDelivery,
  onClick,
  loading = false,
}: SubjectCardProps) {
  const IconComponent = !loading ? ICON_MAP[icon] || FaBook : LoadingIcon;
  const tasksToShow = !loading ? nextDelivery?.title.slice(0, 3) || [] : Array(3).fill("");
  const hasMoreTasks = !loading ? (nextDelivery?.title.length || 0) > 3 : false;
  const colorKey = colorMap[color];

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
        <h2
          className={`text-preset-3-bolder text-oxford capitalize truncate overflow-hidden whitespace-nowrap ${
            loading ? "bg-oxford/50 animate-pulse" : ""
          }`}
          title={title}
        >
          {!loading && title}
        </h2>
        <div
          className={`p-2.5 rounded-full border border-oxford ${
            loading ? "bg-oxford/50 animate-pulse" : BG_CLASSES[colorKey]
          }`}
        >
          <IconComponent className="text-preset-3" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-oxford text-preset-4-bolder">
          {loading ? (
            <>
              <div className="w-16 h-4 bg-oxford/50 animate-pulse rounded" />
              <div className="w-8 h-4 bg-oxford/50 animate-pulse rounded" />
            </>
          ) : (
            <>
              <span>Progress</span>
              <span>{progress}%</span>
            </>
          )}
        </div>
        <div className="w-full bg-platinum h-2 rounded-full">
          <div
            className={`h-2 rounded-full ${
              loading ? "bg-oxford/50 animate-pulse" : PROGRESS_CLASSES[colorKey]
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="text-preset-4-bolder flex flex-col gap-1">
        {!loading && <span className="text-oxford">Next delivery:</span>}
        <div className="flex flex-wrap gap-1 h-24 content-start">
          {tasksToShow.length > 0
            ? tasksToShow.map((task, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-md border border-oxford ${
                  loading ? "bg-oxford/50 animate-pulse" : BADGE_CLASSES[colorKey]
                } text-preset-5-bolder truncate w-fit h-fit`}
              >
                {!loading && task}
              </span>
            ))
            : !loading && (
              <span className="px-3 py-1 rounded-md bg-platinum text-preset-5-bolder text-oxford border border-oxford">
                  No upcoming tasks
              </span>
            )}
          {hasMoreTasks && !loading && (
            <span className={`px-3 py-1 rounded-md ${BADGE_CLASSES[colorKey]} text-preset-5-bolder`}>
              ...
            </span>
          )}
        </div>
        <div className="h-5">
          {!loading && nextDelivery?.daysLeft !== undefined && tasksToShow.length > 0 ? (
            <p className="text-white bg-linear-to-r from-vermilion to-vermilion/80 text-preset-4-bolder rounded-sm text-center">
              {nextDelivery.daysLeft === 0
                ? "Due today!"
                : `Due in ${nextDelivery.daysLeft} ${nextDelivery.daysLeft === 1 ? "day" : "days"}`}
            </p>
          ) : (
            loading && <div className="w-20 h-4 bg-oxford/50 animate-pulse rounded" />
          )}
        </div>
      </div>
    </div>
  );
}
