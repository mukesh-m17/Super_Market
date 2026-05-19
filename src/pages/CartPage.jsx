import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, removeItem, increaseQty, decreaseQty, totalPrice, clearCart } = useCart();
  const delivery = totalPrice >= 30 ? 0 : 2.99;
  const total = totalPrice + delivery;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-[1100px] mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Shopping Cart <span className="text-gray-400 font-normal text-xl">({items.length})</span>
          </h1>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-red-500 hover:text-red-700 transition"
            >
              Clear cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100">
            <div className="text-7xl mb-5">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Start adding fresh groceries to your cart</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition shadow-lg shadow-green-500/25"
            >
              Browse Products →
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-3">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                    className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-4 hover:border-green-100 transition"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 capitalize">{item.category}</p>
                      <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                      <p className="text-xs text-gray-400">{item.unit}</p>
                      <p className="text-green-700 font-bold mt-1">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-300 hover:text-red-500 transition"
                        aria-label="Remove"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-1.5">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition text-lg leading-none"
                        >−</button>
                        <span className="text-sm font-bold text-gray-900 w-5 text-center">{item.qty}</span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition text-lg leading-none"
                        >+</button>
                      </div>
                      <p className="text-sm font-bold text-gray-900">${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <Link to="/products" className="inline-flex items-center gap-2 text-green-600 text-sm font-medium hover:text-green-700 transition mt-2">
                ← Continue Shopping
              </Link>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl border border-gray-100 p-6 sticky top-24">
                <h2 className="font-bold text-gray-900 text-lg mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal ({items.length} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery</span>
                    <span className={delivery === 0 ? "text-green-600 font-semibold" : ""}>
                      {delivery === 0 ? "FREE" : `$${delivery.toFixed(2)}`}
                    </span>
                  </div>
                  {delivery > 0 && (
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700">
                      Add ${(30 - totalPrice).toFixed(2)} more for free delivery! 🚚
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-gray-900 text-lg pt-3 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-green-700">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold transition shadow-lg shadow-green-500/20 mb-3">
                  Proceed to Checkout →
                </button>

                <div className="flex items-center justify-center gap-4 mt-4">
                  {["💳", "🔒", "⚡"].map((icon, i) => (
                    <div key={i} className="flex items-center gap-1 text-xs text-gray-400">
                      <span>{icon}</span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-xs text-gray-400 mt-2">Secure checkout · 30-min delivery</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}