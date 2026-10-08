
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import { StartPage } from './pages/StartPage/StartPage';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

import Kundvagn from './components/kundvagn/kundvagn';
import type { Product, CartItem } from './types';

import OrderConfirmation from './pages/OrderConfirmationPage/OrderConfirmationPage';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { ProductFallback } from './components/ErrorBoundary/fallbacks/ProductFallback';
import { NotFoundFallback } from './components/ErrorBoundary/fallbacks/NotFoundFallback';
import { OrderConfirmationFallback } from './components/ErrorBoundary/fallbacks/OrderConfirmationFallback';
import { TestPage } from './pages/TestPage';

const queryClient = new QueryClient();

function App() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id
      );

      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeItem = (productId: number) => {
    setItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (
    productId: number,
    quantity: number
  ) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <StartPage onAddToCart={addToCart} />
              }
            />

            <Route
              path="/product/:id"
              element={
                <ErrorBoundary fallback={<ProductFallback />}>
                  <ProductDetailPage onAddToCart={addToCart} />
                </ErrorBoundary>
              }
            />

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



            <Route
              path="/orderconfirmation/:id"
              element={
                <ErrorBoundary fallback={<OrderConfirmationFallback />}>
                  <OrderConfirmation />
                </ErrorBoundary>
              }
            />

            <Route path="/test" element={<TestPage />} />

            <Route
              path="*"
              element={
                <ErrorBoundary fallback={<NotFoundFallback />}>
                  <NotFoundFallback />
                </ErrorBoundary>
              }
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
