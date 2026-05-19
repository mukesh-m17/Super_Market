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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      <CartProvider>
        <ToastProvider>
          {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
          {!isLoading && (
            <>
              <Navbar />
              <CartDrawer />
              <ToastContainer />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/deals" element={<DealsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                </Routes>
              </main>
            </>
          )}
        </ToastProvider>
      </CartProvider>
    </BrowserRouter>
  );
}