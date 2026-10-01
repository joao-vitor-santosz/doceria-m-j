import type { Ref } from "react";
import { Search } from "lucide-react";

type ProductSearchProps = {
  value: string;
  onChange: (value: string) => void;
  inputRef?: Ref<HTMLInputElement>;
};

export function ProductSearch({ value, onChange, inputRef }: ProductSearchProps) {
  return (
    <label className="relative block">
      <span className="sr-only">Buscar produtos</span>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold-dark"
        size={19}
        aria-hidden="true"
      />
      <input
        className="w-full rounded-2xl border border-brand-gold/45 bg-white px-11 py-3.5 text-brand-navy shadow-sm outline-none placeholder:text-brand-navy/45 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/25"
        type="search"
        ref={inputRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar doces"
      />
    </label>
  );
}
