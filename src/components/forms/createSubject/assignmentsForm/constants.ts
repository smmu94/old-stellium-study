import { Assignment } from "@/services/subjects/types";
import { SelectOption } from "../../select/types";
import { AssignmentStatusEnum, AssignmentTypeEnum } from "@/services/subjects/enums";

export const STATUS_OPTIONS: SelectOption<Assignment["status"]>[] = [
  { label: "Pending", value: AssignmentStatusEnum.PENDING },
  { label: "Completed", value: AssignmentStatusEnum.COMPLETED  },
  { label: "In Progress", value: AssignmentStatusEnum.IN_PROGRESS  },
];

export const TYPE_OPTIONS: SelectOption<Assignment["type"]>[] = [
  { label: "Homework/Project", value: AssignmentTypeEnum.TASK },
  { label: "Test", value: AssignmentTypeEnum.EVALUATION },
];