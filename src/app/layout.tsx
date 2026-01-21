import AuthProvider from "@/components/providers/SessionProvider";
import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster } from "react-hot-toast";
import { APP_CONFIG, BRAND_ASSETS } from "../utils/constants";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: APP_CONFIG.name,
  description: APP_CONFIG.description,
  authors: [{ name: APP_CONFIG.author }],
  icons: {
    icon: BRAND_ASSETS.favicon,
  },
};

export default function RootLayout({
  children,
}: {
    children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <body
        className={`${spaceGrotesk.className} ${orbitron.variable} ${spaceGrotesk.variable} min-h-screen flex flex-col`}
      >
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Toaster position="bottom-right" />
            {/* Quitamos el div extra y dejamos que el body maneje el flex */}
            {children}
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
