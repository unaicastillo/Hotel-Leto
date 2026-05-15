import React from "react";
import { User, Mail, Lock, Phone } from "lucide-react";
import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthInput } from "../components/auth/AuthInput";
import Button from "../components/ui/Button";
import { useRegister } from "../hooks/useRegister";

export const RegisterPage = () => {
  const { 
    nombre, setNombre, apellidos, setApellidos, telefono, setTelefono,
    email, setEmail, password, setPassword, loading, mensaje, handleRegister 
  } = useRegister();

  return (
    <AuthLayout title="Registrarse" footerText="¿Ya tienes cuenta?" footerLinkText="Inicia sesión" footerLinkHref="/login">
      <form className="space-y-4" onSubmit={handleRegister}>
        
        {mensaje && (
          <div className="text-sm text-center font-medium p-3 rounded bg-blue-50 text-blue-600">
            {mensaje}
          </div>
        )}

        <AuthInput label="Nombre" icon={User} type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <AuthInput label="Apellidos" icon={User} type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
        <AuthInput label="Teléfono" icon={Phone} type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        <AuthInput label="Email" icon={Mail} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <AuthInput label="Contraseña" icon={Lock} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />

        <Button variant="primary" className="w-full py-3 mt-4" disabled={loading}>
          {loading ? "REGISTRANDO..." : "REGISTRARSE"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;