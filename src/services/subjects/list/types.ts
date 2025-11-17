import { SubjectBase, Assignment } from "../types";

export type SubjectQueryParams = {
  sortBy?: "name" | "progress" | "nextDelivery";
  order?: "asc" | "desc";
  search?: string;
};

type NextDelivery = Pick<Assignment, "dueDate" | "title">;

type SubjectListItem = SubjectBase & {
  progress: number;
  nextDelivery: Array<NextDelivery> | null;
}

export type SubjectListResponse = Array<SubjectListItem>;