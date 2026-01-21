// --- ENUMS ---
export enum AssignmentTypeEnum {
  EVALUATION = 0,
  TASK = 1,
}

export enum AssignmentStatusEnum {
  PENDING = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2,
}

export enum SubjectColorEnum {
  BLUE = 0,
  RED = 1,
  YELLOW = 2,
  GREEN = 3,
  PURPLE = 4,
  ROSE = 5
}

export enum SubjectIconEnum {
  BOOK = 0,
  CALCULATOR = 1,
  FLASK = 2,
  GLOBE = 3,
  GEAR = 4,
  PENCIL = 5, 
}

// --- TYPES ---

export type Assignment = {
  id: string;
  subject_id: string;
  user_id: string;
  title: string;
  due_date: string;
  status: AssignmentStatusEnum;
  type: AssignmentTypeEnum;
};

export type NextDelivery = {
  tasks: Array<{ title: string; due_date: string }>;
};

export type Subject = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  icon: SubjectIconEnum;
  color: SubjectColorEnum;
  progress: number;
  next_delivery: NextDelivery | null;
};

// Response específica para el listado del dashboard
export type SubjectListResponse = Subject[];

// Tipos para filtros y queries
export type SubjectQueryParams = {
  sortBy?: "name" | "progress" | "nextDelivery";
  order?: "asc" | "desc";
  search?: string;
};