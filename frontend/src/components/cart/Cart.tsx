import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../hooks/useCart';

export default function Cart() {
  const { darkMode } = useTheme();
  const { items, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

  const subtotal = getCartTotal();
  const itemCount = getCartCount();
  const shipping = subtotal > 100 ? 0 : 25;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 px-4 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center h-[60vh] space-y-6">
          <svg
            className={`w-24 h-24 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'}`}>
            Your cart is empty
          </h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Add some products to get started!
          </p>
          <Link
            to="/products"
            className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 animate-bounce hover:animate-none"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-40 px-4 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-8 transition-colors duration-300`}>
          Your Cart
        </h1>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div
              key={item.productId}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg overflow-hidden shadow-lg flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(118,184,82,0.3)]`}
            >
              {/* Product image */}
              <div className={`relative h-48 ${darkMode ? 'bg-gradient-to-t from-gray-700 to-gray-800' : 'bg-gradient-to-t from-gray-100 to-white'}`}>
                <img
                  src={`/${item.imgName}`}
                  alt={item.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>

              <div className="p-4 flex flex-col flex-grow space-y-3">
                {/* Product name */}
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-light' : 'text-gray-800'}`}>
                  {item.name}
                </h3>

                {/* Unit price */}
                <p className="text-primary font-medium">${item.price.toFixed(2)} each</p>

                {/* Quantity selector */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${darkMode ? 'bg-gray-700 text-light hover:bg-primary' : 'bg-gray-200 text-gray-700 hover:bg-primary hover:text-white'} transition-colors duration-200`}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    −
                  </button>
                  <span className={`min-w-[2rem] text-center font-semibold ${darkMode ? 'text-light' : 'text-gray-800'}`}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${darkMode ? 'bg-gray-700 text-light hover:bg-primary' : 'bg-gray-200 text-gray-700 hover:bg-primary hover:text-white'} transition-colors duration-200`}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Subtotal:{' '}
                  <span className="text-primary font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </p>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="mt-auto text-red-500 text-sm hover:underline text-left transition-colors duration-200"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-width Summary Banner */}
      <div className={`fixed bottom-0 left-0 right-0 md:static md:mt-8 ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-lg z-40 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-sm">
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                <span className="font-semibold">Items:</span>{' '}
                <span className={darkMode ? 'text-light' : 'text-gray-800'}>{itemCount}</span>
              </span>
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                <span className="font-semibold">Subtotal:</span>{' '}
                <span className={darkMode ? 'text-light' : 'text-gray-800'}>${subtotal.toFixed(2)}</span>
              </span>
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                <span className="font-semibold">Shipping:</span>{' '}
                {shipping === 0 ? (
                  <span className="text-green-500 font-bold">FREE</span>
                ) : (
                  <span className={darkMode ? 'text-light' : 'text-gray-800'}>${shipping.toFixed(2)}</span>
                )}
              </span>
              <span className={`text-base font-bold ${darkMode ? 'text-light' : 'text-gray-800'}`}>
                Total: <span className="text-primary">${total.toFixed(2)}</span>
              </span>
            </div>
            <button className="bg-primary hover:bg-accent text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 whitespace-nowrap">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
