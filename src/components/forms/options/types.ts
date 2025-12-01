import { ReactNode } from "react";

export type OptionsProps<T> = {
  label: string;
  options: Array<{
    label: string;
    value: T;
    children: ReactNode;
  }>;
  value: T;
  onChange: (value: T) => void;
  error?: string;
};