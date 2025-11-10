import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ButtonProps } from "./types";

export default function Button({
  children,
  onClick,
  style = "primary",
  type = "button",
  loading = false,
  disabled = false,
  fullWidth = false
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const buttonClasses = `btn-${style} ${isDisabled ? "btn-disabled" : ""} ${fullWidth ? "w-full" : ""} outline-none focus:outline-none rounded-md px-4 py-2 flex items-center justify-center gap-2 transition`;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      type={type}
      disabled={isDisabled}
    >
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
      ) : children}
    </button>
  );
}   