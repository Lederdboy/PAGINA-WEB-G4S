import React, { useState, useEffect } from 'react';
import { Bell, X, CheckCircle, AlertTriangle, Info, Shield, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface PushNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success' | 'security';
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  actionUrl?: string;
}

const PushNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<PushNotification[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [showSettings, setShowSettings] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Verificar soporte para notificaciones
    if ('Notification' in window) {
      setPermission(Notification.permission);
      setIsEnabled(Notification.permission === 'granted');
    }

    // Simular notificaciones en tiempo real
    if (user && isEnabled) {
      const interval = setInterval(() => {
        // Generar notificación aleatoria
        const notificationTypes = [
          {
            title: 'Sistema de Seguridad',
            message: 'Todos los sistemas funcionando correctamente',
            type: 'success' as const,
            priority: 'low' as const
          },
          {
            title: 'Alerta de Movimiento',
            message: 'Movimiento detectado en el sector norte',
            type: 'warning' as const,
            priority: 'medium' as const
          },
          {
            title: 'Mantenimiento Programado',
            message: 'Mantenimiento de cámaras programado para mañana',
            type: 'info' as const,
            priority: 'low' as const
          },
          {
            title: 'Emergencia de Seguridad',
            message: 'Activación de protocolo de emergencia',
            type: 'error' as const,
            priority: 'critical' as const
          }
        ];

        const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
        
        if (Math.random() < 0.3) { // 30% de probabilidad cada 30 segundos
          addNotification(randomNotification);
        }
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [user, isEnabled]);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setPermission(permission);
      setIsEnabled(permission === 'granted');
      
      if (permission === 'granted') {
        // Notificación de bienvenida
        addNotification({
          title: '¡Notificaciones Activadas!',
          message: 'Ahora recibirás alertas de seguridad en tiempo real',
          type: 'success',
          priority: 'medium'
        });
      }
    }
  };

  const addNotification = (notificationData: Omit<PushNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: PushNotification = {
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
      ...notificationData
    };

    setNotifications(prev => [newNotification, ...prev.slice(0, 9)]); // Mantener solo 10 notificaciones

    // Mostrar notificación del navegador si está habilitada
    if (isEnabled && 'Notification' in window) {
      const browserNotification = new Notification(newNotification.title, {
        body: newNotification.message,
        icon: '/favicon.svg',
        badge: '/favicon.svg',
        tag: newNotification.id,
        requireInteraction: newNotification.priority === 'critical',
        silent: newNotification.priority === 'low'
      });

      browserNotification.onclick = () => {
        window.focus();
        markAsRead(newNotification.id);
        browserNotification.close();
      };

      // Auto cerrar después de 5 segundos para notificaciones no críticas
      if (newNotification.priority !== 'critical') {
        setTimeout(() => {
          browserNotification.close();
        }, 5000);
      }
    }

    // Mostrar notificación in-app
    showInAppNotification(newNotification);
  };

  const showInAppNotification = (notification: PushNotification) => {
    const toast = document.createElement('div');
    toast.className = `fixed top-20 right-4 max-w-sm bg-white border-l-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 ${
      notification.type === 'error' ? 'border-red-500' :
      notification.type === 'warning' ? 'border-yellow-500' :
      notification.type === 'success' ? 'border-green-500' :
      'border-blue-500'
    }`;
    
    toast.innerHTML = `
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            ${getNotificationIcon(notification.type)}
          </div>
          <div class="ml-3 flex-1">
            <p class="text-sm font-medium text-gray-900">${notification.title}</p>
            <p class="text-sm text-gray-600 mt-1">${notification.message}</p>
          </div>
          <button class="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.parentElement.remove()">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(toast);

    // Animación de entrada
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 100);

    // Auto remover después de 5 segundos
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 5000);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'error': return '<svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>';
      case 'warning': return '<svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>';
      case 'success': return '<svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>';
      default: return '<svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>';
    }
  };

  const getIconComponent = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'security': return <Shield className="w-5 h-5 text-purple-600" />;
      default: return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-l-red-600 bg-red-50';
      case 'high': return 'border-l-orange-500 bg-orange-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!user) return null;

  return (
    <div className="relative">
      {/* Notification Settings */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Configuración de Notificaciones</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Notificaciones del navegador</span>
                <button
                  onClick={requestPermission}
                  disabled={permission === 'granted'}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    permission === 'granted'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {permission === 'granted' ? 'Activadas' : 'Activar'}
                </button>
              </div>
              
              <div className="text-sm text-gray-600">
                <p>Las notificaciones te mantendrán informado sobre:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Alertas de seguridad críticas</li>
                  <li>Estado de sistemas de monitoreo</li>
                  <li>Actualizaciones de servicios</li>
                  <li>Mantenimientos programados</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Panel */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Bell className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-900">Notificaciones Push</h3>
            {unreadCount > 0 && (
              <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSettings(true)}
              className="text-gray-400 hover:text-gray-600"
            >
              <Settings className="w-5 h-5" />
            </button>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Marcar todas como leídas
              </button>
            )}
          </div>
        </div>

        {!isEnabled && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-yellow-800 font-medium">Notificaciones desactivadas</p>
                <p className="text-yellow-700 text-sm">
                  Activa las notificaciones para recibir alertas de seguridad en tiempo real.
                </p>
              </div>
              <button
                onClick={requestPermission}
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700"
              >
                Activar
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No hay notificaciones recientes</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`border-l-4 rounded-lg p-4 ${getPriorityColor(notification.priority)} ${
                  !notification.read ? 'border-opacity-100' : 'border-opacity-50 opacity-75'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      {getIconComponent(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        )}
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          notification.priority === 'critical' ? 'bg-red-100 text-red-800' :
                          notification.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                          notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {notification.priority === 'critical' ? 'Crítico' :
                           notification.priority === 'high' ? 'Alto' :
                           notification.priority === 'medium' ? 'Medio' : 'Bajo'}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-500">
                        {notification.timestamp.toLocaleString('es-ES')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-green-600 hover:text-green-700 p-1"
                        title="Marcar como leída"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-red-600 hover:text-red-700 p-1"
                      title="Eliminar notificación"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PushNotifications;