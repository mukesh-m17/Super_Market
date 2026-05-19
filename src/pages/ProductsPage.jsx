import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, CATEGORIES } from "../data/store";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rated", value: "rating" },
  { label: "Most Reviews", value: "reviews" },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState("featured");
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const searchQuery = searchParams.get("search") || "";
  const categoryFilter = searchParams.get("category") || "all";

  const setCategory = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === "all") params.delete("category");
    else params.set("category", cat);
    setSearchParams(params);
  };

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Search
    if (searchQuery) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter && categoryFilter !== "all") {
      list = list.filter((p) => p.category === categoryFilter);
    }

    // Sort
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        list.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    return list;
  }, [searchQuery, categoryFilter, sort]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1300px] mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {searchQuery
                  ? `Results for "${searchQuery}"`
                  : categoryFilter !== "all"
                  ? CATEGORIES.find((c) => c.id === categoryFilter)?.title || "Products"
                  : "All Products"}
              </h1>
              <p className="text-gray-400 text-sm mt-1">{filteredProducts.length} items found</p>
            </div>
            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Category filter pills */}
          <div className="flex gap-2 mt-5 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setCategory("all")}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
                categoryFilter === "all" || !categoryFilter
                  ? "bg-green-600 text-white shadow-md shadow-green-500/20"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition ${
                  categoryFilter === cat.id
                    ? "bg-green-600 text-white shadow-md shadow-green-500/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-[1300px] mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key={categoryFilter + searchQuery + sort}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-400">Try a different search or category filter</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}