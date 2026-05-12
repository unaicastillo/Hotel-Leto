import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Heading, Text } from '../ui/Typography';

export const RoomsSection = () => {
  const rooms = [
    {
      title: "Suite Imperial",
      desc: "El lujo romano en todo su esplendor. Cama king size, terraza privada y baño de mármol.",
      img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop"
    },
    {
      title: "Doble Augusta",
      desc: "Equilibrio perfecto entre espacio y comodidad para estancias relajantes.",
      img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop"
    },
    {
      title: "Superior Letoh",
      desc: "Diseño elegante, iluminación cálida y todos los detalles para una estancia superior.",
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 container-custom">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-2xl">
          <Heading level={2} variant="section">Habitaciones & Suites</Heading>
          <Text variant="lead" className="mb-0">
            Espacios diseñados para tu confort moderno en un alma de la antigua Roma. 
            Cada detalle pensado para un descanso perfecto.
          </Text>
        </div>
        <a href="#" className="link-action whitespace-nowrap dark:text-[var(--brand-yellow)]">
          Ver todas las opciones <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {rooms.map((room, idx) => (
          <div key={idx} className="room-card">
            <div className="room-img-wrapper">
              <img src={room.img} alt={room.title} className="room-img" />
            </div>
            <Heading level={3} variant="card">{room.title}</Heading>
            <Text variant="muted">{room.desc}</Text>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoomsSection;