import { useState, useMemo, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { emailService } from '../services/emailService';

export interface Room {
  id: number; 
  type: string; 
  status: 'Disponible' | 'Ocupada' | 'Fuera de Servicio';
}

export const useRoomManagement = () => {
  // --- ESTADOS DE LA TABLA Y FILTROS ---
  const [habitaciones, setHabitaciones] = useState<Room[]>([]);
  const [cargando, setCargando] = useState(true);
  const [filtros, setFiltros] = useState({ id: '', type: '', status: '' });

  // --- ESTADOS DEL PANEL DE GESTIÓN ---
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState<Room | null>(null);
  const [tipoBaja, setTipoBaja] = useState<'temporal' | 'indefinida'>('temporal');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  // --- ESTADOS DE CONFLICTOS Y CORREOS ---
  const [reservasAfectadas, setReservasAfectadas] = useState<any[]>([]);
  const [necesitaCorreo, setNecesitaCorreo] = useState(false);
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [procesando, setProcesando] = useState(false);

  // --- 1. CARGAR HABITACIONES (Excluyendo el Salón) ---
  const cargarHabitaciones = async () => {
    setCargando(true);
    const { data, error } = await supabase
      .from('habitaciones')
      .select('*')
      .neq('tipo', 'salon_eventos') // Excluimos el salón de eventos de esta vista
      .order('id', { ascending: true });

    if (error) {
      console.error("Error al cargar habitaciones:", error);
    } else if (data) {
      const habitacionesFormateadas: Room[] = data.map(h => ({
        id: h.id,
        type: h.tipo.charAt(0).toUpperCase() + h.tipo.slice(1), 
        status: h.disponible ? 'Disponible' : 'Fuera de Servicio'
      }));
      setHabitaciones(habitacionesFormateadas);
    }
    setCargando(false);
  };

  useEffect(() => {
    cargarHabitaciones();
  }, []);

  // --- FILTRADO (Solo por ID según la nueva vista) ---
  const habitacionesFiltradas = useMemo(() => {
    return habitaciones.filter(h => {
      // 1. Comprobar si coincide el ID
      const coincideId = h.id.toString().includes(filtros.id.trim());

      // 2. Si no hay tipo seleccionado, pasa el filtro de ID directo
      if (!filtros.type) return coincideId;

      // 3. Comprobar si coincide el tipo (normalizando mayúsculas/minúsculas)
      const tipoFiltro = filtros.type.toLowerCase();
      const tipoHabitacion = h.type.toLowerCase(); // Viene como 'Individual', 'Doble', 'Suite'

      const coincideTipo = 
        tipoHabitacion === tipoFiltro || 
        (tipoFiltro === 'simple' && tipoHabitacion === 'individual');

      return coincideId && coincideTipo;
    });
  }, [habitaciones, filtros]);

  // --- 2. VERIFICAR CONFLICTOS Y REUBICAR ---
  const verificarYDarDeBaja = async () => {
    if (!habitacionSeleccionada) return alert("Selecciona una habitación.");
    if (tipoBaja === 'temporal' && (!fechaInicio || !fechaFin)) return alert("Indica las fechas de baja.");

    setProcesando(true);
    try {
      // Fecha límite lejana si es indefinida
      const fInicio = tipoBaja === 'temporal' ? fechaInicio : new Date().toISOString().split('T')[0];
      const fFin = tipoBaja === 'temporal' ? fechaFin : '2099-12-31';

      // PASO A: Buscar reservas afectadas que no estén ya canceladas
      const { data: reservas, error } = await supabase
        .from('reservas')
        .select(`
          id, 
          fecha_entrada, 
          fecha_salida, 
          profiles (email)
        `)
        .eq('habitacion_id', habitacionSeleccionada.id)
        .neq('estado', 'cancelada')
        .lte('fecha_entrada', fFin)
        .gte('fecha_salida', fInicio);

      if (error) throw error;

      if (!reservas || reservas.length === 0) {
        // No hay conflictos: Damos de baja la habitación
        await supabase.from('habitaciones').update({ disponible: false }).eq('id', habitacionSeleccionada.id);
        alert(`Habitación ${habitacionSeleccionada.id} dada de baja exitosamente.`);
        setHabitacionSeleccionada(null);
        cargarHabitaciones(); // Refrescamos la tabla
        setProcesando(false);
        return;
      }

      // PASO B: Intentar reubicar usando el RPC
      const reservasSinSolucion = [];

      for (const reserva of reservas) {
        const { data: nuevaHabitacionId, error: rpcError } = await supabase.rpc('buscar_habitacion_libre', {
          p_tipo: habitacionSeleccionada.type.toLowerCase(), 
          p_entrada: reserva.fecha_entrada,
          p_salida: reserva.fecha_salida
        });

        if (nuevaHabitacionId) {
          // Reubicación exitosa
          await supabase.from('reservas').update({ habitacion_id: nuevaHabitacionId }).eq('id', reserva.id);
        } else {
          // Fallo: No hay habitaciones libres, extraemos el email de forma segura para TypeScript
          reservasSinSolucion.push({
            id: reserva.id,
            email: Array.isArray(reserva.profiles) 
              ? reserva.profiles[0].email 
              : (reserva.profiles as any)?.email
          });
        }
      }

      // PASO C: Resultados de la verificación
      if (reservasSinSolucion.length > 0) {
        setReservasAfectadas(reservasSinSolucion);
        setNecesitaCorreo(true);
      } else {
        // Todos reubicados: Damos de baja la habitación
        await supabase.from('habitaciones').update({ disponible: false }).eq('id', habitacionSeleccionada.id);
        alert("Había conflictos, pero los clientes fueron reubicados automáticamente. Habitación dada de baja.");
        setHabitacionSeleccionada(null);
        cargarHabitaciones();
      }

    } catch (error) {
      console.error("Error en verificación:", error);
      alert("Hubo un error al comprobar los conflictos.");
    } finally {
      setProcesando(false);
    }
  };

  // --- 3. ENVIAR CORREOS Y CANCELAR ---
  const enviarAvisoYCancelar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!asunto || !mensaje) return alert("Completa el asunto y el mensaje.");
    
    setProcesando(true);
    try {
      // 1. Enviar correos y marcar reservas como canceladas
      for (const reserva of reservasAfectadas) {
        await emailService.enviarMensajeInformativo(reserva.email, asunto, mensaje);
        await supabase.from('reservas').update({ estado: 'cancelada' }).eq('id', reserva.id);
      }

      // 2. Dar de baja la habitación
      await supabase.from('habitaciones').update({ disponible: false }).eq('id', habitacionSeleccionada!.id);

      alert(`Se enviaron ${reservasAfectadas.length} correos y se cancelaron las reservas. Habitación dada de baja.`);
      
      setNecesitaCorreo(false);
      setReservasAfectadas([]);
      setAsunto('');
      setMensaje('');
      setHabitacionSeleccionada(null);
      cargarHabitaciones(); // Refrescamos la tabla
      
    } catch (error) {
      console.error("Error cancelando:", error);
      alert("Hubo un error enviando los correos o cancelando las reservas.");
    } finally {
      setProcesando(false);
    }
  };

  // --- 4. DAR DE ALTA UNA HABITACIÓN ---
  const darDeAlta = async () => {
    if (!habitacionSeleccionada) return;
    setProcesando(true);
    
    try {
      const { error } = await supabase
        .from('habitaciones')
        .update({ disponible: true })
        .eq('id', habitacionSeleccionada.id);

      if (error) throw error;

      alert(`Habitación ${habitacionSeleccionada.id} dada de alta y disponible nuevamente.`);
      setHabitacionSeleccionada(null);
      cargarHabitaciones(); // Refrescamos la tabla
    } catch (error) {
      console.error("Error al dar de alta:", error);
      alert("Hubo un error al dar de alta la habitación.");
    } finally {
      setProcesando(false);
    }
  };

  return {
    habitaciones, // Exportamos la lista total para los contadores
    cargando,
    filtros, setFiltros,
    habitacionesFiltradas,
    habitacionSeleccionada, setHabitacionSeleccionada,
    tipoBaja, setTipoBaja,
    fechaInicio, setFechaInicio,
    fechaFin, setFechaFin,
    reservasAfectadas,
    necesitaCorreo,
    asunto, setAsunto,
    mensaje, setMensaje,
    procesando,
    verificarYDarDeBaja,
    enviarAvisoYCancelar,
    darDeAlta // Exportamos la nueva función
  };
};