import { faker } from "@faker-js/faker";
import { AssignmentStatusEnum, AssignmentTypeEnum, SubjectColorEnum, SubjectIconEnum } from "@/services/subjects/enums";
import { SubjectCreationBody, SubjectCreationResponse } from "./types";

export const SubjectbodyCreationMock: SubjectCreationBody = {
  name: faker.lorem.words(2),
  icon: faker.helpers.enumValue(SubjectIconEnum),
  color: faker.helpers.enumValue(SubjectColorEnum),
  assignments: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => ({
    title: faker.lorem.words(2),
    due_date: faker.date.future().toISOString(),
    status: faker.helpers.enumValue(AssignmentStatusEnum),
    type: faker.helpers.enumValue(AssignmentTypeEnum)
  }))
}

export function buildSubjectCreationResponseMock(
  body: SubjectCreationBody
): SubjectCreationResponse {
  return {
    id: faker.string.uuid(),
    name: body.name,
    icon: body.icon,
    color: body.color,
    next_delivery: {
      title: body.assignments.map(t => t.title),
      due_date: body.assignments[0].due_date,
    },
    progress: 0,
  };
}
