import { faker } from "@faker-js/faker";
import { SubjectColorEnum, SubjectIconEnum } from "@/services/subjects/enums";
import { SubjectListResponse } from "./types";

export const listMock: SubjectListResponse = Array.from({ length: 5 }).map(() => {
  const hasDeliveries = faker.datatype.boolean();
  const next_delivery = hasDeliveries
    ? {
      due_date: faker.date.soon().toISOString(),
      title: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(
        () => faker.lorem.words(2)
      ),
    }
    : null;

  return {
    id: faker.string.uuid(),
    name: faker.lorem.words(2),
    description: faker.lorem.paragraphs(2),
    icon: faker.helpers.enumValue(SubjectIconEnum),
    color: faker.helpers.enumValue(SubjectColorEnum),
    next_delivery,
    progress: faker.number.int({ min: 0, max: 100 }),
  };
});
