"use client";

import { useState } from "react";
import { BRAND_ASSETS } from "@/config/constants";
import { NAVIGATION_ITEMS, ROUTES } from "@/utils/routes/routes";
import Image from "next/image";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

function NavLinks({ isMobile, onClick }: { isMobile?: boolean; onClick?: () => void }) {
  return (
    <>
      {NAVIGATION_ITEMS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="text-preset-4 hover:text-vermilion transition-colors"
          onClick={isMobile ? onClick : undefined}
        >
          {label}
        </Link>
      ))}
    </>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="relative flex justify-between items-center px-6 py-4 bg-white text-oxford border-b border-platinum">
      <Link href={ROUTES.HOME} className="transition-opacity hover:opacity-80">
        <Image
          src={BRAND_ASSETS.logo.light}
          alt="Stellium Study"
          className="h-10 w-auto"
          width={200}
          height={50}
        />
      </Link>
      <button
        className="md:hidden text-oxford hover:text-vermilion transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <HiX className="text-2xl cursor-pointer" /> : <HiMenu className="text-2xl cursor-pointer" />}
      </button>
      <nav className="hidden md:flex gap-6">
        <NavLinks />
      </nav>
      {isOpen && (
        <nav className="absolute top-full left-0 w-full bg-white border-t border-b border-platinum flex flex-col md:hidden px-6 py-4 gap-4 shadow-sm" data-testid="mobile-nav">
          <NavLinks isMobile onClick={closeMenu} />
        </nav>
      )}
    </header>
  );
}
