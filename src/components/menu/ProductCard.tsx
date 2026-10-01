import { CakeSlice } from "lucide-react";
import type { Product } from "../../data/catalog";

type ProductCardProps = { product: Product };

const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex min-h-48 flex-col rounded-3xl border border-brand-gold/30 bg-white p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover motion-reduce:transition-none">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-navy text-brand-gold">
          <CakeSlice size={24} aria-hidden="true" />
        </div>
        <span className="rounded-full bg-brand-cream px-3 py-1 text-xs font-extrabold text-brand-gold-dark">
          Feito com amor
        </span>
      </div>
      <h3 className="text-lg font-extrabold leading-tight text-brand-navy">{product.name}</h3>
      <p className="mt-2 text-sm font-medium leading-relaxed text-brand-navy/70">
        {product.description}
      </p>
      <p className="mt-auto pt-5 text-base font-extrabold text-brand-gold-dark">
        {priceFormatter.format(product.price)}
      </p>
    </article>
  );
}
