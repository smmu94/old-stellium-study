import { SubjectColorEnum, SubjectIconEnum } from "@/services/subjects/enums";
import { Assignment, SubjectBase } from "@/services/subjects/types";
import { SelectOption } from "@/components/forms/select/types";

export type CreateSubjectFormData = {
  generalInfo: {
    name: SubjectBase["name"];
    description: SubjectBase["description"];
    icon: SubjectBase["icon"];
    color: SubjectBase["color"];
  };
  assignment: {
    title: Assignment["title"];
    date: Date | null;
    status: SelectOption<Assignment["status"]> | null;
    type: SelectOption<Assignment["type"]> | null;
  } | null;
  assignments: Array<{
    title: Assignment["title"];
    date: Date | null;
    status: SelectOption<Assignment["status"]> | null;
    type: SelectOption<Assignment["type"]> | null;
  }>;
};

export const initialData: CreateSubjectFormData = {
  generalInfo: {
    name: "",
    description: null,
    icon: SubjectIconEnum.BOOK,
    color: SubjectColorEnum.BLUE,
  },
  assignment: null,
  assignments: [],
};