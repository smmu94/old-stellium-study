"use client";

import Button from "@/components/ui/button";
import { handleLogout } from "@/features/auth/authThunks";
import { ROUTES } from "@/utils/routes/routes";
import { useRouter, usePathname } from "next/navigation";
import Item from "./components/item";
import { DASHBOARD_ITEMS } from "./constants";
import Avatar from "./components/avatar";
import { FaTimes } from "react-icons/fa";
import { SidebarProps } from "./types";

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const onLogout = async () => {
    await handleLogout();
    router.replace(ROUTES.AUTH);
  };

  return (
    <aside 
      className={`
          fixed md:static inset-y-0 left-0 z-50
          w-xs bg-oxford h-screen flex flex-col p-4
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
    >
      <button
        onClick={onClose}
        className="md:hidden absolute top-4 right-4 text-white hover:text-jasmine transition-colors"
        aria-label="Close menu"
      >
        <FaTimes size={24} />
      </button>
      <Avatar />
      <nav className="flex-1 flex flex-col gap-1">
        {DASHBOARD_ITEMS.map((item) => (
          <Item 
            key={item.href} 
            {...item} 
            isActive={pathname === item.href}
            onClick={onClose}
          />
        ))}
      </nav>
      <div className="mt-auto">
        <Button fullWidth onClick={onLogout}>
            Log Out
        </Button>
      </div>
    </aside>
  );
}