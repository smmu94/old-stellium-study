"use client";

import { useFooterVisibility } from "@/hooks/useFooterVisibility";
import Footer from "./footer";

interface ConditionalLayoutProps {
    children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
    const showFooter = useFooterVisibility();

    if (!showFooter) {
        return (
            <main className="h-full overflow-y-auto">
                {children}
            </main>
        );
    }

    return (
        <div className="h-full flex flex-col">
            <main className="flex-1 overflow-y-auto p-10">
                {children}
            </main>
            <Footer />
        </div>
    );
}