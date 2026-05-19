import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DEALS } from "../data/store";
import { useToast } from "../context/ToastContext";

function DealModal({ deal, onClose }) {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(deal.code).catch(() => {});
    setCopied(true);
    addToast(`Code "${deal.code}" copied!`, "success");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {deal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed z-[90] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-8 text-center" style={{ background: `linear-gradient(135deg, ${deal.color}15, ${deal.color}05)` }}>
              <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition">✕</button>
              <div className="text-6xl mb-4">{deal.emoji}</div>
              <div className="inline-block px-4 py-1.5 rounded-full text-white text-sm font-bold mb-3"
                style={{ background: deal.color }}>
                {deal.discount} OFF
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{deal.title}</h2>
              <p className="text-gray-500 mb-4">{deal.subtitle}</p>
              <p className="text-gray-600 text-sm mb-6">{deal.description}</p>

              <div className="bg-gray-50 border-2 border-dashed rounded-xl p-4 mb-4" style={{ borderColor: deal.color + "60" }}>
                <p className="text-xs text-gray-400 mb-1">Promo Code</p>
                <p className="text-2xl font-bold tracking-widest" style={{ color: deal.color }}>{deal.code}</p>
              </div>

              <button
                onClick={handleCopy}
                className="w-full py-3.5 rounded-2xl text-white font-bold transition"
                style={{ background: deal.color }}
              >
                {copied ? "✓ Copied!" : "Copy Code"}
              </button>
              <p className="text-xs text-gray-400 mt-3">Expires: {deal.expires}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Deals() {
  const [activeDeal, setActiveDeal] = useState(null);
  const featuredDeals = DEALS.slice(0, 3);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-green-600 text-sm font-semibold uppercase tracking-widest mb-2">Save More</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Weekly Deals</h2>
          </div>
          <Link to="/deals" className="hidden md:flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition text-sm">
            All deals →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {featuredDeals.map((deal, i) => (
            <motion.button
              key={deal.id}
              onClick={() => setActiveDeal(deal)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="text-left p-5 rounded-2xl border border-gray-100 bg-white hover:shadow-lg transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{deal.emoji}</span>
                <span className="px-3 py-1 rounded-full text-white text-xs font-bold"
                  style={{ background: deal.color }}>
                  {deal.discount} OFF
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">{deal.title}</h3>
              <p className="text-gray-500 text-sm mb-3">{deal.subtitle}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{deal.expires}</span>
                <span className="text-xs font-semibold group-hover:underline" style={{ color: deal.color }}>
                  Get code →
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <DealModal deal={activeDeal} onClose={() => setActiveDeal(null)} />
    </section>
  );
}