import { Minus, Plus } from "lucide-react";
import type { ProductOption, ProductOptionGroup } from "../../data/catalog";
import { formatPrice } from "../../utils/currency";
import { getOptionSelectionKey } from "../../utils/product-customization";

type ProductCustomizationsProps = {
  groups: readonly ProductOptionGroup[];
  selectedOptionQuantities: Readonly<Record<string, number>>;
  onChange: (group: ProductOptionGroup, option: ProductOption) => void;
  onQuantityChange: (group: ProductOptionGroup, option: ProductOption, quantity: number) => void;
};

export function ProductCustomizations({
  groups,
  selectedOptionQuantities,
  onChange,
  onQuantityChange,
}: ProductCustomizationsProps) {
  if (groups.length === 0) return null;

  return (
    <div className="mt-8 space-y-6">
      {groups.map((group) => (
        <fieldset key={group.id}>
          <legend className="text-base font-extrabold text-brand-navy">
            {group.title}
            {group.required && <span className="ml-1 text-brand-gold-dark">*</span>}
          </legend>
          {group.description && (
            <p className="mt-1 text-sm text-brand-navy/65">{group.description}</p>
          )}
          {group.selectionMode === "quantity" && (
            <p className="mt-2 text-sm font-bold text-brand-gold-dark">
              {getGroupQuantity(group, selectedOptionQuantities)}/{group.maximumQuantity} selecionados
            </p>
          )}
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {group.options.map((option) => {
              const selectionKey = getOptionSelectionKey(group.id, option.id);
              const optionQuantity = selectedOptionQuantities[selectionKey] ?? 0;
              const isSelected = optionQuantity > 0;

              if (group.selectionMode === "quantity") {
                const groupQuantity = getGroupQuantity(group, selectedOptionQuantities);
                const maximumForOption = (group.maximumQuantity ?? Number.MAX_SAFE_INTEGER) - groupQuantity + optionQuantity;

                return (
                  <div
                    key={option.id}
                    className="flex items-center gap-3 rounded-2xl border border-brand-gold/30 bg-white p-4"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-extrabold text-brand-navy">{option.label}</span>
                      {option.description && (
                        <span className="mt-0.5 block text-xs font-medium text-brand-navy/60">
                          {option.description}
                        </span>
                      )}
                    </span>
                    <div className="flex items-center gap-2" aria-label={`Quantidade de ${option.label}`}>
                      <button
                        className="grid size-8 place-items-center rounded-lg border border-brand-gold/35 text-brand-navy disabled:cursor-not-allowed disabled:opacity-35"
                        type="button"
                        disabled={optionQuantity === 0}
                        onClick={() => onQuantityChange(group, option, optionQuantity - 1)}
                        aria-label={`Diminuir ${option.label}`}
                      >
                        <Minus size={15} aria-hidden="true" />
                      </button>
                      <output
                        className="grid h-8 w-10 place-items-center rounded-lg border border-brand-gold/35 text-center text-sm font-extrabold"
                        aria-live="polite"
                      >
                        {optionQuantity}
                      </output>
                      <button
                        className="grid size-8 place-items-center rounded-lg bg-brand-navy text-brand-gold disabled:cursor-not-allowed disabled:opacity-35"
                        type="button"
                        disabled={optionQuantity === maximumForOption}
                        onClick={() => onQuantityChange(group, option, optionQuantity + 1)}
                        aria-label={`Aumentar ${option.label}`}
                      >
                        <Plus size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <label
                  key={option.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition focus-within:ring-2 focus-within:ring-brand-gold/35 ${
                    isSelected
                      ? "border-brand-gold bg-white"
                      : "border-brand-gold/30 bg-white/65 hover:border-brand-gold/65"
                  }`}
                  htmlFor={`${group.id}-${option.id}`}
                >
                  <input
                    className="size-4 accent-brand-navy"
                    id={`${group.id}-${option.id}`}
                    type={group.selectionMode === "single" ? "radio" : "checkbox"}
                    name={group.id}
                    checked={isSelected}
                    onChange={() => onChange(group, option)}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-extrabold text-brand-navy">{option.label}</span>
                    {option.description && (
                      <span className="mt-0.5 block text-xs font-medium text-brand-navy/60">
                        {option.description}
                      </span>
                    )}
                  </span>
                  <span className="text-xs font-extrabold text-brand-gold-dark">
                    {option.price > 0 ? `+ ${formatPrice(option.price)}` : "Incluso"}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

function getGroupQuantity(
  group: ProductOptionGroup,
  selectedOptionQuantities: Readonly<Record<string, number>>,
) {
  return group.options.reduce(
    (total, option) => total + (selectedOptionQuantities[getOptionSelectionKey(group.id, option.id)] ?? 0),
    0,
  );
}
