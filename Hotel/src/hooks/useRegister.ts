// src/hooks/useRegister.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export const useRegister = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");
    setLoading(true);

    try {
      let telefonoLimpio = "";

      // 1. VALIDAMOS EL TELÉFONO (Si el usuario lo ha rellenado)
      if (telefono && telefono.trim() !== '') {
        telefonoLimpio = telefono.replace(/\s/g, '');
        if (!/^[0-9]{9}$/.test(telefonoLimpio)) {
          setLoading(false);
          return setMensaje("El número de teléfono debe tener exactamente 9 dígitos.");
        }

        // Comprobar que el teléfono no pertenezca a otro usuario
        const { data: telefonoExistente } = await supabase
          .from("profiles")
          .select("id")
          .eq("telefono", telefonoLimpio)
          .maybeSingle();

        if (telefonoExistente) {
          setLoading(false);
          return setMensaje("Este número de teléfono ya está registrado.");
        }
      }

      // 2. DELEGAMOS TODO A SUPABASE
      // Supabase comprobará automáticamente si el correo existe. Si no existe, 
      // lo registra y le manda su correo de verificación nativo.
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nombre,
            apellidos,
            telefono: telefonoLimpio || null
          },
          // A dónde lo mandará Supabase cuando haga clic en el correo
          emailRedirectTo: `${window.location.origin}/login`
        }
      });

      // Si el email ya existía, salta al "catch" instantáneamente y no manda correo.
      if (error) throw error;

      if (data.user) {
        setMensaje("📩 ¡Registro completado! Revisa tu correo y haz clic en el enlace para verificar tu cuenta.");
        // Limpiamos el formulario
        setNombre(""); setApellidos(""); setTelefono(""); setEmail(""); setPassword("");
        
        // Lo mandamos al login para que espere ahí después de leer el mensaje
        setTimeout(() => navigate("/login"), 4000);
      }

    } catch (error: any) {
      if (error.message.includes("already registered") || error.status === 422) {
        setMensaje("Ya existe una cuenta registrada con este correo electrónico.");
      } else {
        setMensaje("Error: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { nombre, setNombre, apellidos, setApellidos, telefono, setTelefono, email, setEmail, password, setPassword, loading, mensaje, handleRegister };
};