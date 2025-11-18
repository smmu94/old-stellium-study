import { AssignmentStatusEnum, AssignmentTypeEnum, SubjectColorEnum } from "./enums";

export type Assignment = {
  id?: string;
  title: string;
  dueDate: string;
  status: AssignmentStatusEnum;
  type: AssignmentTypeEnum;
};

export type SubjectBase = {
  id: string;
  name: string;
  icon: string;
  color?: SubjectColorEnum;
};