import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CATEGORIES } from "../data/Store";

export default function CategoriesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-[1300px] mx-auto px-6 py-10">
        <div className="mb-10">
          <p className="text-green-600 text-sm font-semibold uppercase tracking-widest mb-2">Browse All</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Categories</h1>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.id}
              onClick={() => navigate(`/products?category=${cat.id}`)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group overflow-hidden rounded-3xl aspect-[16/9] text-left shadow-md hover:shadow-xl transition-shadow"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-4xl mb-2">{cat.emoji}</span>
                <h3 className="text-white font-bold text-xl">{cat.title}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-white/60 text-sm">{cat.count} items</span>
                  <span className="text-white/80 text-sm font-medium group-hover:text-white transition">
                    Shop now →
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}