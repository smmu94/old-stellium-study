"use client";

import Button from "@/components/ui/button";
import { useState } from "react";
import { FaBell, FaTimes } from "react-icons/fa";

export default function MobileRemindersWrapper({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Este es el botón que vive en el Header realmente */}
      <div className="xl:hidden flex-1">
        <Button onClick={() => setIsOpen(true)} style="secondary" fullWidth>
          <FaBell className="mr-2" /> Recordatorios
        </Button>
      </div>

      {/* Overlay y Aside Móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-oxford/40 backdrop-blur-sm z-40 xl:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside 
        className={`fixed top-0 right-0 h-full w-xs bg-jasmine p-8 z-50 
    shadow-2xl transition-transform duration-300 xl:hidden
    flex flex-col gap-12 /* <-- El gap considerable que querías */
    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header del Aside */}
        <div className="flex justify-between items-center shrink-0">
          <h3 className="text-preset-3-bolder text-oxford">Recordatorios</h3>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-oxford hover:scale-110 transition-transform"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </aside>
    </>
  );
}