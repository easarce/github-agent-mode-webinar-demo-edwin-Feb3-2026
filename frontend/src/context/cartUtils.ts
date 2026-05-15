import type { Product } from '../types/product';

export const CART_STORAGE_KEY = 'cartItems';
export const FREE_SHIPPING_THRESHOLD = 100;
export const SHIPPING_FEE = 25;

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imgName: string;
  discount?: number;
}

export const toCartItem = (product: Product, quantity: number): CartItem => ({
  productId: product.productId,
  name: product.name,
  price: product.price,
  quantity,
  imgName: product.imgName,
  discount: product.discount
});

export const getUnitPrice = (item: CartItem) => item.price * (1 - (item.discount || 0));

export const calculateSubtotal = (items: CartItem[]) =>
  items.reduce((total, item) => total + getUnitPrice(item) * item.quantity, 0);

export const calculateShipping = (subtotal: number) =>
  subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;

export const getInitialCartItems = (): CartItem[] => {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!storedCart) {
    return [];
  }

  try {
    const parsed = JSON.parse(storedCart);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item): item is CartItem => (
      typeof item?.productId === 'number' &&
      typeof item?.name === 'string' &&
      typeof item?.price === 'number' &&
      typeof item?.quantity === 'number' &&
      item.quantity > 0 &&
      typeof item?.imgName === 'string'
    ));
  } catch {
    return [];
  }
};

export const upsertItem = (items: CartItem[], newItem: CartItem): CartItem[] => {
  const existingItem = items.find(item => item.productId === newItem.productId);

  if (existingItem) {
    return items.map(item =>
      item.productId === newItem.productId
        ? { ...item, quantity: item.quantity + newItem.quantity }
        : item
    );
  }

  return [...items, newItem];
};
