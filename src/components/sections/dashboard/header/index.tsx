"use client";

import { useRouter } from "next/navigation";
import { FaBell } from "react-icons/fa";
import Button from "@/components/ui/button";
import { ROUTES } from "@/utils/routes/routes";

interface HeaderProps {
  username: string;
  today: string;
}

export default function Header({ username, today }: HeaderProps) {
  const router = useRouter();
  
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
      <div>
        <h1 className="text-preset-2 font-bold text-oxford capitalize">
          ¡Bienvenido, {username}!
        </h1>
        <p className="text-oxford/70 mt-1 first-letter:uppercase">{today}</p>
      </div>
      <div className="flex items-center gap-3 w-full lg:w-auto">
        <div className="xl:hidden flex-1">
          <Button fullWidth onClick={() => {}} style="secondary">
            <FaBell className="mr-2" /> Recordatorios
          </Button>
        </div>
        <Button onClick={() => router.push(ROUTES.CREATE)}>
          Nueva Materia
        </Button>
      </div>
    </header>
  );
}