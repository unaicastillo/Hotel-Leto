import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Key } from "lucide-react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthInput } from "../components/auth/AuthInput";
import Button from "../components/ui/Button";
import Header from "../components/layout/Header";

export const VerificarCuentaPage = () => {
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState<"error" | "exito">("error");

  // Al entrar, verificamos si hay sesión
  useEffect(() => {
    const verificarSesion = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/register");
      }
    };
    verificarSesion();
  }, [navigate]);

  const handleVerificarCodigo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    try {
      // 1. Obtenemos el usuario y sus metadatos
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("No se ha encontrado una sesión activa.");

      // 2. LEEMOS EL PIN DIRECTAMENTE DE LOS METADATOS (¡Aquí está el truco!)
      const pinCorrecto = user.user_metadata?.codigo_verificacion;

      if (!pinCorrecto) {
        throw new Error("No se encontró ningún código pendiente para este usuario.");
      }

      // 3. Comprobamos si coincide
      if (pinCorrecto === codigo.trim()) {
        
        // 4. Marcamos el perfil público como verificado
        const { error: errorUpdate } = await supabase
          .from("profiles")
          .update({ verificado: true })
          .eq("id", user.id);

        if (errorUpdate) throw new Error("Error al actualizar el perfil: " + errorUpdate.message);

        // 5. Borramos el PIN de los metadatos internos por seguridad
        await supabase.auth.updateUser({
          data: { codigo_verificacion: null }
        });

        setTipoMensaje("exito");
        setMensaje("¡Cuenta verificada con éxito! Redirigiendo al inicio de sesión...");
        
        await supabase.auth.signOut();
        setTimeout(() => navigate("/login"), 2500);
        
      } else {
        setTipoMensaje("error");
        setMensaje("⚠️ El código introducido es incorrecto. Por favor, verifícalo.");
      }
    } catch (error: any) {
      setTipoMensaje("error");
      setMensaje(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <AuthLayout 
        title="Verificar Cuenta" 
        footerText="¿No recibiste el código?" 
        footerLinkText="Volver a registrarse" 
        footerLinkHref="/register"
      >
        <form className="space-y-4" onSubmit={handleVerificarCodigo}>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center leading-relaxed mb-4">
            Introduce el código de seguridad de 6 dígitos que hemos enviado a tu correo mediante EmailJS.
          </p>

          {mensaje && (
            <div className={`text-sm text-center font-medium p-3 rounded ${
              tipoMensaje === "exito" 
                ? "bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-400" 
                : "bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400"
            }`}>
              {mensaje}
            </div>
          )}

          <AuthInput 
            label="Código de Verificación" 
            icon={Key} 
            type="text" 
            placeholder="Ej. 123456"
            value={codigo} 
            onChange={(e) => setCodigo(e.target.value)} 
            required 
            maxLength={6}
            className="text-center tracking-widest font-mono text-lg"
          />

          <Button variant="primary" className="w-full py-3 mt-4" disabled={loading}>
            {loading ? "VERIFICANDO..." : "CONFIRMAR CÓDIGO"}
          </Button>
        </form>
      </AuthLayout>
    </>
  );
};

export default VerificarCuentaPage; 