import { BRAND_ASSETS } from '@/config/constants';
import Image from 'next/image';
import Link from 'next/link';
import { SOCIAL_LINKS } from './constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex justify-between items-center px-10 py-6 bg-oxford text-white">
      <div className="flex items-center">
        <Image
          src={BRAND_ASSETS.logo.dark}
          alt="Stellium Study"
          width={150}
          height={150}
        />
      </div>

      <p className="text-preset-5 text-white">
        &copy; {currentYear} Stellium Study. All rights reserved.
      </p>

      <div className="flex gap-4 items-center">
        {SOCIAL_LINKS.map(({ href, title, icon: Icon }) => (
          <Link
            key={title}
            href={href}
            className={"text-white hover:text-vermilion transition-colors"}
            title={title}
            aria-label={title}
          >
            <Icon className="w-5 h-5" />
          </Link>
        ))}
      </div>
    </footer>
  );
}