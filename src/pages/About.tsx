import React from 'react';
import { Shield, Users, Award, Target, Clock, Globe, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

const About: React.FC = () => {
  // Scroll automático al inicio al cargar la página
  // Esto asegura que el usuario siempre vea la parte superior de la página al navegar a "Nosotros"
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const stats = [
    { icon: <Users className="w-8 h-8" />, number: "500+", label: "Clientes Satisfechos" },
    { icon: <Clock className="w-8 h-8" />, number: "10+", label: "Años de Experiencia" },
    { icon: <Globe className="w-8 h-8" />, number: "15", label: "Ciudades Cubiertas" },
    { icon: <Award className="w-8 h-8" />, number: "50+", label: "Certificaciones" }
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Seguridad Total",
      description: "Comprometidos con brindar la máxima protección a nuestros clientes mediante tecnología avanzada y personal altamente capacitado."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Precisión",
      description: "Cada operación se ejecuta con precisión milimétrica, siguiendo protocolos estrictos y procedimientos probados."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Equipo Profesional",
      description: "Nuestro equipo está formado por profesionales certificados con amplia experiencia en seguridad y protección."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excelencia",
      description: "Mantenemos los más altos estándares de calidad en todos nuestros servicios, superando las expectativas del cliente."
    }
  ];

  const team = [
    {
      name: "Josue Kalef Paulino Aguilar Rodriguez",
      position: "Desarrollador/ciberseguridad",
      experience: "1 año en desarrollo web y ciberseguridad",
      image: "./imagenes/kalef.png"
    },
    {
      name: "Miguel Angel",
      position: "Director de Gestion",
      experience: "1 año en gestión de seguridad",
      image: "./imagenes/icono.png"
    },
    {
      name: "Patrick",
      position: "Jefe de Tecnología",
      experience: "1 año en sistemas de seguridad",
      image: "./imagenes/icono.png"
    },
    {
      name: "Esther Neyra",
      position: "Coordinadora de Sistema",
      experience: "1 año en atención al cliente",
      image: "./imagenes/icono.png"
    }
  ];

  const certifications = [
    "ISO 9001:2015 - Gestión de Calidad",
    "ISO 27001:2013 - Seguridad de la Información",
    "ISO 45001:2018 - Seguridad y Salud Ocupacional",
    "Certificación Nacional de Seguridad Privada",
    "Licencia de Armas y Explosivos",
    "Certificación Internacional de Protección VIP"
  ];

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Sobre SegurMax</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Más de una década protegiendo lo que más importa. Somos líderes en servicios de seguridad integral 
              con presencia nacional y reconocimiento internacional.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-red-50 border-2 border-red-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <div className="text-red-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-red-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  SegurMax nació en 2014 con la visión de revolucionar el sector de la seguridad privada en España. 
                  Fundada por un equipo de expertos en seguridad con más de 20 años de experiencia combinada, 
                  nuestra empresa se estableció con el objetivo de ofrecer servicios de protección de clase mundial.
                </p>
                <p>
                  Desde nuestros humildes comienzos con un pequeño equipo de 5 personas, hemos crecido hasta 
                  convertirnos en una de las empresas de seguridad más respetadas del país, con más de 200 empleados 
                  y presencia en 15 ciudades principales.
                </p>
                <p>
                  Nuestro compromiso con la innovación nos ha llevado a integrar las últimas tecnologías en 
                  seguridad, desde sistemas de inteligencia artificial hasta drones de vigilancia, siempre 
                  manteniendo el factor humano como el corazón de nuestros servicios.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="./imagenes/maximaseguridad.jpg" 
                alt="Equipo SegurMax" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-6 rounded-lg shadow-lg">
                <h4 className="font-semibold text-lg">Certificados</h4>
                <p className="text-red-200">ISO 9001:2015</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Valores</h2>
            <p className="text-xl text-gray-600">Los principios que guían cada una de nuestras acciones</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="bg-red-50 border-2 border-red-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <div className="text-red-600">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nuestro Equipo</h2>
            <p className="text-xl text-gray-600">Profesionales dedicados a tu seguridad</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-red-600 font-medium mb-2">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Certificaciones y Licencias</h2>
            <p className="text-xl text-gray-600">Cumplimos con los más altos estándares de la industria</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center bg-white border border-gray-200 rounded-lg p-4">
                <CheckCircle className="w-6 h-6 text-red-600 mr-4 flex-shrink-0" />
                <span className="text-gray-900">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Misión</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Proporcionar servicios de seguridad integral de la más alta calidad, utilizando tecnología 
                avanzada y personal altamente capacitado para proteger a nuestros clientes, sus bienes y 
                su tranquilidad. Nos comprometemos a ser el socio de confianza en seguridad para empresas 
                y particulares.
              </p>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Visión</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Ser la empresa líder en servicios de seguridad a nivel nacional e internacional, 
                reconocida por nuestra innovación, profesionalismo y compromiso con la excelencia. 
                Aspiramos a establecer nuevos estándares en la industria de la seguridad privada.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;