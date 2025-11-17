import { faker } from "@faker-js/faker";
import { AssignmentStatusEnum, AssignmentTypeEnum, SubjectColorEnum } from "../enums";
import { SubjectCreationBody } from "./types";

export const SubjectbodyCreationMock: SubjectCreationBody = {
  name: faker.lorem.words(2),
  icon: faker.word.noun(),
  color: faker.helpers.enumValue(SubjectColorEnum),
  assignments: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => ({
    title: faker.lorem.words(2),
    dueDate: faker.date.future().toISOString(),
    status: faker.helpers.enumValue(AssignmentStatusEnum),
    type: faker.helpers.enumValue(AssignmentTypeEnum)
  }))
}