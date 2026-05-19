import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PRODUCTS } from "../data/store";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";

export default function FeaturedProducts() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const featured = PRODUCTS.filter((p) => p.rating >= 4.7).slice(0, 6);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-green-600 text-sm font-semibold uppercase tracking-widest mb-2">Handpicked</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Products</h2>
          </div>
          <Link
            to="/products"
            className="hidden md:flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition text-sm"
          >
            View all <span>→</span>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 border border-green-200 text-green-700 rounded-full text-sm font-semibold hover:bg-green-50 transition"
          >
            View All Products →
          </Link>
        </div>
      </div>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </section>
  );
}