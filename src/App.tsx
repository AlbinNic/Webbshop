import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage'
import { StartPage } from './components/startpage/StartPage';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import Kundvagn from './components/kundvagn/kundvagn';
import Kassa from './components/kassa/kassa';
import type { Product, CartItem } from './types';

const queryClient = new QueryClient();

function App() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
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
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<StartPage onAddToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route
              path="/cart"
              element={<Kundvagn items={items} onUpdateQuantity={updateQuantity} onRemove={removeItem} />}
            />
            <Route path="/kassa" element={<Kassa />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App