import { SubjectColorEnum, SubjectIconEnum } from "@/services/subjects/enums";

export type ReminderCardProps = {
  title: string;
  events: Array<{
    icon?: SubjectIconEnum;
    dotColor?: SubjectColorEnum;
    name: string;
    dateTime: string;
  }>
}