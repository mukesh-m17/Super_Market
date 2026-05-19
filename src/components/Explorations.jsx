import { CATEGORIES } from "../data/store";

export default function Categories() {
  return (
    <section className="min-h-screen bg-black py-20">
      <div className="max-w-[1200px] mx-auto px-6">

        <h2 className="text-white text-3xl mb-10">
          Shop by Category
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="relative group overflow-hidden rounded-2xl"
            >
              <img
                src={cat.img}
                className="h-72 w-full object-cover group-hover:scale-110 transition"
              />

              <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                <h3 className="text-white text-xl">
                  {cat.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}