import { useTheme } from '../../context/ThemeContext';

type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

const cartItems: CartItem[] = [
  { id: 1, name: 'AI Smart Feeder', image: '/feeder.png', price: 89, quantity: 1 },
  { id: 2, name: 'Smart Fountain', image: '/smart-fountain.png', price: 99, quantity: 1 },
  { id: 3, name: 'Auto Groomer', image: '/auto-groomer.png', price: 79, quantity: 1 },
];

export default function CartPage() {
  const { darkMode } = useTheme();
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal * 0.05;
  const shipping = 10;
  const total = subtotal - discount + shipping;

  return (
    <section className={`min-h-screen pt-24 pb-10 px-4 transition-colors duration-300 ${darkMode ? 'bg-dark' : 'bg-gray-100'}`}>
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[2fr_1fr]">
        <div className={`rounded-xl border shadow-sm ${darkMode ? 'border-primary/20 bg-gray-900/70' : 'border-gray-200 bg-white'}`}>
          <div className="border-b border-primary/20 p-5">
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'}`}>My Cart</h1>
          </div>
          <div className="space-y-4 p-5">
            {cartItems.map((item, index) => (
              <article
                key={item.id}
                className={`grid items-center gap-4 rounded-lg border p-4 sm:grid-cols-[auto_80px_1fr_auto_auto_auto] ${
                  darkMode ? 'border-primary/20 bg-gray-800/70' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <span className={`text-lg font-semibold ${darkMode ? 'text-light' : 'text-gray-700'}`}>{index + 1}</span>
                <img src={item.image} alt={item.name} className="h-16 w-16 rounded-md object-cover" />
                <div>
                  <p className={`font-semibold ${darkMode ? 'text-light' : 'text-gray-800'}`}>{item.name}</p>
                  <p className="text-sm text-primary">${item.price.toFixed(2)} each</p>
                </div>
                <span className={`rounded-md border px-3 py-1 text-center ${darkMode ? 'border-gray-600 text-light' : 'border-gray-300 text-gray-700'}`}>
                  {item.quantity}
                </span>
                <span className={`text-lg font-semibold ${darkMode ? 'text-light' : 'text-gray-800'}`}>${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  className="text-primary transition-colors hover:text-accent"
                  aria-label={`Remove ${item.name} from cart`}
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-8 0v12a1 1 0 001 1h8a1 1 0 001-1V7" />
                  </svg>
                </button>
              </article>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-primary/20 p-5">
            <button
              type="button"
              className="rounded-full bg-primary px-6 py-2 font-medium text-white transition-colors hover:bg-accent"
            >
              Apply Coupon
            </button>
            <button
              type="button"
              className="rounded-full bg-primary px-6 py-2 font-medium text-white transition-colors hover:bg-accent"
            >
              Update Cart
            </button>
          </div>
        </div>

        <aside className={`h-fit rounded-xl border shadow-sm ${darkMode ? 'border-primary/20 bg-gray-900/70' : 'border-gray-200 bg-white'}`}>
          <div className="border-b border-primary/20 p-5">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'}`}>Order Summary</h2>
          </div>
          <dl className="space-y-3 p-5">
            <div className="flex items-center justify-between">
              <dt className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Subtotal</dt>
              <dd className={`font-semibold ${darkMode ? 'text-light' : 'text-gray-800'}`}>${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Discount (5%)</dt>
              <dd className={`font-semibold ${darkMode ? 'text-light' : 'text-gray-800'}`}>-${discount.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Shipping</dt>
              <dd className={`font-semibold ${darkMode ? 'text-light' : 'text-gray-800'}`}>${shipping.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-primary/20 pt-3">
              <dt className={`text-lg font-semibold ${darkMode ? 'text-light' : 'text-gray-800'}`}>Grand Total</dt>
              <dd className="text-lg font-bold text-primary">${total.toFixed(2)}</dd>
            </div>
          </dl>
          <div className="p-5 pt-0">
            <button
              type="button"
              className="w-full rounded-full bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-accent"
            >
              Proceed To Checkout
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
