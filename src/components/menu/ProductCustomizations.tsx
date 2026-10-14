import { Minus, Plus } from "lucide-react";
import type { ProductOption, ProductOptionGroup } from "../../data/catalog";
import { formatPrice } from "../../utils/currency";
import { getGroupSelectedQuantity, getOptionSelectionKey } from "../../utils/product-customization";

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
            <QuantityProgress group={group} selectedQuantity={getGroupSelectedQuantity(group, selectedOptionQuantities)} />
          )}
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {group.options.map((option) => {
              const selectionKey = getOptionSelectionKey(group.id, option.id);
              const optionQuantity = selectedOptionQuantities[selectionKey] ?? 0;
              const isSelected = optionQuantity > 0;

              if (group.selectionMode === "quantity") {
                const groupQuantity = getGroupSelectedQuantity(group, selectedOptionQuantities);
                const maximumForOption = (group.maximumQuantity ?? Number.MAX_SAFE_INTEGER) - groupQuantity + optionQuantity;
                const step = group.quantityStep ?? 1;

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
                    <div className="flex items-center gap-2" role="group" aria-label={`Quantidade de ${option.label}`}>
                      <button
                        className="grid size-11 place-items-center rounded-xl border border-brand-gold/35 text-brand-navy transition hover:bg-brand-cream disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                        type="button"
                        disabled={optionQuantity === 0}
                        onClick={() => onQuantityChange(group, option, Math.max(0, optionQuantity - step))}
                        aria-label={step > 1 ? `Diminuir ${step} de ${option.label}` : `Diminuir ${option.label}`}
                      >
                        <Minus size={17} aria-hidden="true" />
                      </button>
                      <input
                        className="h-11 w-14 rounded-xl border border-brand-gold/35 bg-white text-center text-sm font-extrabold text-brand-navy outline-none [appearance:textfield] focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/25 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        type="number"
                        inputMode="numeric"
                        min={0}
                        max={maximumForOption}
                        value={optionQuantity}
                        onFocus={(event) => event.target.select()}
                        onChange={(event) => {
                          const typedQuantity = event.target.valueAsNumber;
                          onQuantityChange(group, option, Number.isNaN(typedQuantity) ? 0 : typedQuantity);
                        }}
                        aria-label={`Quantidade de ${option.label}`}
                      />
                      <button
                        className="grid size-11 place-items-center rounded-xl bg-brand-navy text-brand-gold transition hover:bg-brand-navy-light disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                        type="button"
                        disabled={optionQuantity >= maximumForOption}
                        onClick={() => onQuantityChange(group, option, optionQuantity + step)}
                        aria-label={step > 1 ? `Aumentar ${step} de ${option.label}` : `Aumentar ${option.label}`}
                      >
                        <Plus size={17} aria-hidden="true" />
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
                  {option.price > 0 && (
                    <span className="text-xs font-extrabold text-brand-gold-dark">
                      + {formatPrice(option.price)}
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

type QuantityProgressProps = { group: ProductOptionGroup; selectedQuantity: number };

function QuantityProgress({ group, selectedQuantity }: QuantityProgressProps) {
  const remainingQuantity = (group.maximumQuantity ?? 0) - selectedQuantity;

  return (
    <p className="mt-2 text-sm font-bold text-brand-gold-dark" aria-live="polite">
      {selectedQuantity}/{group.maximumQuantity} selecionados
      {remainingQuantity > 0 && (
        <span className="font-semibold text-brand-navy/60"> · faltam {remainingQuantity}</span>
      )}
    </p>
  );
}
