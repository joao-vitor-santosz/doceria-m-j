import { products, type Product } from "../data/catalog";
import {
  findInvalidGroup,
  getCustomizationExtraPrice,
  getOptionSelectionKey,
  type OptionQuantities,
} from "./product-customization";

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  optionQuantities: OptionQuantities;
  note: string;
};

export type NewCartItem = Omit<CartItem, "id">;

export type ResolvedCartItem = CartItem & {
  product: Product;
  unitPrice: number;
  totalPrice: number;
};

// Somente os itens escolhidos ficam no navegador; dados pessoais do pedido nunca são salvos.
const CART_STORAGE_KEY = "doceria-mj:cart";

export function createCartItemId({ productId, optionQuantities, note }: NewCartItem) {
  const options = Object.entries(optionQuantities)
    .filter(([, quantity]) => quantity > 0)
    .sort(([firstKey], [secondKey]) => firstKey.localeCompare(secondKey))
    .map(([key, quantity]) => `${key}=${quantity}`)
    .join("|");

  return `${productId}::${options}::${note.trim()}`;
}

// Itens com o mesmo produto, escolhas e observação são somados em uma única linha.
export function addCartItem(items: readonly CartItem[], newItem: NewCartItem): CartItem[] {
  const id = createCartItemId(newItem);
  const existingItem = items.find((item) => item.id === id);

  if (!existingItem) {
    const optionQuantities = Object.fromEntries(
      Object.entries(newItem.optionQuantities).filter(([, quantity]) => quantity > 0),
    );

    return [...items, { ...newItem, optionQuantities, note: newItem.note.trim(), id }];
  }

  return items.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity + newItem.quantity } : item,
  );
}

// Recalcula preço e validade a partir do cardápio atual, sem confiar no que estava salvo.
export function resolveCartItem(item: CartItem): ResolvedCartItem | null {
  const product = products.find((currentProduct) => currentProduct.id === item.productId);

  if (!product || !Number.isInteger(item.quantity) || item.quantity < 1) return null;

  const groups = product.customizationGroups ?? [];
  const optionQuantities: OptionQuantities = {};

  for (const group of groups) {
    for (const option of group.options) {
      const key = getOptionSelectionKey(group.id, option.id);
      const quantity = item.optionQuantities[key];

      if (Number.isInteger(quantity) && quantity > 0) optionQuantities[key] = quantity;
    }
  }

  if (findInvalidGroup(groups, optionQuantities)) return null;

  const unitPrice = product.price + getCustomizationExtraPrice(groups, optionQuantities);

  return {
    ...item,
    optionQuantities,
    product,
    unitPrice,
    totalPrice: unitPrice * item.quantity,
  };
}

export function loadCart(): CartItem[] {
  try {
    const storedValue: unknown = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) ?? "[]");

    if (!Array.isArray(storedValue)) return [];

    return storedValue.reduce<CartItem[]>((items, storedItem) => {
      if (!isStoredCartItem(storedItem)) return items;

      const resolvedItem = resolveCartItem({ ...storedItem, id: "" });

      if (!resolvedItem) return items;

      const item: NewCartItem = {
        productId: resolvedItem.productId,
        quantity: resolvedItem.quantity,
        optionQuantities: resolvedItem.optionQuantities,
        note: resolvedItem.note,
      };

      return addCartItem(items, item);
    }, []);
  } catch {
    return [];
  }
}

export function saveCart(items: readonly CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Sem armazenamento disponível (ex.: navegação privada), o carrinho dura só a sessão atual.
  }
}

function isStoredCartItem(value: unknown): value is NewCartItem {
  if (typeof value !== "object" || value === null) return false;

  const item = value as Record<string, unknown>;

  return (
    typeof item.productId === "string" &&
    typeof item.quantity === "number" &&
    typeof item.note === "string" &&
    typeof item.optionQuantities === "object" &&
    item.optionQuantities !== null
  );
}
