import { Entrance } from "../ui/Entrance";

type BrandHeaderProps = { name: string; tagline: string; logoSrc: string };

export function BrandHeader({ name, tagline, logoSrc }: BrandHeaderProps) {
  return (
    <header className="flex w-full flex-col items-center">
      <Entrance delay={40}>
        <div className="relative mb-4 size-[clamp(5.5rem,18vw,7.5rem)] overflow-hidden rounded-full border-2 border-brand-gold bg-brand-navy shadow-logo">
          <img
            className="size-full object-cover"
            src={logoSrc}
            alt="Logo M&J Doces"
          />
        </div>
      </Entrance>
      <Entrance delay={140}>
        <p className="mb-1 text-center text-[clamp(0.6rem,2vw,0.7rem)] font-bold uppercase tracking-[0.3em] text-brand-gold-dark">
          {tagline}
        </p>
      </Entrance>
      <Entrance delay={220}>
        <h1
          id="page-title"
          className="text-center text-[clamp(2rem,7vw,2.75rem)] font-extrabold tracking-tight text-brand-cream"
        >
          {name}
        </h1>
      </Entrance>
      <Entrance delay={290}>
        <div className="my-[clamp(1.5rem,5vw,2.25rem)] h-px w-16 bg-brand-gold" />
      </Entrance>
    </header>
  );
}
