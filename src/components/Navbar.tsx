import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, User, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  scrollY: number;
  onAuthClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrollY, onAuthClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Contacto', path: '/contacto' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleNavClick = (path: string) => {
    // Cerrar menú móvil si está abierto
    setIsMenuOpen(false);
    
    // Scroll automático al inicio de la página
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 50);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrollY > 50 ? 'bg-white/95 backdrop-blur-sm shadow-lg border-b border-red-200' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={() => handleNavClick('/')}
          >
            <Shield className="w-8 h-8 text-red-600" />
            <span className="text-xl font-bold text-gray-900">SegurMax</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all transform hover:scale-105 ${
                    isActive(item.path)
                      ? 'text-red-600 border-b-2 border-red-600'
                      : 'text-gray-700 hover:text-red-600 hover:border-b-2 hover:border-red-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Right Side Icons and Auth */}
            <div className="flex items-center space-x-4">
              {/* Cart Icon - Only show if user is logged in */}
              {user && (
                <Link
                  to="/carrito"
                  onClick={() => handleNavClick('/carrito')}
                  className="relative p-2 text-gray-700 hover:text-red-600 transition-colors transform hover:scale-110"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {cart.length}
                    </span>
                  )}
                </Link>
              )}
              
              {/* User Authentication */}
              {user ? (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/perfil"
                    onClick={() => handleNavClick('/perfil')}
                    className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors transform hover:scale-105"
                  >
                    <User className="w-5 h-5" />
                    <span className="text-sm font-medium">{user.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-all transform hover:scale-105"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <button
                  onClick={onAuthClick}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-all transform hover:scale-105"
                >
                  Iniciar Sesión
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Cart Icon for Mobile - Only show if user is logged in */}
            {user && (
              <Link
                to="/carrito"
                onClick={() => handleNavClick('/carrito')}
                className="relative p-2 text-gray-700 hover:text-red-600 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-red-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-red-200 animate-slide-in-left">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all transform hover:scale-105 ${
                  isActive(item.path)
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {user ? (
              <div className="space-y-2 pt-2 border-t border-gray-200">
                <Link
                  to="/perfil"
                  onClick={() => handleNavClick('/perfil')}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                    handleNavClick('/');
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onAuthClick();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;