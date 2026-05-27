// src/hooks/useReservationEventRoom.ts
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { emailService } from "../services/emailService";

export const useReservationEventRoom = () => {
  const [formData, setFormData] = useState({ email: '', fecha: '', precio: '' });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  // Fecha Mínima (Mañana)
  const fechaMañana = new Date();
  fechaMañana.setDate(fechaMañana.getDate() + 1);
  const fechaMinima = fechaMañana.toISOString().split("T")[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReservarEvento = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje({ tipo: '', texto: '' });

    if (!formData.email || !formData.fecha || !formData.precio) {
      return setMensaje({ tipo: 'error', texto: 'Por favor, completa todos los campos obligatorios.' });
    }

    if (formData.fecha < fechaMinima) {
      return setMensaje({ 
        tipo: 'error', 
        texto: 'Las reservas del salón de eventos deben realizarse con al menos un día de antelación.' 
      });
    }

    setLoading(true);

    try {
      // 1. Un solo viaje a Supabase (Seguro y Rápido)
      const { error: dbError } = await supabase.rpc('crear_reserva_salon', {
        p_email: formData.email,
        p_fecha: formData.fecha,
        p_precio: parseFloat(formData.precio)
      });

      if (dbError) throw new Error(dbError.message);

      // 2. Enviar el correo usando tu servicio
      const asuntoCorreo = "Confirmación de Reserva - Salón de Eventos Leto";
      const contenidoCorreo = `Hola,

Te informamos de que se ha realizado con éxito una reserva del Salón de Eventos a tu nombre para el día ${formData.fecha}.

El precio acordado para esta reserva es de ${formData.precio}€.

Para cualquier consulta, comunícate con nosotros a contacto.hotelleto@gmail.com.

Un saludo,
El equipo de Hotel Leto.`;

      await emailService.enviarMensajeInformativo(
        formData.email, 
        asuntoCorreo, 
        contenidoCorreo
      );

      setMensaje({ tipo: 'exito', texto: `¡Reserva confirmada! Se ha enviado el resguardo al correo ${formData.email}.` });
      setFormData({ email: '', fecha: '', precio: '' });

    } catch (error: any) {
      setMensaje({ tipo: 'error', texto: error.message || 'Error técnico al procesar la reserva.' });
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleReservarEvento, loading, mensaje, fechaMinima };
};