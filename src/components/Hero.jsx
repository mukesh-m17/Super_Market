import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  { icon: "⚡", text: "30-min delivery" },
  { icon: "🌿", text: "100% Organic" },
  { icon: "💰", text: "Best prices" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-[#0a1a0f] overflow-hidden pt-16">
      {/* Background */}
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600')] bg-cover bg-center"
        style={{ opacity: 0.2 }}
      />
      {/* Green gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a0f]/60 via-transparent to-[#0a1a0f]" />
      {/* Animated circles */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-green-500/10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-emerald-400/5 blur-3xl" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Fresh · Organic · Fast Delivery
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6"
        >
          Your Daily{" "}
          <span className="italic text-green-400">Supermarket</span>
          <br />
          <span className="text-white/60 text-4xl md:text-5xl lg:text-6xl font-normal">
            at your doorstep
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-lg max-w-xl mx-auto mb-10"
        >
          Get fresh groceries and organic produce delivered to your door in under 30 minutes. Quality guaranteed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Link
            to="/products"
            className="px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-full transition shadow-xl shadow-green-500/30 hover:shadow-green-500/50 hover:-translate-y-0.5 duration-200"
          >
            Shop Now →
          </Link>
          <Link
            to="/deals"
            className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-semibold rounded-full transition hover:-translate-y-0.5 duration-200 backdrop-blur-sm bg-white/5"
          >
            Explore Deals
          </Link>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {features.map((f) => (
            <div
              key={f.text}
              className="flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 text-sm px-4 py-2 rounded-full"
            >
              <span>{f.icon}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2 text-xs"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}