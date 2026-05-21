import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";

import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import ToastContainer from "./components/ToastContainer";

import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import DealsPage from "./pages/DealsPage";
import CartPage from "./pages/CartPage";

// ✅ Payment Page
import PaymentPage from "./pages/PaymentPage";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      <CartProvider>
        <ToastProvider>
          {/* Loading Screen */}
          {isLoading && (
            <LoadingScreen
              onComplete={() => setIsLoading(false)}
            />
          )}

          {/* Main App */}
          {!isLoading && (
            <>
              {/* Navbar */}
              <Navbar />

              {/* Cart Drawer */}
              <CartDrawer />

              {/* Toast Notifications */}
              <ToastContainer />

              {/* Pages */}
              <main className="min-h-screen bg-gray-50">
                <Routes>
                  {/* Home */}
                  <Route path="/" element={<Home />} />

                  {/* Products */}
                  <Route
                    path="/products"
                    element={<ProductsPage />}
                  />

                  {/* Categories */}
                  <Route
                    path="/categories"
                    element={<CategoriesPage />}
                  />

                  {/* Deals */}
                  <Route
                    path="/deals"
                    element={<DealsPage />}
                  />

                  {/* Cart */}
                  <Route
                    path="/cart"
                    element={<CartPage />}
                  />

                  {/* ✅ Payment Page */}
                  <Route
                    path="/payment"
                    element={<PaymentPage />}
                  />
                </Routes>
              </main>
            </>
          )}
        </ToastProvider>
      </CartProvider>
    </BrowserRouter>
  );
}