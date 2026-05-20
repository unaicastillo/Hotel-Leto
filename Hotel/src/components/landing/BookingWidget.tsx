import { Calendar, Users } from 'lucide-react';
import "../../styles/global.css";

export const BookingWidget: React.FC = () => (
  <div className="container-custom px-4 relative">
    <div className="relative -mt-16 bg-[var(--bg-light)] rounded-xl shadow-xl flex flex-col md:flex-row items-center p-6 md:p-8 gap-8 z-20 transition-colors">
      <div className="flex flex-col md:flex-row w-full gap-8">
        {[ {label: 'Entrada', val: '24 Oct 2024', Icon: Calendar}, 
           {label: 'Salida', val: '27 Oct 2024', Icon: Calendar}, 
           {label: 'Huéspedes', val: '2 Adultos, 0 Niños', Icon: Users} 
        ].map((item, i) => (
          <div key={i} className="flex-1 border-b border[var(--main-border)]">
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase block mb-2">{item.label}</label>
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-main)]">
              <item.Icon className="w-5 h-5 text-[var(--brand-rust)]" /> 
              <span>{item.val}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="btn-primary w-full md:w-auto shrink-0">Consultar disponibilidad</button>
    </div>
  </div>
);