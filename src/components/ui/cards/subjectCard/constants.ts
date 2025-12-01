import { SubjectColorEnum, SubjectIconEnum } from "@/services/subjects/enums";
import * as FaIcons from "react-icons/fa";
import { IconType } from "react-icons";

export const colorMap = {
  [SubjectColorEnum.BLUE]: "blue",
  [SubjectColorEnum.RED]: "red",
  [SubjectColorEnum.YELLOW]: "yellow",
  [SubjectColorEnum.GREEN]: "green",
  [SubjectColorEnum.PURPLE]: "purple",
  [SubjectColorEnum.ROSE]: "rose",
} as const;

export const ICON_MAP: Record<SubjectIconEnum, IconType> = {
  [SubjectIconEnum.BOOK]: FaIcons.FaBook,   
  [SubjectIconEnum.CALCULATOR]: FaIcons.FaCalculator,
  [SubjectIconEnum.FLASK]: FaIcons.FaFlask, 
  [SubjectIconEnum.GLOBE]: FaIcons.FaGlobe,    
  [SubjectIconEnum.GEAR]: FaIcons.FaCogs,
  [SubjectIconEnum.PENCIL]: FaIcons.FaPencilAlt, 
} as const;

export type SubjectColor = typeof colorMap[SubjectColorEnum];

export const BG_CLASSES: Record<SubjectColor, string> = {
  blue: "bg-oxford",
  red: "bg-vermilion/80",
  green: "bg-mint",
  yellow: "bg-jasmine",
  purple: "bg-purple",
  rose: "bg-rose"
} as const;

export const PROGRESS_CLASSES: Record<SubjectColor, string> = {
  blue: "bg-oxford",
  red: "bg-vermilion/80",
  purple: "bg-purple",
  green: "bg-mint",
  yellow: "bg-jasmine",
  rose: "bg-rose"
} as const;

export const BADGE_CLASSES: Record<SubjectColor, string> = {
  blue: "bg-oxford",
  red: "bg-vermilion/80",
  purple: "bg-purple",
  green: "bg-mint",
  yellow: "bg-jasmine",
  rose: "bg-rose"
} as const;