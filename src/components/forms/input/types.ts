export type InputProps = {
  label: string;
  placeholder?: string;
  name?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
  loading?: boolean;
  as?: "input" | "textarea";
};