/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types/product';
import {
  CART_STORAGE_KEY,
  calculateShipping,
  calculateSubtotal,
  getInitialCartItems,
  toCartItem,
  type CartItem,
  upsertItem
} from './cartUtils';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  addToCart: (product: Product, quantity: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(getInitialCartItems);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const subtotal = useMemo(() => calculateSubtotal(items), [items]);
  const shipping = useMemo(() => calculateShipping(subtotal), [subtotal]);
  const total = subtotal + shipping;
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  const addToCart = (product: Product, quantity: number) => {
    if (quantity <= 0) {
      return;
    }

    setItems(prevItems => upsertItem(prevItems, toCartItem(product, quantity)));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      setItems(prevItems => prevItems.filter(item => item.productId !== productId));
      return;
    }

    setItems(prevItems =>
      prevItems.map(item => (
        item.productId === productId ? { ...item, quantity } : item
      ))
    );
  };

  const removeFromCart = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.productId !== productId));
  };

  return (
    <CartContext.Provider value={{ items, itemCount, subtotal, shipping, total, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
