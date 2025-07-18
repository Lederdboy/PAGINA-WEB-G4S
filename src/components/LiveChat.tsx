import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Phone, Mail, Minimize2, Maximize2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent' | 'bot';
  timestamp: Date;
  agentName?: string;
}

const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [agentInfo, setAgentInfo] = useState({
    name: 'Ana Rodríguez',
    status: 'online',
    avatar: '👩‍💼'
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Mensaje de bienvenida
      const welcomeMessage: Message = {
        id: '1',
        text: user 
          ? `¡Hola ${user.name}! Soy Ana, tu asesora de seguridad. ¿En qué puedo ayudarte hoy?`
          : '¡Hola! Soy Ana, tu asesora de seguridad. ¿En qué puedo ayudarte hoy?',
        sender: 'agent',
        timestamp: new Date(),
        agentName: 'Ana Rodríguez'
      };
      setMessages([welcomeMessage]);
      setIsConnected(true);
    }
  }, [isOpen, user]);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simular respuesta del agente
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        'Entiendo tu consulta. Permíteme revisar la información más actualizada para ti.',
        'Excelente pregunta. Nuestros servicios de seguridad están diseñados específicamente para esa necesidad.',
        'Te puedo ayudar con eso. ¿Podrías darme más detalles sobre tu situación específica?',
        'Perfecto. Tenemos varias opciones que podrían ser ideales para ti. Te explico:',
        'Esa es una preocupación muy común. Te recomiendo nuestro servicio de...'
      ];

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'agent',
        timestamp: new Date(),
        agentName: 'Ana Rodríguez'
      };

      setMessages(prev => [...prev, agentMessage]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickResponses = [
    'Necesito información sobre precios',
    'Quiero contratar vigilancia 24/7',
    '¿Tienen servicio de emergencia?',
    'Consulta sobre sistemas de alarma'
  ];

  const handleQuickResponse = (response: string) => {
    setInputText(response);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-all transform hover:scale-110 z-50 animate-pulse"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 h-full flex flex-col">
        {/* Header */}
        <div className="bg-red-600 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-lg">
                {agentInfo.avatar}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-semibold">{agentInfo.name}</h3>
              <p className="text-red-100 text-sm">Asesora de Seguridad • En línea</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-red-100 hover:text-white transition-colors"
            >
              {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-red-100 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-red-600 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}>
                      {message.sender === 'agent' && (
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs font-medium text-red-600">{message.agentName}</span>
                        </div>
                      )}
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-red-200' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString('es-ES', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-900 border border-gray-200 px-4 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Quick Responses */}
            {messages.length <= 1 && (
              <div className="p-3 border-t border-gray-200 bg-white">
                <p className="text-xs text-gray-600 mb-2">Respuestas rápidas:</p>
                <div className="flex flex-wrap gap-2">
                  {quickResponses.map((response, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickResponse(response)}
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-red-100 hover:text-red-700 transition-colors"
                    >
                      {response}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-sm"
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputText.trim()}
                  className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              {/* Contact Options */}
              <div className="flex items-center justify-center space-x-4 mt-3 pt-3 border-t border-gray-100">
                <button className="flex items-center space-x-1 text-xs text-gray-600 hover:text-red-600 transition-colors">
                  <Phone className="w-3 h-3" />
                  <span>Llamar</span>
                </button>
                <button className="flex items-center space-x-1 text-xs text-gray-600 hover:text-red-600 transition-colors">
                  <Mail className="w-3 h-3" />
                  <span>Email</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LiveChat;