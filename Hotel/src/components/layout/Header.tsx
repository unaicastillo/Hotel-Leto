import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '../ui/Button';
import { Heading } from '../ui/Typography';
import "../../styles/global.css";

export const Header: React.FC = () => (
  <header className="navbar container-custom">
    {/* Título / Logo */}
    <Heading level={3} className="text-2xl tracking-wider text-white">
      Hotel Letoh
    </Heading>
    
    {/* Navegación Desktop */}
    <nav className="hidden md:flex gap-8 text-sm font-medium items-center text-white">
      <a href="#" className="hover:text-gray-300 transition-colors">Eventos</a>
      <a href="#" className="hover:text-gray-300 transition-colors">Historia</a>
      <a href="#" className="hover:text-gray-300 transition-colors">Blog</a>
    </nav>

    {/* Botón Reserva Desktop */}
    <div className="hidden md:block">
      <Button variant="primary">Reserva Ahora</Button>
    </div>
    
    {/* Menú Hamburguesa Mobile */}
    <button className="md:hidden p-2">
      <Menu className="w-6 h-6 text-white" />
    </button>
  </header>
);

export default Header;