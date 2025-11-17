export type SubjectQueryParams = {

}

type NextDelivery = {
  title: string,
  dueDate: string,
}

export type SubjectBase = {
  id: string,
  name: string,
  icon: string,
  color: string,
  nextDelivery?: Array<NextDelivery> | null,
  progress: number,
}

export type SubjectListResponse = Array<SubjectBase>