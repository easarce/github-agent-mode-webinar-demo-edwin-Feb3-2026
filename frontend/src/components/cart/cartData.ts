export type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export const cartItems: CartItem[] = [
  { id: 1, name: 'AI Smart Feeder', image: '/feeder.png', price: 89, quantity: 1 },
  { id: 2, name: 'Smart Fountain', image: '/smart-fountain.png', price: 99, quantity: 1 },
  { id: 3, name: 'Auto Groomer', image: '/auto-groomer.png', price: 79, quantity: 1 },
];
