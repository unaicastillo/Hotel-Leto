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
    setLoading(true);
    setMensaje("");

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { nombre, apellidos, telefono } // Se guardan en raw_user_meta_data
        }
      });

      if (error) throw error;

      setMensaje("¡Registro exitoso! Revisa tu email o inicia sesión.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      setMensaje(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { nombre, setNombre, apellidos, setApellidos, telefono, setTelefono, email, setEmail, password, setPassword, loading, mensaje, handleRegister };
};