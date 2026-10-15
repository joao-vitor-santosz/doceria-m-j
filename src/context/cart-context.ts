import { createContext, useContext } from "react";
import type { NewCartItem, ResolvedCartItem } from "../utils/cart";

export type CartContextValue = {
  items: readonly ResolvedCartItem[];
  totalQuantity: number;
  subtotal: number;
  addItem: (item: NewCartItem) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const cart = useContext(CartContext);

  if (!cart) throw new Error("useCart deve ser usado dentro de CartProvider.");

  return cart;
}
