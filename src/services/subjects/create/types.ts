import { Assignment, SubjectBase } from "@/services/subjects/types";

export type SubjectCreationBody = Pick<SubjectBase, "name" | "icon" | "color"> & {
  assignments: Array<Assignment>;
};

export type SubjectCreationResponse = SubjectBase;