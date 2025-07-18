import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, Shield, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Cart: React.FC = () => {
  // Scroll automático al inicio al cargar la página
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const { cart, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      alert('Debes iniciar sesión para continuar con la compra');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="pt-16 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h1>
            <p className="text-xl text-gray-600 mb-8">
              Explora nuestros servicios de seguridad y encuentra la protección perfecta para ti.
            </p>
            <Link
              to="/servicios"
              className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-all transform hover:scale-105 inline-flex items-center"
            >
              Ver Servicios <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Carrito de Compras</h1>
          <p className="text-gray-600">
            {getTotalItems()} {getTotalItems() === 1 ? 'servicio' : 'servicios'} en tu carrito
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.serviceName}
                    </h3>
                    <p className="text-red-600 font-medium mb-2">Plan {item.planName}</p>
                    <p className="text-gray-600 text-sm mb-4">
                      S/{item.price} por {item.duration}
                    </p>
                    
                    {/* Features */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Incluye:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {item.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                        {item.features.length > 3 && (
                          <li className="text-gray-500">
                            +{item.features.length - 3} características más
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-4">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-red-600 hover:text-red-600 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-medium text-gray-900 w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-red-600 hover:text-red-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        S/{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Resumen del Pedido</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">S/{getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">IGV (10%)</span>
                  <span className="font-medium">S/{Math.round(getTotalPrice() * 0.10).toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-red-600">
                      S/{Math.round(getTotalPrice() * 1.10).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {!user && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center mb-2">
                    <Lock className="w-5 h-5 text-red-600 mr-2" />
                    <span className="font-medium text-red-800">Registro Requerido</span>
                  </div>
                  <p className="text-red-700 text-sm">
                    Debes crear una cuenta o iniciar sesión para continuar con tu compra.
                  </p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={!user}
                className={`w-full py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center ${
                  user
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {user ? (
                  <>
                    Proceder al Pago <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  'Inicia Sesión para Continuar'
                )}
              </button>

              {/* Security Features */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1" />
                    <span>Pago Seguro</span>
                  </div>
                  <div className="flex items-center">
                    <Lock className="w-4 h-4 mr-1" />
                    <span>SSL Encriptado</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                to="/servicios"
                className="block text-center bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;