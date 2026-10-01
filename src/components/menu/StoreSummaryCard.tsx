import { ChevronRight, MapPin } from "lucide-react";

type StoreSummaryCardProps = {
  logoSrc: string;
  name: string;
  category: string;
  onClick: () => void;
};

export function StoreSummaryCard({ logoSrc, name, category, onClick }: StoreSummaryCardProps) {
  return (
    <button
      className="group flex w-full items-center gap-4 rounded-3xl border border-brand-gold/35 bg-white p-4 text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold sm:p-5"
      type="button"
      onClick={onClick}
      aria-label={`Ver informações sobre ${name}`}
    >
      <img
        className="size-16 shrink-0 rounded-2xl border border-brand-gold/30 object-cover sm:size-18"
        src={logoSrc}
        alt=""
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-base font-extrabold text-brand-navy sm:text-lg">{name}</span>
        <span className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-brand-navy/65">
          <MapPin size={15} aria-hidden="true" />
          {category}
        </span>
        <span className="mt-2 block text-xs font-bold text-brand-gold-dark">Ver informações da doceria</span>
      </span>
      <ChevronRight
        className="shrink-0 text-brand-gold-dark transition group-hover:translate-x-0.5"
        size={22}
        aria-hidden="true"
      />
    </button>
  );
}
