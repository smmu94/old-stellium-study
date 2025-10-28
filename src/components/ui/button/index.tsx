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

    const buttonClasses = `btn-${style} ${isDisabled ? "btn-disabled" : ""} ${fullWidth ? "w-full" : ""}`;

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