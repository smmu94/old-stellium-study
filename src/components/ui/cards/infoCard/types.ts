import { ReactNode } from "react";

export type InfoCardProps = {
    title: string;
    description: string;
    icon: ReactNode;
    cardClassName?: string;
};