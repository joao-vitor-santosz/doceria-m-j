import { BookOpen, LogIn, Search } from "lucide-react";
import type { ReactNode } from "react";
import type { AppPage } from "../../types/navigation";

type MenuBottomNavProps = {
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
  onSearch?: () => void;
};

export function MenuBottomNav({ activePage, onNavigate, onSearch }: MenuBottomNavProps) {
  const isMenuActive = activePage === "menu";

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 border-t border-brand-gold/25 bg-brand-canvas/95 px-4 py-2.5 backdrop-blur"
      aria-label="Navegação do cardápio"
    >
      <div className="mx-auto grid w-full max-w-md grid-cols-3">
        <NavButton
          active={isMenuActive}
          icon={<BookOpen size={19} aria-hidden="true" />}
          label="Cardápio"
          onClick={() => onNavigate("menu")}
        />
        <NavButton
          active={false}
          icon={<Search size={19} aria-hidden="true" />}
          label="Busca"
          onClick={() => {
            onNavigate("menu");
            onSearch?.();
          }}
        />
        <NavButton
          active={activePage === "sign-in"}
          icon={<LogIn size={19} aria-hidden="true" />}
          label="Entrar"
          onClick={() => onNavigate("sign-in")}
        />
      </div>
    </nav>
  );
}

type NavButtonProps = {
  active: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
};

function NavButton({ active, icon, label, onClick }: NavButtonProps) {
  return (
    <button
      className={`flex flex-col items-center gap-1 rounded-xl py-1 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold ${
        active ? "text-brand-gold" : "text-brand-cream/65 hover:text-brand-cream"
      }`}
      type="button"
      aria-current={active ? "page" : undefined}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}
