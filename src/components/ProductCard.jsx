import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function ProductCard({ product, onQuickView }) {

  const {
    addItem,
    items,
    increaseQty,
    decreaseQty,
  } = useCart();

  const { addToast } = useToast();

  const [isAdding, setIsAdding] = useState(false);

  const cartItem = items.find(
    (i) => i.id === product.id
  );

  const qty = cartItem?.qty || 0;

  const handleAdd = () => {
    addItem(product);

    addToast(
      `${product.name} added to cart`,
      "cart"
    );

    setIsAdding(true);

    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-green-200 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 aspect-[4/3]">
        
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{product.discount}%
          </div>
        )}

        {product.badge && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {product.badge}
          </div>
        )}

        {/* Quick View Button */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-white text-gray-900 text-xs font-semibold px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:bg-gray-50 whitespace-nowrap"
          >
            Quick View
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        
        <p className="text-xs text-gray-400 capitalize mb-1">
          {product.category}
        </p>

        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-xs text-gray-400 mb-3">
          {product.unit}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <span className="text-yellow-400 text-xs">
            ★
          </span>

          <span className="text-xs font-medium text-gray-700">
            {product.rating}
          </span>

          <span className="text-xs text-gray-400">
            ({product.reviews})
          </span>
        </div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between">
          
          <div>
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price.toFixed(0)}
            </span>

            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through ml-1">
                ₹{product.originalPrice.toFixed(0)}
              </span>
            )}
          </div>

          {qty === 0 ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAdd}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                isAdding
                  ? "bg-green-100 text-green-700"
                  : "bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-500/20"
              }`}
            >
              {isAdding ? (
                "✓ Added"
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>

                  Add
                </>
              )}
            </motion.button>
          ) : (
            <div className="flex items-center gap-2 bg-green-600 rounded-xl px-2 py-1.5">
              
              <button
                onClick={() => decreaseQty(product.id)}
                className="w-6 h-6 rounded-lg bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition text-lg leading-none"
              >
                −
              </button>

              <span className="text-white text-sm font-bold w-5 text-center">
                {qty}
              </span>

              <button
                onClick={() => increaseQty(product.id)}
                className="w-6 h-6 rounded-lg bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition text-lg leading-none"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}