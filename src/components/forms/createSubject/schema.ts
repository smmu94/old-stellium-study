import { AssignmentStatusEnum, AssignmentTypeEnum, SubjectColorEnum, SubjectIconEnum } from "@/services/subjects/enums";
import * as yup from "yup";

const iconEnumValues = Object.values(SubjectIconEnum).filter((v) => typeof v === "number");
const colorEnumValues = Object.values(SubjectColorEnum).filter((v) => typeof v === "number");

const statusSelectOptionSchema = yup.object({
  label: yup.string().required("Label is required"),
  value: yup.mixed<AssignmentStatusEnum>().required("Value is required"),
}).nullable().defined();

const typeSelectOptionSchema = yup.object({
  label: yup.string().required("Label is required"),
  value: yup.mixed<AssignmentTypeEnum>().required("Value is required"),
}).nullable().defined();

const assignmentItemSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Title must have at least 2 characters"),
  date: yup
    .date()
    .nullable()
    .defined()
    .test("required", "Date is required", (value) => value !== null),
  status: statusSelectOptionSchema.test("required", "Status is required", (value) => value !== null),
  type: typeSelectOptionSchema.test("required", "Type is required", (value) => value !== null),
});

export const createSubjectSchema = yup.object({
  generalInfo: yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(4, "Name must have at least 4 characters"),
    description: yup
      .string()
      .nullable()
      .defined(),
    icon: yup
      .number()
      .oneOf(iconEnumValues, "Invalid icon")
      .defined(),
    color: yup
      .number()
      .oneOf(colorEnumValues, "Invalid color")
      .defined(),
  }),
  assignment: assignmentItemSchema.nullable(),
  assignments: yup
    .array()
    .of(assignmentItemSchema)
    .min(1, "You must add at least one assignment")
    .required(),
});