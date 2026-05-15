import { describe, expect, it } from 'vitest';
import { calculateShipping, calculateSubtotal, getUnitPrice, upsertItem, type CartItem } from './cartUtils';

describe('cartUtils', () => {
  it('calculates discounted subtotal correctly', () => {
    const items: CartItem[] = [
      { productId: 1, name: 'One', price: 40, quantity: 2, imgName: '1.png' },
      { productId: 2, name: 'Two', price: 30, quantity: 1, discount: 0.1, imgName: '2.png' }
    ];

    expect(getUnitPrice(items[1])).toBe(27);
    expect(calculateSubtotal(items)).toBe(107);
  });

  it('applies shipping rule with free shipping at 100 or above', () => {
    expect(calculateShipping(99.99)).toBe(25);
    expect(calculateShipping(100)).toBe(0);
    expect(calculateShipping(0)).toBe(0);
  });

  it('merges quantities for the same product', () => {
    const items: CartItem[] = [{ productId: 1, name: 'One', price: 10, quantity: 1, imgName: '1.png' }];
    const updated = upsertItem(items, { productId: 1, name: 'One', price: 10, quantity: 3, imgName: '1.png' });

    expect(updated).toHaveLength(1);
    expect(updated[0].quantity).toBe(4);
  });
});
