import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LiveChat from './components/LiveChat';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AuthModal from './components/AuthModal';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

// Componente para cambiar título y favicon dinámicamente
const DynamicPageHandler: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;

    switch (location.pathname) {
      case '/':
        document.title = 'SegurMax Security - Protección Integral';
        break;
      case '/servicios':
        document.title = 'Servicios - SegurMax Security';
        break;
      case '/nosotros':
        document.title = 'Nosotros - SegurMax Security';
        break;
      case '/contacto':
        document.title = 'Contacto - SegurMax Security';
        break;
      case '/perfil':
        document.title = 'Mi Perfil - SegurMax Security';
        break;
      case '/carrito':
        document.title = 'Carrito - SegurMax Security';
        break;
      case '/checkout':
        document.title = 'Checkout - SegurMax Security';
        break;
      default:
        document.title = 'SegurMax Security - Protección Integral';
    }

    if (favicon) {
      favicon.href = '/favicon.svg';
    }
  }, [location.pathname]);

  return null;
};

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
          />

          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
                fontSize: '15px',
              },
            }}
          />

          <DynamicPageHandler />

          <div className="min-h-screen bg-white text-gray-900">
            <Navbar
              scrollY={scrollY}
              onAuthClick={() => setIsAuthModalOpen(true)}
            />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servicios" element={<Services />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/perfil" element={<Profile />} />
              <Route path="/carrito" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>

            <Footer />
            <LiveChat />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
