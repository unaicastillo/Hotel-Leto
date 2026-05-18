// src/hooks/useLogin.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export const useLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      if (!rememberMe) {
        sessionStorage.setItem("sesion_temporal", "true");
      } else {
        sessionStorage.removeItem("sesion_temporal");
      }

      navigate("/"); 
    } catch (error: any) {
      setMensaje("Error al iniciar sesión: " + error.message); 
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, rememberMe, setRememberMe, loading, mensaje, handleLogin };
};