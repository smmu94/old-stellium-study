"use client";

import Sidebar from "@/components/layout/sidebar";
import { DASHBOARD_ITEMS } from "@/components/layout/sidebar/constants";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function DashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const currentPage = DASHBOARD_ITEMS.find(item => item.href === pathname);
  const pageTitle = currentPage?.title || "Dashboard";

  return (
    <div className="flex h-screen min-h-0 bg-platinum">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <header className="md:hidden bg-white border-b px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-oxford hover:text-jasmine transition-colors"
            aria-label="Open menu"
          >
            <FaBars size={24} />
          </button>
          <h1 className="text-preset-3-bolder text-oxford">{pageTitle}</h1>
        </header>
        <main className="flex-1 min-h-0 overflow-auto p-6 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}