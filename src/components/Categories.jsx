import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CATEGORIES } from "../data/Store";

export default function Categories() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-green-600 text-sm font-semibold uppercase tracking-widest mb-2">Browse</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Shop by Category</h2>
          </div>
          <Link
            to="/categories"
            className="hidden md:flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition text-sm"
          >
            All categories →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.id}
              onClick={() => navigate(`/products?category=${cat.id}`)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group overflow-hidden rounded-2xl aspect-video text-left"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <span className="text-2xl mb-1 block">{cat.emoji}</span>
                <h3 className="text-white font-bold text-base md:text-lg leading-tight">{cat.title}</h3>
                <p className="text-white/70 text-xs">{cat.count} items</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}