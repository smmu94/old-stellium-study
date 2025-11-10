"use client";

import Button from "@/components/ui/button";
import { handleLogout } from "@/features/auth/authThunks";
import { RootState } from "@/store/store";
import { ROUTES } from "@/utils/routes/routes";
import { useRouter } from "next-router-mock";
import { useDispatch, useSelector } from "react-redux";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const onLogout = async () => {
    await handleLogout();
    router.replace(ROUTES.AUTH)
  }
  if (!user) return null;
  return (
    <div>
      <h1>Welcome to your dashboard, {user.displayName || user.email}</h1>
      <Button onClick={onLogout}>Log Out</Button>
    </div>
  );
}