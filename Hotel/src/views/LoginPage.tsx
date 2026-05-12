import React from "react";
import { Mail, Lock } from "lucide-react";
import { Layout } from "../components/ui/Layout";
import { AuthInput } from "../components/ui/AuthInput";
import Button from "../components/ui/Button";

export const LoginPage = () => {
  return (
    <Layout 
      title="Iniciar sesión" 
      footerText="¿No tienes cuenta?" 
      footerLinkText="Regístrate" 
      footerLinkHref="/registro"
    >
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <AuthInput label="Email" icon={Mail} type="email" placeholder="tu@correo.com" />
        
        <AuthInput 
          label="Password" 
          icon={Lock} 
          type="password" 
          placeholder="••••••••" 
          rightElement={<a href="#" className="text-xs text-[var(--brand-rust)] hover:underline font-medium">¿Olvidaste tu contraseña?</a>}
        />
        
        <div className="flex items-center">
          <input id="remember" type="checkbox" className="h-4 w-4 text-[var(--brand-rust)] border-gray-300 rounded focus:ring-[var(--brand-rust)] cursor-pointer" />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-600 dark:text-gray-300 cursor-pointer">Recordarme</label>
        </div>

        <Button variant="primary" className="w-full py-3.5 mt-2 rounded-md">INICIAR SESIÓN</Button>
      </form>
    </Layout>
  );
};

export default LoginPage;