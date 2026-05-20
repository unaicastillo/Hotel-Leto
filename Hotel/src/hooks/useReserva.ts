// src/hooks/useReserva.ts
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export const categorias = [
  { id: "individual", cap: 1, precioBase: 90 },
  { id: "doble", cap: 2, precioBase: 140 },
  { id: "suite", cap: 4, precioBase: 250 },
];

export const useReserva = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [usuarioId, setUsuarioId] = useState<string | null>(null);

  const [fechaEntrada, setFechaEntrada] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [tipo, setTipo] = useState<"individual" | "doble" | "suite">("doble");
  const [huespedes, setHuespedes] = useState(2);
  const [servicios, setServicios] = useState<string[]>([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUsuarioId(user.id);
    });
  }, []);

  useEffect(() => {
    const maxCapacidad = categorias.find(c => c.id === tipo)?.cap || 1;
    if (huespedes > maxCapacidad) setHuespedes(maxCapacidad);
  }, [tipo, huespedes]);

  const getFechaMaximaSalida = () => {
    if (!fechaEntrada) return "";
    const f = new Date(fechaEntrada);
    f.setDate(f.getDate() + 7);
    return f.toISOString().split("T")[0];
  };

  const getFechaMinimaSalida = () => {
    if (!fechaEntrada) return "";
    const f = new Date(fechaEntrada);
    f.setDate(f.getDate() + 1);
    return f.toISOString().split("T")[0];
  };

  const handleCambioEntrada = (nuevaEntrada: string) => {
    setFechaEntrada(nuevaEntrada);
    if (fechaSalida) {
      const fSalida = new Date(fechaSalida);
      const fEntrada = new Date(nuevaEntrada);
      const fMaxSalida = new Date(nuevaEntrada);
      fMaxSalida.setDate(fMaxSalida.getDate() + 7);

      if (fSalida <= fEntrada || fSalida > fMaxSalida) {
        setFechaSalida(""); 
      }
    }
  };

  const calcularNoches = () => {
    if (!fechaEntrada || !fechaSalida) return 0;
    return Math.ceil((new Date(fechaSalida).getTime() - new Date(fechaEntrada).getTime()) / (1000 * 60 * 60 * 24));
  };

  // Cálculo exacto con los precios de la base de datos
  const calcularCostoExtras = () => {
    let costoExtras = 0;
    if (servicios.includes("Desayuno Buffet")) costoExtras += 25;
    if (servicios.includes("Media Pensión")) costoExtras += 45;
    return costoExtras;
  };

  const noches = calcularNoches();
  const total = noches > 0 ? (categorias.find(c => c.id === tipo)!.precioBase + calcularCostoExtras()) * noches : 0;

  const toggleServicio = (servicio: string) => {
    setServicios(prev => prev.includes(servicio) ? prev.filter(s => s !== servicio) : [...prev, servicio]);
  };

  const handleReservar = async () => {
    if (!fechaEntrada || !fechaSalida) return setMensaje("Por favor, selecciona las fechas.");
    if (noches <= 0) return setMensaje("La fecha de salida debe ser posterior a la de entrada.");
    if (noches > 7) return setMensaje("La reserva máxima permitida es de 7 noches.");
    
    setLoading(true);
    setMensaje("");

    try {
      const { data: habId, error: errRpc } = await supabase.rpc('buscar_habitacion_libre', { p_tipo: tipo, p_entrada: fechaEntrada, p_salida: fechaSalida });
      if (errRpc) throw errRpc;
      if (!habId) {
        setMensaje("Lo sentimos, no hay habitaciones disponibles en estas fechas.");
        setLoading(false); return;
      }

      // 1. Insertamos la reserva (usando precio_total y sin el array de servicios)
      const { data: nuevaReserva, error: errInsert } = await supabase.from("reservas").insert({
        usuario_id: usuarioId, 
        habitacion_id: habId, 
        fecha_entrada: fechaEntrada, 
        fecha_salida: fechaSalida, 
        precio_total: total, 
        estado: "pendiente"
      }).select('id').single();

      if (errInsert) throw errInsert;

      // 2. Si hay extras, los guardamos en la tabla puente
      if (servicios.length > 0 && nuevaReserva) {
        const { data: serviciosDB } = await supabase.from('servicios').select('id, precio').in('nombre', servicios);
        
        if (serviciosDB) {
          const extrasAInsertar = serviciosDB.map(srv => ({
            reserva_id: nuevaReserva.id,
            servicio_id: srv.id,
            precio_unitario: srv.precio,
            cantidad: noches // El servicio se multiplica por las noches
          }));

          const { error: errServicios } = await supabase.from('reservas_servicios').insert(extrasAInsertar);
          if (errServicios) throw errServicios;
        }
      }

      navigate("/");
      setMensaje("¡Reserva confirmada con éxito!");
    } catch (error: any) {
      setMensaje(error.message || "Error al procesar la reserva.");
    } finally {
      setLoading(false);
    }
  };

  return {
    fechaEntrada, handleCambioEntrada, fechaSalida, setFechaSalida,
    getFechaMinimaSalida, getFechaMaximaSalida,
    tipo, setTipo, huespedes, setHuespedes,
    servicios, toggleServicio,
    loading, mensaje, total, noches, handleReservar
  };
};