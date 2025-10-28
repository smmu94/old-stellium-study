import { isPublicRouteWithFooter } from '@/utils/routes/routes';
import { usePathname } from 'next/navigation';

export const useFooterVisibility = () => {
    const pathname = usePathname();
    return isPublicRouteWithFooter(pathname);
};