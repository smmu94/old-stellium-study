import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex justify-between items-center px-10 py-6 bg-oxford text-white">
      <div className="flex items-center">
        <Image
          src="/logo/stellium-logo-white.svg"
          alt="Stellium Study"
          width={150}
          height={150}
        />
      </div>
      <p className="text-sm text-white">
        &copy; {new Date().getFullYear()} Stellium Study. All rights reserved.
      </p>
      <div className="flex gap-4 items-center">
        <Link
          href="#"
          className="text-white hover:text-vermilion transition-colors"
          title="Facebook"
        >
          <FaFacebook className="w-5 h-5" />
        </Link>
        <Link
          href="#"
          className="text-white hover:text-vermilion transition-colors"
          title="Instagram"
        >
          <FaInstagram className="w-5 h-5" />
        </Link>
        <Link
          href="#"
          className="text-white hover:text-vermilion transition-colors"
          title="LinkedIn"
        >
          <FaLinkedin className="w-5 h-5" />
        </Link>
      </div>
    </footer>
  );
}