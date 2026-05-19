import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, increaseQty, decreaseQty, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeDrawer();
    navigate("/cart");
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-[420px] bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                <p className="text-sm text-gray-500">{items.length} item{items.length !== 1 ? "s" : ""}</p>
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-red-500 hover:text-red-700 px-3 py-1 rounded-full hover:bg-red-50 transition"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={closeDrawer}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="text-6xl mb-4">🛒</div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                  <p className="text-gray-400 text-sm mb-6">Add fresh items to get started</p>
                  <button
                    onClick={closeDrawer}
                    className="px-6 py-3 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                      className="flex items-center gap-4 p-3 rounded-2xl border border-gray-100 hover:border-green-100 hover:bg-green-50/30 transition"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h4>
                        <p className="text-xs text-gray-400">{item.unit}</p>
                        <p className="text-sm font-bold text-green-700 mt-0.5">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-300 hover:text-red-500 transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
                          <button
                            onClick={() => decreaseQty(item.id)}
                            className="w-5 h-5 rounded-full flex items-center justify-center text-gray-600 hover:bg-white transition text-base leading-none"
                          >
                            −
                          </button>
                          <span className="text-xs font-bold text-gray-900 w-4 text-center">{item.qty}</span>
                          <button
                            onClick={() => increaseQty(item.id)}
                            className="w-5 h-5 rounded-full flex items-center justify-center text-gray-600 hover:bg-white transition text-base leading-none"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-gray-100 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Delivery</span>
                    <span className={totalPrice >= 30 ? "text-green-600 font-medium" : ""}>
                      {totalPrice >= 30 ? "FREE" : "$2.99"}
                    </span>
                  </div>
                  {totalPrice < 30 && (
                    <p className="text-xs text-green-600 bg-green-50 rounded-lg px-3 py-2">
                      Add ${(30 - totalPrice).toFixed(2)} more for free delivery 🎉
                    </p>
                  )}
                  <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-green-700">${(totalPrice + (totalPrice >= 30 ? 0 : 2.99)).toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold transition shadow-lg shadow-green-500/25"
                >
                  Checkout →
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}