"use client";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="space-y-6">
      <h1 className="text-preset-2 font-bold text-oxford">
        Welcome back, {user?.displayName || user?.email?.split("@")[0]}! 👋
      </h1>
      <p className="text-oxford mt-2">
        Here what happening with your account today.
      </p>
    </div>
  );
}