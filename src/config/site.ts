import type { LucideIcon } from "lucide-react";
import { UtensilsCrossed } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import type { IconType } from "react-icons";

export type SocialLink = {
  id: "whatsapp" | "menu" | "instagram";
  label: string;
  description?: string;
  href: string;
  internal?: boolean;
  icon: LucideIcon | IconType;
};

const whatsappNumber = "5569992504096";
const whatsappUrl = `https://wa.me/${whatsappNumber}`;

export const siteConfig = {
  name: "Doceria M&J",
  tagline: "Feito com amor",
  footerMessage: "Um pedacinho de carinho em cada doce",
  whatsappNumber,
  whatsappUrl,
  links: [
    {
      id: "whatsapp",
      label: "WhatsApp",
      description: "Entre em contato com a gente!",
      href: whatsappUrl,
      icon: FaWhatsapp,
    },
    {
      id: "menu",
      label: "Menu",
      href: "/menu",
      internal: true,
      icon: UtensilsCrossed,
    },
    { id: "instagram", label: "Instagram", href: "https://instagram.com/doceriam.j", icon: FaInstagram },
  ] satisfies SocialLink[],
} as const;
