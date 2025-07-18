import React, { useState, useEffect } from 'react';
import { User, Camera, Shield, Settings, FileText, BarChart3, Bell, Download, Upload, X, Check, Eye, EyeOff, Smartphone, Globe, Moon, Sun, Monitor, Volume2, VolumeX, LogOut, Trash2, Edit3, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import SecurityDashboard from '../components/SecurityDashboard';
import PushNotifications from '../components/PushNotifications';
import MobileApp from '../components/MobileApp';
import FilePreviewSection from '../components/FilePreviewSection';
import { database } from '../utils/database';
import { userDashboardSystem } from '../utils/userDashboardSystem';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userStats, setUserStats] = useState<any>(null);

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    emailNotifications: true,
    smsNotifications: false,
    loginAlerts: true,
    sessionTimeout: '30',
    passwordExpiry: '90'
  });

  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    language: 'es',
    timezone: 'Europe/Madrid',
    theme: 'light',
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    soundEnabled: true,
    autoLogout: '60'
  });

  useEffect(() => {
    document.title = 'Mi Perfil - SegurMax Security';
    if (user) {
      // Cargar imagen de perfil guardada
      const savedImage = database.getProfileImage(user.id);
      if (savedImage) {
        setProfileImage(savedImage);
      }
      
      // Cargar estadísticas del usuario
      const dashboard = userDashboardSystem.getUserDashboard(user.id);
      if (dashboard) {
        setUserStats({
          totalPurchases: dashboard.metrics.totalPurchases,
          totalSpent: dashboard.metrics.totalSpent,
          activeServices: dashboard.metrics.activeServices,
          accountAge: Math.floor((new Date().getTime() - new Date(dashboard.createdAt).getTime()) / (1000 * 60 * 60 * 24)),
          lastAccess: dashboard.lastAccess
        });
      }
    }
  }, [user]);

  // Apply theme changes
  useEffect(() => {
    const body = document.body;
    body.classList.remove('dark');
    
    if (generalSettings.theme === 'dark') {
      body.classList.add('dark');
    } else if (generalSettings.theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        body.classList.add('dark');
      }
    }
  }, [generalSettings.theme]);

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'documents', name: 'Documentos', icon: <FileText className="w-5 h-5" /> },
    { id: 'notifications', name: 'Notificaciones', icon: <Bell className="w-5 h-5" /> },
    { id: 'mobile', name: 'App Móvil', icon: <Smartphone className="w-5 h-5" /> },
    { id: 'security', name: 'Seguridad', icon: <Shield className="w-5 h-5" /> },
    { id: 'settings', name: 'Configuración', icon: <Settings className="w-5 h-5" /> }
  ];

  const documents = [
    {
      id: 1,
      name: "Manual de Seguridad Empresarial",
      type: "PDF",
      size: "2.4 MB",
      pages: 45,
      version: "v3.2",
      date: "2024-01-15",
      category: "Manual",
      description: "Guía completa de protocolos de seguridad para empresas",
      url: "#"
    },
    {
      id: 2,
      name: "Certificaciones ISO",
      type: "PDF",
      size: "1.8 MB",
      pages: 12,
      version: "v1.0",
      date: "2024-01-10",
      category: "Certificación",
      description: "Documentos oficiales de certificaciones ISO 9001 y 27001",
      url: "#"
    },
    {
      id: 3,
      name: "Reporte Mensual de Seguridad",
      type: "PDF",
      size: "3.1 MB",
      pages: 28,
      version: "v1.1",
      date: "2024-01-20",
      category: "Reporte",
      description: "Análisis detallado de incidentes y métricas del mes",
      url: "#"
    },
    {
      id: 4,
      name: "Protocolo de Emergencias",
      type: "PDF",
      size: "1.2 MB",
      pages: 18,
      version: "v2.0",
      date: "2024-01-08",
      category: "Protocolo",
      description: "Procedimientos de actuación en situaciones de emergencia",
      url: "#"
    },
    {
      id: 5,
      name: "Guía de Tecnología de Seguridad",
      type: "PDF",
      size: "4.2 MB",
      pages: 67,
      version: "v1.5",
      date: "2024-01-12",
      category: "Técnico",
      description: "Manual técnico de sistemas y equipos de seguridad",
      url: "#"
    },
    {
      id: 6,
      name: "Contrato de Servicios",
      type: "PDF",
      size: "0.8 MB",
      pages: 8,
      version: "v1.0",
      date: "2024-01-05",
      category: "Legal",
      description: "Términos y condiciones del contrato de servicios",
      url: "#"
    }
  ];

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido');
        return;
      }
      
      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen debe ser menor a 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setSelectedPhoto(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfilePhoto = () => {
    if (selectedPhoto && user) {
      // Guardar en la base de datos
      database.saveProfileImage(user.id, selectedPhoto);
      setProfileImage(selectedPhoto);
      setIsPhotoModalOpen(false);
      setSelectedPhoto(null);
      
      // Mostrar notificación de éxito
      showSuccessNotification('Foto de perfil actualizada exitosamente');
    }
  };

  const showSuccessNotification = (message: string) => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 animate-slide-in-right';
    notification.innerHTML = `
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
        ${message}
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  };

  const handleNameEdit = () => {
    if (isEditingName && newName.trim() && user) {
      // Actualizar el nombre en el contexto de autenticación
      const updatedUser = { ...user, name: newName.trim() };
      
      // Guardar en la base de datos
      database.saveUser({
        id: user.id,
        name: newName.trim(),
        email: user.email,
        profileImage: profileImage || undefined,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      // Actualizar localStorage para persistencia
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Forzar actualización del contexto
      window.location.reload();
      
      setIsEditingName(false);
      showSuccessNotification('Nombre actualizado exitosamente');
    } else {
      setIsEditingName(!isEditingName);
      setNewName(user?.name || '');
    }
  };

  const downloadDocument = (doc: any) => {
    // Simular descarga
    const link = document.createElement('a');
    link.href = doc.url;
    link.download = doc.name;
    link.click();
    showSuccessNotification(`${doc.name} descargado exitosamente`);
  };

  const downloadAllDocuments = () => {
    documents.forEach(doc => downloadDocument(doc));
    showSuccessNotification('Todos los documentos descargados');
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Manual': 'bg-blue-100 text-blue-800',
      'Certificación': 'bg-green-100 text-green-800',
      'Reporte': 'bg-purple-100 text-purple-800',
      'Protocolo': 'bg-orange-100 text-orange-800',
      'Técnico': 'bg-indigo-100 text-indigo-800',
      'Legal': 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const hasServices = cart.length > 0; // Verificar si tiene servicios contratados

  const handleThemeChange = (newTheme: string) => {
    setGeneralSettings(prev => ({ ...prev, theme: newTheme }));
    showSuccessNotification(`Tema cambiado a ${newTheme === 'light' ? 'claro' : newTheme === 'dark' ? 'oscuro' : 'automático'}`);
  };

  const handleSecurityToggle = (setting: string) => {
    setSecuritySettings(prev => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }));
    showSuccessNotification('Configuración de seguridad actualizada');
  };

  const handleGeneralToggle = (setting: string) => {
    setGeneralSettings(prev => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }));
    showSuccessNotification('Configuración actualizada');
  };

  if (!user) {
    return (
      <div className="pt-16 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceso Requerido</h2>
          <p className="text-gray-600">Debes iniciar sesión para ver tu perfil</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-24 transition-colors duration-300">
              {/* Profile Header */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden transition-colors duration-300">
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt="Perfil" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-red-600" />
                    )}
                  </div>
                  <button
                    onClick={() => setIsPhotoModalOpen(true)}
                    className="absolute bottom-0 right-0 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-all transform hover:scale-110 animate-pulse-glow"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {isEditingName ? (
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="text-xl font-bold text-gray-900 dark:text-white bg-transparent border-b-2 border-red-600 focus:outline-none text-center dark:border-red-400 transition-colors duration-300"
                      onKeyPress={(e) => e.key === 'Enter' && handleNameEdit()}
                    />
                  ) : (
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">{user.name}</h2>
                  )}
                  <button
                    onClick={handleNameEdit}
                    className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all transform hover:scale-110"
                  >
                    {isEditingName ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                  </button>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">{user.email}</p>
                <div className="mt-3">
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm transition-colors duration-300">
                    {user.isNewUser ? 'Usuario Nuevo' : 'Cliente Activo'}
                  </span>
                </div>
                
                {/* User Stats */}
                {userStats && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-red-600">{userStats.totalPurchases}</div>
                        <div className="text-gray-600 dark:text-gray-400">Compras</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-red-600">€{userStats.totalSpent}</div>
                        <div className="text-gray-600 dark:text-gray-400">Invertido</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-red-600">{userStats.activeServices}</div>
                        <div className="text-gray-600 dark:text-gray-400">Servicios</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-red-600">{userStats.accountAge}</div>
                        <div className="text-gray-600 dark:text-gray-400">Días</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all transform hover:scale-105 ${
                      activeTab === tab.id
                        ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-700 animate-scale-in'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>

              {/* Logout Button */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all transform hover:scale-105"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {hasServices || userStats?.totalPurchases > 0 ? (
                  <div className="animate-fade-in-up">
                    <SecurityDashboard />
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center transition-colors duration-300 animate-bounce-in">
                    <BarChart3 className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                      {user?.isNewUser ? 'Tu Dashboard Personal' : 'Dashboard de Seguridad'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
                      {user?.isNewUser 
                        ? 'Tu espacio personal está listo. Comienza contratando servicios para ver métricas detalladas.'
                        : 'Contrata un servicio para acceder a tu dashboard personalizado con métricas y análisis en tiempo real.'
                      }
                    </p>
                    <button
                      onClick={() => window.location.href = '/servicios'}
                      className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all transform hover:scale-105 animate-pulse-glow"
                    >
                      {user?.isNewUser ? 'Explorar Servicios' : 'Ver Servicios Disponibles'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-6 animate-fade-in-up">
                {/* Documents Header */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Documentos</h2>
                      <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Accede y descarga todos tus documentos de seguridad</p>
                    </div>
                    <button
                      onClick={downloadAllDocuments}
                      className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all transform hover:scale-105 flex items-center animate-pulse-glow"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Descargar Todos
                    </button>
                  </div>

                  {/* Documents Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {documents.map((doc, index) => (
                      <div 
                        key={doc.id} 
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md dark:hover:shadow-gray-900/50 transition-all transform hover:-translate-y-1 animate-scale-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-lg mr-4 transition-colors duration-300">
                              <FileText className="w-6 h-6 text-red-600 dark:text-red-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300">{doc.name}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(doc.category)}`}>
                                {doc.category}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => downloadDocument(doc)}
                            className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all transform hover:scale-110"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 transition-colors duration-300">{doc.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                          <div>
                            <span className="font-medium">Páginas:</span> {doc.pages}
                          </div>
                          <div>
                            <span className="font-medium">Tamaño:</span> {doc.size}
                          </div>
                          <div>
                            <span className="font-medium">Versión:</span> {doc.version}
                          </div>
                          <div>
                            <span className="font-medium">Fecha:</span> {new Date(doc.date).toLocaleDateString('es-ES')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* File Upload Section */}
                <div className="animate-slide-in-left">
                  <FilePreviewSection />
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="animate-fade-in-up">
                <PushNotifications />
              </div>
            )}

            {activeTab === 'mobile' && (
              <div className="animate-fade-in-up">
                <MobileApp />
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300 animate-fade-in-up">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center transition-colors duration-300">
                  <Shield className="w-6 h-6 mr-2" />
                  Configuración de Seguridad
                </h2>

                <div className="space-y-8">
                  {/* Two Factor Authentication */}
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-6 transition-colors duration-300">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Autenticación de Dos Factores</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Añade una capa extra de seguridad a tu cuenta</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">Recomendado para máxima protección</p>
                      </div>
                      <button
                        onClick={() => handleSecurityToggle('twoFactorEnabled')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all transform hover:scale-110 ${
                          securitySettings.twoFactorEnabled ? 'bg-red-600' : 'bg-gray-200 dark:bg-gray-600'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          securitySettings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>

                  {/* Login Alerts */}
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-6 transition-colors duration-300">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Alertas de Inicio de Sesión</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">Notificaciones por email</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">Recibe alertas cuando alguien acceda a tu cuenta</p>
                        </div>
                        <button
                          onClick={() => handleSecurityToggle('emailNotifications')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all transform hover:scale-110 ${
                            securitySettings.emailNotifications ? 'bg-red-600' : 'bg-gray-200 dark:bg-gray-600'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            securitySettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">Notificaciones por SMS</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">Recibe alertas por mensaje de texto</p>
                        </div>
                        <button
                          onClick={() => handleSecurityToggle('smsNotifications')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all transform hover:scale-110 ${
                            securitySettings.smsNotifications ? 'bg-red-600' : 'bg-gray-200 dark:bg-gray-600'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            securitySettings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Session Management */}
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-6 transition-colors duration-300">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Gestión de Sesiones</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                          Tiempo de inactividad (minutos)
                        </label>
                        <select
                          value={securitySettings.sessionTimeout}
                          onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                        >
                          <option value="15">15 minutos</option>
                          <option value="30">30 minutos</option>
                          <option value="60">1 hora</option>
                          <option value="120">2 horas</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                          Expiración de contraseña (días)
                        </label>
                        <select
                          value={securitySettings.passwordExpiry}
                          onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordExpiry: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                        >
                          <option value="30">30 días</option>
                          <option value="60">60 días</option>
                          <option value="90">90 días</option>
                          <option value="never">Nunca</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Active Sessions */}
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-6 transition-colors duration-300">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Sesiones Activas</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white transition-colors duration-300">Navegador actual</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">Chrome en Windows • Madrid, España</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">Última actividad: Ahora</p>
                        </div>
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs transition-colors duration-300">Activa</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white transition-colors duration-300">App Móvil</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">iPhone • Madrid, España</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">Última actividad: Hace 2 horas</p>
                        </div>
                        <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium transition-colors">
                          Cerrar
                        </button>
                      </div>
                    </div>
                    <button className="mt-4 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors">
                      Cerrar todas las sesiones
                    </button>
                  </div>

                  {/* Emergency Actions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Acciones de Emergencia</h3>
                    <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-4 transition-colors duration-300">
                      <p className="text-red-800 dark:text-red-200 mb-4 transition-colors duration-300">
                        Si sospechas que tu cuenta ha sido comprometida, puedes tomar estas acciones inmediatas:
                      </p>
                      <div className="space-y-2">
                        <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all transform hover:scale-105">
                          Cerrar todas las sesiones
                        </button>
                        <button className="w-full border border-red-600 dark:border-red-400 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-all transform hover:scale-105">
                          Cambiar contraseña
                        </button>
                        <button className="w-full border border-red-600 dark:border-red-400 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-all transform hover:scale-105">
                          Contactar soporte
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300 animate-fade-in-up">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center transition-colors duration-300">
                  <Settings className="w-6 h-6 mr-2" />
                  Configuración General
                </h2>

                <div className="space-y-8">
                  {/* Language & Region */}
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-6 transition-colors duration-300">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Idioma y Región</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                          Idioma
                        </label>
                        <select
                          value={generalSettings.language}
                          onChange={(e) => setGeneralSettings(prev => ({ ...prev, language: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                        >
                          <option value="es">Español</option>
                          <option value="en">English</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                          Zona Horaria
                        </label>
                        <select
                          value={generalSettings.timezone}
                          onChange={(e) => setGeneralSettings(prev => ({ ...prev, timezone: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                        >
                          <option value="Europe/Madrid">Madrid (GMT+1)</option>
                          <option value="Europe/London">Londres (GMT+0)</option>
                          <option value="America/New_York">Nueva York (GMT-5)</option>
                          <option value="America/Los_Angeles">Los Ángeles (GMT-8)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Theme */}
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-6 transition-colors duration-300">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Tema</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: 'light', name: 'Claro', icon: <Sun className="w-5 h-5" /> },
                        { id: 'dark', name: 'Oscuro', icon: <Moon className="w-5 h-5" /> },
                        { id: 'auto', name: 'Automático', icon: <Monitor className="w-5 h-5" /> }
                      ].map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => handleThemeChange(theme.id)}
                          className={`flex flex-col items-center p-4 border-2 rounded-lg transition-all transform hover:scale-105 ${
                            generalSettings.theme === theme.id
                              ? 'border-red-600 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 animate-pulse-glow'
                              : 'border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-500 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {theme.icon}
                          <span className="mt-2 text-sm font-medium">{theme.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notifications */}
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-6 transition-colors duration-300">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Notificaciones</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">Notificaciones por email</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">Recibe actualizaciones por correo electrónico</p>
                        </div>
                        <button
                          onClick={() => handleGeneralToggle('emailNotifications')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all transform hover:scale-110 ${
                            generalSettings.emailNotifications ? 'bg-red-600' : 'bg-gray-200 dark:bg-gray-600'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            generalSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">Notificaciones push</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">Recibe notificaciones en el navegador</p>
                        </div>
                        <button
                          onClick={() => handleGeneralToggle('pushNotifications')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all transform hover:scale-110 ${
                            generalSettings.pushNotifications ? 'bg-red-600' : 'bg-gray-200 dark:bg-gray-600'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            generalSettings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">Notificaciones SMS</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">Recibe alertas por mensaje de texto</p>
                        </div>
                        <button
                          onClick={() => handleGeneralToggle('smsNotifications')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all transform hover:scale-110 ${
                            generalSettings.smsNotifications ? 'bg-red-600' : 'bg-gray-200 dark:bg-gray-600'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            generalSettings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Sound & Session */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Sonido y Sesión</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">Sonidos de notificación</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">Reproducir sonidos para alertas</p>
                        </div>
                        <button
                          onClick={() => handleGeneralToggle('soundEnabled')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all transform hover:scale-110 ${
                            generalSettings.soundEnabled ? 'bg-red-600' : 'bg-gray-200 dark:bg-gray-600'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            generalSettings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                          Cierre automático de sesión (minutos)
                        </label>
                        <select
                          value={generalSettings.autoLogout}
                          onChange={(e) => setGeneralSettings(prev => ({ ...prev, autoLogout: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                        >
                          <option value="30">30 minutos</option>
                          <option value="60">1 hora</option>
                          <option value="120">2 horas</option>
                          <option value="never">Nunca</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Photo Upload Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 transition-colors duration-300 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Cambiar Foto de Perfil</h3>
              <button
                onClick={() => {
                  setIsPhotoModalOpen(false);
                  setSelectedPhoto(null);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Current Photo */}
              <div className="text-center">
                <div className="w-32 h-32 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden transition-colors duration-300">
                  {selectedPhoto ? (
                    <img 
                      src={selectedPhoto} 
                      alt="Vista previa" 
                      className="w-full h-full object-cover"
                    />
                  ) : profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Perfil actual" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">
                  {selectedPhoto ? 'Vista previa de la nueva foto' : 'Foto actual'}
                </p>
              </div>

              {/* Upload Button */}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="w-full bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all block"
                >
                  <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Seleccionar nueva foto</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">JPG, PNG o GIF (máx. 5MB)</p>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setIsPhotoModalOpen(false);
                    setSelectedPhoto(null);
                  }}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all transform hover:scale-105"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveProfilePhoto}
                  disabled={!selectedPhoto}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center animate-pulse-glow"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Guardar Foto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;