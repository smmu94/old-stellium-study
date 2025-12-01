import { SingleValue } from "react-select";

export type SelectOption<T = string | number> = {
  label: string;
  value: T;
};

export type SelectProps<T> = {
  label: string;
  name: string;
  options: SelectOption<T>[];
  placeholder?: string;
  error?: string;
  value: SingleValue<SelectOption<T>>;
  onChange: (value: SingleValue<SelectOption<T>>) => void;
  disabled?: boolean;
  loading?: boolean;
};