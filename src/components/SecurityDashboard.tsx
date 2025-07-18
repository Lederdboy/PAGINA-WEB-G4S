import React, { useState, useEffect } from 'react';
import { Shield, Activity, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, Eye, Camera, Users, Clock, MapPin, Zap, BarChart3, Monitor, Wifi, Server, Database, Bell, Settings, RefreshCw, Download, Filter, Search, Calendar, ArrowUp, ArrowDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { userDashboardSystem, UserDashboard } from '../utils/userDashboardSystem';

interface SecurityMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color: string;
  description: string;
}

interface SecurityAlert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  location?: string;
  resolved: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface ActivityLog {
  id: string;
  action: string;
  user: string;
  timestamp: Date;
  location: string;
  status: 'success' | 'warning' | 'error';
  details?: string;
}

interface SystemStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'maintenance' | 'warning';
  uptime: string;
  lastCheck: Date;
  details: string;
}

const SecurityDashboard: React.FC = () => {
  const { user } = useAuth();
  const [userDashboard, setUserDashboard] = useState<UserDashboard | null>(null);
  const [metrics, setMetrics] = useState<SecurityMetric[]>([]);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatus[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [alertFilter, setAlertFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (user) {
      // Cargar dashboard específico del usuario
      const dashboard = userDashboardSystem.getUserDashboard(user.id);
      setUserDashboard(dashboard);
      
      // Si es un usuario nuevo, generar datos iniciales
      if (dashboard && user.isNewUser) {
        userDashboardSystem.simulateUserActivity(user.id);
        userDashboardSystem.generateSimulatedMetrics(user.id);
      }
    }
    
    updateDashboardData();
    const interval = setInterval(updateDashboardData, 30000); // Actualizar cada 30 segundos
    return () => clearInterval(interval);
  }, [selectedTimeRange, user]);

  const updateDashboardData = () => {
    if (!user || !userDashboard) return;
    
    // Obtener métricas específicas del usuario
    const userMetrics = userDashboardSystem.getUserMetrics(user.id);
    const activeServices = userDashboardSystem.getUserActiveServices(user.id);
    const userAlerts = userDashboardSystem.getUserUnreadAlerts(user.id);
    
    // Generar métricas personalizadas basadas en los datos del usuario
    setMetrics([
      {
        id: '1',
        title: 'Sistemas Activos',
        value: userMetrics?.activeServices || 0,
        change: 2.5 + (Math.random() - 0.5) * 2,
        trend: 'up',
        icon: <Shield className="w-6 h-6" />,
        color: 'text-green-600',
        description: 'Servicios contratados activos'
      },
      {
        id: '2',
        title: 'Total Invertido',
        value: `€${userMetrics?.totalSpent || 0}`,
        change: -1.2 + (Math.random() - 0.5) * 2,
        trend: Math.random() > 0.5 ? 'up' : 'down',
        icon: <BarChart3 className="w-6 h-6" />,
        color: 'text-blue-600',
        description: 'Inversión total en seguridad'
      },
      {
        id: '3',
        title: 'Compras Realizadas',
        value: userMetrics?.totalPurchases || 0,
        change: 0 + (Math.random() - 0.5) * 1,
        trend: 'stable',
        icon: <CheckCircle className="w-6 h-6" />,
        color: 'text-purple-600',
        description: 'Transacciones completadas'
      },
      {
        id: '4',
        title: 'Alertas Pendientes',
        value: userAlerts.length,
        change: 1.8 + (Math.random() - 0.5) * 1,
        trend: userAlerts.length > 0 ? 'down' : 'up',
        icon: <Bell className="w-6 h-6" />,
        color: userAlerts.length > 0 ? 'text-red-600' : 'text-green-600',
        description: 'Notificaciones sin leer'
      },
      {
        id: '5',
        title: 'Días como Cliente',
        value: userDashboard ? Math.floor((new Date().getTime() - new Date(userDashboard.createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 0,
        change: -15.2 + (Math.random() - 0.5) * 5,
        trend: 'up',
        icon: <Clock className="w-6 h-6" />,
        color: 'text-orange-600',
        description: 'Antigüedad de la cuenta'
      },
      {
        id: '6',
        title: 'Estado de Cuenta',
        value: 'Activa',
        change: -50 + (Math.random() - 0.5) * 20,
        trend: 'up',
        icon: <Shield className="w-6 h-6" />,
        color: 'text-green-600',
        description: 'Estado actual de la cuenta'
      },
      {
        id: '7',
        title: 'Configuraciones',
        value: userDashboard?.settings.notifications ? 'Activas' : 'Inactivas',
        change: 0.2 + (Math.random() - 0.5) * 0.5,
        trend: 'stable',
        icon: <Settings className="w-6 h-6" />,
        color: 'text-indigo-600',
        description: 'Estado de notificaciones'
      },
      {
        id: '8',
        title: 'Última Actividad',
        value: userDashboard ? new Date(userDashboard.lastAccess).toLocaleDateString() : 'Hoy',
        change: 15.3 + (Math.random() - 0.5) * 10,
        trend: 'up',
        icon: <Activity className="w-6 h-6" />,
        color: 'text-cyan-600',
        description: 'Último acceso al sistema'
      }
    ]);

    // Convertir alertas del usuario al formato del dashboard
    const dashboardAlerts: SecurityAlert[] = userAlerts.map(alert => ({
      id: alert.id,
      type: alert.type,
      title: alert.title,
      message: alert.message,
      timestamp: new Date(alert.timestamp),
      location: 'Sistema Personal',
      resolved: alert.read,
      priority: alert.priority
    }));
    
    // Agregar alertas por defecto si no hay alertas del usuario
    if (dashboardAlerts.length === 0) {
      dashboardAlerts.push({
        id: 'default-1',
        type: 'info',
        title: 'Dashboard Personalizado',
        message: 'Tu dashboard personal está listo. Comienza agregando servicios para ver más información.',
        timestamp: new Date(),
        location: 'Sistema Personal',
        resolved: false,
        priority: 'low'
      });
    }
    
    setAlerts(dashboardAlerts);

    // Obtener actividades del usuario
    const userActivities = userDashboardSystem.getUserActivities(user.id, 10);
    const dashboardActivities: ActivityLog[] = userActivities.map(activity => ({
      id: activity.id,
      action: activity.action,
      user: user.name,
      timestamp: new Date(activity.timestamp),
      location: 'Dashboard Personal',
      status: activity.category === 'purchase' ? 'success' : 
              activity.category === 'security' ? 'warning' : 'success',
      details: activity.description
    }));
    
    setActivities(dashboardActivities);

    // Estado del sistema personalizado
    const personalSystemStatus: SystemStatus[] = [
      {
        id: '1',
        name: 'Dashboard Personal',
        status: 'online',
        uptime: '99.9%',
        lastCheck: new Date(),
        details: 'Sistema personal activo'
      },
      {
        id: '2',
        name: 'Servicios Contratados',
        status: 'online',
        uptime: activeServices.length > 0 ? '100%' : '0%',
        lastCheck: new Date(),
        details: `${activeServices.length} servicios activos`
      },
      {
        id: '3',
        name: 'Notificaciones',
        status: userDashboard?.settings.notifications ? 'online' : 'offline',
        uptime: '100%',
        lastCheck: new Date(),
        details: userDashboard?.settings.notifications ? 'Activas' : 'Desactivadas'
      },
      {
        id: '4',
        name: 'Sincronización',
        status: 'online',
        uptime: '99.9%',
        lastCheck: new Date(),
        details: 'Datos sincronizados'
      }
    ];
    
    setSystemStatus(personalSystemStatus);
  };

  const handleRefresh = async () => {
    if (!user) return;
    
    setIsRefreshing(true);
    
    // Registrar actividad de actualización
    userDashboardSystem.addActivity(user.id, {
      action: 'Dashboard Actualizado',
      description: 'Usuario actualizó manualmente el dashboard',
      category: 'system'
    });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateDashboardData();
    setIsRefreshing(false);
  };

  const exportData = () => {
    if (!user) return;
    
    // Exportar datos específicos del usuario
    const userData = userDashboardSystem.exportUserData(user.id);
    const userReport = userDashboardSystem.generateUserReport(user.id);
    
    const data = {
      userDashboard: userData,
      userReport,
      exportDate: new Date().toISOString(),
      userId: user.id,
      userName: user.name
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `segurmax-personal-dashboard-${user.id}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    // Registrar actividad de exportación
    userDashboardSystem.addActivity(user.id, {
      action: 'Datos Exportados',
      description: 'Usuario exportó sus datos del dashboard',
      category: 'system'
    });
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'info': return <Activity className="w-5 h-5 text-blue-600" />;
      default: return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const getAlertBgColor = (type: string, priority: string) => {
    const baseColor = {
      'error': 'bg-red-50 border-red-200',
      'warning': 'bg-yellow-50 border-yellow-200',
      'success': 'bg-green-50 border-green-200',
      'info': 'bg-blue-50 border-blue-200'
    }[type] || 'bg-gray-50 border-gray-200';

    if (priority === 'critical') {
      return 'bg-red-100 border-red-300 ring-2 ring-red-200';
    }
    return baseColor;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up' && change > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'down' || change < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Activity className="w-4 h-4 text-gray-600" />;
  };

  const getSystemStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'maintenance': return 'bg-blue-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = alertFilter === 'all' || alert.type === alertFilter;
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard de Seguridad</h2>
          <p className="text-gray-600">Monitoreo en tiempo real de todos los sistemas de seguridad</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
            >
              <option value="1h">Última hora</option>
              <option value="24h">Últimas 24 horas</option>
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
            </select>
            
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Actualizar</span>
            </button>
            
            <button
              onClick={exportData}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>En vivo</span>
            <span className="text-gray-400">•</span>
            <span>Actualizado: {new Date().toLocaleTimeString('es-ES')}</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div 
            key={metric.id} 
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gray-50 ${metric.color}`}>
                {metric.icon}
              </div>
              <div className="flex items-center space-x-1">
                {getTrendIcon(metric.trend, metric.change)}
                <span className={`text-sm font-medium ${
                  metric.change > 0 ? 'text-green-600' : metric.change < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</h3>
              <p className="text-gray-600 text-sm font-medium mb-1">{metric.title}</p>
              <p className="text-gray-500 text-xs">{metric.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Alerts Panel */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <h3 className="text-xl font-semibold text-gray-900">Alertas de Seguridad</h3>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                {alerts.filter(a => !a.resolved).length} Activas
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar alertas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>
              
              <select
                value={alertFilter}
                onChange={(e) => setAlertFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-600 focus:border-transparent"
              >
                <option value="all">Todas</option>
                <option value="error">Errores</option>
                <option value="warning">Advertencias</option>
                <option value="info">Información</option>
                <option value="success">Éxito</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredAlerts.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-gray-600">No hay alertas que coincidan con los filtros</p>
              </div>
            ) : (
              filteredAlerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`border rounded-xl p-4 transition-all hover:shadow-md ${getAlertBgColor(alert.type, alert.priority)} ${
                    alert.resolved ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            alert.priority === 'critical' ? 'bg-red-100 text-red-800' :
                            alert.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                            alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {alert.priority === 'critical' ? 'Crítico' :
                             alert.priority === 'high' ? 'Alto' :
                             alert.priority === 'medium' ? 'Medio' : 'Bajo'}
                          </span>
                        </div>
                        {alert.resolved && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            Resuelto
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 text-sm mb-3">{alert.message}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{alert.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{alert.timestamp.toLocaleString('es-ES')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Estado del Sistema</h3>
            <Settings className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {systemStatus.map((system) => (
              <div key={system.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getSystemStatusColor(system.status)}`}></div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{system.name}</p>
                    <p className="text-gray-600 text-xs">{system.details}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{system.uptime}</p>
                  <p className="text-xs text-gray-500">
                    {system.lastCheck.toLocaleTimeString('es-ES')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Registro de Actividad</h3>
          <button className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>Ver historial completo</span>
          </button>
        </div>
        
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {activities.map((activity, index) => (
            <div 
              key={activity.id} 
              className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="mt-1">
                {getStatusIcon(activity.status)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-gray-900 text-sm">{activity.action}</h4>
                  <span className="text-xs text-gray-500">
                    {activity.timestamp.toLocaleTimeString('es-ES')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span className="font-medium">{activity.user}</span>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{activity.location}</span>
                  </div>
                </div>
                {activity.details && (
                  <p className="text-xs text-gray-500 mt-1">{activity.details}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;