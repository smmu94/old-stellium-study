export type DatePickerProps = {
  label: string;
  name?: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
};