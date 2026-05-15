// src/pages/ForgotPasswordPage.tsx
import React from "react";
import { Mail } from "lucide-react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthInput } from "../components/auth/AuthInput";
import { Button } from "../components/ui/Button"; // Ajusta la ruta si es necesario
import { useForgotPassword } from "../hooks/userPasswordRecovery";

const ForgotPasswordPage = () => {
  const { email, setEmail, loading, mensaje, isSuccess, handleResetRequest } = useForgotPassword();

  return (
    <AuthLayout 
      title="Recuperar Contraseña" 
      footerText="¿Recordaste tu contraseña?" 
      footerLinkText="Iniciar sesión" 
      footerLinkHref="/login"
    >
      <form className="space-y-5" onSubmit={handleResetRequest}>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-2">
          Introduce tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
        </p>

        {mensaje && (
          <div className={`text-sm text-center font-medium p-3 rounded ${isSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
            {mensaje}
          </div>
        )}

        <AuthInput 
          label="Email" 
          icon={Mail} 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          disabled={isSuccess} // Bloquear si ya se envió
        />
        
        <Button variant="primary" className="w-full py-3.5 mt-2" disabled={loading || isSuccess}>
          {loading ? "ENVIANDO..." : "ENVIAR ENLACE"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;