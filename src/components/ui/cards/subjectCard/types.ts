export type SubjectColor = "blue" | "red" | "yellow" | "green" | "rose" | "gray";

export type SubjectCardProps = {
  id: string;
  title: string;
  icon: string;
  color?: SubjectColor
  progress: number;
  nextDelivery?: {
    title: string;
    dueDate: string;
    daysLeft: number;
  };
  onClick: () => void;
}