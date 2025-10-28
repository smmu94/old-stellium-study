import { ROUTES } from "@/utils/routes";
import Image from "next/image";
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-white text-oxford border-b border-platinum">
      <Link href="/">
        <Image src="/logo/stellium-logo.svg" alt="Stellium Study" width={200} height={200} />
      </Link>
      <div className="flex gap-6">
        <Link href={ROUTES.FEATURES} className="text-preset-4 hover:text-vermilion transition-colors">Features</Link>
        <Link href={ROUTES.ABOUT} className="text-preset-4 hover:text-vermilion transition-colors">About</Link>
        <Link href={ROUTES.CONTACT} className="text-preset-4 hover:text-vermilion transition-colors">Contact</Link>
        <Link href={ROUTES.AUTH} className="text-preset-4 hover:text-vermilion transition-colors">Sign In</Link>
      </div>
    </nav>
  );
}