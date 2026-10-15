import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { PageTopBar } from "../components/layout/PageTopBar";
import { MenuBottomNav } from "../components/menu/MenuBottomNav";
import { ProductImage } from "../components/menu/ProductImage";
import { siteConfig } from "../config/site";
import { useCart } from "../context/cart-context";
import type { ResolvedCartItem } from "../utils/cart";
import { formatPrice } from "../utils/currency";
import { getSelectionSummary } from "../utils/product-customization";

export function CartPage() {
  const navigate = useNavigate();
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  useEffect(() => {
    document.title = `Carrinho | ${siteConfig.name}`;
  }, []);

  return (
    <main className="min-h-dvh bg-brand-cream pb-24 text-brand-navy">
      <PageTopBar title="Carrinho" onBack={() => navigate({ to: "/menu" })} />
      <section className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
        {items.length === 0 ? (
          <EmptyCart onBrowseMenu={() => navigate({ to: "/menu" })} />
        ) : (
          <>
            <h2 className="text-2xl font-extrabold tracking-tight">Seu pedido</h2>
            <ul className="mt-5 space-y-4">
              {items.map((item) => (
                <li key={item.id}>
                  <CartItemCard
                    item={item}
                    onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
                    onRemove={() => removeItem(item.id)}
                  />
                </li>
              ))}
            </ul>

            <section
              className="mt-8 rounded-3xl border border-brand-gold/30 bg-white p-5 shadow-card sm:p-6"
              aria-labelledby="cart-summary-title"
            >
              <h2 id="cart-summary-title" className="sr-only">Resumo do pedido</h2>
              <div className="flex items-center justify-between gap-4">
                <span className="font-extrabold">Subtotal</span>
                <span className="text-xl font-extrabold text-brand-gold-dark">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-2 text-sm text-brand-navy/65">
                Taxa de entrega, quando houver, combinada pelo WhatsApp. Pagamento via Pix.
              </p>
              <button
                className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 text-sm font-extrabold text-brand-navy transition hover:bg-[#e8c17c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                type="button"
                onClick={() => navigate({ to: "/carrinho/finalizar" })}
              >
                Finalizar pedido
              </button>
              <button
                className="mt-3 w-full rounded-xl px-5 py-2.5 text-sm font-bold text-brand-navy/70 transition hover:text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                type="button"
                onClick={() => navigate({ to: "/menu" })}
              >
                Continuar comprando
              </button>
            </section>
          </>
        )}
      </section>
      <MenuBottomNav activePage="cart" />
    </main>
  );
}

type EmptyCartProps = { onBrowseMenu: () => void };

export function EmptyCart({ onBrowseMenu }: EmptyCartProps) {
  return (
    <div className="rounded-3xl border border-dashed border-brand-gold/60 bg-white/65 px-6 py-14 text-center">
      <ShoppingBag className="mx-auto text-brand-gold-dark" size={36} aria-hidden="true" />
      <p className="mt-4 text-lg font-extrabold text-brand-navy">Seu carrinho está vazio</p>
      <p className="mt-2 text-sm text-brand-navy/70">Escolha seus doces favoritos no cardápio.</p>
      <button
        className="mt-6 rounded-xl bg-brand-navy px-5 py-3 text-sm font-extrabold text-brand-cream transition hover:bg-brand-navy-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
        type="button"
        onClick={onBrowseMenu}
      >
        Ver cardápio
      </button>
    </div>
  );
}

type CartItemCardProps = {
  item: ResolvedCartItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
};

function CartItemCard({ item, onQuantityChange, onRemove }: CartItemCardProps) {
  const selectionSummary = getSelectionSummary(item.product.customizationGroups ?? [], item.optionQuantities);

  return (
    <article className="flex gap-4 rounded-3xl border border-brand-gold/30 bg-white p-4 shadow-card">
      <ProductImage className="size-18 shrink-0 rounded-2xl sm:size-22" src={item.product.imageSrc} alt={item.product.name} />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-extrabold leading-tight">{item.product.name}</h3>
            <p className="mt-0.5 text-xs font-bold text-brand-gold-dark">{formatPrice(item.unitPrice)} cada</p>
          </div>
          <button
            className="-mr-2 -mt-2 grid size-11 shrink-0 place-items-center rounded-xl text-brand-navy/55 transition hover:bg-brand-cream hover:text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
            type="button"
            onClick={onRemove}
            aria-label={`Remover ${item.product.name} do carrinho`}
          >
            <Trash2 size={18} aria-hidden="true" />
          </button>
        </div>
        {selectionSummary.length > 0 && (
          <ul className="mt-2 space-y-0.5 text-sm text-brand-navy/70">
            {selectionSummary.map(({ title, value }) => (
              <li key={title}>
                <span className="font-bold">{title}:</span> {value}
              </li>
            ))}
          </ul>
        )}
        {item.note && (
          <p className="mt-1 break-words text-sm text-brand-navy/60">
            <span className="font-bold">Obs.:</span> {item.note}
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2" role="group" aria-label={`Quantidade de ${item.product.name}`}>
            <button
              className="grid size-11 place-items-center rounded-xl border border-brand-gold/35 text-brand-navy transition hover:bg-brand-cream disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
              type="button"
              disabled={item.quantity === 1}
              onClick={() => onQuantityChange(item.quantity - 1)}
              aria-label="Diminuir quantidade"
            >
              <Minus size={17} aria-hidden="true" />
            </button>
            <span className="min-w-6 text-center font-extrabold" aria-live="polite">{item.quantity}</span>
            <button
              className="grid size-11 place-items-center rounded-xl bg-brand-navy text-brand-gold transition hover:bg-brand-navy-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
              type="button"
              onClick={() => onQuantityChange(item.quantity + 1)}
              aria-label="Aumentar quantidade"
            >
              <Plus size={17} aria-hidden="true" />
            </button>
          </div>
          <span className="font-extrabold">{formatPrice(item.totalPrice)}</span>
        </div>
      </div>
    </article>
  );
}
