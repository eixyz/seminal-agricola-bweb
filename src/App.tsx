import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ProdutosPage from './pages/ProdutosPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ServicosPage from './pages/ServicosPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import SobrePage from './pages/SobrePage';
import NoticiasPage from './pages/NoticiasPage';
import ContactoPage from './pages/ContactoPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/produtos" element={<ProdutosPage />} />
            <Route path="/produtos/:slug" element={<ProductDetailPage />} />
            <Route path="/servicos" element={<ServicosPage />} />
            <Route path="/servicos/:slug" element={<ServiceDetailPage />} />
            <Route path="/sobre" element={<SobrePage />} />
            <Route path="/noticias" element={<NoticiasPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
