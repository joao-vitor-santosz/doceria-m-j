import { useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import logo from "../assets/logo-mj.jpeg";
import { CategoryFilter } from "../components/menu/CategoryFilter";
import { MenuHeader } from "../components/menu/MenuHeader";
import { MenuBottomNav } from "../components/menu/MenuBottomNav";
import { ProductGrid } from "../components/menu/ProductGrid";
import { ProductSearch } from "../components/menu/ProductSearch";
import { StoreSummaryCard } from "../components/menu/StoreSummaryCard";
import { siteConfig } from "../config/site";
import { storeConfig } from "../config/store";
import { productCategories, products, type ProductCategoryId } from "../data/catalog";

export function MenuPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategoryId | "all">("all");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.categoryId === selectedCategory;
      const matchesQuery =
        !normalizedQuery ||
        `${product.name} ${product.description}`.toLocaleLowerCase("pt-BR").includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  return (
    <main className="min-h-dvh bg-brand-cream pb-24 text-brand-navy">
      <MenuHeader onBack={() => navigate({ to: "/" })} />
      <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-gold-dark">
            Doces artesanais
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Escolha um pedacinho de carinho
          </h2>
          <p className="mt-3 text-sm font-medium leading-relaxed text-brand-navy/70 sm:text-base">
            Confira nossas opções e encontre o doce perfeito para o seu momento.
          </p>
        </div>
        <div className="space-y-6">
          <StoreSummaryCard
            logoSrc={logo}
            name={siteConfig.name}
            category={storeConfig.category}
            onClick={() => navigate({ to: "/informacoes" })}
          />
          <ProductSearch value={query} onChange={setQuery} inputRef={searchInputRef} />
          <CategoryFilter
            categories={productCategories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
          <ProductGrid
            products={filteredProducts}
            categories={productCategories}
            selectedCategory={selectedCategory}
            onSelectProduct={(product) =>
              navigate({
                to: "/menu/produtos/$productId",
                params: { productId: product.id },
              })
            }
          />
        </div>
      </section>
      <MenuBottomNav
        activePage="menu"
        onSearch={() => searchInputRef.current?.focus()}
      />
    </main>
  );
}
