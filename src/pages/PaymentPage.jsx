// ===============================
// PAYMENT PAGE
// File: src/pages/PaymentPage.jsx
// ===============================

import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const { totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const deliveryCharge = totalPrice >= 500 ? 0 : 49;
  const finalTotal = totalPrice + deliveryCharge;

  const handlePaymentDone = () => {
    alert("Payment Successful 🎉");

    clearCart();

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.4,
          type: "spring",
        }}
        className="bg-white rounded-[32px] shadow-2xl max-w-md w-full overflow-hidden border border-green-100"
      >
        {/* Header */}
        <div className="bg-green-600 p-6 text-center text-white">
          <h1 className="text-3xl font-extrabold mb-2">
            Complete Payment
          </h1>

          <p className="text-green-100 text-sm">
            Scan & Pay securely using Google Pay
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* QR Scanner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 border-2 border-dashed border-green-200 rounded-3xl p-5 mb-6"
          >
            {/* ✅ YOUR GPAY SCANNER */}
            <img
              src="/Gpay.jpeg"
              alt="Google Pay QR"
              className="w-72 h-72 object-contain mx-auto rounded-2xl"
            />
          </motion.div>

          {/* Payment Details */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between text-gray-500">
              <span>Subtotal</span>

              <span>₹{totalPrice.toFixed(0)}</span>
            </div>

            <div className="flex items-center justify-between text-gray-500">
              <span>Delivery</span>

              <span
                className={
                  deliveryCharge === 0
                    ? "text-green-600 font-semibold"
                    : ""
                }
              >
                {deliveryCharge === 0
                  ? "FREE"
                  : `₹${deliveryCharge}`}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">
                Total Amount
              </span>

              <span className="text-3xl font-extrabold text-green-600">
                ₹{finalTotal.toFixed(0)}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="bg-green-50 rounded-2xl p-4 mb-6">
            <p className="text-sm text-green-700 leading-relaxed">
              After completing the payment using Google Pay,
              click the button below to confirm your order.
            </p>
          </div>

          {/* Payment Button */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.01 }}
            onClick={handlePaymentDone}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold text-lg transition shadow-lg shadow-green-500/30"
          >
            Payment Done ✓
          </motion.button>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-5">
            100% Secure Payments • Grocery Store
          </p>
        </div>
      </motion.div>
    </div>
  );
}