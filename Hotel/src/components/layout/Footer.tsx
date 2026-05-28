import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--footer-bg)] border-t border-gray-200 dark:border-gray-800 transition-colors duration-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Columna 1: Marca y Descripción */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-[var(--brand-rust)] dark:text-[var(--brand-yellow)]">
              Hotel Leto
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Tu refugio de lujo y descanso en el corazón histórico de Mérida. Donde la herencia romana se encuentra con el confort moderno.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos (Info y Usuario) */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">
              Descubre
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[var(--brand-rust)] dark:hover:text-[var(--brand-yellow)] transition-colors">Inicio</Link></li>
              <li><Link to="/history-info" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[var(--brand-rust)] dark:hover:text-[var(--brand-yellow)] transition-colors">Nuestra Historia</Link></li>
              <li><Link to="/profile" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[var(--brand-rust)] dark:hover:text-[var(--brand-yellow)] transition-colors">Mi Perfil</Link></li>
              <li><Link to="/my-reservations" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[var(--brand-rust)] dark:hover:text-[var(--brand-yellow)] transition-colors">Mis Reservas</Link></li>
            </ul>
          </div>

          {/* Columna 3: Reservas y Servicios */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">
              Servicios
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/reservation" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[var(--brand-rust)] dark:hover:text-[var(--brand-yellow)] transition-colors">Reservar Habitación</Link></li>
              <li><Link to="/ai-reservation" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[var(--brand-rust)] dark:hover:text-[var(--brand-yellow)] transition-colors flex items-center gap-1.5">Asistente IA Leto <span className="bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold">Nuevo</span></Link></li>
              <li><Link to="/reservation-event-room" className="text-sm text-gray-600 dark:text-gray-400 hover:text-[var(--brand-rust)] dark:hover:text-[var(--brand-yellow)] transition-colors">Salón de Eventos</Link></li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">
              Contacto
            </h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <MapPin size={18} className="shrink-0 text-[var(--brand-rust)] dark:text-[var(--brand-yellow)] mt-0.5" />
                <span>Av. Vía de la Plata, s/n<br/>06800 Mérida, España</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Phone size={18} className="shrink-0 text-[var(--brand-rust)] dark:text-[var(--brand-yellow)]" />
                <span>+34 924 12 34 56</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Mail size={18} className="shrink-0 text-[var(--brand-rust)] dark:text-[var(--brand-yellow)]" />
                {/* Aquí está el cambio: <span> en lugar de <a> y con colores forzados */}
                <span className="text-gray-600 dark:text-gray-400 break-all select-all">
                  adminhleto@gmail.com
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Barra inferior (Copyright y Acceso Admin) */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-500 text-center md:text-left">
            © {currentYear} Hotel Leto. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link 
              to="/admin/reservation-management" 
              className="text-xs text-gray-400 hover:text-[var(--text-main)] dark:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Acceso Empleados
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}