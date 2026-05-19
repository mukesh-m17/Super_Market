import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["Fresh", "Organic", "Delivered"];

export default function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const startRef = useRef(null);
  const rafRef = useRef(null);
  const DURATION = 2400;

  useEffect(() => {
    startRef.current = performance.now();
    const tick = (now) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      setCount(Math.floor(progress * 100));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => onComplete(), 350);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % WORDS.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#0a1a0f] flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="mb-8 flex flex-col items-center"
      >
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-4 shadow-2xl shadow-green-500/30">
          <span className="text-4xl">🌿</span>
        </div>
        <span className="text-white text-2xl font-bold tracking-tight">
          Fresh<span className="text-green-400">Mart</span>
        </span>
      </motion.div>

      {/* Animated word */}
      <div className="h-12 flex items-center justify-center mb-12">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="text-3xl md:text-5xl font-bold italic text-white/70 select-none"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Counter */}
      <div className="absolute bottom-16 right-8 md:right-12">
        <span className="text-7xl md:text-9xl font-bold text-white/10 tabular-nums select-none">
          {String(count).padStart(3, "0")}
        </span>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-green-500 to-emerald-400 origin-left"
          style={{ scaleX: count / 100, boxShadow: "0 0 10px rgba(34,197,94,0.5)" }}
          initial={{ scaleX: 0 }}
        />
      </div>
    </motion.div>
  );
}