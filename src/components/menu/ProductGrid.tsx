import type { Product, ProductCategory, ProductCategoryId } from "../../data/catalog";
import { ProductSection } from "./ProductSection";

type ProductGridProps = {
  products: readonly Product[];
  categories: readonly ProductCategory[];
  selectedCategory: ProductCategoryId | "all";
};

export function ProductGrid({ products, categories, selectedCategory }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-brand-gold/60 bg-white/65 px-6 py-14 text-center">
        <p className="text-lg font-extrabold text-brand-navy">Nenhum doce encontrado</p>
        <p className="mt-2 text-sm text-brand-navy/70">Tente buscar por outro nome ou categoria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {categories.map((category) => {
        const categoryProducts = products.filter((product) => product.categoryId === category.id);
        const shouldDisplay = selectedCategory === "all" || selectedCategory === category.id;

        if (!shouldDisplay || categoryProducts.length === 0) return null;

        return <ProductSection key={category.id} category={category} products={categoryProducts} />;
      })}
    </div>
  );
}
