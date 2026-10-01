import { ArrowLeft, Clock3, Sparkles } from "lucide-react";

type MenuHeaderProps = {
  onBack: () => void;
};

export function MenuHeader({ onBack }: MenuHeaderProps) {
  return (
    <header className="border-b border-brand-gold/25 bg-brand-canvas text-brand-cream">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-3 px-4 py-4 sm:px-6">
        <button
          className="grid size-10 shrink-0 place-items-center rounded-full text-brand-gold transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
          type="button"
          onClick={onBack}
          aria-label="Voltar à página inicial"
        >
          <ArrowLeft size={21} aria-hidden="true" />
        </button>
        <div className="min-w-0 flex-1 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            Doceria M&J
          </p>
          <h1 className="truncate text-lg font-extrabold sm:text-xl">Nosso cardápio</h1>
        </div>
        <span className="grid size-10 shrink-0 place-items-center text-brand-gold" aria-hidden="true">
          <Sparkles size={20} />
        </span>
      </div>
      <div className="mx-auto flex w-full max-w-5xl items-center gap-2 px-4 pb-4 text-xs font-bold text-brand-cream/75 sm:px-6">
        <Clock3 size={15} aria-hidden="true" />
        <span>Escolha seus doces favoritos</span>
      </div>
    </header>
  );
}
