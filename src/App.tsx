import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/auth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Chatbot from './components/Chatbot';
import HomePage from './pages/HomePage';
import ProdutosPage from './pages/ProdutosPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ServicosPage from './pages/ServicosPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import SobrePage from './pages/SobrePage';
import NoticiasPage from './pages/NoticiasPage';
import NewsDetailPage from './pages/NewsDetailPage';
import ContactoPage from './pages/ContactoPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminProducts from './pages/admin/AdminProducts';
import AdminServices from './pages/admin/AdminServices';
import AdminNews from './pages/admin/AdminNews';
import AdminAbout from './pages/admin/AdminAbout';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminProducts />} />
            <Route path="produtos" element={<AdminProducts />} />
            <Route path="servicos" element={<AdminServices />} />
            <Route path="noticias" element={<AdminNews />} />
            <Route path="sobre" element={<AdminAbout />} />
          </Route>

          {/* Public */}
          <Route path="*" element={
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
                  <Route path="/noticias/:slug" element={<NewsDetailPage />} />
                  <Route path="/contacto" element={<ContactoPage />} />
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </main>
              <Footer />
              <Chatbot />
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
