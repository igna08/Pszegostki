"use client";

import React, { useRef, useEffect, useState } from 'react';

// Iconos SVG personalizados
const Icons = {
  home: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  insurance: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  briefcase: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" strokeWidth={2}></rect>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  clipboard: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  cow: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" strokeWidth={2}></circle>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v6m0 6v6m9-9h-6m-6 0H3" />
    </svg>
  ),
  newspaper: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
  ),
  handshake: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
    </svg>
  ),
};

type Service = {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
};

interface ServiceCardProps {
  service: Service;
  icon: React.ReactNode;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, icon, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full max-w-xs bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div
          className={`p-4 rounded-2xl mb-4 transition-all duration-300 ${
            isHovered
              ? 'bg-blue-600 text-white scale-110'
              : 'bg-blue-50 text-blue-600'
          }`}
        >
          {icon}
        </div>
        <span className="text-xs font-bold text-gray-400 tracking-wider mb-2">
          #{service.id}
        </span>
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {service.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {service.description}
        </p>
      </div>
    </div>
  );
};

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight && rect.bottom > 0) {
          setHeaderVisible(true);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      id: '01',
      title: 'Asesoramiento Inmobiliario',
      description: 'Asesoramiento profesional personalizado para compra, venta y alquiler de propiedades.',
      icon: <Icons.home />
    },
    {
      id: '02',
      title: 'Negocios Inmobiliarios',
      description: 'Compra, venta y alquiler de inmuebles adaptados a tus necesidades.',
      icon: <Icons.briefcase />
    },
    {
      id: '03',
      title: 'Seguros Generales',
      description: 'La mejor oferta, variedad de planes y paquetes de seguros para cubrir todas sus necesidades.',
      icon: <Icons.insurance />
    },
    {
      id: '04',
      title: 'Tasaciones de Inmuebles',
      description: 'Valoraciones precisas y profesionales para toda operación inmobiliaria.',
      icon: <Icons.clipboard />
    },
    {
      id: '05',
      title: 'Consignaciones Ganaderas',
      description: 'Gestión y venta de ganado con asesoría especializada.',
      icon: <Icons.cow />
    },
    {
      id: '06',
      title: 'Publicaciones en "El Territorio"',
      description: 'Difunde tus propiedades en el principal medio regional de Misiones.',
      icon: <Icons.newspaper />
    },
    {
      id: '07',
      title: 'Asesoramiento Profesional',
      description: 'Asesoramiento profesional especializado para ventas e inmuebles.',
      icon: <Icons.handshake />
    },
  ];

  return (
    <section id="servicios" className="py-20 bg-gradient-to-b from-gray-50 to-white text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">NUESTROS SERVICIOS</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              Disponemos de la mejor oferta, variedad de planes y paquetes de seguros para cubrir todas sus necesidades.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nuestra empresa se encuentra comprometida para poder brindarle la mejor atención, y una calidad profesional en cada uno de nuestros rubros.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              icon={service.icon}
              index={index}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 italic">
            Los diferentes servicios que brindamos están diseñados para ofrecerte la mejor experiencia profesional.
          </p>
        </div>
      </div>
    </section>
  );
}