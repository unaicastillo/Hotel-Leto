import React from 'react'
import "../../styles/global.css";

export const Footer = () => {
  return (
      <footer className="bg-[var(--footer-bg)] py-12 border-t border-gray-200">
        <div className="container-custom grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-antiqua text-xl font-bold mb-4">Hotel Letoh</h3>
            <p className="text-sm text-[var(--text-muted)]">Instagram · Facebook</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Enlaces</h4>
            <ul className="text-sm text-[var(--text-muted)] space-y-2">
              <li><a href="#" className="hover:text-[var(--text-primary)]">Habitaciones</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)]">Eventos</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)]">Historia</a></li>
            </ul>
          </div>
          <div>
             <h4 className="font-bold mb-4">Legal</h4>
             <ul className="text-sm text-[var(--text-muted)] space-y-2">
              <li><a href="#" className="hover:text-black">Aviso Legal</a></li>
              <li><a href="#" className="hover:text-black">Cookies</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <p className="text-sm text-[var(--text-muted)] mb-2">Calle de los Romanos, 12<br/>06800 Mérida, España</p>
            <p className="text-sm font-bold text-[var(--brand-rust)]">+34 924 123 456</p>
          </div>
        </div>
      </footer>
  )
}
export default Footer;