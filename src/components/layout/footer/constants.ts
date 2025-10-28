import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SocialLink } from "./types";

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: '#',
    label: 'Facebook',
    title: 'Facebook',
    icon: FaFacebook,
  },
  {
    href: '#',
    label: 'Instagram', 
    title: 'Instagram',
    icon: FaInstagram,
  },
  {
    href: '#',
    label: 'LinkedIn',
    title: 'LinkedIn', 
    icon: FaLinkedin,
  },
] as const;