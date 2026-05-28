import { useState, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export interface Mensaje {
  id: string;
  texto: string;
  sender: 'ai' | 'user';
}

export const useAIChat = () => {
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    { id: '1', texto: '¡Hola! Soy Leto, la inteligencia artificial del hotel. 🤖 Dime, ¿en qué fechas te gustaría visitarnos y qué tipo de habitación buscas?', sender: 'ai' }
  ]);
  const [inputUsuario, setInputUsuario] = useState('');
  const [escribiendo, setEscribiendo] = useState(false);
  
  const [historialGemini, setHistorialGemini] = useState<any[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [mensajes, escribiendo]);

  const enviarMensaje = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUsuario.trim()) return;

    const textoUsuario = inputUsuario;
    setMensajes(prev => [...prev, { id: Date.now().toString(), texto: textoUsuario, sender: 'user' }]);
    setInputUsuario('');
    setEscribiendo(true);

  try {
      // 1. LLAMAMOS A NUESTRA FUNCIÓN SEGURA EN SUPABASE
      const { data, error } = await supabase.functions.invoke('chat-leto', {
        body: { mensaje: textoUsuario, historial: historialGemini }
      });

      if (error) throw new Error(error.message);

      let respuestaIA = data.respuesta;
      setHistorialGemini(data.nuevoHistorial);

      // 2. EXPRESIONES REGULARES PARA INTERCEPTAR FASES
      const buscarRegex = /\[BUSCAR:\s*([^,]+),\s*([^,]+),\s*([^\]]+)\]/i;
      const reservarRegex = /\[RESERVAR:\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*(.+)\]/i;
      
      const matchBuscar = respuestaIA.match(buscarRegex);
      const matchReservar = respuestaIA.match(reservarRegex);

      if (matchBuscar) {
        // --- FASE 2: EL SISTEMA BUSCA Y LE DEVUELVE DATOS A LETO ---
        const tipo = matchBuscar[1].trim().toLowerCase();
        const fEntrada = matchBuscar[2].trim();
        const fSalida = matchBuscar[3].trim();

        // Mostramos lo que Leto dijo antes de la etiqueta
        const textoLimpio = respuestaIA.replace(buscarRegex, '').trim();
        if (textoLimpio) {
            setMensajes(prev => [...prev, { id: Date.now().toString(), texto: textoLimpio, sender: 'ai' }]);
        }

        // Buscamos la habitación libre
        const { data: habitacionId } = await supabase.rpc('buscar_habitacion_libre', { p_tipo: tipo, p_entrada: fEntrada, p_salida: fSalida });

        if (habitacionId) {
          // Obtenemos el precio de esa habitación
          const { data: roomData } = await supabase.from('habitaciones').select('precio').eq('id', habitacionId).single();
          
          // Obtenemos todos los servicios activos
          const { data: servicesData } = await supabase.from('servicios').select('id, nombre, precio').eq('activo', true);
          const serviciosTexto = servicesData?.map(s => `${s.nombre} (ID: ${s.id}, ${s.precio}€)`).join(' | ') || 'Sin servicios extra';

          // Le enviamos la información a Leto de forma invisible
          const mensajeSistema = `SISTEMA: Habitación ID ${habitacionId} libre. Precio: ${roomData?.precio}€/noche. Servicios: ${serviciosTexto}. Ofrécelos y pregunta si confirma.`;
          
          const { data: dataLeto } = await supabase.functions.invoke('chat-leto', {
            body: { mensaje: mensajeSistema, historial: data.nuevoHistorial }
          });
          
          setHistorialGemini(dataLeto.nuevoHistorial);
          setMensajes(prev => [...prev, { id: Date.now().toString(), texto: dataLeto.respuesta, sender: 'ai' }]);
          
        } else {
          setMensajes(prev => [...prev, { id: Date.now().toString(), texto: `Vaya, lo siento. No me quedan habitaciones de tipo ${tipo} para esas fechas. ¿Probamos otra cosa?`, sender: 'ai' }]);
        }
        setEscribiendo(false);

      } else if (matchReservar) {
        // --- FASE 4: REALIZAR LA RESERVA EN BASE DE DATOS ---
        const habitacionId = parseInt(matchReservar[1].trim());
        const fEntrada = matchReservar[2].trim();
        const fSalida = matchReservar[3].trim();
        const precioTotal = parseFloat(matchReservar[4].replace(/[^0-9.]/g, '')); // Limpiamos símbolos de moneda
        const serviciosStr = matchReservar[5].trim().toLowerCase();

        const textoLimpio = respuestaIA.replace(reservarRegex, '').trim();
        setMensajes(prev => [...prev, { id: Date.now().toString(), texto: textoLimpio, sender: 'ai' }]);

        // 1. Verificar si el usuario está logueado
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
             setMensajes(prev => [...prev, { id: Date.now().toString(), texto: "⚠️ Para poder guardar tu reserva, necesito que inicies sesión primero en la web. Una vez lo hagas, dímelo y confirmamos.", sender: 'ai' }]);
             setEscribiendo(false);
             return;
        }

        // 2. Insertar en tabla 'reservas'
        const { data: nuevaReserva, error: errorReserva } = await supabase
          .from('reservas')
          .insert({
            usuario_id: user.id,
            habitacion_id: habitacionId,
            fecha_entrada: fEntrada,
            fecha_salida: fSalida,
            precio_total: precioTotal,
            estado: 'confirmada' // o 'pendiente' según prefieras
          })
          .select('id')
          .single();

        if (errorReserva) throw new Error("Error al crear la reserva: " + errorReserva.message);

        // 3. Insertar en tabla 'reservas_servicios' si eligió alguno
        if (serviciosStr !== 'ninguno') {
          // Extraemos los IDs de los servicios de la respuesta (ej: "1, 3")
          const serviciosIds = serviciosStr.split(',').map((id: any) => parseInt(id.trim())).filter((id: any) => !isNaN(id));
          
          if (serviciosIds.length > 0) {
            // Obtenemos los precios actuales de esos servicios para la tabla pivote
            const { data: serviciosInfo } = await supabase.from('servicios').select('id, precio').in('id', serviciosIds);
            
            if (serviciosInfo) {
              const insertServicios = serviciosInfo.map(srv => ({
                reserva_id: nuevaReserva.id,
                servicio_id: srv.id,
                precio_unitario: srv.precio,
                cantidad: 1
              }));
              
              await supabase.from('reservas_servicios').insert(insertServicios);
            }
          }
        }

        // 4. Confirmación final al usuario
        setTimeout(() => {
          setMensajes(prev => [...prev, { 
            id: Date.now().toString(), 
            texto: `✅ ¡Todo listo! Tu reserva ha sido registrada en el sistema bajo el localizador #${nuevaReserva.id}. Puedes gestionarla desde tu panel de usuario. ¡Te esperamos!`, 
            sender: 'ai' 
          }]);
          setEscribiendo(false);
        }, 1500);

      } else {
        // Conversación normal si no hay etiquetas
        setMensajes(prev => [...prev, { id: Date.now().toString(), texto: respuestaIA, sender: 'ai' }]);
        setEscribiendo(false);
      }

    } catch (error: any) {
      console.error("Error en el chat:", error);
      setMensajes(prev => [...prev, { id: Date.now().toString(), texto: `⚠️ Error del sistema: ${error.message}`, sender: 'ai' }]);
      setEscribiendo(false);
    }
  };

  return { mensajes, inputUsuario, setInputUsuario, enviarMensaje, chatContainerRef, escribiendo };
};