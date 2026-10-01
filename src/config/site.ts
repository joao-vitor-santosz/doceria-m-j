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

export const siteConfig = {
  name: "Doceria M&J",
  tagline: "Feito com amor",
  footerMessage: "Um pedacinho de carinho em cada doce",
  links: [
    {
      id: "whatsapp",
      label: "WhatsApp",
      description: "Entre em contato com a gente!",
      href: "#",
      icon: FaWhatsapp,
    }, // Ex.: https://wa.me/5592999999999
    {
      id: "menu",
      label: "Menu",
      href: "/menu",
      internal: true,
      icon: UtensilsCrossed,
    },
    { id: "instagram", label: "Instagram", href: "#", icon: FaInstagram }, // Ex.: https://instagram.com/seu.perfil
  ] satisfies SocialLink[],
} as const;
