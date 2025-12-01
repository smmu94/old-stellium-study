import ConditionalLayout from "@/components/layout/ConditionalLayout";
import { APP_CONFIG, BRAND_ASSETS } from "@/config/constants";
import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/store/ReduxProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import "react-datepicker/dist/react-datepicker.css";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${spaceGrotesk.className} ${orbitron.variable} ${spaceGrotesk.variable} h-full flex flex-col`}
      >
        <QueryClientProvider client={queryClient}>
          <ReduxProvider>
            <ConditionalLayout>
              <Toaster position="bottom-right" />
              {children}
            </ConditionalLayout>
          </ReduxProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}