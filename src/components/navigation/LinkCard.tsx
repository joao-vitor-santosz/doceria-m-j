import type { MouseEvent } from "react";
import type { SocialLink } from "../../config/site";

type LinkCardProps = SocialLink & { onInternalNavigate: (href: string) => void };

export function LinkCard({
  label,
  description,
  href,
  internal = false,
  icon: Icon,
  onInternalNavigate,
}: LinkCardProps) {
  const isPlaceholder = href === "#";

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!internal) return;

    event.preventDefault();
    onInternalNavigate(href);
  }

  return (
    <a
      className="group relative grid min-h-18 grid-cols-[3rem_1fr_3rem] items-center rounded-[1.1rem] border border-brand-gold/40 bg-brand-cream px-4 py-3 text-brand-navy shadow-card transition duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:bg-white hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold sm:min-h-20 sm:rounded-[1.25rem] sm:px-5"
      href={href}
      aria-label={description ? `${label}: ${description}` : label}
      onClick={handleClick}
      {...(isPlaceholder && { "aria-disabled": true })}
    >
      <span className="grid size-10 place-items-center rounded-xl border border-brand-gold/50 bg-brand-navy text-brand-gold transition duration-300 group-hover:scale-105 motion-reduce:transition-none sm:size-11">
        <Icon size={24} strokeWidth={2.15} aria-hidden="true" />
      </span>
      <span className="flex min-w-0 flex-col items-center justify-center gap-0.5 px-2 text-center leading-tight">
        <span className="text-sm font-bold tracking-[0.01em] sm:text-[0.95rem]">
          {label}
        </span>
        {description && (
          <span className="text-xs font-medium text-brand-navy/75 sm:text-[0.8rem]">
            {description}
          </span>
        )}
      </span>
      <span aria-hidden="true" />
    </a>
  );
}
