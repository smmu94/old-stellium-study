import { AssignmentStatusEnum, AssignmentTypeEnum, SubjectColorEnum, SubjectIconEnum } from "./enums";

export type Assignment = {
  id?: string;
  title: string;
  due_date: string;
  status: AssignmentStatusEnum;
  type: AssignmentTypeEnum;
};

export type NextDelivery = {
  title: Array<string>;
  due_date: string;
};

export type SubjectBase = {
  id: string;
  name: string;
  description: string | null;
  icon: SubjectIconEnum;
  color: SubjectColorEnum;
  next_delivery: NextDelivery | null;
  progress: number;
};
