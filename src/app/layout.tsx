import ConditionalLayout from "@/components/layout/ConditionalLayout";
import Navbar from "@/components/layout/navbar";
import { APP_CONFIG, BRAND_ASSETS } from "@/config/constants";
import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${spaceGrotesk.className} ${orbitron.variable} ${spaceGrotesk.variable} h-screen flex flex-col overflow-hidden`}>
        <Navbar />
        <div className="flex-1">
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </div>
      </body>
    </html>
  );
}
