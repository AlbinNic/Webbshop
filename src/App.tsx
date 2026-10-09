
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import { StartPage } from "./pages/StartPage/StartPage";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import Kundvagn from "./components/kundvagn/kundvagn";
import OrderConfirmation from "./pages/OrderConfirmationPage/OrderConfirmationPage";

import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { ProductFallback } from "./components/ErrorBoundary/fallbacks/ProductFallback";
import { NotFoundFallback } from "./components/ErrorBoundary/fallbacks/NotFoundFallback";
import { OrderConfirmationFallback } from "./components/ErrorBoundary/fallbacks/OrderConfirmationFallback";
import { CheckoutPage } from "./pages/CheckoutPage/CheckoutPage";

import { CartProvider, useCart } from "./components/context/Cartcontext";
const queryClient = new QueryClient();

function AppRoutes() {
  const { items, addToCart, removeItem, updateQuantity } = useCart();

  return (
    <>
      <Header />

      <main>
        <Routes>
          {/* Startsidan */}
          <Route
            path="/"
            element={<StartPage onAddToCart={addToCart} />}
          />

          {/* Produktdetaljer */}
          <Route
            path="/product/:id"
            element={
              <ErrorBoundary fallback={<ProductFallback />}>
                <ProductDetailPage onAddToCart={addToCart} />
              </ErrorBoundary>
            }
          />

          {/* Kundvagn */}
          <Route
            path="/cart"
            element={
              <Kundvagn
                items={items}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            }
          />
          {/* Kassa */}
          <Route
            path="/kassa"
            element={<CheckoutPage />}
          />


          {/* Orderbekräftelse */}
          <Route
            path="/orderconfirmation/:id"
            element={
              <ErrorBoundary fallback={<OrderConfirmationFallback />}>
                <OrderConfirmation />
              </ErrorBoundary>
            }
          />

          {/* Om sidan inte hittas */}
          <Route path="*" element={<NotFoundFallback />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
