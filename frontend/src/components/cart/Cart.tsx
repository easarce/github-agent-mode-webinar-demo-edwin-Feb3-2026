import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useTheme } from '../../context/ThemeContext';

const SHIPPING_THRESHOLD = 100;
const FLAT_SHIPPING = 25;

export default function Cart() {
  const { darkMode } = useTheme();
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const shippingFree = subtotal > SHIPPING_THRESHOLD;
  const shipping = shippingFree ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;

  const base = darkMode ? 'bg-dark text-light' : 'bg-gray-100 text-gray-800';
  const tableHeaderBg = darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-600';
  const rowBase = darkMode ? 'border-gray-700' : 'border-gray-200';
  const evenRow = darkMode ? 'even:bg-gray-800/50' : 'even:bg-gray-50';
  const inputBorder = darkMode ? 'border-gray-600 text-light bg-gray-700' : 'border-gray-300 text-gray-800 bg-white';
  const summaryBg = darkMode ? 'bg-gray-800' : 'bg-white';

  if (items.length === 0) {
    return (
      <div className={`min-h-screen ${base} pt-24 pb-16 px-4 transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-24 space-y-6">
          {/* Empty bag icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-24 w-24 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 2 4 6v14a2 2 0 002 2h12a2 2 0 002-2V6l-2-4z"
            />
            <line x1="3.17" y1="6" x2="20.83" y2="6" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 10a4 4 0 01-8 0" />
          </svg>
          <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Your cart is empty
          </p>
          <Link
            to="/products"
            className="text-primary hover:text-accent underline text-sm transition-colors duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${base} pt-24 pb-16 px-4 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Desktop header */}
            <thead>
              <tr className={`${tableHeaderBg} uppercase text-xs tracking-wider`}>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-right">Price</th>
                <th className="px-4 py-3 text-center">Quantity</th>
                <th className="px-4 py-3 text-right">Subtotal</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${rowBase}`}>
              {items.map(item => {
                const itemSubtotal = item.price * item.quantity;
                return (
                  <tr
                    key={item.productId}
                    className={`${evenRow} transition-colors duration-200`}
                  >
                    {/* Product */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={`/${item.imgName}`}
                          alt={item.name}
                          className="h-10 w-10 object-contain rounded flex-shrink-0"
                        />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </td>

                    {/* Unit price */}
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      ${item.price.toFixed(2)}
                    </td>

                    {/* Quantity controls */}
                    <td className="px-4 py-3">
                      <div className={`inline-flex items-center border rounded ${inputBorder}`}>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="px-2 py-1 hover:text-primary transition-colors duration-200 text-base leading-none"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>
                        <span className="px-3 py-1 min-w-[2.5rem] text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="px-2 py-1 hover:text-primary transition-colors duration-200 text-base leading-none"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Row subtotal */}
                    <td className="px-4 py-3 text-right font-semibold whitespace-nowrap">
                      ${itemSubtotal.toFixed(2)}
                    </td>

                    {/* Remove */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Divider */}
        <hr className={darkMode ? 'border-gray-700' : 'border-gray-200'} />

        {/* Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          {/* Clear cart (left) */}
          <button
            onClick={clearCart}
            className={`text-sm ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'} transition-colors duration-200 underline`}
          >
            Clear Cart
          </button>

          {/* Totals (right) */}
          <div className={`${summaryBg} rounded-lg p-4 space-y-2 min-w-[240px] shadow transition-colors duration-300`}>
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm items-center">
              <span>Shipping</span>
              {shippingFree ? (
                <span className="flex items-center gap-1 text-primary font-medium">
                  {/* Green checkmark */}
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Free Shipping
                </span>
              ) : (
                <span>${FLAT_SHIPPING.toFixed(2)} Flat Rate</span>
              )}
            </div>
            <hr className={darkMode ? 'border-gray-700' : 'border-gray-200'} />
            <div className="flex justify-between font-bold text-base">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="relative group mt-2">
              <button
                disabled
                className="w-full bg-primary/50 text-white text-sm font-medium px-4 py-2 rounded cursor-not-allowed"
                aria-disabled="true"
              >
                Proceed to Checkout
              </button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap pointer-events-none z-10">
                Coming Soon
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
