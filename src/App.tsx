import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage'
import { StartPage } from './components/startpage/StartPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
         <Header />
        <main> 
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<Kundvagn />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
