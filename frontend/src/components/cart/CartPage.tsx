import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import { useTheme } from '../../context/ThemeContext';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export default function CartPage() {
  const { darkMode } = useTheme();
  const { items, subtotal, shipping, total, updateQuantity, removeItem, clearCart } = useCart();

  const isEmpty = items.length === 0;

  return (
    <div className={`min-h-screen pt-24 pb-16 px-4 ${darkMode ? 'bg-dark' : 'bg-gray-100'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'}`}>Your Cart</h1>
          {!isEmpty && (
            <button
              onClick={clearCart}
              className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Clear cart
            </button>
          )}
        </div>

        <div className={`rounded-2xl p-4 mb-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} transition-colors duration-300`}>
          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <li className={`rounded-xl p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className="text-xs uppercase tracking-wider text-primary font-semibold">Step 1</p>
              <p className={`${darkMode ? 'text-light' : 'text-gray-800'} font-medium`}>Review items</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{items.length} products selected</p>
            </li>
            <li className={`rounded-xl p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className="text-xs uppercase tracking-wider text-primary font-semibold">Step 2</p>
              <p className={`${darkMode ? 'text-light' : 'text-gray-800'} font-medium`}>Shipping</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {shipping === 0 ? 'Free shipping applied' : `${formatCurrency(shipping)} standard shipping`}
              </p>
            </li>
            <li className={`rounded-xl p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className="text-xs uppercase tracking-wider text-primary font-semibold">Step 3</p>
              <p className={`${darkMode ? 'text-light' : 'text-gray-800'} font-medium`}>Total</p>
              <p className="text-sm text-primary font-semibold">{formatCurrency(total)}</p>
            </li>
          </ol>
        </div>

        {isEmpty ? (
          <div className={`rounded-2xl p-10 text-center border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} transition-colors duration-300`}>
            <h2 className={`text-2xl font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} mb-2`}>Your cart is empty</h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
              Add products to start building your order.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center rounded-lg px-5 py-3 bg-primary text-white font-medium hover:bg-accent transition-colors"
            >
              Go to products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <article
                  key={item.productId}
                  className={`rounded-2xl border p-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} transition-colors duration-300`}
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={`/${item.imgName}`}
                        alt={item.name}
                        className={`h-20 w-20 rounded-xl object-contain p-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
                      />
                      <div>
                        <h3 className={`text-lg font-semibold ${darkMode ? 'text-light' : 'text-gray-800'}`}>{item.name}</h3>
                        <p className="text-primary font-medium">{formatCurrency(item.unitPrice)} each</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`flex items-center rounded-full px-2 py-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <button
                          className={`h-8 w-8 rounded-full ${darkMode ? 'text-light hover:bg-gray-600' : 'text-gray-800 hover:bg-gray-200'} transition-colors`}
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          aria-label={`Decrease quantity for ${item.name}`}
                        >
                          -
                        </button>
                        <span className={`w-10 text-center font-medium ${darkMode ? 'text-light' : 'text-gray-800'}`}>
                          {item.quantity}
                        </span>
                        <button
                          className={`h-8 w-8 rounded-full ${darkMode ? 'text-light hover:bg-gray-600' : 'text-gray-800 hover:bg-gray-200'} transition-colors`}
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          aria-label={`Increase quantity for ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-sm px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <aside>
              <div className={`rounded-2xl border p-5 sticky top-24 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} transition-colors duration-300`}>
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} mb-4`}>Order summary</h2>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Subtotal</span>
                    <span className={`${darkMode ? 'text-light' : 'text-gray-800'} font-medium`}>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Shipping</span>
                    <span className={`${shipping === 0 ? 'text-primary' : darkMode ? 'text-light' : 'text-gray-800'} font-medium`}>
                      {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                    </span>
                  </div>
                  <div className={`pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
                    <span className={`${darkMode ? 'text-light' : 'text-gray-800'} font-semibold`}>Total</span>
                    <span className="text-primary text-xl font-bold">{formatCurrency(total)}</span>
                  </div>
                </div>

                <button className="mt-6 w-full rounded-lg px-4 py-3 bg-primary text-white font-medium hover:bg-accent transition-colors">
                  Proceed to checkout
                </button>

                {shipping > 0 && (
                  <p className={`text-xs mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Add {formatCurrency(100 - subtotal)} more to unlock free shipping.
                  </p>
                )}
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
