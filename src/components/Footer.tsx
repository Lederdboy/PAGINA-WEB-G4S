import React, { useEffect, useState } from 'react';
import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Función para manejar navegación con scroll automático
  const handleNavigation = (path: string) => {
    // Scroll automático al inicio de la página
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleCallClick = (phone: string) => {
    window.open(`tel:+51${phone.replace('-', '')}`, '_self');
  };

  const handleEmailClick = () => {
    window.open('mailto:info@segurmax.com', '_self');
  };

  const handleSocialClick = (platform: string) => {
    const urls = {
      facebook: 'https://facebook.com/segurmax',
      twitter: 'https://twitter.com/segurmax',
      instagram: 'https://instagram.com/segurmax',
      linkedin: 'https://linkedin.com/company/segurmax'
    };
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  return (
    <footer className="bg-black text-white relative">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all transform hover:scale-110 z-50 animate-pulse-glow"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* Red accent line */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-red-600 p-2 rounded-full">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold">SegurMax</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Líder en servicios de seguridad integral con más de 10 años de experiencia en Perú. 
              Protegemos lo que más importa con tecnología avanzada y personal altamente capacitado.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-red-400" />
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleCallClick('964-938-713')}
                    className="text-gray-300 hover:text-red-400 transition-colors"
                  >
                    964-938-713
                  </button>
                  <span className="text-gray-500">•</span>
                  <button
                    onClick={() => handleCallClick('987-654-321')}
                    className="text-gray-300 hover:text-red-400 transition-colors"
                  >
                    987-654-321
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-red-400" />
                <button
                  onClick={handleEmailClick}
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  info@segurmax.com
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-red-400" />
                <span className="text-gray-300">Lima, Perú</span>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4 mb-6">
              <button 
                onClick={() => handleSocialClick('facebook')}
                className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-white hover:bg-red-600 transition-all transform hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('twitter')}
                className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-white hover:bg-red-600 transition-all transform hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('instagram')}
                className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-white hover:bg-red-600 transition-all transform hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleSocialClick('linkedin')}
                className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-white hover:bg-red-600 transition-all transform hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </button>
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs">ISO 9001:2015</span>
              <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs">ISO 27001</span>
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs">Certificado en Perú</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b-2 border-red-600 pb-2 inline-block">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  onClick={() => handleNavigation('/')}
                  className="text-gray-300 hover:text-red-400 transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:bg-red-400 transition-colors"></span>
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  to="/servicios" 
                  onClick={() => handleNavigation('/servicios')}
                  className="text-gray-300 hover:text-red-400 transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:bg-red-400 transition-colors"></span>
                  Servicios
                </Link>
              </li>
              <li>
                <Link 
                  to="/nosotros" 
                  onClick={() => handleNavigation('/nosotros')}
                  className="text-gray-300 hover:text-red-400 transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:bg-red-400 transition-colors"></span>
                  Nosotros
                </Link>
              </li>
              <li>
                <Link 
                  to="/contacto" 
                  onClick={() => handleNavigation('/contacto')}
                  className="text-gray-300 hover:text-red-400 transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:bg-red-400 transition-colors"></span>
                  Contacto
                </Link>
              </li>
              <li>
                <Link 
                  to="/perfil" 
                  onClick={() => handleNavigation('/perfil')}
                  className="text-gray-300 hover:text-red-400 transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:bg-red-400 transition-colors"></span>
                  Mi Perfil
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b-2 border-red-600 pb-2 inline-block">
              Servicios y Soporte
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/servicios" 
                  onClick={() => handleNavigation('/servicios')}
                  className="text-gray-300 hover:text-red-400 transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:bg-red-400 transition-colors"></span>
                  Vigilancia 24/7
                </Link>
              </li>
              <li>
                <Link 
                  to="/servicios" 
                  onClick={() => handleNavigation('/servicios')}
                  className="text-gray-300 hover:text-red-400 transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:bg-red-400 transition-colors"></span>
                  Protección Personal
                </Link>
              </li>
              <li>
                <Link 
                  to="/servicios" 
                  onClick={() => handleNavigation('/servicios')}
                  className="text-gray-300 hover:text-red-400 transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:bg-red-400 transition-colors"></span>
                  Sistemas de Alarma
                </Link>
              </li>
              <li>
                <Link 
                  to="/contacto" 
                  onClick={() => handleNavigation('/contacto')}
                  className="text-gray-300 hover:text-red-400 transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:bg-red-400 transition-colors"></span>
                  Consultoría
                </Link>
              </li>
              <li>
                <button
                  onClick={() => handleCallClick('964-938-713')}
                  className="text-gray-300 hover:text-red-400 transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:bg-red-400 transition-colors"></span>
                  Soporte 24/7
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert('Descarga disponible próximamente')}
                  className="text-gray-300 hover:text-red-400 transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3 group-hover:bg-red-400 transition-colors"></span>
                  App Móvil
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2025 SegurMax Security. Todos los derechos reservados.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Empresa registrada en Perú • RUC: 20123456789
              </p>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <button 
                onClick={() => alert('Política de Privacidad - Próximamente')}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                Política de Privacidad
              </button>
              <button 
                onClick={() => alert('Términos de Servicio - Próximamente')}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                Términos de Servicio
              </button>
              <button 
                onClick={() => alert('Política de Cookies - Próximamente')}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                Cookies
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 bg-red-600/5 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-red-600/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-red-600/5 rounded-full"></div>
      </div>
    </footer>
  );
};

export default Footer;