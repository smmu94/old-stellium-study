"use client";
import * as FaIcons from "react-icons/fa";
import { SubjectCardProps } from "./types";
import { COLOR_MAP } from "./constants";

export default function SubjectCard({
  title,
  icon,
  progress,
  color = "yellow",
  nextDelivery,
  onClick,
}: SubjectCardProps) {
  const IconComponent = FaIcons[icon as keyof typeof FaIcons];

  const hasNextDelivery = Boolean(nextDelivery);
  const deliveryTitle = hasNextDelivery
    ? nextDelivery!.title
    : "No upcoming tasks";
  const deliveryDue =
    hasNextDelivery && nextDelivery!.daysLeft !== undefined
      ? nextDelivery!.daysLeft === 0
        ? "Due today!"
        : `Due in ${nextDelivery!.daysLeft} ${
            nextDelivery!.daysLeft === 1 ? "day" : "days"
        }`
      : "—";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      className={`flex flex-col w-xs gap-6 rounded-xl p-5 shadow-md cursor-pointer transition-transform bg-white border-2 border-oxford hover:bg-oxford/20 ${color==="blue" ? "text-white" : "text-oxford"}`}
    >
      <div className="flex items-center justify-between">
        <h2
          className={`text-preset-3-bolder  px-4 py-1.5 rounded-lg bg-${COLOR_MAP[color]}`}
        >
          {title}
        </h2>
        <div className={`p-3 rounded-full bg-${COLOR_MAP[color]}`}>
          <IconComponent className=" text-preset-3" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-oxford text-preset-4-bolder">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-platinum h-2 rounded-full">
          <div
            className={`h-2 rounded-full bg-${COLOR_MAP[color]}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="text-preset-4-bolder flex flex-col gap-2">
        <p>
          <span className="text-oxford">Next delivery:</span>
          <span className={`bg-${COLOR_MAP[color]} px-6 py-1 rounded-md`}>
            {deliveryTitle}
          </span>
        </p>
        <p className="text-vermilion">{deliveryDue}</p>
      </div>
    </div>
  );
}
