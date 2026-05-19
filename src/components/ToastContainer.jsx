import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "../context/ToastContext";

const icons = {
  success: "✅",
  error: "❌",
  info: "ℹ️",
  cart: "🛒",
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="pointer-events-auto flex items-center gap-3 bg-white rounded-2xl shadow-xl shadow-black/10 px-4 py-3 min-w-[220px] max-w-[300px] border border-gray-100"
          >
            <span className="text-lg">{icons[toast.type] || icons.success}</span>
            <span className="text-sm font-medium text-gray-800 flex-1">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-300 hover:text-gray-500 transition ml-1"
            >
              ×
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}