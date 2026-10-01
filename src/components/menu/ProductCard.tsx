import type { Product } from "../../data/catalog";
import { formatPrice } from "../../utils/currency";
import { ProductImage } from "./ProductImage";

type ProductCardProps = { product: Product; onSelect: (product: Product) => void };

export function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-brand-gold/30 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover motion-reduce:transition-none">
      <button className="block w-full text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-gold" type="button" onClick={() => onSelect(product)}>
        <ProductImage className="h-52 w-full" src={product.imageSrc} alt={product.name} />
        <div className="flex min-h-44 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-extrabold leading-tight text-brand-navy">{product.name}</h3>
            <span className="shrink-0 rounded-full bg-brand-cream px-2.5 py-1 text-[0.65rem] font-extrabold text-brand-gold-dark">
              Artesanal
            </span>
          </div>
          <p className="mt-2 text-sm font-medium leading-relaxed text-brand-navy/70">{product.description}</p>
          <p className="mt-auto pt-5 text-base font-extrabold text-brand-gold-dark">{formatPrice(product.price)}</p>
        </div>
      </button>
    </article>
  );
}
