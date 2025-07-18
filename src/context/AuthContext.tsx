import React, { createContext, useContext, useState, ReactNode } from 'react';
import { database } from '../utils/database';
import { userDashboardSystem } from '../utils/userDashboardSystem';

interface User {
  id: string;
  name: string;
  email: string;
  isNewUser?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // Simulación de login - en producción conectar con API
    const mockUser: User = {
      id: '1',
      name: 'Usuario Demo',
      email: email,
      isNewUser: false
    };
    
    // Guardar en base de datos
    database.saveUser({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    // Actualizar última actividad en el dashboard
    userDashboardSystem.updateLastAccess(mockUser.id);
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const register = (name: string, email: string, password: string) => {
    // Simulación de registro - en producción conectar con API
    const newUser: User = {
      id: Date.now().toString(),
      name: name,
      email: email,
      isNewUser: true // Marcar como nuevo usuario
    };
    
    // Guardar en base de datos
    database.saveUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    // Crear dashboard único para el nuevo usuario
    userDashboardSystem.createUserDashboard(newUser.id);
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      
      // Actualizar en base de datos
      database.saveUser({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Verificar si hay usuario guardado al cargar
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Si es un usuario existente, no es nuevo
      if (parsedUser.isNewUser === undefined) {
        parsedUser.isNewUser = false;
      }
      
      // Crear dashboard si no existe (para usuarios existentes)
      userDashboardSystem.createUserDashboard(parsedUser.id);
      userDashboardSystem.updateLastAccess(parsedUser.id);
      
      setUser(parsedUser);
    }
  }, []);

  const value = {
    user,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};