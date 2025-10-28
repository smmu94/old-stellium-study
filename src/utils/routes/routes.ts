import { NavigationItem } from "./types";

export const ROUTES = {
    HOME: "/",
    FEATURES: "/features",
    ABOUT: "/about",
    CONTACT: "/contact",
    AUTH: "/auth",
} as const;

export const NAVIGATION_ITEMS: NavigationItem[] = [
    { href: ROUTES.FEATURES, label: "Features" },
    { href: ROUTES.ABOUT, label: "About" },
    { href: ROUTES.CONTACT, label: "Contact" },
    { href: ROUTES.AUTH, label: "Sign In" },
] as const;

export const PUBLIC_ROUTES_WITH_FOOTER: readonly string[] = [
    ROUTES.HOME,
    ROUTES.FEATURES,
    ROUTES.ABOUT,
    ROUTES.CONTACT,
    ROUTES.AUTH,
] as const;

export const isPublicRouteWithFooter = (pathname: string): boolean => {
    return PUBLIC_ROUTES_WITH_FOOTER.includes(pathname);
};