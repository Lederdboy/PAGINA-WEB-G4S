// Sistema de Dashboard Único e Independiente por Usuario
interface UserDashboard {
  userId: string;
  createdAt: Date;
  lastAccess: Date;
  settings: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    notifications: boolean;
    autoBackup: boolean;
  };
  metrics: {
    totalPurchases: number;
    totalSpent: number;
    activeServices: number;
    lastPurchaseDate?: Date;
  };
  inventory: UserInventoryItem[];
  purchases: UserPurchase[];
  services: UserService[];
  alerts: UserAlert[];
  activities: UserActivity[];
}

interface UserInventoryItem {
  id: string;
  userId: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  purchaseDate: Date;
  status: 'active' | 'inactive' | 'expired';
  description: string;
  features: string[];
}

interface UserPurchase {
  id: string;
  userId: string;
  items: {
    serviceId: string;
    serviceName: string;
    planName: string;
    price: number;
    quantity: number;
    features: string[];
  }[];
  totalAmount: number;
  purchaseDate: Date;
  status: 'completed' | 'pending' | 'cancelled';
  paymentMethod: string;
}

interface UserService {
  id: string;
  userId: string;
  serviceName: string;
  planName: string;
  status: 'active' | 'inactive' | 'expired';
  startDate: Date;
  endDate?: Date;
  price: number;
  features: string[];
  metrics: {
    uptime: number;
    incidents: number;
    lastCheck: Date;
  };
}

interface UserAlert {
  id: string;
  userId: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface UserActivity {
  id: string;
  userId: string;
  action: string;
  description: string;
  timestamp: Date;
  category: 'purchase' | 'service' | 'system' | 'security';
  metadata?: any;
}

class UserDashboardSystem {
  private readonly DASHBOARDS_KEY = 'segurmax_user_dashboards';
  private readonly INVENTORY_KEY = 'segurmax_user_inventory';
  private readonly PURCHASES_KEY = 'segurmax_user_purchases';
  private readonly SERVICES_KEY = 'segurmax_user_services';
  private readonly ALERTS_KEY = 'segurmax_user_alerts';
  private readonly ACTIVITIES_KEY = 'segurmax_user_activities';

  // Crear dashboard único para nuevo usuario
  createUserDashboard(userId: string): UserDashboard {
    const existingDashboard = this.getUserDashboard(userId);
    if (existingDashboard) {
      return existingDashboard;
    }

    const newDashboard: UserDashboard = {
      userId,
      createdAt: new Date(),
      lastAccess: new Date(),
      settings: {
        theme: 'light',
        language: 'es',
        notifications: true,
        autoBackup: true
      },
      metrics: {
        totalPurchases: 0,
        totalSpent: 0,
        activeServices: 0
      },
      inventory: [],
      purchases: [],
      services: [],
      alerts: [
        {
          id: `welcome-${Date.now()}`,
          userId,
          type: 'success',
          title: '¡Bienvenido a SegurMax!',
          message: 'Tu dashboard personal ha sido creado exitosamente. Comienza explorando nuestros servicios de seguridad.',
          timestamp: new Date(),
          read: false,
          priority: 'medium'
        }
      ],
      activities: [
        {
          id: `init-${Date.now()}`,
          userId,
          action: 'Dashboard Creado',
          description: 'Dashboard personal inicializado correctamente',
          timestamp: new Date(),
          category: 'system'
        }
      ]
    };

    this.saveDashboard(newDashboard);
    return newDashboard;
  }

  // Obtener dashboard específico del usuario
  getUserDashboard(userId: string): UserDashboard | null {
    const dashboards = this.getAllDashboards();
    return dashboards.find(d => d.userId === userId) || null;
  }

  // Actualizar última actividad del usuario
  updateLastAccess(userId: string): void {
    const dashboard = this.getUserDashboard(userId);
    if (dashboard) {
      dashboard.lastAccess = new Date();
      this.saveDashboard(dashboard);
    }
  }

