import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage'
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { StartPage } from './pages/StartPage/StartPage';
import OrderConfirmation from './pages/OrderConfirmationPage/OrderConfirmationPage';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { ProductFallback } from './components/ErrorBoundary/fallbacks/ProductFallback';
import { NotFoundFallback } from './components/ErrorBoundary/fallbacks/NotFoundFallback';
import { OrderConfirmationFallback } from './components/ErrorBoundary/fallbacks/OrderConfirmationFallback';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
         <Header />
        <main> 
          <Routes>
            <Route path="/" element={<StartPage />} />

            <Route 
              path="/product/:id" 
              element={
                <ErrorBoundary fallback={<ProductFallback />}>
                  <ProductDetailPage />
                </ErrorBoundary>
              }
            />

            <Route 
              path="/orderconfirmation/:id" 
              element={
                <ErrorBoundary fallback={<OrderConfirmationFallback />}>
                  <OrderConfirmation />
                </ErrorBoundary>} />

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
  )
}

export default App
