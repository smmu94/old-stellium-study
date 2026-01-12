import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-y-auto p-10">{children}</main>
      <Footer />
    </div>
  );
}