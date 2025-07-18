import React, { useState } from 'react';
import { Smartphone, Download, Apple, Play, QrCode, Star, Shield, Camera, Bell, MapPin, Users, Lock, Zap, Monitor, BarChart3, Eye, Settings, Activity } from 'lucide-react';

const MobileApp: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<'ios' | 'android'>('ios');
  const [showQR, setShowQR] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState<'ios' | 'android'>('ios');

  const appFeatures = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Monitoreo en Tiempo Real',
      description: 'Visualiza el estado de todos tus sistemas de seguridad desde cualquier lugar'
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: 'Cámaras en Vivo',
      description: 'Accede a las transmisiones en vivo de todas tus cámaras de seguridad'
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: 'Alertas Instantáneas',
      description: 'Recibe notificaciones push inmediatas sobre cualquier incidente'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Geolocalización',
      description: 'Rastrea la ubicación de tu personal de seguridad en tiempo real'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Comunicación Directa',
      description: 'Chat directo con tu equipo de seguridad y centro de control'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Control de Acceso',
      description: 'Gestiona permisos y controla accesos remotamente'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Respuesta Rápida',
      description: 'Botón de pánico para emergencias con respuesta inmediata'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Dashboard Móvil',
      description: 'Accede a métricas y análisis completos desde tu dispositivo móvil'
    }
  ];

  const appStats = [
    { label: 'Descargas', value: '50K+' },
    { label: 'Calificación', value: '4.8', icon: <Star className="w-4 h-4 text-yellow-400 fill-current" /> },
    { label: 'Usuarios Activos', value: '25K+' },
    { label: 'Países', value: '15+' }
  ];

  const mobileScreenshots = {
    ios: [
      {
        title: 'Dashboard Principal',
        description: 'Vista general de todos tus sistemas',
        content: (
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">SegurMax</h3>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sistemas Activos</span>
                  <span className="text-xl font-bold">47</span>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cámaras Online</span>
                  <span className="text-xl font-bold">156</span>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Personal Activo</span>
                  <span className="text-xl font-bold">23</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="bg-green-500 rounded-lg p-3">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Todo Seguro</span>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: 'Cámaras en Vivo',
        description: 'Transmisiones en tiempo real',
        content: (
          <div className="bg-gray-900 text-white p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Cámaras</h3>
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs">EN VIVO</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-gray-800 rounded-lg p-2 aspect-video flex items-center justify-center">
                <Camera className="w-6 h-6 text-gray-400" />
              </div>
              <div className="bg-gray-800 rounded-lg p-2 aspect-video flex items-center justify-center">
                <Camera className="w-6 h-6 text-gray-400" />
              </div>
              <div className="bg-gray-800 rounded-lg p-2 aspect-video flex items-center justify-center">
                <Camera className="w-6 h-6 text-gray-400" />
              </div>
              <div className="bg-gray-800 rounded-lg p-2 aspect-video flex items-center justify-center">
                <Camera className="w-6 h-6 text-gray-400" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Entrada Principal</span>
                <span className="text-green-400">●</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Estacionamiento</span>
                <span className="text-green-400">●</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Oficinas</span>
                <span className="text-yellow-400">●</span>
              </div>
            </div>
          </div>
        )
      },
      {
        title: 'Alertas y Notificaciones',
        description: 'Gestión de alertas inteligente',
        content: (
          <div className="bg-white p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Alertas</h3>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">3 Nuevas</span>
            </div>
            <div className="space-y-3">
              <div className="border-l-4 border-red-500 bg-red-50 p-3 rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-red-800">Movimiento Detectado</span>
                  <span className="text-xs text-red-600">Hace 2 min</span>
                </div>
                <p className="text-xs text-red-700">Sector Norte - Cámara 07</p>
              </div>
              <div className="border-l-4 border-yellow-500 bg-yellow-50 p-3 rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-yellow-800">Mantenimiento</span>
                  <span className="text-xs text-yellow-600">Hace 1 hora</span>
                </div>
                <p className="text-xs text-yellow-700">Sistema actualizado</p>
              </div>
              <div className="border-l-4 border-green-500 bg-green-50 p-3 rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-green-800">Ronda Completada</span>
                  <span className="text-xs text-green-600">Hace 2 horas</span>
                </div>
                <p className="text-xs text-green-700">Perímetro verificado</p>
              </div>
            </div>
            <div className="mt-4">
              <button className="w-full bg-red-600 text-white py-2 rounded-lg text-sm font-medium">
                Ver Todas las Alertas
              </button>
            </div>
          </div>
        )
      },
      {
        title: 'Mapa de Ubicaciones',
        description: 'Seguimiento geográfico',
        content: (
          <div className="bg-green-100 p-4 h-full relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Ubicaciones</h3>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-600">En línea</span>
              </div>
            </div>
            <div className="bg-green-200 rounded-lg h-32 mb-4 relative flex items-center justify-center">
              <MapPin className="w-8 h-8 text-green-600" />
              <div className="absolute top-2 left-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 right-4 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span>Guardia 1</span>
                </div>
                <span className="text-gray-600">Entrada</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span>Guardia 2</span>
                </div>
                <span className="text-gray-600">Perímetro</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span>Patrulla</span>
                </div>
                <span className="text-gray-600">Ronda</span>
              </div>
            </div>
          </div>
        )
      }
    ],
    android: [
      {
        title: 'Dashboard Material',
        description: 'Diseño Material Design',
        content: (
          <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white p-4 h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">SegurMax</h3>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Settings className="w-4 h-4" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/10 rounded-lg p-3">
                <BarChart3 className="w-6 h-6 mb-2" />
                <div className="text-2xl font-bold">47</div>
                <div className="text-xs opacity-80">Sistemas</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <Camera className="w-6 h-6 mb-2" />
                <div className="text-2xl font-bold">156</div>
                <div className="text-xs opacity-80">Cámaras</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <Users className="w-6 h-6 mb-2" />
                <div className="text-2xl font-bold">23</div>
                <div className="text-xs opacity-80">Personal</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <Activity className="w-6 h-6 mb-2" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-xs opacity-80">Uptime</div>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Estado General</span>
                <span className="bg-green-500 px-2 py-1 rounded text-xs">SEGURO</span>
              </div>
            </div>
          </div>
        )
      },
      {
        title: 'Vista de Cámaras',
        description: 'Interfaz Android optimizada',
        content: (
          <div className="bg-gray-100 p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Vigilancia</h3>
              <div className="bg-red-500 px-2 py-1 rounded text-white text-xs">LIVE</div>
            </div>
            <div className="bg-black rounded-lg mb-4 aspect-video flex items-center justify-center">
              <div className="text-center text-white">
                <Camera className="w-8 h-8 mx-auto mb-2" />
                <div className="text-sm">Cámara Principal</div>
                <div className="text-xs opacity-70">1920x1080 • 30fps</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-gray-300 rounded aspect-video flex items-center justify-center">
                <Camera className="w-4 h-4 text-gray-600" />
              </div>
              <div className="bg-gray-300 rounded aspect-video flex items-center justify-center">
                <Camera className="w-4 h-4 text-gray-600" />
              </div>
              <div className="bg-gray-300 rounded aspect-video flex items-center justify-center">
                <Camera className="w-4 h-4 text-gray-600" />
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-green-500 text-white py-2 rounded text-sm">
                Grabar
              </button>
              <button className="flex-1 bg-blue-500 text-white py-2 rounded text-sm">
                Captura
              </button>
            </div>
          </div>
        )
      },
      {
        title: 'Notificaciones Push',
        description: 'Sistema de alertas Android',
        content: (
          <div className="bg-white p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Notificaciones</h3>
              <Bell className="w-5 h-5 text-gray-600" />
            </div>
            <div className="space-y-3">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-red-800">Alerta de Seguridad</div>
                    <div className="text-sm text-red-600">Movimiento no autorizado detectado</div>
                    <div className="text-xs text-red-500 mt-1">Hace 3 minutos</div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-blue-800">Sistema Actualizado</div>
                    <div className="text-sm text-blue-600">Nuevas funciones disponibles</div>
                    <div className="text-xs text-blue-500 mt-1">Hace 1 hora</div>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-green-800">Ronda Completada</div>
                    <div className="text-sm text-green-600">Perímetro verificado correctamente</div>
                    <div className="text-xs text-green-500 mt-1">Hace 2 horas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: 'Control de Acceso',
        description: 'Gestión de permisos móvil',
        content: (
          <div className="bg-gray-50 p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Control Acceso</h3>
              <Lock className="w-5 h-5 text-gray-600" />
            </div>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 border">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Puerta Principal</div>
                    <div className="text-sm text-gray-600">Entrada principal del edificio</div>
                  </div>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Estacionamiento</div>
                    <div className="text-sm text-gray-600">Acceso vehicular</div>
                  </div>
                  <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3 border">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Oficinas VIP</div>
                    <div className="text-sm text-gray-600">Área restringida</div>
                  </div>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button className="w-full bg-red-600 text-white py-3 rounded-lg font-medium">
                Abrir Puerta Principal
              </button>
            </div>
          </div>
        )
      }
    ]
  };

  const generateQRCode = () => {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="white"/>
        <rect x="20" y="20" width="20" height="20" fill="black"/>
        <rect x="60" y="20" width="20" height="20" fill="black"/>
        <rect x="100" y="20" width="20" height="20" fill="black"/>
        <rect x="140" y="20" width="20" height="20" fill="black"/>
        <rect x="20" y="60" width="20" height="20" fill="black"/>
        <rect x="100" y="60" width="20" height="20" fill="black"/>
        <rect x="180" y="60" width="20" height="20" fill="black"/>
        <rect x="20" y="100" width="20" height="20" fill="black"/>
        <rect x="60" y="100" width="20" height="20" fill="black"/>
        <rect x="140" y="100" width="20" height="20" fill="black"/>
        <rect x="180" y="100" width="20" height="20" fill="black"/>
        <rect x="60" y="140" width="20" height="20" fill="black"/>
        <rect x="100" y="140" width="20" height="20" fill="black"/>
        <rect x="140" y="140" width="20" height="20" fill="black"/>
        <rect x="20" y="180" width="20" height="20" fill="black"/>
        <rect x="100" y="180" width="20" height="20" fill="black"/>
        <rect x="180" y="180" width="20" height="20" fill="black"/>
        <text x="100" y="195" text-anchor="middle" font-size="8" fill="black">SegurMax App</text>
      </svg>
    `)}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-600 p-4 rounded-2xl">
            <Smartphone className="w-12 h-12 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">App Móvil SegurMax</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Lleva el control total de tu seguridad en tu bolsillo. Monitorea, controla y responde desde cualquier lugar con nuestro dashboard móvil completo.
        </p>
      </div>

      {/* App Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {appStats.map((stat, index) => (
          <div key={index} className="text-center bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-center mb-2">
              <span className="text-2xl font-bold text-red-600">{stat.value}</span>
              {stat.icon && <span className="ml-1">{stat.icon}</span>}
            </div>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Mobile Dashboard Preview */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Dashboard Móvil Completo</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Accede a todas las funcionalidades de seguridad desde tu dispositivo móvil con una interfaz optimizada para iOS y Android.
          </p>
        </div>

        {/* Platform Selector */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setSelectedPhone('ios')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                selectedPhone === 'ios'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Apple className="w-5 h-5" />
              <span className="font-medium">iOS</span>
            </button>
            <button
              onClick={() => setSelectedPhone('android')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                selectedPhone === 'android'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Play className="w-5 h-5" />
              <span className="font-medium">Android</span>
            </button>
          </div>
        </div>

        {/* Mobile Screenshots */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mobileScreenshots[selectedPhone].map((screen, index) => (
            <div key={index} className="text-center">
              <div className="relative mx-auto mb-4" style={{ width: '200px', height: '400px' }}>
                {/* Phone Frame */}
                <div className={`absolute inset-0 rounded-3xl border-8 ${
                  selectedPhone === 'ios' 
                    ? 'border-gray-800 bg-black' 
                    : 'border-gray-700 bg-gray-800'
                }`}>
                  {/* Screen */}
                  <div className="absolute inset-2 rounded-2xl overflow-hidden bg-white">
                    {/* Status Bar */}
                    <div className={`h-6 flex items-center justify-between px-4 text-xs ${
                      selectedPhone === 'ios'
                        ? 'bg-black text-white'
                        : 'bg-gray-900 text-white'
                    }`}>
                      <span>9:41</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-2 border border-white rounded-sm">
                          <div className="w-3 h-1 bg-white rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="h-full pt-6 pb-8">
                      {screen.content}
                    </div>
                  </div>
                  
                  {/* Home Indicator (iOS) */}
                  {selectedPhone === 'ios' && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
              
              <h4 className="font-semibold text-gray-900 mb-2">{screen.title}</h4>
              <p className="text-sm text-gray-600">{screen.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Download Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">Descarga la App</h3>
          
          {/* Platform Selection */}
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedPlatform('ios')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
                selectedPlatform === 'ios'
                  ? 'border-red-600 bg-red-50 text-red-600'
                  : 'border-gray-300 text-gray-600 hover:border-red-300'
              }`}
            >
              <Apple className="w-5 h-5" />
              <span>iOS</span>
            </button>
            <button
              onClick={() => setSelectedPlatform('android')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
                selectedPlatform === 'android'
                  ? 'border-red-600 bg-red-50 text-red-600'
                  : 'border-gray-300 text-gray-600 hover:border-red-300'
              }`}
            >
              <Play className="w-5 h-5" />
              <span>Android</span>
            </button>
          </div>

          {/* Download Buttons */}
          <div className="space-y-4">
            <button className="w-full bg-black text-white px-6 py-4 rounded-lg flex items-center justify-center space-x-3 hover:bg-gray-800 transition-colors">
              {selectedPlatform === 'ios' ? <Apple className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              <div className="text-left">
                <p className="text-xs">Descargar en</p>
                <p className="text-lg font-semibold">
                  {selectedPlatform === 'ios' ? 'App Store' : 'Google Play'}
                </p>
              </div>
            </button>

            <button
              onClick={() => setShowQR(!showQR)}
              className="w-full border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-lg flex items-center justify-center space-x-3 hover:border-red-600 hover:text-red-600 transition-colors"
            >
              <QrCode className="w-6 h-6" />
              <span>Escanear código QR</span>
            </button>

            {showQR && (
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <img
                  src={generateQRCode()}
                  alt="QR Code para descargar la app"
                  className="w-48 h-48 mx-auto mb-4"
                />
                <p className="text-sm text-gray-600">
                  Escanea este código con tu teléfono para descargar la app
                </p>
              </div>
            )}
          </div>

          {/* System Requirements */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Requisitos del Sistema</h4>
            <div className="text-sm text-gray-600 space-y-1">
              {selectedPlatform === 'ios' ? (
                <>
                  <p>• iOS 12.0 o superior</p>
                  <p>• iPhone 6s o superior</p>
                  <p>• 50 MB de espacio libre</p>
                </>
              ) : (
                <>
                  <p>• Android 7.0 (API nivel 24) o superior</p>
                  <p>• 2 GB de RAM mínimo</p>
                  <p>• 50 MB de espacio libre</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">Características Principales</h3>
          
          <div className="space-y-4">
            {appFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="bg-red-50 p-3 rounded-lg text-red-600">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-gray-50 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Lo que dicen nuestros usuarios</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">5.0</span>
            </div>
            <p className="text-gray-700 mb-4">
              "El dashboard móvil es increíble. Puedo monitorear toda mi empresa desde cualquier lugar. Las notificaciones son instantáneas."
            </p>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                JM
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">Juan Martínez</p>
                <p className="text-sm text-gray-600">CEO, TechCorp</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">5.0</span>
            </div>
            <p className="text-gray-700 mb-4">
              "Interfaz muy intuitiva y funciones completas. El dashboard móvil tiene todo lo que necesito para gestionar la seguridad."
            </p>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                MR
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">María Rodríguez</p>
                <p className="text-sm text-gray-600">Directora, Hotel Plaza</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <Star className="w-4 h-4 text-gray-300" />
              </div>
              <span className="ml-2 text-sm text-gray-600">4.8</span>
            </div>
            <p className="text-gray-700 mb-4">
              "Excelente app para gestionar la seguridad. Las métricas en tiempo real y el control de acceso funcionan perfectamente."
            </p>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                AL
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">Antonio López</p>
                <p className="text-sm text-gray-600">Gerente, Centro Comercial</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-red-600 text-white rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-4">¿Listo para tener el control total?</h3>
        <p className="text-red-100 mb-6">
          Descarga la app SegurMax y lleva tu dashboard de seguridad contigo a donde vayas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
            <Download className="w-5 h-5 mr-2" />
            Descargar Ahora
          </button>
          <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">
            Ver Demo en Vivo
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileApp;