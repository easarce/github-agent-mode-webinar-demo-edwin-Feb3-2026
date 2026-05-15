import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/useCart';
import { FREE_SHIPPING_THRESHOLD, getUnitPrice, SHIPPING_FEE } from '../../context/cartUtils';

const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

export default function Cart() {
  const { darkMode } = useTheme();
  const { items, subtotal, shipping, total, updateQuantity, removeFromCart } = useCart();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>Cart</h1>

        {items.length === 0 ? (
          <div className={`${darkMode ? 'bg-gray-800 text-light' : 'bg-white text-gray-800'} rounded-xl p-8 shadow-lg text-center transition-colors duration-300`}>
            <p className="text-lg">Your cart is empty.</p>
            <Link to="/products" className="inline-block mt-4 bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg transition-colors">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <article
                  key={item.productId}
                  className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg transition-colors duration-300`}
                >
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <img src={`/${item.imgName}`} alt={item.name} className="w-24 h-24 object-contain rounded-lg bg-gray-100 p-2" />
                    <div className="flex-1">
                      <h2 className={`text-lg font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>{item.name}</h2>
                      <p className="text-primary font-bold">{formatCurrency(getUnitPrice(item))}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className={`w-8 h-8 rounded-lg ${darkMode ? 'bg-gray-700 text-light' : 'bg-gray-200 text-gray-700'} hover:text-primary transition-colors duration-300`}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        -
                      </button>
                      <span className={`${darkMode ? 'text-light' : 'text-gray-800'} min-w-8 text-center transition-colors duration-300`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className={`w-8 h-8 rounded-lg ${darkMode ? 'bg-gray-700 text-light' : 'bg-gray-200 text-gray-700'} hover:text-primary transition-colors duration-300`}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </section>

            <aside className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg h-fit transition-colors duration-300`}>
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Subtotal</span>
                  <span className={darkMode ? 'text-light' : 'text-gray-800'}>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Shipping</span>
                  <span className={darkMode ? 'text-light' : 'text-gray-800'}>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {subtotal >= FREE_SHIPPING_THRESHOLD
                    ? `You qualified for free shipping over ${formatCurrency(FREE_SHIPPING_THRESHOLD)}.`
                    : `Shipping is ${formatCurrency(SHIPPING_FEE)} for orders below ${formatCurrency(FREE_SHIPPING_THRESHOLD)}.`}
                </p>
                <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} pt-3 flex justify-between font-bold text-lg`}>
                  <span className={darkMode ? 'text-light' : 'text-gray-800'}>Total</span>
                  <span className="text-primary">{formatCurrency(total)}</span>
                </div>
                <button className="w-full bg-primary hover:bg-accent text-white py-2 rounded-lg transition-colors">
                  Checkout
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
