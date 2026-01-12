"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

function AvatarSkeleton() {
  return (
    <div className="flex flex-col items-center gap-3 mb-6 pb-6 border-b border-white/10 animate-pulse">
      <div className="w-18 h-18 rounded-full bg-jasmine/50" />
      <div className="flex flex-col items-center gap-2">
        <div className="h-5 w-32 bg-white/10 rounded" />
        <div className="h-3 w-38 bg-jasmine/50 rounded" />
      </div>
    </div>
  );
}
export default function Avatar() {
  const { data: session, status } = useSession();
  const user = session?.user;

  if (status === "loading") {
    return <AvatarSkeleton />;
  }

  return (
    <div className="flex flex-col items-center gap-2 mb-6 pb-6 border-b border-white/10">
      <div className="w-18 h-18 rounded-full bg-jasmine flex items-center justify-center overflow-hidden border-2 border-jasmine">
        {user?.image ? (
          <Image
            className="rounded-full object-cover"
            src={user.image}
            alt={user.name || "User avatar"}
            width={80}
            height={80}
            priority
          />
        ) : (
          <span className="text-3xl text-oxford font-bold uppercase">
            {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
          </span>
        )}
      </div>
      
      <div className="flex flex-col items-center overflow-hidden w-full">
        <p className="text-preset-3-bolder text-white text-center truncate w-full px-2">
          {user?.name || "Estudiante"}
        </p>
        <p className="text-preset-4 text-jasmine text-center truncate w-full px-2">
          {user?.email}
        </p>
      </div>
    </div>
  );
}