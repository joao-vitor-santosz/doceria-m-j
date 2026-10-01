import type { ProductCategory, ProductCategoryId } from "../../data/catalog";

type CategoryFilterProps = {
  categories: readonly ProductCategory[];
  selectedCategory: ProductCategoryId | "all";
  onSelect: (categoryId: ProductCategoryId | "all") => void;
};

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div>
      <h2 className="mb-3 text-sm font-extrabold text-brand-navy">Categorias</h2>
      <div className="flex flex-wrap gap-2" aria-label="Filtrar por categoria">
        <CategoryButton
          active={selectedCategory === "all"}
          label="Todos"
          onClick={() => onSelect("all")}
        />
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            active={selectedCategory === category.id}
            label={category.name}
            onClick={() => onSelect(category.id)}
          />
        ))}
      </div>
    </div>
  );
}

type CategoryButtonProps = { active: boolean; label: string; onClick: () => void };

function CategoryButton({ active, label, onClick }: CategoryButtonProps) {
  return (
    <button
      className={`rounded-full border px-4 py-2 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold ${
        active
          ? "border-brand-navy bg-brand-navy text-brand-cream"
          : "border-brand-gold/45 bg-white text-brand-navy hover:border-brand-gold hover:bg-brand-cream"
      }`}
      type="button"
      aria-pressed={active}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
