import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { useEffect } from 'react';

const Contact: React.FC = () => {
  // Scroll automático al inicio al cargar la página
  // Esto asegura que el usuario siempre vea la parte superior de la página al navegar a "Contacto"
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  // Estado para manejar el formulario de contacto
  // Incluye campos para nombre, email, teléfono, asunto, mensaje y servicio de interés
  // También maneja el estado de envío para mostrar un spinner mientras se envía el mensaje
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Teléfonos",
      details: ["964-938-713", "987-654-321"],
      description: "Línea de emergencia 24/7"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["info@segurmax.com", "emergencias@segurmax.com"],
      description: "Respuesta en menos de 2 horas"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Oficina Principal",
      details: ["Av. Javier Prado Este 4200", "San Isidro, Lima - Perú"],
      description: "Lunes a Viernes: 8:00 - 20:00"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Horarios",
      details: ["Lun - Vie: 8:00 - 20:00", "Sáb - Dom: 9:00 - 18:00"],
      description: "Emergencias: 24/7"
    }
  ];

  const offices = [
    { 
      city: "San Isidro", 
      address: "Av. Javier Prado Este 4200", 
      phone: "964-938-713",
      district: "Lima - Perú"
    },
    { 
      city: "Lince", 
      address: "Av. Arequipa 2850", 
      phone: "987-654-321",
      district: "Lima - Perú"
    },
    { 
      city: "Miraflores", 
      address: "Av. Larco 1301", 
      phone: "964-938-713",
      district: "Lima - Perú"
    },
    { 
      city: "Barranco", 
      address: "Av. Grau 1456", 
      phone: "987-654-321",
      district: "Lima - Perú"
    }
  ];

  const services = [
    "Vigilancia 24/7",
    "Sistemas de Alarma",
    "Escolta Personal",
    "Consultoría en Seguridad",
    "Seguridad Eventos",
    "Otro"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulación de envío
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      service: ''
    });
    setIsSubmitting(false);
  };

  const handleCallClick = (phone: string) => {
    window.open(`tel:+51${phone.replace('-', '')}`, '_self');
  };

  const handleEmailClick = () => {
    window.open('mailto:info@segurmax.com', '_self');
  };

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Header */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Contáctanos</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos aquí para ayudarte. Ponte en contacto con nosotros para cualquier consulta sobre 
            nuestros servicios de seguridad o para solicitar una cotización personalizada.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="bg-red-50 border-2 border-red-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <div className="text-red-600">
                    {info.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{info.title}</h3>
                <div className="space-y-1 mb-3">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-700">{detail}</p>
                  ))}
                </div>
                <p className="text-gray-500 text-sm">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <MessageCircle className="w-8 h-8 mr-3 text-red-600" />
                  Envíanos un Mensaje
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-900 text-sm font-medium mb-2">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-900 text-sm font-medium mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                        placeholder="Tu número de teléfono"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-900 text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="nombre@gmail.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-900 text-sm font-medium mb-2">
                      Servicio de Interés
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    >
                      <option value="">Selecciona un servicio</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-900 text-sm font-medium mb-2">
                      Asunto *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="Asunto de tu consulta"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-900 text-sm font-medium mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="Describe tu consulta o necesidad de seguridad..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    ) : (
                      <Send className="w-5 h-5 mr-2" />
                    )}
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </button>
                </form>
              </div>
            </div>
            
            {/* Map */}
            <div>
              <div className="h-96 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7799.566730995418!2d-76.97076878351442!3d-12.195138667288022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105b9a26836ac01%3A0x4fd233c0d43ca479!2sUniversidad%20Tecnol%C3%B3gica%20del%20Per%C3%BA%20UTP!5e0!3m2!1ses-419!2spe!4v1752652181196!5m2!1ses-419!2spe"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación SegurMax Lima, Perú"
                ></iframe>
              </div>
              
              {/* Other Offices */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Nuestras Oficinas en Lima</h3>
                <div className="space-y-4">
                  {offices.map((office, index) => (
                    <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                      <h4 className="text-gray-900 font-medium">{office.city}</h4>
                      <p className="text-gray-600 text-sm">{office.address}</p>
                      <p className="text-gray-500 text-sm">{office.district}</p>
                      <button
                        onClick={() => handleCallClick(office.phone)}
                        className="text-red-600 text-sm hover:text-red-700 transition-colors"
                      >
                        {office.phone}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Emergencia?</h2>
            <p className="text-xl text-gray-600 mb-6">
              Para situaciones de emergencia, contáctanos inmediatamente
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleCallClick('964-938-713')}
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Llamar Emergencia: 964-938-713
              </button>
              <button
                onClick={handleEmailClick}
                className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center"
              >
                <Mail className="w-5 h-5 mr-2" />
                Correo de Emergencia
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;