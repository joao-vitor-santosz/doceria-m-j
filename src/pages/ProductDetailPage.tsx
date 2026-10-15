import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "@tanstack/react-router";
import { PageTopBar } from "../components/layout/PageTopBar";
import { MenuBottomNav } from "../components/menu/MenuBottomNav";
import { ProductCustomizations } from "../components/menu/ProductCustomizations";
import { ProductImage } from "../components/menu/ProductImage";
import { siteConfig } from "../config/site";
import { useCart } from "../context/cart-context";
import { productCategories, type ProductOption, type ProductOptionGroup } from "../data/catalog";
import { formatPrice } from "../utils/currency";
import {
  findInvalidGroup,
  getCustomizationExtraPrice,
  getDefaultOptionQuantities,
  getGroupSelectedQuantity,
  getOptionSelectionKey,
} from "../utils/product-customization";

export function ProductDetailPage() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = useLoaderData({ from: "/menu/produtos/$productId" });
  const customizationGroups = product.customizationGroups ?? [];
  const category = productCategories.find((item) => item.id === product.categoryId);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [selectedOptionQuantities, setSelectedOptionQuantities] = useState<Record<string, number>>(() =>
    getDefaultOptionQuantities(customizationGroups),
  );
  const [wasAdded, setWasAdded] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    document.title = `${product.name} | ${siteConfig.name}`;
  }, [product.name]);

  const extraPrice = getCustomizationExtraPrice(customizationGroups, selectedOptionQuantities);
  const total = (product.price + extraPrice) * quantity;
  const invalidGroup = findInvalidGroup(customizationGroups, selectedOptionQuantities);

  function handleAdd() {
    if (invalidGroup) {
      setShowValidation(true);
      setWasAdded(false);
      return;
    }

    addItem({
      productId: product.id,
      quantity,
      optionQuantities: selectedOptionQuantities,
      note,
    });
    setWasAdded(true);
  }

  function handleCustomizationChange(group: ProductOptionGroup, option: ProductOption) {
    setWasAdded(false);
    const selectionKey = getOptionSelectionKey(group.id, option.id);

    setSelectedOptionQuantities((currentQuantities) => {
      if (group.selectionMode === "single") {
        const groupSelectionKeys = new Set(
          group.options.map((groupOption) => getOptionSelectionKey(group.id, groupOption.id)),
        );
        const otherSelections = Object.fromEntries(
          Object.entries(currentQuantities).filter(([key]) => !groupSelectionKeys.has(key)),
        );

        return { ...otherSelections, [selectionKey]: 1 };
      }

      return {
        ...currentQuantities,
        [selectionKey]: currentQuantities[selectionKey] ? 0 : 1,
      };
    });
  }

  function handleQuantityChange(
    group: ProductOptionGroup,
    option: ProductOption,
    requestedQuantity: number,
  ) {
    setWasAdded(false);
    const selectionKey = getOptionSelectionKey(group.id, option.id);

    setSelectedOptionQuantities((currentQuantities) => {
      const currentOptionQuantity = currentQuantities[selectionKey] ?? 0;
      const quantityInOtherOptions = getGroupSelectedQuantity(group, currentQuantities) - currentOptionQuantity;
      const maximumQuantity = group.maximumQuantity ?? Number.MAX_SAFE_INTEGER;
      const sanitizedQuantity = Number.isFinite(requestedQuantity)
        ? Math.max(0, Math.floor(requestedQuantity))
        : currentOptionQuantity;
      const nextQuantity = Math.min(sanitizedQuantity, maximumQuantity - quantityInOtherOptions);

      return { ...currentQuantities, [selectionKey]: nextQuantity };
    });
  }

  return (
    <main className="min-h-dvh bg-brand-cream pb-24 text-brand-navy">
      <PageTopBar title="Detalhe do produto" onBack={() => navigate({ to: "/menu" })} />
      <section className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
        <article className="overflow-hidden rounded-3xl border border-brand-gold/30 bg-white shadow-card">
          <ProductImage
            className="h-[clamp(18rem,55vw,30rem)] w-full"
            src={product.imageSrc}
            alt={product.name}
            loading="eager"
          />
          <div className="p-5 sm:p-7">
            {category && (
              <span className="rounded-full bg-brand-cream px-3 py-1 text-xs font-extrabold text-brand-gold-dark">
                {category.name}
              </span>
            )}
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">{product.name}</h2>
            <p className="mt-3 text-sm font-medium leading-relaxed text-brand-navy/70 sm:text-base">
              {product.description}
            </p>
            <p className="mt-5 text-xl font-extrabold text-brand-gold-dark">
              {formatPrice(product.price)} <span className="text-sm font-semibold text-brand-navy/55">cada</span>
            </p>
          </div>
        </article>

        <ProductCustomizations
          groups={customizationGroups}
          selectedOptionQuantities={selectedOptionQuantities}
          onChange={handleCustomizationChange}
          onQuantityChange={handleQuantityChange}
        />

        <section className="mt-8" aria-labelledby="notes-title">
          <div className="mb-3 flex items-end justify-between gap-4">
            <div>
              <h2 id="notes-title" className="font-extrabold">Observações</h2>
              <p className="mt-1 text-sm text-brand-navy/65">Quer nos contar algum detalhe do pedido?</p>
            </div>
            <span className="text-xs font-bold text-brand-gold-dark">{note.length}/180</span>
          </div>
          <textarea
            className="min-h-28 w-full resize-y rounded-2xl border border-brand-gold/35 bg-white p-4 text-sm outline-none placeholder:text-brand-navy/40 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/25"
            value={note}
            maxLength={180}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Digite suas observações aqui..."
          />
          <p className="mt-2 text-xs leading-relaxed text-brand-navy/55">
            Para alterações que possam gerar cobrança adicional, entre em contato conosco.
          </p>
        </section>

        <section className="mt-8 flex flex-col gap-4 rounded-3xl border border-brand-gold/30 bg-white p-4 shadow-card sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-center gap-4" aria-label="Quantidade">
            <button
              className="grid size-11 place-items-center rounded-xl border border-brand-gold/35 text-brand-navy transition hover:bg-brand-cream disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
              type="button"
              disabled={quantity === 1}
              onClick={() => setQuantity((currentQuantity) => currentQuantity - 1)}
              aria-label="Diminuir quantidade"
            >
              <Minus size={19} aria-hidden="true" />
            </button>
            <span className="min-w-5 text-center text-lg font-extrabold" aria-live="polite">{quantity}</span>
            <button
              className="grid size-11 place-items-center rounded-xl bg-brand-navy text-brand-gold transition hover:bg-brand-navy-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
              type="button"
              onClick={() => setQuantity((currentQuantity) => currentQuantity + 1)}
              aria-label="Aumentar quantidade"
            >
              <Plus size={19} aria-hidden="true" />
            </button>
          </div>
          <button
            className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 text-sm font-extrabold text-brand-navy transition hover:bg-[#e8c17c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
            type="button"
            onClick={handleAdd}
          >
            <ShoppingBag size={18} aria-hidden="true" />
            Adicionar · {formatPrice(total)}
          </button>
        </section>
        {showValidation && invalidGroup && (
          <p className="mt-3 text-center text-sm font-semibold text-brand-gold-dark" role="alert">
            {invalidGroup.selectionMode === "quantity"
              ? `Escolha ${invalidGroup.maximumQuantity} unidades em "${invalidGroup.title}" para continuar.`
              : `Escolha uma opção em "${invalidGroup.title}" para continuar.`}
          </p>
        )}
        <div role="status">
          {wasAdded && (
            <div className="mt-4 flex flex-col items-center gap-3 rounded-2xl bg-brand-navy px-4 py-4 text-center text-sm font-semibold text-brand-cream sm:flex-row sm:justify-between sm:text-left">
              <p>Produto adicionado ao carrinho!</p>
              <button
                className="rounded-xl bg-brand-gold px-4 py-2.5 text-sm font-extrabold text-brand-navy transition hover:bg-[#e8c17c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                type="button"
                onClick={() => navigate({ to: "/carrinho" })}
              >
                Ver carrinho
              </button>
            </div>
          )}
        </div>
      </section>
      <MenuBottomNav activePage="menu" />
    </main>
  );
}
