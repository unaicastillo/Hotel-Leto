import { Mail, Lock } from "lucide-react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthInput } from "../components/auth/AuthInput";
import Button from "../components/ui/Button";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const { 
    email, setEmail, password, setPassword, 
    rememberMe, setRememberMe, loading, mensaje, handleLogin 
  } = useLogin();

  return (
    <AuthLayout title="Iniciar sesión" footerText="¿No tienes cuenta?" footerLinkText="Registrarse" footerLinkHref="/register">
      <form className="space-y-4" onSubmit={handleLogin}>
        {mensaje && (
          <div className="text-sm text-center font-medium p-2 rounded bg-orange-50 text-[var(--brand-rust)]">
            {mensaje}
          </div>
        )}

        <AuthInput label="Email" icon={Mail} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <AuthInput label="Contraseña" icon={Lock} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        {/* Fila del Checkbox y Enlace de Contraseña */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 accent-[var(--brand-rust)] cursor-pointer" 
            />
            <span className="text-xs text-gray-500 font-medium">Recuérdame</span>
          </label>

          <Link to="/forgot-password" className="text-xs text-[var(--brand-rust)] hover:underline font-medium">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <Button variant="primary" className="w-full py-3.5 mt-2" disabled={loading}>
          {loading ? "CARGANDO..." : "ENTRAR"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;