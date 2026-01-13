import { NextDeliveryUI } from "@/components/ui/cards/subjectCard/types";
import { NextDelivery } from "@/lib/definitions";

export const getNextDelivery = (nextDeliveries?: NextDelivery | null): NextDeliveryUI | undefined => {
  if (!nextDeliveries) return undefined;

  const today = new Date();
  const dueDate = new Date(nextDeliveries.due_date);
  const daysLeft = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return {
    title: nextDeliveries.title,
    daysLeft,
  };
};