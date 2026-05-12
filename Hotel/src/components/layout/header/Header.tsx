import { useState } from "react";
import { Link } from "react-router-dom";
import { DesktopNav } from "./header_components/DesktopNav";
import { MobileNav } from "./header_components/MobileNav";
import logo from "../../../imgs/logo_temporal.png";
import Button from "../../ui/Button";

const MENU_DATA = [
  {
    label: "Reservas",
    items: [
      { label: "Reservar habitacion", url: "/" },
      { label: "Reservar salon de eventos", url: "/" },
    ],
  },
  {
    label: "Informacion",
    items: [
      { label: "Habitaciones", url: "/" },
      { label: "Cocina", url: "/" },
      { label: "Eventos", url: "/" },
      { label: "Instalaciones", url: "/" },
      { label: "Recomendaciones para visitar", url: "/" },
    ],
  },
];

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__bar">
        {/* Logo Section */}
        <Link to="/" className="header__logo">  
          <img src={logo} alt="Airmagic Precision" />
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

          <Button variant="primary">Iniciar sesión</Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        menuItems={MENU_DATA} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      <div className="header__divider" />

      {/* Cart Side Panel */}
    </header>
  );
}

export default Header;