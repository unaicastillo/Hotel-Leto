// src/pages/UpdatePasswordPage.tsx
import React from "react";
import { Lock } from "lucide-react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthInput } from "../components/auth/AuthInput";
import { Button } from "../components/ui/Button";
import { useUpdatePassword } from "../hooks/userPasswordRecovery";

const UpdatePasswordPage = () => {
  const { password, setPassword, loading, mensaje, handleUpdatePassword } = useUpdatePassword();

  return (
    <AuthLayout 
      title="Crear Nueva Contraseña" 
      footerText="¿Quieres volver al inicio?" 
      footerLinkText="Ir al Login" 
      footerLinkHref="/login"
    >
      <form className="space-y-5" onSubmit={handleUpdatePassword}>
        
        {mensaje && (
          <div className={`text-sm text-center font-medium p-3 rounded ${mensaje.includes("éxito") ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
            {mensaje}
          </div>
        )}

        <AuthInput 
          label="Nueva Contraseña" 
          icon={Lock} 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          minLength={6} 
        />
        
        <Button variant="primary" className="w-full py-3.5 mt-2" disabled={loading}>
          {loading ? "ACTUALIZANDO..." : "GUARDAR CONTRASEÑA"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default UpdatePasswordPage;