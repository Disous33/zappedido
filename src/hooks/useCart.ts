import { useMemo, useState } from "react";
import { CartItem, Product } from "../types";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + (item.product.promotionalPrice ?? item.product.price) * item.quantity, 0), [cart]);
  const itemCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  return {
    cart,
    subtotal,
    itemCount,
    addProduct: (product: Product) =>
      setCart((current) => {
        const existing = current.find((item) => item.product.id === product.id);
        if (existing) return current.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        return [...current, { product, quantity: 1 }];
      }),
    increment: (productId: string) => setCart((current) => current.map((item) => (item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item))),
    decrement: (productId: string) => setCart((current) => current.flatMap((item) => (item.product.id === productId ? (item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : []) : [item]))),
    remove: (productId: string) => setCart((current) => current.filter((item) => item.product.id !== productId)),
    clear: () => setCart([]),
  };
};
