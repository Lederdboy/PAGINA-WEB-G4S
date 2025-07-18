import React, { useState, useEffect } from 'react';
import { Shield, Camera, Users, Lock, Phone, CheckCircle, Star, Eye, ChevronLeft, ChevronRight, Building, Car, Home, Briefcase, Globe, Zap, UserCheck, FileText, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';


const Services: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useCart();
  const { user } = useAuth();

  // esto es para cambiar el título y favicon de la página
  useEffect(() => {
    document.title = 'Servicios - SegurMax Security';
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (favicon) {
      favicon.href = '/favicon.svg';
    }
  }, []);

  // Animación de entrada para las cartas
  useEffect(() => {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-fade-in-up');
      }, index * 100);
    });
  }, [selectedCategory, currentSlide]);

  const categories = [
    { id: 'all', name: 'Todos los Servicios' },
    { id: 'vigilancia', name: 'Vigilancia' },
    { id: 'tecnologia', name: 'Tecnología' },
    { id: 'personal', name: 'Protección Personal' },
    { id: 'consultoria', name: 'Consultoría' },
    { id: 'empresarial', name: 'Empresarial' },
    { id: 'residencial', name: 'Residencial' }
  ];

  // Promociones especiales de Fiestas Patrias 2025
  const fiestasPatriasPromotions = [
    {
      id: 'promo-1',
      title: '¡Oferta Fiestas Patrias 2025!',
      subtitle: 'Seguridad Empresarial Premium',
      discount: '40% OFF',
      originalPrice: 1299,
      promoPrice: 779,
      validUntil: '31 de Julio 2025',
      image: './imagenes/seguridad.jpg',
      features: ['Monitoreo 24/7', 'Personal especializado', 'Sistemas avanzados', 'Soporte técnico'],
      badge: '🇵🇪 FIESTAS PATRIAS'
    },
    {
      id: 'promo-2',
      title: '¡Promoción Bicentenario!',
      subtitle: 'Vigilancia Corporativa Elite',
      discount: '35% OFF',
      originalPrice: 899,
      promoPrice: 584,
      validUntil: '28 de Julio 2025',
      image: './imagenes/camara.jpeg',
      features: ['Cámaras HD', 'Control de acceso', 'Reportes detallados', 'Respuesta inmediata'],
      badge: '🎉 OFERTA ESPECIAL'
    },
    {
      id: 'promo-3',
      title: '¡Mega Descuento Patrio!',
      subtitle: 'Protección Integral VIP',
      discount: '50% OFF',
      originalPrice: 1599,
      promoPrice: 799,
      validUntil: '29 de Julio 2025',
      image: './imagenes/seguridad3.jpg',
      features: ['Escolta personal', 'Vehículos blindados', 'Coordinación total', 'Cobertura 24/7'],
      badge: '🏆 PREMIUM'
    }
  ];

  const [currentPromo, setCurrentPromo] = useState(0);

  // Auto-play para promociones
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % fiestasPatriasPromotions.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      id: 'vigilancia-247',
      category: 'vigilancia',
      title: "Vigilancia 24/7",
      description: "Servicio de monitoreo continuo con personal altamente capacitado y sistemas de última generación para garantizar la seguridad total.",
      image: "./imagenes/seguridad.jpg",
      icon: <Shield className="w-8 h-8" />,
      rating: 4.9,
      reviews: 156,
      price: 599,
      originalPrice: 799,
      duration: "mes",
      features: ["Monitoreo 24/7", "Personal certificado", "Sistemas avanzados", "Reportes detallados", "Respuesta inmediata", "Coordinación policial"],
      badge: "Más Popular"
    },
    {
      id: 'sistemas-alarma',
      category: 'tecnologia',
      title: "Sistemas de Alarma Inteligentes",
      description: "Instalación y mantenimiento de sistemas de seguridad avanzados con tecnología de inteligencia artificial y conectividad IoT.",
      image: "./imagenes/camara.jpeg",
      icon: <Camera className="w-8 h-8" />,
      rating: 4.8,
      reviews: 203,
      price: 899,
      originalPrice: 1199,
      duration: "instalación",
      features: ["Sensores con IA", "Cámaras 4K", "Acceso remoto", "Almacenamiento nube", "Notificaciones", "Integración domótica"],
      badge: "Tecnología Avanzada"
    },
    {
      id: 'escolta-personal',
      category: 'personal',
      title: "Escolta y Protección Personal",
      description: "Protección personalizada para ejecutivos, celebridades y personas VIP con guardaespaldas profesionales altamente entrenados.",
      image: "./imagenes/seguridad3.jpeg",
      icon: <Users className="w-8 h-8" />,
      rating: 5.0,
      reviews: 89,
      price: 250,
      originalPrice: 350,
      duration: "hora",
      features: ["Guardaespaldas certificados", "Evaluación de riesgos", "Rutas seguras", "Vehículos blindados", "Coordinación autoridades", "Protección discreta"],
      badge: "Premium"
    },
    {
      id: 'consultoria-seguridad',
      category: 'consultoria',
      title: "Consultoría en Seguridad",
      description: "Análisis exhaustivo y recomendaciones estratégicas para mejorar la seguridad integral de tu empresa o propiedad.",
      image: "./imagenes/seguridad1.jpeg",
      icon: <Lock className="w-8 h-8" />,
      rating: 4.7,
      reviews: 124,
      price: 1500,
      originalPrice: 2000,
      duration: "consulta",
      features: ["Auditoría completa", "Vulnerabilidades críticas", "Plan personalizado", "Capacitación personal", "Seguimiento continuo", "Certificaciones"],
      badge: "Consultoría Experta"
    },
    {
      id: 'seguridad-eventos',
      category: 'vigilancia',
      title: "Seguridad para Eventos",
      description: "Cobertura completa de seguridad para eventos corporativos, sociales y masivos con personal especializado.",
      image: "./imagenes/seguridad3.jpeg",
      icon: <Users className="w-8 h-8" />,
      rating: 4.6,
      reviews: 178,
      price: 450,
      originalPrice: 600,
      duration: "evento",
      features: ["Personal especializado", "Control multitudes", "Comunicación integrada", "Coordinación organizadores", "Protocolos emergencia", "Cobertura completa"],
      badge: "Eventos Especiales"
    },
    {
      id: 'monitoreo-remoto',
      category: 'tecnologia',
      title: "Monitoreo Remoto 24/7",
      description: "Sistema de monitoreo remoto continuo con tecnología avanzada y respuesta inmediata ante cualquier incidente.",
      image: "./imagenes/nosotros.jpg",
      icon: <Camera className="w-8 h-8" />,
      rating: 4.9,
      reviews: 267,
      price: 299,
      originalPrice: 399,
      duration: "mes",
      features: ["Monitoreo 24/7", "Reconocimiento facial", "Alertas instantáneas", "Grabación HD", "Acceso remoto", "Respuesta inmediata"],
      badge: "Monitoreo Continuo"
    },
    {
      id: 'seguridad-empresarial',
      category: 'empresarial',
      title: "Seguridad Empresarial Integral",
      description: "Solución completa de seguridad para empresas con control de acceso, vigilancia y protocolos personalizados.",
      image: "./imagenes/nosotros.jpg",
      icon: <Building className="w-8 h-8" />,
      rating: 4.8,
      reviews: 145,
      price: 1299,
      originalPrice: 1699,
      duration: "mes",
      features: ["Control de acceso", "Vigilancia perimetral", "Protocolos personalizados", "Capacitación empleados", "Sistemas integrados", "Soporte 24/7"],
      badge: "Empresarial"
    },
    {
      id: 'transporte-valores',
      category: 'personal',
      title: "Transporte de Valores",
      description: "Servicio especializado en transporte seguro de valores, documentos importantes y mercancías de alto valor.",
      image: "./imagenes/seguridad3.jpg",
      icon: <Car className="w-8 h-8" />,
      rating: 4.9,
      reviews: 98,
      price: 350,
      originalPrice: 450,
      duration: "servicio",
      features: ["Vehículos blindados", "Escoltas armados", "Rutas seguras", "Seguimiento GPS", "Seguro incluido", "Protocolos estrictos"],
      badge: "Valores Seguros"
    },
    {
      id: 'seguridad-residencial',
      category: 'residencial',
      title: "Seguridad Residencial",
      description: "Protección integral para hogares con sistemas de alarma, cámaras de seguridad y monitoreo personalizado.",
      image: "./imagenes/camara.jpeg",
      icon: <Home className="w-8 h-8" />,
      rating: 4.7,
      reviews: 234,
      price: 199,
      originalPrice: 299,
      duration: "mes",
      features: ["Alarmas inteligentes", "Cámaras HD", "App móvil", "Monitoreo 24/7", "Respuesta rápida", "Instalación incluida"],
      badge: "Hogar Seguro"
    },
    {
      id: 'investigacion-privada',
      category: 'consultoria',
      title: "Investigación Privada",
      description: "Servicios de investigación privada con detectives profesionales para casos corporativos y personales.",
      image: "./imagenes/camara.jpeg",
      icon: <FileText className="w-8 h-8" />,
      rating: 4.6,
      reviews: 87,
      price: 800,
      originalPrice: 1000,
      duration: "caso",
      features: ["Detectives certificados", "Investigación discreta", "Informes detallados", "Evidencia legal", "Confidencialidad total", "Seguimiento completo"],
      badge: "Investigación"
    },
    {
      id: 'ciberseguridad',
      category: 'tecnologia',
      title: "Ciberseguridad Empresarial",
      description: "Protección digital integral contra amenazas cibernéticas con monitoreo continuo y respuesta a incidentes.",
      image: "./imagenes/seguridad3.jpeg",
      icon: <Zap className="w-8 h-8" />,
      rating: 4.8,
      reviews: 156,
      price: 999,
      originalPrice: 1299,
      duration: "mes",
      features: ["Firewall avanzado", "Monitoreo 24/7", "Respuesta incidentes", "Auditorías seguridad", "Capacitación empleados", "Backup seguro"],
      badge: "Ciberseguridad"
    },
    {
      id: 'seguridad-vip',
      category: 'personal',
      title: "Protección VIP Elite",
      description: "Máximo nivel de protección personal para personalidades públicas, ejecutivos y familias de alto perfil.",
      image: "./imagenes/seguridad1.jpeg",
      icon: <UserCheck className="w-8 h-8" />,
      rating: 5.0,
      reviews: 45,
      price: 500,
      originalPrice: 700,
      duration: "hora",
      features: ["Equipo elite", "Vehículos blindados", "Coordinación total", "Tecnología avanzada", "Discreción máxima", "Cobertura global"],
      badge: "VIP Elite"
    },
    {
      id: 'control-acceso',
      category: 'empresarial',
      title: "Control de Acceso Biométrico",
      description: "Sistemas avanzados de control de acceso con tecnología biométrica para máxima seguridad empresarial.",
      image: "./imagenes/seguridad3.jpg",
      icon: <Lock className="w-8 h-8" />,
      rating: 4.7,
      reviews: 189,
      price: 1199,
      originalPrice: 1599,
      duration: "instalación",
      features: ["Biometría avanzada", "Tarjetas inteligentes", "Control remoto", "Reportes detallados", "Integración sistemas", "Soporte técnico"],
      badge: "Acceso Seguro"
    },
    {
      id: 'seguridad-retail',
      category: 'empresarial',
      title: "Seguridad para Retail",
      description: "Soluciones especializadas para comercios y centros comerciales con prevención de pérdidas y vigilancia.",
      image: "./imagenes/nosotros.jpg",
      icon: <Building className="w-8 h-8" />,
      rating: 4.6,
      reviews: 267,
      price: 699,
      originalPrice: 899,
      duration: "mes",
      features: ["Prevención pérdidas", "Cámaras ocultas", "Personal encubierto", "Análisis comportamiento", "Reportes detallados", "Capacitación staff"],
      badge: "Retail Seguro"
    },
    {
      id: 'seguridad-construccion',
      category: 'vigilancia',
      title: "Seguridad en Construcción",
      description: "Vigilancia especializada para obras y sitios de construcción con protección de materiales y equipos.",
      image: "./imagenes/seguridad3.jpeg",
      icon: <Shield className="w-8 h-8" />,
      rating: 4.5,
      reviews: 134,
      price: 399,
      originalPrice: 549,
      duration: "mes",
      features: ["Vigilancia perimetral", "Protección materiales", "Rondas programadas", "Cámaras móviles", "Reportes obra", "Coordinación contratistas"],
      badge: "Construcción"
    },
    {
      id: 'seguridad-hospitales',
      category: 'empresarial',
      title: "Seguridad Hospitalaria",
      description: "Servicios especializados para centros de salud con protocolos médicos y manejo de situaciones críticas.",
      image: "./imagenes/seguridad1.jpeg",
      icon: <Users className="w-8 h-8" />,
      rating: 4.8,
      reviews: 98,
      price: 899,
      originalPrice: 1199,
      duration: "mes",
      features: ["Personal capacitado", "Protocolos médicos", "Control visitantes", "Emergencias médicas", "Áreas restringidas", "Coordinación médica"],
      badge: "Salud Segura"
    },
    {
      id: 'seguridad-internacional',
      category: 'personal',
      title: "Seguridad Internacional",
      description: "Protección global para viajes internacionales con coordinación local y protocolos de seguridad adaptados.",
      image: "./imagenes/seguridad.jpg",
      icon: <Globe className="w-8 h-8" />,
      rating: 4.9,
      reviews: 76,
      price: 750,
      originalPrice: 1000,
      duration: "día",
      features: ["Cobertura global", "Coordinación local", "Protocolos adaptados", "Comunicación 24/7", "Evacuación emergencia", "Inteligencia local"],
      badge: "Global"
    },
    {
      id: 'auditoria-seguridad',
      category: 'consultoria',
      title: "Auditoría de Seguridad",
      description: "Evaluación completa de vulnerabilidades y riesgos con recomendaciones estratégicas para mejorar la seguridad.",
      image: "./imagenes/camara.jpeg",
      icon: <FileText className="w-8 h-8" />,
      rating: 4.7,
      reviews: 145,
      price: 1200,
      originalPrice: 1600,
      duration: "auditoría",
      features: ["Evaluación completa", "Análisis riesgos", "Recomendaciones", "Plan mejoras", "Seguimiento", "Certificación"],
      badge: "Auditoría"
    }
  ];

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(service => service.category === selectedCategory);

  const servicesPerSlide = 6;
  const totalSlides = Math.ceil(filteredServices.length / servicesPerSlide);
  const currentServices = filteredServices.slice(
    currentSlide * servicesPerSlide,
    (currentSlide + 1) * servicesPerSlide
  );

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleAddToCart = (service: any) => {
    if (!user) {
      toast.error('Debes iniciar sesión para agregar servicios al carrito');
      return;
    }

    const item = {
      id: service.id,
      serviceName: service.title,
      planName: "Servicio Completo",
      price: service.price,
      duration: service.duration,
      features: service.features
    };

    addToCart(item);
    toast.success('Servicio agregado al carrito');

    const customToast = document.createElement('div');
    customToast.className = 'fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300';
    customToast.innerHTML = `
    <div class="flex items-center">
      <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
      </svg>
      ${service.title} agregado al carrito
    </div>
  `;
    document.body.appendChild(customToast);

    setTimeout(() => {
      customToast.style.transform = 'translateX(100%)';
      setTimeout(() => document.body.removeChild(customToast), 300);
    }, 3000);
  };

  // Función para manejar navegación con scroll automático
  const handleNavigationWithScroll = (path: string) => {
    window.location.href = path;
    // Scroll automático al inicio de la página
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <div className="pt-20 pb-24 min-h-screen bg-white">
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* CONTENEDOR CON FONDO BLANCO */}
        <div className="relative z-10 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">

          {/* Carrusel */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentPromo * 100}%)` }}
          >
            {fiestasPatriasPromotions.map((promo) => (
              <div key={promo.id} className="w-full flex-shrink-0 h-[600px] relative">
                {/* Imagen de fondo con opacidad */}
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-15"
                />

                {/* Contenido centrado sobre fondo blanco */}
                <div className="relative z-10 w-full h-full flex items-center justify-center px-6 py-10">
                  <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-12 max-w-3xl w-full text-center border border-red-100">
                    <span className="text-5xl animate-bounce block mb-2"></span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{promo.title}</h2>
                    <h3 className="text-xl md:text-2xl font-semibold text-red-600 mb-4">{promo.subtitle}</h3>

                    <div className="flex justify-center items-center gap-4 mb-4">
                      <span className="text-3xl font-bold text-green-600">S/{promo.promoPrice}</span>
                      <span className="text-xl line-through text-gray-400">S/{promo.originalPrice}</span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Ahorra S/{promo.originalPrice - promo.promoPrice}
                      </span>
                    </div>

                    <ul className="text-left text-sm md:text-base text-gray-700 mb-4 space-y-1 max-w-md mx-auto">
                      {promo.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <p className="text-sm text-gray-600 mb-4">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Válido hasta: <span className="font-semibold text-red-700">{promo.validUntil}</span>
                    </p>

                    <button
                      onClick={() => handleAddToCart({
                        id: promo.id,
                        serviceName: promo.subtitle,
                        planName: "Promoción Fiestas Patrias",
                        price: promo.promoPrice,
                        duration: "mes",
                        features: promo.features
                      })}
                      className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg transition-transform transform hover:scale-105"
                    >
                      ¡Aprovechar Oferta!
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Flechas */}
          <button
            onClick={() => setCurrentPromo((prev) => (prev > 0 ? prev - 1 : fiestasPatriasPromotions.length - 1))}
            className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white text-red-600 hover:bg-red-50 p-2 rounded-full shadow z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCurrentPromo((prev) => (prev + 1) % fiestasPatriasPromotions.length)}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white text-red-600 hover:bg-red-50 p-2 rounded-full shadow z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicadores */}
          <div className="flex justify-center py-6 bg-white border-t border-gray-200">
            {fiestasPatriasPromotions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPromo(index)}
                className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${index === currentPromo
                  ? 'bg-red-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Contador final destacado */}
        <div className="mt-12 flex justify-center">
          <div className="bg-white border border-red-200 rounded-2xl shadow-md px-8 py-5 text-center max-w-lg w-full">
            <h4 className="text-lg font-bold text-gray-900 mb-1">⏰ ¡Tiempo Limitado!</h4>
            <p className="text-gray-700">
              Estas promociones estarán disponibles solo hasta el <span className="text-red-600 font-semibold">31 de Julio 2025</span>. ¡No las dejes pasar!
            </p>
          </div>
        </div>
      </section>


      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">Nuestros Servicios</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 animate-fade-in-up">
            Soluciones integrales de seguridad diseñadas para proteger lo que más importa.
            Tecnología avanzada, personal especializado y atención personalizada.
          </p>

          {/* Price Visibility Notice */}
          {!user && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto">
              <div className="flex items-center justify-center text-red-700">
                <Lock className="w-5 h-5 mr-2" />
                <span className="font-medium">Inicia sesión para ver precios</span>
              </div>
            </div>
          )}

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setCurrentSlide(0);
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${selectedCategory === category.id
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-red-600 hover:text-red-600'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Carousel Controls */}
          {totalSlides > 1 && (
            <div className="flex items-center justify-center space-x-4 mb-4">
              <button
                onClick={prevSlide}
                className="bg-white border border-gray-300 rounded-full p-2 hover:border-red-600 hover:text-red-600 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-red-600' : 'bg-gray-300'
                      }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="bg-white border border-gray-300 rounded-full p-2 hover:border-red-600 hover:text-red-600 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}

          <div className="text-sm text-gray-600">
            Mostrando {currentSlide * servicesPerSlide + 1}-{Math.min((currentSlide + 1) * servicesPerSlide, filteredServices.length)} de {filteredServices.length} servicios
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentServices.map((service, index) => (
              <div
                key={service.id}
                className="service-card bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:border-red-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {service.badge}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium">{service.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center mb-4">
                    <div className="bg-red-50 border-2 border-red-100 rounded-full p-2 mr-3">
                      <div className="text-red-600">
                        {service.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <span>{service.reviews} reseñas</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-red-600 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {service.features.length > 3 && (
                      <div className="text-sm text-gray-500">
                        +{service.features.length - 3} características más
                      </div>
                    )}
                  </div>

                  {/* Price Section */}
                  <div className="border-t border-gray-200 pt-4">
                    {user ? (
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-red-600">S/{service.price}</span>
                            <span className="text-lg text-gray-500 line-through">S/{service.originalPrice}</span>
                          </div>
                          <span className="text-sm text-gray-600">por {service.duration}</span>
                        </div>
                        <div className="text-right">
                          <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                            Ahorra S/{service.originalPrice - service.price}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center mb-4 p-3 bg-gray-100 rounded-lg">
                        <Eye className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-gray-600 font-medium">Inicia sesión para ver precios</span>
                      </div>
                    )}

                    {/* Action Button */}
                    <button
                      onClick={() => handleAddToCart(service)}
                      disabled={!user}
                      className={`w-full py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${user
                        ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                      {user ? 'Agregar al Carrito' : 'Inicia Sesión para Comprar'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">¿Necesitas seguridad personalizada para tu empresa?</h2>
          <p className="text-xl text-red-100 mb-8">
            Contáctanos para recibir una cotización personalizada según las necesidades específicas de tu empresa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              Consulta Gratuita
            </button>
            <button
              onClick={() => handleNavigationWithScroll('/contacto')}
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-red-600 transition-all transform hover:scale-105"
            >
              Cotización Empresarial
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;