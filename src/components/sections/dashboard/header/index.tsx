"use client";

import Button from "@/components/ui/button";
import { ROUTES } from "@/utils/routes/routes";
import { useRouter } from "next/navigation";

// src/components/sections/dashboard/header/index.tsx
interface HeaderProps {
  username: string;
  today: string;
  mobileTrigger: React.ReactNode; // Nueva prop
}

export default function Header({ username, today, mobileTrigger }: HeaderProps) {
  const router = useRouter();
  
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
      <div>
        <h1 className="text-preset-2 font-bold text-oxford capitalize">
          ¡Bienvenido, {username}!
        </h1>
        <p className="text-oxford/70 mt-1 first-letter:uppercase">{today}</p>
      </div>
      <div className="flex items-center gap-3">
        {/* Aquí se renderiza el MobileRemindersWrapper que contiene el botón y el Aside móvil */}
        {mobileTrigger}
        
        <Button onClick={() => router.push(ROUTES.CREATE)}>
          Nueva Materia
        </Button>
      </div>
    </header>
  );
}