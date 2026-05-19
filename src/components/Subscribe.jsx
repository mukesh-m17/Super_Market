import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const validate = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate(email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  return (
    <section className="bg-green-900 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1200')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-emerald-900/90" />

      <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-4xl mb-4 block">📬</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Get Fresh Deals Daily
          </h2>
          <p className="text-green-200 mb-8">
            Subscribe for exclusive discounts, new arrivals, and weekly grocery offers — straight to your inbox.
          </p>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 border border-white/20 rounded-2xl px-8 py-6 text-white"
              >
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="text-xl font-bold mb-1">You're subscribed!</h3>
                <p className="text-green-200 text-sm">Look out for fresh deals in your inbox.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setStatus("idle"); setErrorMsg(""); }}
                    placeholder="Enter your email address"
                    className={`w-full px-5 py-4 rounded-full bg-white/10 border ${
                      status === "error" ? "border-red-400" : "border-white/20"
                    } text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition`}
                  />
                  {status === "error" && (
                    <p className="text-red-400 text-xs mt-2 ml-4">{errorMsg}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-6 py-4 bg-white text-green-800 font-bold rounded-full hover:bg-green-50 transition shadow-xl whitespace-nowrap disabled:opacity-70"
                >
                  {status === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-green-400/60 text-xs mt-5">No spam, unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}