import { 
  Search, 
  AlertTriangle, 
  Mail, 
  AlignLeft, 
  Send,
  Calendar
} from 'lucide-react';
import { useRoomManagement } from '../hooks/useRoomManagement';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import { useRequireAdmin } from '../hooks/useAuthGuards';

export default function RoomManagementPage() {

  useRequireAdmin();

  const {
    habitaciones,
    habitacionesFiltradas,
    filtros,
    setFiltros,
    habitacionSeleccionada,
    setHabitacionSeleccionada,
    tipoBaja,
    setTipoBaja,
    fechaInicio,
    setFechaInicio,
    fechaFin,
    setFechaFin,
    reservasAfectadas,
    necesitaCorreo,
    asunto,
    setAsunto,
    mensaje,
    setMensaje,
    procesando,
    verificarYDarDeBaja,
    enviarAvisoYCancelar,
    darDeAlta
  } = useRoomManagement();

  return (
    <>
    <Header />
    <div className="min-h-screen bg-[var(--bg-light)] p-4 sm:p-6 lg:p-10 pt-24 md:pt-28 flex justify-center font-sans text-[var(--text-main)] transition-colors duration-300">
      <div className="w-full max-w-[1280px] min-h-[calc(100vh-140px)] lg:h-[850px] bg-[var(--main-card)] rounded-xl shadow-[var(--card-shadow)] flex flex-col overflow-hidden border border-[var(--main-border)] transition-colors duration-300">
        
        {/* HEADER */}
        <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8 border-b border-[var(--main-border)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl text-[var(--text-main)]" style={{ fontFamily: 'var(--font-antiqua)' }}>
              Gestión de Inventario de Habitaciones
            </h1>
            <p className="text-[var(--text-muted)] text-xs md:text-sm mt-1">
              Administración del estado operativo y disponibilidad del hotel.
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 sm:px-6 lg:px-10 py-5 bg-[var(--input-bg)] border-b border-[var(--main-border)]">
          <div className="p-4 bg-[var(--main-card)] border border-[var(--main-border)] rounded-lg shadow-sm">
            <span className="text-xs text-[var(--text-muted)] uppercase font-semibold">Total Habitaciones</span>
            <p className="text-2xl md:text-3xl font-bold text-[var(--brand-rust)] mt-1">{habitaciones?.length || 0}</p>
          </div>
          <div className="p-4 bg-[var(--main-card)] border border-[var(--main-border)] rounded-lg shadow-sm">
            <span className="text-xs text-[var(--text-muted)] uppercase font-semibold">Disponibles</span>
            <p className="text-2xl md:text-3xl font-bold text-[var(--brand-rust)] mt-1">
              {habitaciones?.filter(r => r.status === 'Disponible').length || 0}
            </p>
          </div>
          <div className="p-4 bg-[var(--main-card)] border border-[var(--main-border)] rounded-lg border-l-4 border-l-[var(--brand-red)] shadow-sm">
            <span className="text-xs text-[var(--text-muted)] uppercase font-semibold">Fuera de Servicio</span>
            <p className="text-2xl md:text-3xl font-bold text-[var(--brand-red)] mt-1">
              {habitaciones?.filter(r => r.status === 'Fuera de Servicio').length || 0}
            </p>
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_400px] flex-grow overflow-hidden">
          
          {/* LEFT SIDE: FILTERS & TABLE */}
          <div className="p-4 sm:p-6 lg:p-10 overflow-y-auto border-b lg:border-b-0 lg:border-r border-[var(--main-border)] bg-[var(--main-card)]">
            {/* Filters */}
            <div className="flex mb-6 justify-between items-center">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] z-10" size={18} />
                <input 
                  type="text" 
                  value={filtros.id}
                  onChange={(e) => setFiltros({ ...filtros, id: e.target.value })}
                  placeholder="Buscar por ID de Habitación" 
                  className="input-primary !py-2.5 !pl-10 w-full text-sm"
                />
              </div>
              <select 
                value={filtros.type}
                onChange={(e) => setFiltros({ ...filtros, type: e.target.value })}
                className="input-primary !py-2.5 cursor-pointer w-full sm:w-auto bg-[var(--main-card)] text-[var(--text-main)]"
              >
                <option value="">Todos los tipos</option>
                <option value="simple">Simple (Individual)</option>
                <option value="doble">Doble</option>
                <option value="suite">Suite</option>
              </select>
            </div>

            {/* Table wrapper for mobile scrolling */}
            <div className="overflow-x-auto w-full -mx-4 sm:mx-0 px-4 sm:px-0">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr>
                    <th className="py-3 px-4 text-xs text-[var(--text-muted)] uppercase border-b-2 border-[var(--main-border)] font-semibold">ID</th>
                    <th className="py-3 px-4 text-xs text-[var(--text-muted)] uppercase border-b-2 border-[var(--main-border)] font-semibold">Tipo</th>
                    <th className="py-3 px-4 text-xs text-[var(--text-muted)] uppercase border-b-2 border-[var(--main-border)] font-semibold">Estado</th>
                    <th className="py-3 px-4 text-xs text-[var(--text-muted)] uppercase border-b-2 border-[var(--main-border)] font-semibold">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {habitacionesFiltradas.map((room) => (
                    <tr 
                      key={room.id} 
                      className={`
                        border-b border-[var(--main-border)] transition-colors hover:bg-[var(--input-bg)]
                        ${room.status === 'Fuera de Servicio' ? 'bg-[var(--brand-red)]/5' : ''}
                        ${habitacionSeleccionada?.id === room.id ? 'bg-[var(--brand-rust)]/10 border-l-4 border-[var(--brand-rust)]' : 'border-l-4 border-transparent'}
                      `}
                    >
                      <td className="py-4 px-4 font-semibold text-sm">{room.id}</td>
                      <td className="py-4 px-4 text-sm">{room.type}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase whitespace-nowrap ${
                          room.status === 'Disponible' ? 'bg-[var(--brand-green)]/20 text-[var(--brand-green)]' :
                          room.status === 'Ocupada' ? 'bg-[var(--brand-yellow)]/20 text-[var(--brand-yellow-hover)]' :
                          'bg-[var(--brand-red)]/20 text-[var(--brand-red)]'
                        }`}>
                          {room.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button 
                          onClick={() => setHabitacionSeleccionada(room)}
                          className="text-[var(--brand-rust)] font-bold text-xs uppercase hover:underline cursor-pointer"
                        >
                          GESTIONAR
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT SIDE: MANAGEMENT PANEL */}
          <div className="p-4 sm:p-6 lg:p-8 bg-[var(--main-card)] flex flex-col gap-6 overflow-y-auto">
            <h3 className="text-xl sm:text-2xl border-b-2 border-[var(--brand-yellow)] pb-2 text-[var(--text-main)]" style={{ fontFamily: 'var(--font-antiqua)' }}>
              Gestión de Estado
              {habitacionSeleccionada && <span className="text-[var(--brand-rust)] ml-2">#{habitacionSeleccionada.id}</span>}
            </h3>
            
            {!habitacionSeleccionada ? (
              <div className="flex-1 flex items-center justify-center text-center text-sm text-[var(--text-muted)] py-10 lg:py-0">
                Selecciona "GESTIONAR" en una habitación de la tabla para comenzar.
              </div>
            ) : habitacionSeleccionada.status === 'Fuera de Servicio' ? (
              
              // --- CASO A: LA HABITACIÓN YA ESTÁ DE BAJA ---
              <div className="flex flex-col items-center justify-center h-full text-center gap-4 mt-6">
                <div className="w-16 h-16 rounded-full bg-[var(--brand-red)]/20 flex items-center justify-center text-[var(--brand-red)]">
                  <AlertTriangle size={32} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[var(--text-main)]">Habitación Inactiva</h4>
                  <p className="text-sm text-[var(--text-muted)] mt-2">
                    Esta habitación se encuentra actualmente fuera de servicio y no admite nuevas reservas.
                  </p>
                </div>
                <button 
                  onClick={darDeAlta}
                  disabled={procesando}
                  className="w-full py-3 mt-6 bg-[var(--brand-green)] text-white font-bold rounded-md hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 text-xs sm:text-sm"
                >
                  {procesando ? "PROCESANDO..." : "VOLVER A DAR DE ALTA"}
                </button>
              </div>

            ) : (
              
              // --- CASO B: LA HABITACIÓN ESTÁ ACTIVA ---
              <>
                {/* Baja Type */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-[var(--text-muted)] uppercase">Tipo de Baja</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setTipoBaja('temporal')}
                      className={`p-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer ${tipoBaja === 'temporal' ? 'bg-[var(--brand-rust)] text-white border-[var(--brand-rust)]' : 'bg-[var(--main-card)] text-[var(--text-main)] border-[var(--main-border)] hover:bg-[var(--input-bg)]'}`}
                    >
                      TEMPORAL
                    </button>
                    <button 
                      onClick={() => setTipoBaja('indefinida')}
                      className={`p-2.5 rounded-md text-xs font-medium border transition-colors cursor-pointer ${tipoBaja === 'indefinida' ? 'bg-[var(--brand-rust)] text-white border-[var(--brand-rust)]' : 'bg-[var(--main-card)] text-[var(--text-main)] border-[var(--main-border)] hover:bg-[var(--input-bg)]'}`}
                    >
                      INDEFINIDA
                    </button>
                  </div>
                </div>

                {/* Date Picker (Only if temporal) */}
                {tipoBaja === 'temporal' && (
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[var(--text-muted)] uppercase flex items-center gap-1">
                      <Calendar size={14} />
                      Periodo de Tiempo
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input 
                        type="date" 
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        className="input-primary !py-2 w-full sm:w-1/2 text-sm" 
                        disabled={necesitaCorreo}
                      />
                      <input 
                        type="date" 
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                        className="input-primary !py-2 w-full sm:w-1/2 text-sm" 
                        disabled={necesitaCorreo}
                      />
                    </div>
                  </div>
                )}

                <button 
                  onClick={verificarYDarDeBaja}
                  disabled={procesando || necesitaCorreo}
                  className="w-full py-3 bg-[var(--brand-yellow)] text-black font-bold rounded-md hover:bg-[var(--brand-yellow-hover)] transition-colors cursor-pointer disabled:opacity-50 text-xs sm:text-sm"
                >
                  {procesando && !necesitaCorreo ? "COMPROBANDO..." : "VERIFICAR CONFLICTOS"}
                </button>

                <hr className="border-t border-[var(--main-border)] my-2" />

                {/* CONFLICT ALERT */}
                {necesitaCorreo && (
                  <div className="p-4 bg-[var(--brand-red)]/10 border border-dashed border-[var(--brand-red)] rounded-lg">
                    <h4 className="text-[var(--brand-red)] text-sm font-bold flex items-center gap-2 mb-1">
                      <AlertTriangle size={18} />
                      Conflicto Detectado
                    </h4>
                    <p className="text-xs text-[var(--text-main)] mt-2">
                      No hay habitaciones disponibles para reubicar a <strong>{reservasAfectadas.length} reservas</strong> afectadas.
                    </p>
                    <p className="text-xs text-[var(--brand-red)] mt-2 font-bold">
                      Debe notificar a los clientes y cancelar.
                    </p>
                  </div>
                )}

                {/* CANCELLATION FORM */}
                <div className={`flex flex-col gap-3 transition-opacity duration-300 ${necesitaCorreo ? 'opacity-100 pointer-events-auto' : 'opacity-40 pointer-events-none'}`}>
                  <label className="text-xs font-semibold text-[var(--text-muted)] uppercase">Comunicación con Clientes</label>
                  
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] z-10" size={16} />
                    <input 
                      type="text" 
                      value={asunto}
                      onChange={(e) => setAsunto(e.target.value)}
                      disabled={!necesitaCorreo || procesando}
                      placeholder="Asunto: Cancelación de reserva" 
                      className="input-primary !pl-10 !py-3 text-sm"
                    />
                  </div>
                  
                  <div className="relative">
                    <AlignLeft className="absolute left-3 top-3 text-[var(--text-muted)] z-10" size={16} />
                    <textarea 
                      value={mensaje}
                      onChange={(e) => setMensaje(e.target.value)}
                      disabled={!necesitaCorreo || procesando}
                      placeholder="Cuerpo del mensaje: Lamentamos informarle que por motivos de mantenimiento..." 
                      className="input-primary !pl-10 !py-3 h-28 resize-none text-sm"
                    />
                  </div>
                  
                  <p className="text-[11px] text-[var(--text-muted)] italic leading-relaxed">
                    * Al enviar, se cancelarán todas las reservas en conflicto automáticamente y se enviarán los correos a los clientes afectados.
                  </p>

                  <button 
                    onClick={enviarAvisoYCancelar}
                    disabled={!necesitaCorreo || procesando}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--brand-red)] text-white font-bold rounded-md hover:bg-[var(--brand-red-hover)] transition-colors cursor-pointer disabled:opacity-50 text-xs sm:text-sm"
                  >
                    <Send size={16} />
                    {procesando && necesitaCorreo ? "PROCESANDO..." : "ENVIAR AVISO Y CANCELAR"}
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}