import Link from "next/link";
import { ItemProps } from "./types";
import * as FaIcons from "react-icons/fa";
import { IconType } from "react-icons";

export default function Item({ title, icon, href, isActive = false, onClick  }: ItemProps) {
  const IconComponent = FaIcons[icon as keyof typeof FaIcons] as IconType;
  
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 text-preset-4 rounded-lg transition-colors ${
        isActive 
          ? "bg-jasmine text-oxford" 
          : "text-white hover:bg-jasmine hover:text-oxford"
      }`}
    >
      {IconComponent && <IconComponent />}
      <span>{title}</span>
    </Link>
  ); 
}