import { motion } from "framer-motion";
import { PRODUCTS } from "../data/store";

export default function FeaturedProducts() {
  return (
    <section className="bg-black py-16">
      <div className="max-w-[1200px] mx-auto px-6">

        <h2 className="text-white text-3xl mb-10">
          Featured Products
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {PRODUCTS.map((item, i) => (
            <motion.div
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <img
                src={item.img}
                className="h-60 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="text-white text-lg">
                  {item.name}
                </h3>
                <p className="text-gray-400">{item.price}</p>

                <button className="mt-4 px-4 py-2 bg-white text-black rounded-full">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}