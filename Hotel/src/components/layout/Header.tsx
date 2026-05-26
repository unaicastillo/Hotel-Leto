import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react"; 
import { supabase } from "../../lib/supabaseClient"; 
import { DesktopNav } from "./header_components/DesktopNav";
import { MobileNav } from "./header_components/MobileNav";
import logo from "../../imgs/logo_temporal.png";
import Button from "../ui/Button";

// Menú principal para todos los usuarios
const MENU_DATA = [
  {
    label: "Reservas",
    items: [
      { label: "Reservar habitacion", url: "/reserva" },
      { label: "Reserva de habitacion inteligente", url: "/reserva-inteligente" },
      { label: "Reservar salon de eventos", url: "/reservation-event-room" },
      { label: "Gestionar reservas", url: "/gestion-reserva" },
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

const ADMIN_MENU = {
  label: "Admin",
  items: [
    { label: "Gestión de usuarios", url: "/admin/users" },
    { label: "Gestión de reservas", url: "/admin/gestion-reservas" },
    { label: "Crear usuario", url: "/admin/create-user" },
    { label: "Realizar reserva salón de eventos", url: "/admin/reservation-event-room" },
    { label: "Gestión de habitaciones", url: "/admin/rooms" },
  ],
};

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false); // Estado para saber si es administrador

  useEffect(() => {
    // Función para obtener sesión y verificar rol
    const fetchSessionAndRole = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      
      if (currentSession?.user) {
        checkRole(currentSession.user.id);
      }
    };

    fetchSessionAndRole();

    // Escuchar cambios de autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      if (currentSession?.user) {
        checkRole(currentSession.user.id);
      } else {
        setIsAdmin(false); // Si cierra sesión, deja de ser admin
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Consulta a Supabase para verificar si el usuario es "admin"
  const checkRole = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();
      
    setIsAdmin(data?.role === "admin");
  };

  // Construimos el menú dinámicamente. 
  // Si es admin, añade el bloque de Admin al final. Si no, usa el normal.
  const dynamicMenuItems = useMemo(() => {
    return isAdmin ? [...MENU_DATA, ADMIN_MENU] : MENU_DATA;
  }, [isAdmin]);

  return (
    <header className="header">
      <div className="header__bar">
        {/* Logo Section */}
        <Link to="/" className="header__logo">  
          <img src={logo} alt="logo hotel leto" />
        </Link>

        {/* Desktop Navigation - Le pasamos el menú dinámico */}
        <DesktopNav menuItems={dynamicMenuItems} />

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

      {/* Mobile Navigation Menu - Le pasamos el menú dinámico */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        menuItems={dynamicMenuItems} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      <div className="header__divider" />

    </header>
  );
}

export default Header;