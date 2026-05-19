export default function Subscribe() {
  return (
    <section className="bg-black py-20 text-center border-t border-white/10">

      <h2 className="text-white text-4xl">
        Get Fresh Deals Daily
      </h2>

      <p className="text-gray-400 mt-4">
        Subscribe for grocery discounts
      </p>

      <div className="mt-6 flex justify-center">
        <input
          placeholder="Enter email"
          className="px-4 py-3 rounded-l-full bg-white/10 text-white"
        />
        <button className="px-6 py-3 bg-white text-black rounded-r-full">
          Subscribe
        </button>
      </div>

    </section>
  );
}