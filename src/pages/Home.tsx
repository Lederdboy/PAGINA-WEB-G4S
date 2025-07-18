import React, { useEffect, useState } from 'react';
import { Shield, Users, Clock, Star, Calendar, ArrowRight, Award, TrendingUp, CheckCircle, Phone, Mail, ChevronLeft, ChevronRight, Play, Pause, BarChart3, Activity, AlertTriangle, Camera, MapPin, Bell, Settings, Monitor, Zap, Download, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SecurityDashboard from '../components/SecurityDashboard';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { user } = useAuth();

  // Cambiar favicon y título según la página
  useEffect(() => {
    document.title = 'SegurMax Security - Protección Integral';
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (favicon) {
      favicon.href = '/favicon.svg';
    }
  }, []);

  const carouselSlides = [
    {
      image: "./imagenes/seguridad.jpg",
      title: "Protección Profesional 24/7",
      subtitle: "Vigilancia continua con personal altamente capacitado",
      description: "Nuestro equipo de seguridad está disponible las 24 horas del día, los 7 días de la semana para garantizar tu tranquilidad.",
      cta: "Conocer Servicios"
    },
    {
      image: "./imagenes/nosotros.jpg",
      title: "Tecnología de Vanguardia",
      subtitle: "Sistemas inteligentes de última generación",
      description: "Implementamos las tecnologías más avanzadas en seguridad, incluyendo IA, reconocimiento facial y monitoreo remoto.",
      cta: "Ver Tecnología"
    },
    {
      image: "./imagenes/seguridad1.jpeg",
      title: "Protección Ejecutiva VIP",
      subtitle: "Escolta personal de élite para ejecutivos",
      description: "Servicios especializados de protección personal para ejecutivos, celebridades y personalidades de alto perfil.",
      cta: "Protección VIP"
    },
    {
      image: "./imagenes/camara.jpeg",
      title: "Consultoría Especializada",
      subtitle: "Análisis y estrategias de seguridad integral",
      description: "Evaluamos tus necesidades específicas y diseñamos soluciones de seguridad personalizadas para tu empresa.",
      cta: "Consultoría"
    },
    {
      image: "./imagenes/seguridad3.jpg",
      title: "Seguridad Empresarial",
      subtitle: "Soluciones integrales para empresas",
      description: "Protección completa para instalaciones corporativas con sistemas de control de acceso y monitoreo avanzado.",
      cta: "Empresas"
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, carouselSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const achievements = [
    { icon: <Users className="w-8 h-8" />, number: "500+", label: "Clientes Satisfechos" },
    { icon: <Clock className="w-8 h-8" />, number: "24/7", label: "Disponibilidad" },
    { icon: <Star className="w-8 h-8" />, number: "10+", label: "Años de Experiencia" },
    { icon: <Award className="w-8 h-8" />, number: "50+", label: "Certificaciones" }
  ];

  const news = [
    {
      title: "SegurMax expande sus servicios a nivel nacional",
      date: "2025-01-20",
      summary: "Nuestra empresa anuncia la apertura de nuevas oficinas en 5 ciudades principales del país, fortaleciendo nuestra presencia nacional.",
      image: "./imagenes/seguridad.jpg"
    },
    {
      title: "Certificación ISO 27001 obtenida con éxito",
      date: "2025-01-18",
      summary: "SegurMax obtiene la certificación internacional de seguridad de la información, reforzando nuestro compromiso con la excelencia.",
      image: "./imagenes/seguridad3.jpeg"
    },
    {
      title: "Nuevo contrato con el sector bancario",
      date: "2025-01-15",
      summary: "Firmamos un importante acuerdo para brindar servicios de seguridad integral a una de las principales entidades financieras del país.",
      image: "./imagenes/seguridad1.jpeg"
    },
    {
      title: "Tecnología de vanguardia en vigilancia",
      date: "2025-01-12",
      summary: "Implementamos sistemas de inteligencia artificial y reconocimiento facial en nuestros servicios de monitoreo 24/7.",
      image: "./imagenes/camara.jpeg"
    }
  ];

  const handleContactClick = () => {
    window.location.href = '/contacto';
  };

  const handleServicesClick = () => {
    window.location.href = '/servicios';
    // Scroll automático al inicio de la página
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };
  //esto es para manejar el click en las noticias
  const handleNewsClick = (newsItem: any) => {
    alert(`Leyendo: ${newsItem.title}\n\n${newsItem.summary}`);
  };

  const handleCallClick = () => {
    window.open('tel:+51964938713', '_self');
  };

  const handleEmailClick = () => {
    window.open('mailto:info@segurmax.com', '_self');
  };

  // Funciones para los servicios destacados
  const handleVigilanciaClick = () => {
    // Redirigir a servicios con filtro de vigilancia
    window.location.href = '/servicios';
    // Scroll automático al inicio
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleProteccionClick = () => {
    // Redirigir a servicios con filtro de protección personal
    window.location.href = '/servicios';
    // Scroll automático al inicio
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleConsultoriaClick = () => {
    // Redirigir a contacto para consultoría
    window.location.href = '/contacto';
    // Scroll automático al inicio
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleVerTodasNoticias = () => {
    // Mostrar modal de próximamente
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-xl max-w-md w-full p-8 animate-scale-in">
        <div class="text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-4">Página de Noticias</h3>
          <p class="text-gray-600 mb-6">Estamos trabajando en una sección completa de noticias. Pronto estará disponible con todas las últimas actualizaciones de SegurMax.</p>
          <div class="space-y-3">
            <button onclick="window.location.href='/contacto'" class="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
              Contáctanos para Más Info
            </button>
            <button onclick="this.parentElement.parentElement.parentElement.remove()" class="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  };

  // Si el usuario está logueado, mostrar el dashboard de seguridad
  if (user) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50">
        {/* Welcome Header */}
        <section className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="animate-fade-in-up">
                <h1 className="text-4xl font-bold mb-2">
                  {user.isNewUser ? `¡Bienvenido a SegurMax, ${user.name}! 🎉` : `¡Bienvenido de vuelta, ${user.name}! 👋`}
                </h1>
                <p className="text-xl text-red-100">
                  {user.isNewUser ? 'Tu dashboard personal ha sido creado y está listo para usar' : 'Tu centro de control de seguridad integral'}
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                {user.isNewUser && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">¡Nuevo!</div>
                    <div className="text-sm text-red-200">Usuario</div>
                  </div>
                )}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-red-200">Monitoreo</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">99.9%</div>
                  <div className="text-sm text-red-200">Uptime</div>
                </div>
                {!user.isNewUser && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">Personal</div>
                    <div className="text-sm text-red-200">Dashboard</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* New User Welcome Message */}
        {user.isNewUser && (
          <section className="py-8 bg-blue-50 border-b border-blue-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-xl border border-blue-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Shield className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">¡Tu Dashboard Personal está Listo!</h3>
                    <p className="text-gray-600">Comienza explorando nuestros servicios para personalizar tu experiencia</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => window.location.href = '/servicios'}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105"
                  >
                    Explorar Servicios
                  </button>
                  <button
                    onClick={() => window.location.href = '/perfil'}
                    className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105"
                  >
                    Configurar Perfil
                  </button>
                  <button
                    onClick={() => window.location.href = '/contacto'}
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all transform hover:scale-105"
                  >
                    Obtener Ayuda
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Quick Actions */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { icon: <BarChart3 className="w-6 h-6" />, label: 'Dashboard', action: () => window.location.href = '/perfil' },
                { icon: <Camera className="w-6 h-6" />, label: 'Cámaras', action: () => alert('Accediendo a cámaras en vivo...') },
                { icon: <Bell className="w-6 h-6" />, label: 'Alertas', action: () => alert('Mostrando alertas activas...') },
                { icon: <Users className="w-6 h-6" />, label: 'Personal', action: () => alert('Estado del personal de seguridad...') },
                { icon: <Settings className="w-6 h-6" />, label: 'Configurar', action: () => window.location.href = '/perfil' },
                { icon: <Download className="w-6 h-6" />, label: 'Reportes', action: () => alert('Generando reporte...') }
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all transform hover:scale-105 animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.icon}
                  <span className="text-sm font-medium mt-2">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Dashboard */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SecurityDashboard />
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Resumen de Actividad</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  title: 'Eventos Hoy',
                  value: '1,247',
                  change: '+12%',
                  icon: <Activity className="w-8 h-8" />,
                  color: 'text-blue-600',
                  bg: 'bg-blue-50'
                },
                {
                  title: 'Alertas Resueltas',
                  value: '98.5%',
                  change: '+2.1%',
                  icon: <CheckCircle className="w-8 h-8" />,
                  color: 'text-green-600',
                  bg: 'bg-green-50'
                },
                {
                  title: 'Tiempo Respuesta',
                  value: '2.3 min',
                  change: '-15%',
                  icon: <Clock className="w-8 h-8" />,
                  color: 'text-orange-600',
                  bg: 'bg-orange-50'
                },
                {
                  title: 'Sistemas Activos',
                  value: '47/50',
                  change: '+6%',
                  icon: <Monitor className="w-8 h-8" />,
                  color: 'text-purple-600',
                  bg: 'bg-purple-50'
                }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all transform hover:-translate-y-1 animate-bounce-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                      {stat.icon}
                    </div>
                    <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' :
                        stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                      }`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Alerts */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Alertas Recientes</h3>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    3 Nuevas
                  </span>
                </div>
                <div className="space-y-4">
                  {[
                    { type: 'warning', title: 'Movimiento Detectado', time: 'Hace 5 min', location: 'Sector Norte' },
                    { type: 'error', title: 'Cámara Desconectada', time: 'Hace 15 min', location: 'Estacionamiento' },
                    { type: 'success', title: 'Ronda Completada', time: 'Hace 30 min', location: 'Perímetro' }
                  ].map((alert, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${alert.type === 'error' ? 'bg-red-500' :
                          alert.type === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{alert.title}</p>
                        <p className="text-gray-600 text-xs">{alert.location} • {alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Status */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Estado del Sistema</h3>
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Todo Operativo</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'Servidores', status: 'online', uptime: '99.9%' },
                    { name: 'Red', status: 'online', uptime: '99.8%' },
                    { name: 'Backup', status: 'warning', uptime: '98.5%' },
                    { name: 'Monitoreo', status: 'online', uptime: '100%' }
                  ].map((system, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${system.status === 'online' ? 'bg-green-500' :
                            system.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                        <span className="font-medium text-gray-900 text-sm">{system.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{system.uptime}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Si no está logueado, mostrar la página de inicio normal
  //esto es para manejar el click en las noticias
  return (
    <div className="pt-16">
      {/* Hero Carousel Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Carousel Images */}
        <div className="relative w-full h-full">
          {carouselSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-105'
                }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-start z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              {/* Animated Content */}
              <div
                key={currentSlide}
                className="animate-fade-in-up"
              >
                <div className="mb-6">
                  <Shield className="w-16 h-16 text-red-600 mb-4 animate-pulse" />
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  {carouselSlides[currentSlide].title}
                </h1>

                <h2 className="text-2xl md:text-3xl text-red-400 font-semibold mb-6">
                  {carouselSlides[currentSlide].subtitle}
                </h2>

                <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
                  {carouselSlides[currentSlide].description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleServicesClick}
                    className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-all transform hover:scale-105 shadow-2xl hover:shadow-red-600/25 flex items-center justify-center"
                  >
                    {carouselSlides[currentSlide].cta}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                  <button
                    onClick={handleContactClick}
                    className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105 backdrop-blur-sm bg-white/10"
                  >
                    Contáctanos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center space-x-4 bg-black/30 backdrop-blur-md rounded-full px-6 py-3">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="text-white hover:text-red-400 transition-colors p-2 hover:bg-white/10 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                      ? 'bg-red-600 scale-125'
                      : 'bg-white/50 hover:bg-white/75'
                    }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="text-white hover:text-red-400 transition-colors p-2 hover:bg-white/10 rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:text-red-400 transition-colors p-2 hover:bg-white/10 rounded-full ml-2"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Slide Counter */}
        <div className="absolute top-8 right-8 z-20">
          <div className="bg-black/30 backdrop-blur-md rounded-full px-4 py-2 text-white">
            <span className="text-sm font-medium">
              {currentSlide + 1} / {carouselSlides.length}
            </span>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-red-600 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-red-600 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-red-600 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Logros</h2>
            <p className="text-xl text-gray-600">Números que respaldan nuestra excelencia</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="text-center group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="bg-red-50 border-2 border-red-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-100 group-hover:border-red-200 transition-all transform group-hover:scale-110 group-hover:rotate-6 duration-500">
                  <div className="text-red-600 group-hover:scale-110 transition-transform duration-300">
                    {achievement.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold text-red-600 mb-2 counter group-hover:scale-110 transition-transform duration-300">
                  {achievement.number}
                </div>
                <div className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors duration-300">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Servicios Destacados</h2>
            <p className="text-xl text-gray-600">Soluciones integrales de seguridad para cada necesidad</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-12 h-12" />,
                title: "Vigilancia 24/7",
                description: "Monitoreo continuo con personal especializado y tecnología avanzada",
                color: "from-red-500 to-red-600",
                action: handleVigilanciaClick
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: "Protección Personal",
                description: "Escolta profesional y protección VIP para ejecutivos y personalidades",
                color: "from-blue-500 to-blue-600",
                action: handleProteccionClick
              },
              {
                icon: <Star className="w-12 h-12" />,
                title: "Consultoría Experta",
                description: "Análisis de riesgos y estrategias personalizadas de seguridad",
                color: "from-purple-500 to-purple-600",
                action: handleConsultoriaClick
              }
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 group cursor-pointer"
                onClick={service.action}
              >
                <div className={`bg-gradient-to-r ${service.color} rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                  <div className="text-white">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105">
                  Conocer Más
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Últimas Noticias</h2>
            <p className="text-xl text-gray-600">Mantente informado sobre nuestras novedades</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {news.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 cursor-pointer group"
                onClick={() => handleNewsClick(item)}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(item.date).toLocaleDateString('es-ES')}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {item.summary}
                  </p>
                  <button className="text-red-600 font-semibold hover:text-red-700 transition-colors flex items-center text-sm group-hover:translate-x-2 transition-transform duration-300">
                    Leer más <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleVerTodasNoticias}
              className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Ver Todas las Noticias
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-red-700 to-red-800 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">¿Listo para Proteger lo que Importa?</h2>
          <p className="text-xl text-red-100 mb-8">
            Contáctanos hoy mismo para una consulta gratuita y descubre cómo podemos ayudarte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCallClick}
              className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl hover:shadow-white/25 flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Consulta Gratuita
            </button>
            <button
              onClick={handleServicesClick}
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-red-600 transition-all transform hover:scale-105 backdrop-blur-sm bg-white/10"
            >
              Ver Servicios
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;