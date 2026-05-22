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
  fechaEntrada: string;
  fechaSalida: string;
  precioTotal: number;
  estadoBD: string;      // 'pendiente', 'confirmada', 'cancelada'
  estadoVisual: 'Pasada' | 'Activa' | 'Pendiente' | 'Cancelada';
}

export const useReservationManagement = () => {
  // --- ESTADOS DE LA TABLA Y FILTROS ---
  const [reservas, setReservas] = useState<Reservation[]>([]);
  const [cargando, setCargando] = useState(true);
  const [filtros, setFiltros] = useState({ email: '', estado: '' });

  // --- ESTADOS DEL PANEL DE CANCELACIÓN ---
  const [reservaSeleccionada, setReservaSeleccionada] = useState<Reservation | null>(null);
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [procesando, setProcesando] = useState(false);

  // --- 1. CARGAR RESERVAS DESDE SUPABASE ---
  const cargarReservas = async () => {
    setCargando(true);
    try {
      const { data, error } = await supabase
        .from('reservas')
        .select(`
          id,
          usuario_id,
          habitacion_id,
          fecha_entrada,
          fecha_salida,
          precio_total,
          estado,
          profiles (nombre, apellidos, email)
        `)
        .order('fecha_entrada', { ascending: false });

      if (error) throw error;

      if (data) {
        const hoy = new Date().toISOString().split('T')[0];

        const reservasFormateadas: Reservation[] = data.map((res) => {
          // Extraemos los datos del perfil relacional de forma segura para TS
          const perfil = Array.isArray(res.profiles) ? res.profiles[0] : res.profiles;
          const emailCliente = (perfil as any)?.email || 'Sin email';
          const nombreCliente = perfil ? `${(perfil as any).nombre} ${(perfil as any).apellidos}`.trim() : 'Cliente Desconocido';

          // Calcular el estado visual dinámico solicitado
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
            usuarioNombre: nombreCliente,
            usuarioEmail: emailCliente,
            habitacionId: res.habitacion_id,
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

  // --- 2. LÓGICA DE FILTRADO EN TIEMPO REAL ---
  const reservasFiltradas = useMemo(() => {
    return reservas.filter((res) => {
      const matchEmail = res.usuarioEmail.toLowerCase().includes(filtros.email.toLowerCase());
      const matchEstado = filtros.estado === '' || res.estadoVisual === filtros.estado;
      return matchEmail && matchEstado;
    });
  }, [reservas, filtros]);

  // --- 3. SELECCIONAR RESERVA PARA CANCELAR ---
  const seleccionarParaCancelar = (reserva: Reservation) => {
    setReservaSeleccionada(reserva);
    setAsunto(`Cancelación de su Reserva #${reserva.id} - Hotel Leto`);
    setMensaje(
      `Estimado/a ${reserva.usuarioNombre},\n\n` +
      `Lamentamos informarle que su reserva con código #${reserva.id} para la habitación ${reserva.habitacionId} ` +
      `con fecha de entrada el ${reserva.fechaEntrada} ha sido cancelada por motivos operacionales.\n\n` +
      `El importe total de ${reserva.precioTotal}€ ha sido reembolsado íntegramente en su cuenta.\n\n` +
      `Disculpe las molestias.\nAtentamente, la dirección de Hotel Leto.`
    );
  };

  // --- 4. ENVIAR AVISO Y PROCESAR LA CANCELACIÓN ---
  const enviarAvisoYCancelar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservaSeleccionada) return;
    if (!asunto || !mensaje) return alert("Completa el asunto y el cuerpo del mensaje.");

    setProcesando(true);
    try {
      // Paso A: Enviar el correo electrónico mediante EmailJS usando tu servicio centralizado
      await emailService.enviarMensajeInformativo(reservaSeleccionada.usuarioEmail, asunto, mensaje);

      // Paso B: Cambiar el estado a 'cancelada' en Supabase respetando los constraints
      const { error } = await supabase
        .from('reservas')
        .update({ estado: 'cancelada' })
        .eq('id', reservaSeleccionada.id);

      if (error) throw error;

      alert(`Reserva #${reservaSeleccionada.id} cancelada y cliente notificado con éxito.`);
      
      // Limpiar estados y refrescar lista
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