import { BG_CLASSES, colorMap, ICON_MAP } from "@/components/ui/cards/subjectCard/constants";
import { ReminderCardProps } from "./types";

export default function ReminderCard({ title, events }: ReminderCardProps) {
  return (
    <div className="flex flex-col w-full gap-4 rounded-sm p-5 shadow-md border border-oxford/50 bg-white">
      <h4 className="text-preset-3-bolder mb-2 text-oxford">{title}</h4>
      <ul className="flex flex-col gap-4 p-0 m-0 max-h-48 overflow-y-auto custom-scrollbar">
        {events.map((event, index) => {
          const IconComponent = event.icon !== undefined ? ICON_MAP[event.icon] : null;
          return (
            <li key={index} className="flex items-start gap-3 list-none">
              {IconComponent && (
                <span className={`flex items-center justify-center w-8 h-8 rounded-full bg-oxford text-white mt-1`}>
                  <IconComponent />
                </span>
              )}
              {event.dotColor && (
                <span className={`w-4 h-4 rounded-sm ${BG_CLASSES[colorMap[event.dotColor]]}`}></span>
              )}
              <div className="flex flex-col">
                <span className="text-oxford text-preset-4-bolder">{event.name}</span>
                <span className="text-xs text-oxford">{event.dateTime}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}