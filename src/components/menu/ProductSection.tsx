import type { Product, ProductCategory } from "../../data/catalog";
import { ProductCard } from "./ProductCard";

type ProductSectionProps = {
  category: ProductCategory;
  products: readonly Product[];
};

export function ProductSection({ category, products }: ProductSectionProps) {
  return (
    <section aria-labelledby={`category-${category.id}`}>
      <div className="mb-4">
        <h2 id={`category-${category.id}`} className="text-2xl font-extrabold tracking-tight text-brand-navy">
          {category.name}
        </h2>
        <p className="mt-1 text-sm font-medium text-brand-navy/65">{category.description}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
