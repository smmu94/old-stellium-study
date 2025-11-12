import { ROUTES } from "@/utils/routes/routes";

export const DASHBOARD_ITEMS = [
  {
    title: "Dashboard",
    icon: "FaHome",
    href: ROUTES.DASHBOARD,
  },
  {
    title: "Calendar",
    icon: "FaCalendar",
    href: ROUTES.CALENDAR,
  },
  {
    title: "Statistics",
    icon: "FaChartBar",
    href: ROUTES.STATISTICS,
  },
  {
    title: "Settings",
    icon: "FaCog",
    href: ROUTES.SETTINGS,
  }
] as const;