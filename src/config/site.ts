import type { LucideIcon } from "lucide-react";
import { UtensilsCrossed } from "lucide-react";
import {
  InstagramIcon,
  type BrandIcon,
  WhatsAppIcon,
} from "../components/ui/BrandIcons";

export type SocialLink = {
  id: "whatsapp" | "menu" | "instagram";
  label: string;
  description?: string;
  href: string;
  icon: LucideIcon | BrandIcon;
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
      icon: WhatsAppIcon,
    }, // Ex.: https://wa.me/5592999999999
    { id: "menu", label: "Menu", href: "#", icon: UtensilsCrossed }, // Cole aqui o link do menu
    { id: "instagram", label: "Instagram", href: "#", icon: InstagramIcon }, // Ex.: https://instagram.com/seu.perfil
  ] satisfies SocialLink[],
} as const;
