import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../hooks/useCart';

export default function Cart() {
  const { darkMode } = useTheme();
  const { items, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 25;
  const total = subtotal + shipping;

  if (getCartCount() === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center h-[60vh] text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-24 w-24 mb-6 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
            Your cart is empty
          </h2>
          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>
            Looks like you haven't added anything yet.
          </p>
          <Link
            to="/products"
            className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
          Your Cart
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column: item list */}
          <div className="flex-1 lg:w-2/3 space-y-4">
            {items.map(item => (
              <div
                key={item.productId}
                className={`flex items-center gap-4 p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}
              >
                {/* Thumbnail */}
                <img
                  src={`/${item.imgName}`}
                  alt={item.name}
                  className="h-20 w-20 object-contain rounded-md flex-shrink-0"
                />
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold truncate ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                    {item.name}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>
                    ${item.price.toFixed(2)} each
                  </p>
                </div>
                {/* Quantity controls */}
                <div className={`flex items-center space-x-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg p-1 transition-colors duration-300`}>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    <span aria-hidden="true">-</span>
                  </button>
                  <span
                    className={`min-w-[2rem] text-center ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}
                    aria-label={`Quantity of ${item.name}`}
                  >
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    <span aria-hidden="true">+</span>
                  </button>
                </div>
                {/* Per-item subtotal */}
                <span className={`w-20 text-right font-medium ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className={`ml-2 p-2 rounded-md ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-500'} transition-colors duration-300`}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Right column: order summary */}
          <div className="lg:w-1/3">
            <div className={`sticky top-24 rounded-lg shadow p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
              <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                Order Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>Subtotal</span>
                  <span className={`${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-primary font-medium">FREE</span>
                  ) : (
                    <span className={`${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>${shipping.toFixed(2)}</span>
                  )}
                </div>
              </div>
              <hr className={`my-4 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`} />
              <div className="flex justify-between mb-6">
                <span className={`text-lg font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>Total</span>
                <span className={`text-lg font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>${total.toFixed(2)}</span>
              </div>
              <div className="relative group">
                <button
                  disabled
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium opacity-60 cursor-not-allowed transition-colors duration-300"
                  aria-disabled="true"
                >
                  Checkout
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  Coming soon
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
