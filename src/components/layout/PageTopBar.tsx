import { ArrowLeft } from "lucide-react";

type PageTopBarProps = {
  title: string;
  onBack: () => void;
};

export function PageTopBar({ title, onBack }: PageTopBarProps) {
  return (
    <header className="border-b border-brand-gold/25 bg-brand-canvas text-brand-cream">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-[2.5rem_1fr_2.5rem] items-center gap-3 px-4 py-4 sm:px-6">
        <button
          className="grid size-10 place-items-center rounded-full text-brand-gold transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
          type="button"
          onClick={onBack}
          aria-label="Voltar ao cardápio"
        >
          <ArrowLeft size={21} aria-hidden="true" />
        </button>
        <h1 className="text-center text-lg font-extrabold sm:text-xl">{title}</h1>
        <span aria-hidden="true" />
      </div>
    </header>
  );
}
