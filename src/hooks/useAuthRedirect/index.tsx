"use client";
import { RootState } from "@/store/store";
import { ROUTES, isPublicRoute } from "@/utils/routes/routes";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuthRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { loading, user } = useSelector((state: RootState) => state.auth);

  const isPublic = isPublicRoute(pathname);

  useEffect(() => {
    if (loading) return;

    if (user && isPublic) {
      router.replace(ROUTES.DASHBOARD);
    } else if (!user && !isPublic) {
      router.replace(ROUTES.AUTH);
    }
  }, [user, isPublic, router, loading]);

  return { isPublic };
};
