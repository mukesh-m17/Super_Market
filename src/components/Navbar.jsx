import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Categories", path: "/categories" },
  { label: "Deals", path: "/deals" },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Get everything from context ONCE
  const { totalItems, openDrawer, totalPrice } = useCart();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md shadow-green-900/10"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-[1300px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
              <span className="text-white text-lg">🌿</span>
            </div>

            <span className="font-bold text-gray-900 text-lg tracking-tight">
              Murugan<span className="text-green-600">Mart</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-green-700 bg-green-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">

            {/* Cart Button */}
            <button
              onClick={openDrawer}
              className="relative p-2 rounded-full hover:bg-green-50 text-gray-700 hover:text-green-700 transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 2.7A1 1 0 007 17h11M17 17a2 2 0 100 4 2 2 0 000-4M9 17a2 2 0 100 4 2 2 0 000-4"
                />
              </svg>

              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 text-white text-[10px] font-bold flex items-center justify-center"
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Sticky Mobile Cart Button */}
      {totalItems > 0 && (
        <motion.button
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          onClick={openDrawer}
          className="fixed bottom-4 left-4 right-4 md:hidden z-40 bg-green-600 text-white rounded-2xl py-4 flex items-center justify-between px-6 shadow-xl shadow-green-600/30"
        >
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center text-sm font-bold">
              {totalItems}
            </span>

            <span className="font-semibold">View Cart</span>
          </div>

          <span className="font-bold">
            ₹{Math.round(totalPrice || 0)}
          </span>
        </motion.button>
      )}
    </>
  );
}