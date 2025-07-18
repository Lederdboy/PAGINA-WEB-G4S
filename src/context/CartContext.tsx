import React, { createContext, useContext, useState, ReactNode } from 'react';
import { userDashboardSystem } from '../utils/userDashboardSystem';
import { useAuth } from './AuthContext';

interface CartItem {
  id: string;
  serviceName: string;
  planName: string;
  price: number;
  duration: string;
  features: string[];
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { user } = useAuth();

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    
    // Registrar actividad en el dashboard del usuario
    if (user) {
      userDashboardSystem.addActivity(user.id, {
        action: 'Producto Agregado al Carrito',
        description: `${item.serviceName} - ${item.planName} agregado al carrito`,
        category: 'purchase'
      });
    }
  };

  const removeFromCart = (itemId: string) => {
    const removedItem = cart.find(item => item.id === itemId);
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    
    // Registrar actividad
    if (user && removedItem) {
      userDashboardSystem.addActivity(user.id, {
        action: 'Producto Removido del Carrito',
        description: `${removedItem.serviceName} removido del carrito`,
        category: 'purchase'
      });
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    // Registrar compra completada en el dashboard del usuario
    if (user && cart.length > 0) {
      const totalAmount = getTotalPrice() * 1.10; // Incluir IGV
      
      userDashboardSystem.addPurchase(user.id, {
        items: cart.map(item => ({
          serviceId: item.id,
          serviceName: item.serviceName,
          planName: item.planName,
          price: item.price,
          quantity: item.quantity,
          features: item.features
        })),
        totalAmount,
        purchaseDate: new Date(),
        status: 'completed',
        paymentMethod: 'Tarjeta de Crédito'
      });
    }
    
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};