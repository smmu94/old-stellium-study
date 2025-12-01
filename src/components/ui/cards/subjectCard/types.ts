import { SubjectColorEnum, SubjectIconEnum } from "@/services/subjects/enums";

export type NextDeliveryUI = {
  title: Array<string>;
  daysLeft: number;
};

export type SubjectCardProps = {
  id?: string;
  title?: string;
  icon?: SubjectIconEnum;
  color?: SubjectColorEnum;
  progress?: number;
  nextDelivery?: NextDeliveryUI;
  onClick?: () => void;
  loading?: boolean;
};
