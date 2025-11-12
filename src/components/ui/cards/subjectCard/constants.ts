import { SubjectColor } from "./types";

export const COLOR_MAP: Record<SubjectColor, string> = {
  blue: "oxford",
  red: "vermilion",
  rose: "rose",
  green: "mint",
  yellow: "jasmine",
  gray: "platinum",
} as const;
