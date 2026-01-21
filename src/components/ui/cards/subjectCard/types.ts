// src/components/ui/cards/subjectCard/types.ts
import { SubjectColorEnum, SubjectIconEnum } from "@/services/subjects/enums";

export type NextDeliveryUI = {
  tasks: Array<{ title: string; due_date: string }>;
};

export type SubjectCardProps = {
  id?: string;
  title?: string;
  icon?: SubjectIconEnum;
  color?: SubjectColorEnum;
  progress?: number;
  nextDelivery?: NextDeliveryUI | null;
  onClick?: () => void;
  loading?: boolean;
};