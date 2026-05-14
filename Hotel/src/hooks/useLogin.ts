// useLogin.ts corregido
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export const useLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    try {
      // Supabase busca el email y verifica la contraseña en su esquema interno 'auth'
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;
      
      navigate("/"); 
    } catch (error: any) {
      // Mostramos el error real (ej: "Invalid login credentials" o "Email not confirmed")
      setMensaje(error.message); 
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, loading, mensaje, handleLogin };
};