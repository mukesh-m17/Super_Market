import { motion } from "framer-motion";
import { STORE_METRICS } from "../data/Store";

export default function Stats() {
  return (
    <section className="bg-green-600 py-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-3 gap-6 divide-x divide-green-500">
          {STORE_METRICS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center px-4"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-green-100 text-xs md:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}