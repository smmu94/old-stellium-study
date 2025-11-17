import { faker } from "@faker-js/faker";
import { SubjectListResponse } from "./types";

export const listMock: SubjectListResponse = Array.from({ length: 5 }).map(() => {
  const hasDeliveries = faker.datatype.boolean();
  const nextDelivery = hasDeliveries
    ? Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => ({
      title: faker.lorem.words(3),
      dueDate: faker.date.soon().toISOString(),
    }))
    : null;
  return {
    id: faker.string.uuid(),
    name: faker.lorem.words(2),
    icon: faker.word.noun(),
    color: faker.color.human(),
    nextDelivery,
    progress: faker.number.int({ min: 0, max: 100 }),
  };
});