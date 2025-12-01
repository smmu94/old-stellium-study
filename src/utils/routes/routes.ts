import { NavigationItem } from "./types";

export const ROUTES = {
  HOME: "/",
  FEATURES: "/features",
  ABOUT: "/about",
  CONTACT: "/contact",
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
  CREATE: "dashboard/create",
  CALENDAR: "/dashboard/calendar",
  STATISTICS: "/dashboard/statistics",
  SETTINGS: "/dashboard/settings"
} as const;

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { href: ROUTES.FEATURES, label: "Features" },
  { href: ROUTES.ABOUT, label: "About" },
  { href: ROUTES.CONTACT, label: "Contact" },
  { href: ROUTES.AUTH, label: "Sign In" },
] as const;

export const PUBLIC_ROUTES: readonly string[] = [
  ROUTES.HOME,
  ROUTES.FEATURES,
  ROUTES.ABOUT,
  ROUTES.CONTACT,
  ROUTES.AUTH,
] as const;

export const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.includes(pathname);
};