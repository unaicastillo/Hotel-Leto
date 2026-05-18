import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react"; // Importamos el icono de usuario
import { supabase } from "../../lib/supabaseClient"; // Ajusta esta ruta según tu estructura
import { DesktopNav } from "./header_components/DesktopNav";
import { MobileNav } from "./header_components/MobileNav";
import logo from "../../imgs/logo_temporal.png";
import Button from "../ui/Button";

const MENU_DATA = [
  {
    label: "Reservas",
    items: [
      { label: "Reservar habitacion", url: "/reserva" },
      { label: "Reservar salon de eventos", url: "/reserva-salón" },
    ],
  },
  {
    label: "Informacion",
    items: [
      { label: "Habitaciones", url: "/info-habitaciones" },
      { label: "Cocina", url: "/info-cocina" },
      { label: "Eventos", url: "/info-eventos" },
      { label: "Instalaciones", url: "/info-instalaciones" },
      { label: "Historia", url: "/info-historia" },
    ],
  },
];

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // 1. Obtener la sesión actual al cargar el Header
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // 2. Escuchar cambios de autenticación (cuando hace login o logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    // Limpiar la suscripción al desmontar
    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="header">
      <div className="header__bar">
        {/* Logo Section */}
        <Link to="/" className="header__logo">  
          <img src={logo} alt="logo hotel leto" />
        </Link>

        {/* Desktop Navigation */}
        <DesktopNav menuItems={MENU_DATA} />

        {/* Action Buttons */}
        <div className="header__right">
          <button 
            className={`header__hamburger ${isMobileMenuOpen ? "header__hamburger--open" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="header__hamburger-line" />
            <span className="header__hamburger-line" />
            <span className="header__hamburger-line" />
          </button>

          {/* Renderizado condicional de Autenticación */}
          {session ? (
            <Link 
              to="/perfil" 
              className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--main-border)] text-[var(--text-main)] hover:bg-[var(--header-item-hover)] hover:text-[var(--brand-rust)] transition-all"
              title="Mi Perfil"
            >
              <User size={20} />
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="primary">Iniciar sesión</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        menuItems={MENU_DATA} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      <div className="header__divider" />

    </header>
  );
}

export default Header;