  // Agregar compra al historial del usuario
  addPurchase(userId: string, purchase: Omit<UserPurchase, 'id' | 'userId'>): void {
    const dashboard = this.getUserDashboard(userId);
    if (!dashboard) return;

    const newPurchase: UserPurchase = {
      id: `purchase-${Date.now()}`,
      userId,
      ...purchase
    };

    dashboard.purchases.unshift(newPurchase);
    dashboard.metrics.totalPurchases += 1;
    dashboard.metrics.totalSpent += purchase.totalAmount;
    dashboard.metrics.lastPurchaseDate = new Date();

    // Agregar servicios al inventario del usuario
    purchase.items.forEach(item => {
      this.addServiceToUser(userId, {
        serviceName: item.serviceName,
        planName: item.planName,
        price: item.price,
        features: item.features,
        status: 'active',
        startDate: new Date()
      });
    });

    // Agregar actividad
    this.addActivity(userId, {
      action: 'Compra Realizada',
      description: `Compra de €${purchase.totalAmount} completada exitosamente`,
      category: 'purchase',
      metadata: { purchaseId: newPurchase.id, amount: purchase.totalAmount }
    });

    // Agregar alerta de confirmación
    this.addAlert(userId, {
      type: 'success',
      title: 'Compra Completada',
      message: `Tu compra de €${purchase.totalAmount} ha sido procesada exitosamente`,
      priority: 'medium'
    });

    this.saveDashboard(dashboard);
  }

  // Agregar servicio al usuario
  addServiceToUser(userId: string, service: Omit<UserService, 'id' | 'userId' | 'metrics'>): void {
    const dashboard = this.getUserDashboard(userId);
    if (!dashboard) return;

    const newService: UserService = {
      id: `service-${Date.now()}`,
      userId,
      metrics: {
        uptime: 100,
        incidents: 0,
        lastCheck: new Date()
      },
      ...service
    };

    dashboard.services.push(newService);
    dashboard.metrics.activeServices = dashboard.services.filter(s => s.status === 'active').length;

    this.saveDashboard(dashboard);
  }

  // Agregar alerta al usuario
  addAlert(userId: string, alert: Omit<UserAlert, 'id' | 'userId' | 'timestamp' | 'read'>): void {
    const dashboard = this.getUserDashboard(userId);
    if (!dashboard) return;

    const newAlert: UserAlert = {
      id: `alert-${Date.now()}`,
      userId,
      timestamp: new Date(),
      read: false,
      ...alert
    };

    dashboard.alerts.unshift(newAlert);
    // Mantener solo las últimas 50 alertas
    dashboard.alerts = dashboard.alerts.slice(0, 50);

    this.saveDashboard(dashboard);
  }

  // Agregar actividad al usuario
  addActivity(userId: string, activity: Omit<UserActivity, 'id' | 'userId' | 'timestamp'>): void {
    const dashboard = this.getUserDashboard(userId);
    if (!dashboard) return;

    const newActivity: UserActivity = {
      id: `activity-${Date.now()}`,
      userId,
      timestamp: new Date(),
      ...activity
    };

    dashboard.activities.unshift(newActivity);
    // Mantener solo las últimas 100 actividades
    dashboard.activities = dashboard.activities.slice(0, 100);

    this.saveDashboard(dashboard);
  }

  // Obtener métricas del usuario
  getUserMetrics(userId: string): UserDashboard['metrics'] | null {
    const dashboard = this.getUserDashboard(userId);
    return dashboard?.metrics || null;
  }

  // Obtener servicios activos del usuario
  getUserActiveServices(userId: string): UserService[] {
    const dashboard = this.getUserDashboard(userId);
    return dashboard?.services.filter(s => s.status === 'active') || [];
  }

  // Obtener alertas no leídas del usuario
  getUserUnreadAlerts(userId: string): UserAlert[] {
    const dashboard = this.getUserDashboard(userId);
    return dashboard?.alerts.filter(a => !a.read) || [];
  }

