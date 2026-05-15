import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'octocat.cart';
const FREE_SHIPPING_THRESHOLD = 100;
const STANDARD_SHIPPING_FEE = 25;

export interface CartProductInput {
  productId: number;
  name: string;
  imgName: string;
  unitPrice: number;
}

export interface CartItem extends CartProductInput {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  addItem: (item: CartProductInput, quantity: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

const loadCartFromStorage = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item) => item.productId > 0 && item.quantity > 0);
  } catch {
    return [];
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCartFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartProductInput, quantity: number) => {
    if (quantity <= 0) return;

    setItems((prev) => {
      const existing = prev.find((cartItem) => cartItem.productId === item.productId);

      if (!existing) {
        return [...prev, { ...item, quantity }];
      }

      return prev.map((cartItem) =>
        cartItem.productId === item.productId
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      );
    });
  };

  const removeItem = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items]
  );

  const shipping = useMemo(() => {
    if (subtotal === 0 || subtotal > FREE_SHIPPING_THRESHOLD) return 0;
    return STANDARD_SHIPPING_FEE;
  }, [subtotal]);

  const total = subtotal + shipping;
  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      shipping,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items, itemCount, subtotal, shipping, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
