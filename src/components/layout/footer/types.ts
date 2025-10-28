import { NavigationItem } from "@/utils/routes/types";

export interface SocialLink extends NavigationItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}