// src/hooks/useReservationManagement.ts
import { useState, useMemo, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { emailService } from '../services/emailService';

export interface Reservation {
  id: number;
  usuarioId: string;
  usuarioNombre: string;
  usuarioEmail: string;
  habitacionId: number;
  tipoHabitacion: string;
  fechaEntrada: string;
  fechaSalida: string;
  precioTotal: number;
  estadoBD: string;
  estadoVisual: 'Pasada' | 'Activa' | 'Pendiente' | 'Cancelada';
}

export const useReservationManagement = () => {
  const [reservas, setReservas] = useState<Reservation[]>([]);
  const [cargando, setCargando] = useState(true);
  const [filtros, setFiltros] = useState({ email: '', estado: '', tipo: '' }); 

  const [reservaSeleccionada, setReservaSeleccionada] = useState<Reservation | null>(null);
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [procesando, setProcesando] = useState(false);

  const cargarReservas = async () => {
    setCargando(true);
    try {
      // LLAMADA ULTRA LIMPIA A TU NUEVA FUNCIÓN RPC
      const { data, error } = await supabase.rpc('obtener_reservas_completas');

      if (error) throw error;

      if (data) {
        const hoy = new Date().toISOString().split('T')[0];

        const reservasFormateadas: Reservation[] = data.map((res: any) => {
          let estadoVis: 'Pasada' | 'Activa' | 'Pendiente' | 'Cancelada' = 'Pendiente';

          if (res.estado === 'cancelada') {
            estadoVis = 'Cancelada';
          } else if (res.fecha_salida < hoy) {
            estadoVis = 'Pasada';
          } else if (res.fecha_entrada <= hoy && res.fecha_salida >= hoy) {
            estadoVis = 'Activa';
          } else if (res.fecha_entrada > hoy) {
            estadoVis = 'Pendiente';
          }

          return {
            id: res.id,
            usuarioId: res.usuario_id,
            usuarioNombre: res.nombre_cliente, // Ya viene limpio desde la DB
            usuarioEmail: res.email_cliente,   // Ya viene limpio desde la DB
            habitacionId: res.habitacion_id,
            tipoHabitacion: res.tipo_habitacion, // Ya viene limpio desde la DB
            fechaEntrada: res.fecha_entrada,
            fechaSalida: res.fecha_salida,
            precioTotal: Number(res.precio_total),
            estadoBD: res.estado,
            estadoVisual: estadoVis
          };
        });

        setReservas(reservasFormateadas);
      }
    } catch (error) {
      console.error("Error cargando reservas:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  const reservasFiltradas = useMemo(() => {
    return reservas.filter((res) => {
      const matchEmail = res.usuarioEmail.toLowerCase().includes(filtros.email.toLowerCase());
      const matchEstado = filtros.estado === '' || res.estadoVisual === filtros.estado;
      const matchTipo = filtros.tipo === '' || 
        (filtros.tipo === 'salon_eventos' 
          ? res.tipoHabitacion === 'salon_eventos' 
          : res.tipoHabitacion !== 'salon_eventos'); 

      return matchEmail && matchEstado && matchTipo;
    });
  }, [reservas, filtros]);

  const seleccionarParaCancelar = (reserva: Reservation) => {
    setReservaSeleccionada(reserva);
    
    const espacioStr = reserva.tipoHabitacion === 'salon_eventos' ? 'del Salón de Eventos' : 'de su habitación';
    
    setAsunto(`Cancelación de su Reserva #${reserva.id} - Hotel Leto`);
    setMensaje(
      `Estimado/a ${reserva.usuarioNombre},\n\n` +
      `Lamentamos informarle que su reserva ${espacioStr} ` +
      `con fecha de entrada el ${reserva.fechaEntrada} ha sido cancelada por motivos operacionales.\n\n` +
      `El importe total de ${reserva.precioTotal}€ ha sido reembolsado íntegramente en su cuenta.\n\n` +
      `Disculpe las molestias.\nAtentamente, la dirección de Hotel Leto.`
    );
  };

  const enviarAvisoYCancelar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservaSeleccionada) return;
    if (!asunto || !mensaje) return alert("Completa el asunto y el cuerpo del mensaje.");

    setProcesando(true);
    try {
      await emailService.enviarMensajeInformativo(reservaSeleccionada.usuarioEmail, asunto, mensaje);

      const { error } = await supabase
        .from('reservas')
        .update({ estado: 'cancelada' })
        .eq('id', reservaSeleccionada.id);

      if (error) throw error;

      alert(`Reserva #${reservaSeleccionada.id} cancelada y cliente notificado con éxito.`);
      
      setReservaSeleccionada(null);
      setAsunto('');
      setMensaje('');
      cargarReservas();
    } catch (error) {
      console.error("Error procesando cancelación:", error);
      alert("Hubo un error al procesar la cancelación de la reserva.");
    } finally {
      setProcesando(false);
    }
  };

  return {
    cargando,
    reservas,
    reservasFiltradas,
    filtros,
    setFiltros,
    reservaSeleccionada,
    setReservaSeleccionada,
    asunto,
    setAsunto,
    mensaje,
    setMensaje,
    procesando,
    seleccionarParaCancelar,
    enviarAvisoYCancelar
  };
};