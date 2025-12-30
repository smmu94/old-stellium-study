import { SubjectBase } from "@/services/subjects/types";

export type SubjectQueryParams = {
  sortBy?: "name" | "progress" | "nextDelivery";
  order?: "asc" | "desc";
  search?: string;
};

type SubjectListItem = SubjectBase

export type SubjectListResponse = Array<SubjectListItem>;