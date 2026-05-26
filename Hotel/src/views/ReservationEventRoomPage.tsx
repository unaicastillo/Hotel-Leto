import { CalendarDays, Mail, Banknote, Info, BellRing, Building, ArrowLeft } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useReservationEventRoom } from '../hooks/useReservationEventRoom';

export default function ReservationEventRoomPage() {
  const { 
    formData, 
    handleChange, 
    handleReservarEvento, 
    loading, 
    mensaje, 
    fechaMinima // <-- Si falta esto, React explota
  } = useReservationEventRoom();
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[var(--bg-light)] p-4 sm:p-6 md:p-10 pt-24 md:pt-28 flex justify-center text-[var(--text-main)] transition-colors duration-300">
        <div className="w-full max-w-[1100px] flex flex-col gap-6">
          
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif text-[var(--text-main)]" style={{ fontFamily: 'var(--font-antiqua)' }}>
                Reservar Salón de Eventos
              </h1>
              <p className="text-[var(--text-muted)] text-sm">Gestión administrativa y reserva de espacios.</p>
            </div>
            <button onClick={() => window.history.back()} className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--brand-rust)] transition-colors cursor-pointer">
              <ArrowLeft size={16} /> Volver
            </button>
          </div>

          {mensaje.texto && (
            <div className={`p-4 rounded-lg text-sm font-bold border ${mensaje.tipo === 'error' ? 'bg-red-100 text-red-800 border-red-200' : 'bg-green-100 text-green-800 border-green-200'}`}>
              {mensaje.texto}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-[var(--main-card)] p-6 md:p-8 rounded-xl shadow-[var(--card-shadow)] border border-[var(--main-border)]">
                
                <form className="space-y-8" onSubmit={handleReservarEvento}>
                  
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-[var(--brand-rust)] border-b border-[var(--main-border)] pb-2 mb-4">
                      <Mail size={18} />
                      <h3 className="font-semibold text-sm uppercase tracking-wider">Titular de la Reserva</h3>
                    </div>
                    <div className="space-y-1.5">
                      <label>Correo Electrónico del Cliente *</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="cliente@email.com"
                        className="input-primary" 
                        required 
                      />
                    </div>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-[var(--brand-rust)] border-b border-[var(--main-border)] pb-2 mb-4">
                      <CalendarDays size={18} />
                      <h3 className="font-semibold text-sm uppercase tracking-wider">Detalles del Evento</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label>Fecha del Evento *</label>
                        <input 
                          type="date" 
                          name="fecha" 
                          value={formData.fecha} 
                          onChange={handleChange} 
                          min={fechaMinima}
                          onKeyDown={(e) => e.preventDefault()} /* <-- EL TRUCO MÁGICO AQUÍ */
                          className="input-primary" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-1.5">
                        <label>Precio Total (€) *</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            name="precio" 
                            value={formData.precio} 
                            onChange={handleChange} 
                            placeholder="Ej: 1500"
                            min="0"
                            step="0.01"
                            className="input-primary pl-9" 
                            required 
                          />
                          <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={16} />
                        </div>
                      </div>
                    </div>
                  </section>

                  <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-6 border-t border-[var(--main-border)]">
                    <button type="button" onClick={() => window.history.back()} className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--brand-rust)] transition-colors px-6 py-3 cursor-pointer">
                      CANCELAR
                    </button>
                    <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto uppercase tracking-widest text-xs px-10 disabled:opacity-50">
                      {loading ? 'PROCESANDO...' : 'CREAR RESERVA'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {/* Tarjeta Visual y Datos Técnicos */}
              <div className="bg-[var(--main-card)] rounded-xl shadow-md border border-[var(--main-border)] overflow-hidden">
                <div className="h-32 bg-gray-200 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80" 
                    alt="Salón de eventos" 
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <h4 className="text-white font-serif text-lg tracking-wide">Gran Salón Leto</h4>
                  </div>
                </div>
                
                <div className="p-6 space-y-4 text-sm text-[var(--text-muted)]">
                  <div className="flex items-start gap-3">
                    <Building size={18} className="text-[var(--brand-rust)] shrink-0 mt-0.5" />
                    <p>El sistema verificará automáticamente la <strong>disponibilidad del salón</strong> para la fecha seleccionada usando la base de datos interna.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Info size={18} className="text-[var(--brand-rust)] shrink-0 mt-0.5" />
                    <p>Las reservas de salón se registran con el mismo día de entrada y salida, con estado confirmado de inmediato.</p>
                  </div>
                </div>
              </div>

              {/* Notificación Automática */}
              <div className="bg-[var(--main-card)] rounded-xl shadow-md border border-[var(--main-border)] overflow-hidden">
                <div className="bg-[var(--brand-yellow)] p-4 flex items-center gap-3">
                  <div className="bg-black/10 p-2 rounded-full">
                    <BellRing size={20} className="text-black" />
                  </div>
                  <div>
                    <h4 className="text-black font-bold text-sm">Notificación por Correo</h4>
                    <p className="text-black/60 text-[10px] leading-tight">Envío automático vía EmailJS.</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs leading-relaxed text-[var(--text-muted)] italic">
                    Una vez confirmada la inserción, el titular recibirá un comprobante detallando el evento, el precio acordado, y el correo <strong>contacto.hotelleto@gmail.com</strong> como canal de soporte.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}