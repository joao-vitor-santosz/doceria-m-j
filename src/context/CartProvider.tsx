import { useEffect, useMemo, useState, type PropsWithChildren } from "react";
import {
  addCartItem,
  loadCart,
  resolveCartItem,
  saveCart,
  type CartItem,
  type ResolvedCartItem,
} from "../utils/cart";
import { CartContext, type CartContextValue } from "./cart-context";

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const resolvedItems = items
      .map(resolveCartItem)
      .filter((item): item is ResolvedCartItem => item !== null);

    return {
      items: resolvedItems,
      totalQuantity: resolvedItems.reduce((total, item) => total + item.quantity, 0),
      subtotal: resolvedItems.reduce((total, item) => total + item.totalPrice, 0),
      addItem: (newItem) => setItems((currentItems) => addCartItem(currentItems, newItem)),
      updateQuantity: (itemId, quantity) =>
        setItems((currentItems) =>
          currentItems.map((item) =>
            item.id === itemId ? { ...item, quantity: Math.max(1, Math.floor(quantity)) } : item,
          ),
        ),
      removeItem: (itemId) => setItems((currentItems) => currentItems.filter((item) => item.id !== itemId)),
      clearCart: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
