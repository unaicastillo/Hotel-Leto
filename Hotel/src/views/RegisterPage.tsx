import React from "react";
import { User, Mail, Lock } from "lucide-react";
import { Layout } from "../components/ui/Layout";
import { AuthInput } from "../components/ui/AuthInput";
import Button from "../components/ui/Button";

export const RegisterPage = () => {
  return (
    <Layout 
      title="Registrarse" 
      footerText="¿Ya tienes cuenta?" 
      footerLinkText="Inicia sesión" 
      footerLinkHref="/login"
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <AuthInput label="Nombre Completo" icon={User} type="text" placeholder="Juan Pérez" />
        <AuthInput label="Correo Electrónico" icon={Mail} type="email" placeholder="hola@ejemplo.com" />
        <AuthInput label="Contraseña" icon={Lock} type="password" placeholder="••••••••" />
        
        <div className="flex items-start mt-4">
          <div className="flex items-center h-5">
            <input id="terms" type="checkbox" className="h-4 w-4 text-[var(--brand-rust)] border-gray-300 rounded focus:ring-[var(--brand-rust)] cursor-pointer mt-0.5" />
          </div>
          <label htmlFor="terms" className="ml-2 block text-xs text-gray-600 dark:text-gray-300 cursor-pointer">
            Acepto los <a href="#" className="text-[var(--brand-rust)] hover:underline">Términos de Servicio</a> y la <a href="#" className="text-[var(--brand-rust)] hover:underline">Política de Privacidad</a>
          </label>
        </div>

        <Button variant="primary" className="w-full py-3.5 mt-4 rounded-md">REGISTRARSE</Button>
      </form>
    </Layout>
  );
};

export default RegisterPage;