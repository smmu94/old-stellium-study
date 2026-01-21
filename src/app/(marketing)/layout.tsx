// src/app/(marketing)/layout.tsx
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}