// src/hooks/useUserManagement.ts
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabaseClient'; // Ajusta la ruta si es necesario
import emailjs from "@emailjs/browser";

// 1. Añadido el "role" a la interfaz
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  fecha: string;
  role: string; 
}

export const useGestionUsuarios = () => {
  // --- ESTADOS ---
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(true);
  const [filtros, setFiltros] = useState({ id: '', nombre: '', email: '', telefono: '' });
  
  const [emailDestino, setEmailDestino] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [estadoEnvio, setEstadoEnvio] = useState<'idle' | 'enviando' | 'exito'>('idle');

  // --- EFECTOS (Carga inicial) ---
  useEffect(() => {
    const fetchUsuarios = async () => {
      setCargando(true);
      
      // 2. Añadido "role" a la consulta de Supabase
      const { data, error } = await supabase
        .from('profiles')
        .select('id, nombre, apellidos, email, telefono, role, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error al cargar los usuarios:', error);
      } else if (data) {
        const usuariosFormateados = data.map((u) => ({
          id: u.id,
          nombre: `${u.nombre} ${u.apellidos}`.trim(), 
          email: u.email,
          telefono: u.telefono || 'Sin teléfono',
          fecha: new Date(u.created_at).toLocaleDateString('es-ES'),
          role: u.role // 3. Guardamos el rol en el estado
        }));
        
        setUsuarios(usuariosFormateados);
      }
      
      setCargando(false);
    };

    fetchUsuarios();
  }, []);

  // --- LÓGICA DE FILTRADO ---
  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter(user => 
      user.id.toLowerCase().includes(filtros.id.toLowerCase()) &&
      user.nombre.toLowerCase().includes(filtros.nombre.toLowerCase()) &&
      user.email.toLowerCase().includes(filtros.email.toLowerCase()) &&
      user.telefono.includes(filtros.telefono)
    );
  }, [usuarios, filtros]);

  const limpiarFiltros = () => setFiltros({ id: '', nombre: '', email: '', telefono: '' });

  // --- LÓGICA DE ELIMINACIÓN ---
  const eliminarUsuario = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se autocomplete el formulario de la derecha al hacer clic
    
    if (window.confirm('¿Estás seguro de que deseas eliminar este perfil de la base de datos?')) {
        
        // Ejecutamos la petición de borrado en Supabase
        const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

        if (error) {
          /* Si el usuario es un admin, el trigger de Supabase se activará,
              cancelará el borrado y guardará tu mensaje personalizado en 'error.message'.
          */
          alert(error.message); 
        } else {
          // 4. Corrección del error de la variable indefinida
          const usuarioBorrado = usuarios.find(u => u.id === id);
          
          // Actualizamos la tabla
          setUsuarios(usuarios.filter(user => user.id !== id));
          
          // Si el que acabamos de borrar estaba seleccionado en el formulario, limpiamos el input
          if (usuarioBorrado && emailDestino === usuarioBorrado.email) {
              setEmailDestino('');
          }
        }
    }
  };

// --- LÓGICA DE ENVÍO DE CORREOS INFORMATIVOS ---
  const handleEnviarMensaje = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailDestino || !asunto || !mensaje) return alert('Por favor, rellena todos los campos.');

    setEstadoEnvio('enviando');

    // Mapeamos los datos con las llaves {{ }} de tu nueva plantilla informativa
    const parametrosInformativos = {
      email_cliente: emailDestino,
      asunto_mensaje: asunto,
      contenido_mensaje: mensaje,
    };

    try {
      await emailjs.send(
        "service_n8gudrg",          // Tu Service ID actual
        "template_iq9pg0y", // <-- Pon aquí el ID de la plantilla que acabas de crear en el Paso 1
        parametrosInformativos,     // Los datos del formulario
        "rkD1Siu2yU59DkNDV"         // Tu Public Key actual
      );

      setEstadoEnvio('exito');
      setAsunto('');
      setMensaje('');
      
      // Regresa al estado inicial tras 3 segundos
      setTimeout(() => setEstadoEnvio('idle'), 3000);
    } catch (error) {
      console.error("Error al enviar el correo informativo al cliente:", error);
      alert("No se pudo procesar el envío. Verifica la configuración de tu plantilla en EmailJS.");
      setEstadoEnvio('idle');
    }
  };



  
  // --- DEVOLVEMOS LO NECESARIO PARA LA VISTA ---
  return {
    cargando,
    usuariosFiltrados,
    filtros,
    setFiltros,
    limpiarFiltros,
    eliminarUsuario,
    emailDestino,
    setEmailDestino,
    asunto,
    setAsunto,
    mensaje,
    setMensaje,
    estadoEnvio,
    handleEnviarMensaje
  };
};

export default useGestionUsuarios;