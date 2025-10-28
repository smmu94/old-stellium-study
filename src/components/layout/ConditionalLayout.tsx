'use client';

import { ROUTES } from '@/utils/routes';
import { usePathname } from 'next/navigation';
import Footer from './footer';

interface ConditionalLayoutProps {
    children: React.ReactNode;
}

const PUBLIC_ROUTES_WITH_FOOTER = [
    ROUTES.HOME,
    ROUTES.FEATURES,
    ROUTES.ABOUT,
    ROUTES.CONTACT,
    ROUTES.AUTH,
] as const;

const shouldShowFooter = (pathname: string): boolean => {
    return PUBLIC_ROUTES_WITH_FOOTER.some(route => pathname === route);
};

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
    const pathname = usePathname();
    const showFooter = shouldShowFooter(pathname);

    if (showFooter) {
        return (
            <div className="h-full flex flex-col">
                <main className="flex-1 overflow-y-auto p-10">
                    {children}
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <main className="h-full overflow-y-auto">
            {children}
        </main>
    );
}