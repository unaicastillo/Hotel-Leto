import React from "react";
import { Mail, Lock } from "lucide-react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthInput } from "../components/auth/AuthInput";
import Button from "../components/ui/Button";
import { useLogin } from "../hooks/useLogin";

export const LoginPage = () => {
  const { email, setEmail, password, setPassword, loading, mensaje, handleLogin } = useLogin();

  return (
    <AuthLayout title="Iniciar sesión" footerText="¿No tienes cuenta?" footerLinkText="Registrarse" footerLinkHref="/register">
      <form className="space-y-5" onSubmit={handleLogin}>
        {mensaje && (
          <div className="text-sm text-center font-medium p-2 rounded bg-orange-50 text-[var(--brand-rust)]">
            {mensaje}
          </div>
        )}

        <AuthInput label="Email" icon={Mail} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <AuthInput label="Contraseña" icon={Lock} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
        <Button variant="primary" className="w-full py-3.5 mt-2" disabled={loading}>
          {loading ? "CARGANDO..." : "ENTRAR"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;