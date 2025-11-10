"use client";

import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import Footer from "./footer";
import Navbar from "./navbar";
import Loader from "../ui/loader";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const { isPublic } = useAuthRedirect();
  const { loading, user } = useSelector((state: RootState) => state.auth);

  if (loading || (user && isPublic)) {
    return <main><Loader /></main>;
  }
  
  if (isPublic) {
    return (
      <div className="h-full flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-10">{children}</main>
        <Footer />
      </div>
    );
  }

  return <main className="h-full overflow-y-auto">{children}</main>;
}