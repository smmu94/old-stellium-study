import { BG_CLASSES, colorMap, ICON_MAP, SubjectColor } from "@/components/ui/cards/subjectCard/constants";
import { SubjectColorEnum, SubjectIconEnum } from "@/services/subjects/enums";
import { OptionsProps } from "../../options/types";

export const ICON_LABELS: Record<SubjectIconEnum, string> = {
  [SubjectIconEnum.BOOK]: "Theory",
  [SubjectIconEnum.CALCULATOR]: "Math",
  [SubjectIconEnum.FLASK]: "Science",
  [SubjectIconEnum.GLOBE]: "Global",
  [SubjectIconEnum.GEAR]: "Tech",
  [SubjectIconEnum.PENCIL]: "Arts",
} as const;

export const ICON_OPTIONS: OptionsProps<SubjectIconEnum>["options"] =
  Object.entries(ICON_MAP).map(([key, Icon]) => {
    const enumKey = +key as unknown as SubjectIconEnum;
    return {
      label: ICON_LABELS[enumKey],
      value: enumKey,
      children: <Icon size={20} color="#0a0f29" />,
    };
  });

export const COLOR_OPTIONS: OptionsProps<SubjectColorEnum>["options"] = Object.entries(colorMap).map(
  ([key, color]) => ({
    label: color[0].toUpperCase() + color.slice(1),
    value: +key as unknown as SubjectColorEnum,
    children: <div className={`w-5 h-5 rounded-full border border-oxford ${BG_CLASSES[color]}`} />
  })
);