import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function QuickViewModal({ product, onClose }) {

  const {
    addItem,
    items = [],
    increaseQty,
    decreaseQty,
  } = useCart() || {};

  const { addToast } = useToast() || {};

  // Prevent crash if product is null/undefined
  if (!product) return null;

  const cartItem = items.find(
    (i) => i.id === product?.id
  );

  const qty = cartItem?.qty || 0;

  const handleAdd = () => {
    addItem(product);

    addToast?.(
      `${product.name} added to cart`,
      "cart"
    );
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-[540px] bg-white rounded-3xl shadow-2xl overflow-hidden">

              {/* Image */}
              <div className="relative h-56 bg-gray-50">

                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />

                {product?.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    -{product.discount}% OFF
                  </div>
                )}

                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-gray-600 hover:bg-white transition shadow"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="p-6">

                <div className="flex items-start justify-between mb-3">

                  <div>
                    <p className="text-xs text-green-600 font-semibold uppercase tracking-wide mb-1">
                      {product?.category}
                    </p>

                    <h2 className="text-xl font-bold text-gray-900">
                      {product?.name}
                    </h2>

                    <p className="text-sm text-gray-400 mt-1">
                      {product?.unit}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-700">
                      ₹{product?.price?.toFixed(0)}
                    </p>

                    {product?.originalPrice && (
                      <p className="text-sm text-gray-400 line-through">
                        ₹{product.originalPrice.toFixed(0)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-5">

                  <div className="flex text-yellow-400 text-sm">
                    {"★".repeat(
                      Math.floor(product?.rating || 0)
                    )}
                  </div>

                  <span className="text-sm font-medium text-gray-700">
                    {product?.rating}
                  </span>

                  <span className="text-sm text-gray-400">
                    · {product?.reviews} reviews
                  </span>
                </div>

                {/* Cart Actions */}
                <div className="flex items-center gap-4">

                  {qty === 0 ? (
                    <button
                      onClick={handleAdd}
                      className="flex-1 py-3.5 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold transition shadow-lg shadow-green-500/25"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex-1 flex items-center justify-between bg-green-600 rounded-2xl px-4 py-3">

                      <button
                        onClick={() =>
                          decreaseQty(product.id)
                        }
                        className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition text-xl"
                      >
                        −
                      </button>

                      <span className="text-white text-lg font-bold">
                        {qty} in cart
                      </span>

                      <button
                        onClick={() =>
                          increaseQty(product.id)
                        }
                        className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition text-xl"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}