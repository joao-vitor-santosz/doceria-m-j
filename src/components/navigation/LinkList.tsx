import type { SocialLink } from "../../config/site";
import { Entrance } from "../ui/Entrance";
import { LinkCard } from "./LinkCard";

type LinkListProps = {
  links: readonly SocialLink[];
  siteName: string;
  onInternalNavigate: (href: string) => void;
};

export function LinkList({ links, siteName, onInternalNavigate }: LinkListProps) {
  return (
    <nav
      className="flex w-full flex-col gap-3 sm:gap-4"
      aria-label={`Links da ${siteName}`}
    >
      {links.map((link, index) => (
        <Entrance key={link.id} delay={370 + index * 100}>
          <LinkCard {...link} onInternalNavigate={onInternalNavigate} />
        </Entrance>
      ))}
    </nav>
  );
}
