type ButtonStyle = "primary" | "secondary" | "ghost";
type ButtonType = "button" | "submit";

export type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    style?: ButtonStyle;
    type?: ButtonType;
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
};