  // Marcar alerta como leída
  markAlertAsRead(userId: string, alertId: string): void {
    const dashboard = this.getUserDashboard(userId);
    if (!dashboard) return;

    const alert = dashboard.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.read = true;
      this.saveDashboard(dashboard);
    }
  }

  // Actualizar configuraciones del usuario
  updateUserSettings(userId: string, settings: Partial<UserDashboard['settings']>): void {
    const dashboard = this.getUserDashboard(userId);
    if (!dashboard) return;

    dashboard.settings = { ...dashboard.settings, ...settings };
    this.saveDashboard(dashboard);
  }

  // Obtener historial de compras del usuario
  getUserPurchases(userId: string): UserPurchase[] {
    const dashboard = this.getUserDashboard(userId);
    return dashboard?.purchases || [];
  }

  // Obtener actividades recientes del usuario
  getUserActivities(userId: string, limit: number = 20): UserActivity[] {
    const dashboard = this.getUserDashboard(userId);
    return dashboard?.activities.slice(0, limit) || [];
  }

  // Limpiar datos del usuario (para testing o eliminación de cuenta)
  clearUserData(userId: string): void {
    const dashboards = this.getAllDashboards();
    const filteredDashboards = dashboards.filter(d => d.userId !== userId);
    localStorage.setItem(this.DASHBOARDS_KEY, JSON.stringify(filteredDashboards));
  }

  // Exportar datos del usuario
  exportUserData(userId: string): UserDashboard | null {
    return this.getUserDashboard(userId);
  }

  // Generar reporte del usuario
  generateUserReport(userId: string): any {
    const dashboard = this.getUserDashboard(userId);
    if (!dashboard) return null;

    return {
      userId,
      reportDate: new Date(),
      summary: {
        accountAge: Math.floor((new Date().getTime() - dashboard.createdAt.getTime()) / (1000 * 60 * 60 * 24)),
        totalPurchases: dashboard.metrics.totalPurchases,
        totalSpent: dashboard.metrics.totalSpent,
        activeServices: dashboard.metrics.activeServices,
        unreadAlerts: dashboard.alerts.filter(a => !a.read).length
      },
      recentActivity: dashboard.activities.slice(0, 10),
      activeServices: dashboard.services.filter(s => s.status === 'active'),
      recentPurchases: dashboard.purchases.slice(0, 5)
    };
  }

  // Métodos privados
  private getAllDashboards(): UserDashboard[] {
    const data = localStorage.getItem(this.DASHBOARDS_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveDashboard(dashboard: UserDashboard): void {
    const dashboards = this.getAllDashboards();
    const index = dashboards.findIndex(d => d.userId === dashboard.userId);
    
    if (index >= 0) {
      dashboards[index] = dashboard;
    } else {
      dashboards.push(dashboard);
    }
    
    localStorage.setItem(this.DASHBOARDS_KEY, JSON.stringify(dashboards));
  }

  // Simular datos de ejemplo para demostración
  simulateUserActivity(userId: string): void {
    const activities = [
      { action: 'Inicio de Sesión', description: 'Usuario accedió al sistema', category: 'system' as const },
      { action: 'Visualización de Servicios', description: 'Exploró la página de servicios', category: 'system' as const },
      { action: 'Consulta de Precios', description: 'Revisó precios de vigilancia 24/7', category: 'service' as const }
    ];

    activities.forEach(activity => {
      this.addActivity(userId, activity);
    });
  }

  // Generar métricas simuladas para demostración
  generateSimulatedMetrics(userId: string): void {
    const dashboard = this.getUserDashboard(userId);
    if (!dashboard) return;

    // Simular algunas métricas básicas
    dashboard.metrics = {
      ...dashboard.metrics,
      totalPurchases: Math.floor(Math.random() * 5),
      totalSpent: Math.floor(Math.random() * 2000),
      activeServices: Math.floor(Math.random() * 3)
    };

    this.saveDashboard(dashboard);
  }
}

export const userDashboardSystem = new UserDashboardSystem();
export type { UserDashboard, UserPurchase, UserService, UserAlert, UserActivity, UserInventoryItem };