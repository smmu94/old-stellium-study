import { BRAND_ASSETS } from "@/config/constants";
import { NAVIGATION_ITEMS, ROUTES } from "@/utils/routes/routes";
import Image from "next/image";
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-white text-oxford border-b border-platinum">
      <Link href={ROUTES.HOME} className="transition-opacity hover:opacity-80">
        <Image
          src={BRAND_ASSETS.logo.light}
          alt="Stellium Study"
          width={200}
          height={200}
        />
      </Link>

      <div className="flex gap-6">
        {NAVIGATION_ITEMS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={"text-preset-4 hover:text-vermilion transition-colors"}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}