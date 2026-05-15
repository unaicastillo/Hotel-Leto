import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

// Hook para el PASO 1: Solicitar el email
export const useForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");
    setIsSuccess(false);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        // MUY IMPORTANTE: A dónde va el usuario tras hacer clic en el email
        redirectTo: `${window.location.origin}/update-password`, 
      });

      if (error) throw error;

      setIsSuccess(true);
      setMensaje("Te hemos enviado un enlace seguro. Revisa tu correo electrónico.");
    } catch (error: any) {
      setMensaje("Error al enviar el correo: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, loading, mensaje, isSuccess, handleResetRequest };
};

// Hook para el PASO 2: Guardar la nueva contraseña
export const useUpdatePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    try {
      // Supabase sabe qué usuario es gracias al token oculto en la URL del email
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      setMensaje("¡Contraseña actualizada con éxito!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      setMensaje("Error al actualizar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return { password, setPassword, loading, mensaje, handleUpdatePassword };
};