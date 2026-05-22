// src/views/ReservationManagementPage.tsx
import React from 'react';
import { Search, Mail, AlignLeft, Send, Calendar, User, ShieldAlert, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useReservationManagement } from '../hooks/useReservationManagement';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function ReservationManagementPage() {
  const {
    cargando,
    reservas,
    reservasFiltradas,
    filtros,
    setFiltros,
    reservaSeleccionada,
    setReservaSeleccionada,
    asunto,
    setAsunto,
    mensaje,
    setMensaje,
    procesando,
    seleccionarParaCancelar,
    enviarAvisoYCancelar
  } = useReservationManagement();

  return (
    <>
    <Header />
   <div className="min-h-screen bg-[var(--bg-light)] p-4 sm:p-6 md:p-10 pt-24 md:pt-28 flex justify-center font-sans text-[var(--text-main)] transition-colors duration-300">
      {/* Contenedor Principal: Se adapta en altura en móvil y se fija en desktop */}
      <div className="w-full max-w-[1280px] min-h-[calc(100vh-120px)] lg:h-[850px] bg-[var(--main-card)] rounded-xl shadow-[var(--card-shadow)] flex flex-col overflow-hidden border border-[var(--main-border)] transition-colors duration-300">
        
        {/* HEADER */}
        <div className="px-4 sm:px-6 md:px-10 py-6 border-b border-[var(--main-border)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl text-[var(--text-main)]" style={{ fontFamily: 'var(--font-antiqua)' }}>
              Panel de Control de Reservas
            </h1>
            <p className="text-[var(--text-muted)] text-xs md:text-sm mt-1">
              Visualización general, filtrado por estados y herramientas de cancelación.
            </p>
          </div>
        </div>

        {/* CONTADORES RÁPIDOS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 sm:px-6 md:px-10 py-5 bg-[var(--input-bg)] border-b border-[var(--main-border)]">
          <div className="p-4 bg-[var(--main-card)] border border-[var(--main-border)] rounded-lg shadow-sm">
            <span className="text-xs text-[var(--text-muted)] uppercase font-semibold">Total Registros</span>
            <p className="text-2xl font-bold text-[var(--brand-rust)] mt-1">{reservas.length}</p>
          </div>
          <div className="p-4 bg-[var(--main-card)] border border-[var(--main-border)] rounded-lg shadow-sm">
            <span className="text-xs text-[var(--text-muted)] uppercase font-semibold">Activas en Curso</span>
            <p className="text-2xl font-bold text-[var(--brand-green)] mt-1">
              {reservas.filter(r => r.estadoVisual === 'Activa').length}
            </p>
          </div>
          <div className="p-4 bg-[var(--main-card)] border border-[var(--main-border)] rounded-lg shadow-sm">
            <span className="text-xs text-[var(--text-muted)] uppercase font-semibold">Pendientes Próximas</span>
            <p className="text-2xl font-bold text-[var(--brand-yellow-hover)] mt-1">
              {reservas.filter(r => r.estadoVisual === 'Pendiente').length}
            </p>
          </div>
        </div>

        {/* CUERPO PRINCIPAL: Apilado en móvil, dividido en columnas en LG */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_420px] flex-grow overflow-hidden">
          
          {/* LADO IZQUIERDO: FILTROS Y TABLA */}
          <div className="p-4 sm:p-6 md:p-10 lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-[var(--main-border)] bg-[var(--main-card)] flex flex-col min-h-[400px]">
            
            {/* Filtros */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] z-10" size={18} />
                <input 
                  type="text" 
                  value={filtros.email}
                  onChange={(e) => setFiltros({...filtros, email: e.target.value})}
                  placeholder="Filtrar por email de usuario..." 
                  className="input-primary !py-2.5 !pl-10 w-full"
                />
              </div>
              <select 
                value={filtros.estado}
                onChange={(e) => setFiltros({...filtros, estado: e.target.value})}
                className="input-primary !py-2.5 cursor-pointer w-full sm:w-auto sm:max-w-[180px]"
              >
                <option value="">Todos los estados</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Activa">Activa</option>
                <option value="Pasada">Pasada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>

            {/* Tabla de Datos - Con overflow-x-auto para no romper en móviles */}
            {cargando ? (
              <div className="text-center p-10 text-[var(--text-muted)] flex-1">Cargando listado de reservas...</div>
            ) : (
              <div className="overflow-x-auto w-full -mx-4 sm:mx-0 px-4 sm:px-0 flex-1">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b-2 border-[var(--main-border)]">
                      <th className="py-3 px-2 text-xs text-[var(--text-muted)] uppercase font-semibold">ID / Hab.</th>
                      <th className="py-3 px-4 text-xs text-[var(--text-muted)] uppercase font-semibold">Usuario</th>
                      <th className="py-3 px-4 text-xs text-[var(--text-muted)] uppercase font-semibold">Fechas</th>
                      <th className="py-3 px-4 text-xs text-[var(--text-muted)] uppercase font-semibold">Estado</th>
                      <th className="py-3 px-4 text-xs text-[var(--text-muted)] uppercase font-semibold text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservasFiltradas.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-sm text-[var(--text-muted)] italic">
                          No se encontraron reservas con los filtros aplicados.
                        </td>
                      </tr>
                    ) : (
                      reservasFiltradas.map((res) => (
                        <tr 
                          key={res.id} 
                          className={`
                            border-b border-[var(--main-border)] transition-colors hover:bg-[var(--input-bg)]
                            ${res.estadoVisual === 'Cancelada' ? 'opacity-60 bg-[var(--brand-red)]/5' : ''}
                            ${reservaSeleccionada?.id === res.id ? 'bg-[var(--brand-rust)]/10 border-l-2 border-[var(--brand-rust)]' : ''}
                          `}
                        >
                          <td className="py-4 px-2">
                            <p className="font-bold text-sm text-[var(--text-main)]">#{res.id}</p>
                            <p className="text-xs text-[var(--text-muted)]">Hab. {res.habitacionId}</p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="font-semibold text-xs flex items-center gap-1 text-[var(--text-main)]"><User size={12}/> {res.usuarioNombre}</p>
                            <p className="text-[11px] text-[var(--text-muted)]">{res.usuarioEmail}</p>
                          </td>
                          <td className="py-4 px-4 text-xs text-[var(--text-main)]">
                            <p className="font-medium flex items-center gap-1"><Calendar size={12}/> In: {res.fechaEntrada}</p>
                            <p className="text-[var(--text-muted)] pl-4">Out: {res.fechaSalida}</p>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase inline-flex items-center gap-1 ${
                              res.estadoVisual === 'Activa' ? 'bg-green-100 text-green-700' :
                              res.estadoVisual === 'Pendiente' ? 'bg-amber-100 text-amber-700' :
                              res.estadoVisual === 'Pasada' ? 'bg-blue-100 text-blue-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {res.estadoVisual === 'Activa' && <CheckCircle size={10} />}
                              {res.estadoVisual === 'Pendiente' && <Clock size={10} />}
                              {res.estadoVisual === 'Cancelada' && <AlertCircle size={10} />}
                              {res.estadoVisual}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            {res.estadoVisual !== 'Cancelada' && res.estadoVisual !== 'Pasada' ? (
                              <button 
                                onClick={() => seleccionarParaCancelar(res)}
                                className="text-[var(--brand-rust)] font-bold text-xs uppercase hover:underline cursor-pointer bg-transparent border-none"
                              >
                                Cancelar
                              </button>
                            ) : (
                              <span className="text-xs text-[var(--text-muted)] italic">Inalterable</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* LADO DERECHO: PANEL DE ACCIÓN Y FORMULARIO DE CORREO */}
          <div className="p-4 sm:p-6 md:p-8 bg-[var(--main-card)] flex flex-col gap-6 overflow-y-auto min-h-[400px]">
            <h3 className="text-xl md:text-2xl border-b-2 border-[var(--brand-yellow)] pb-2 text-[var(--text-main)]" style={{ fontFamily: 'var(--font-antiqua)' }}>
              Gestión de Cancelación
            </h3>

            {!reservaSeleccionada ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-[var(--text-muted)] px-4 gap-2 py-10 lg:py-0">
                <ShieldAlert size={36} className="text-[var(--text-muted)] opacity-40 mb-2" />
                <p className="text-sm font-medium">Ninguna reserva activa seleccionada</p>
                <p className="text-xs">Selecciona "CANCELAR" en las filas de la tabla para desplegar el formulario.</p>
              </div>
            ) : (
              <form onSubmit={enviarAvisoYCancelar} className="flex flex-col gap-5 animate-fadeIn">
                
                {/* Resumen Alerta */}
                <div className="p-4 bg-[var(--brand-red)]/10 border border-dashed border-[var(--brand-red)] rounded-lg">
                  <h4 className="text-[var(--brand-red)] text-sm font-bold flex items-center gap-2 mb-1">
                    <ShieldAlert size={16} />
                    Confirmación Necesaria
                  </h4>
                  <p className="text-xs text-[var(--text-main)]">
                    Estás a punto de cancelar la **Reserva #{reservaSeleccionada.id}** correspondiente al usuario <strong>{reservaSeleccionada.usuarioNombre}</strong>.
                  </p>
                </div>

                {/* Campo Asunto */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[var(--text-muted)] uppercase flex items-center gap-1.5">
                    <Mail size={14} /> Asunto de la Notificación
                  </label>
                  <input 
                    type="text"
                    value={asunto}
                    onChange={(e) => setAsunto(e.target.value)}
                    disabled={procesando}
                    required
                    placeholder="Asunto del correo electrónico..."
                    className="input-primary !py-2.5"
                  />
                </div>

                {/* Campo Cuerpo Mensaje */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[var(--text-muted)] uppercase flex items-center gap-1.5">
                    <AlignLeft size={14} /> Cuerpo del Correo Afectado
                  </label>
                  <textarea 
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    disabled={procesando}
                    required
                    placeholder="Escribe el motivo detallado de la cancelación..."
                    className="input-primary !py-3 h-32 sm:h-48 resize-none text-xs leading-relaxed"
                  />
                </div>

                <p className="text-[11px] text-[var(--text-muted)] italic leading-tight">
                  * Al hacer clic en el botón inferior, el estado pasará inmediatamente a 'cancelada' en la base de datos y se disparará el correo hacia {reservaSeleccionada.usuarioEmail}.
                </p>

                {/* Botones de acción */}
                <div className="flex flex-col gap-2 mt-2">
                  <button 
                    type="submit"
                    disabled={procesando}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--brand-red)] text-white font-bold rounded-md hover:bg-[var(--brand-red-hover)] transition-colors cursor-pointer disabled:opacity-50 text-xs sm:text-sm tracking-wider"
                  >
                    <Send size={16} />
                    {procesando ? "PROCESANDO ENVÍO..." : "CANCELAR RESERVA"}
                  </button>
                  
                  <button 
                    type="button"
                    onClick={() => setReservaSeleccionada(null)}
                    disabled={procesando}
                    className="w-full py-2 bg-transparent text-[var(--text-muted)] border border-[var(--main-border)] font-medium rounded-md hover:bg-[var(--input-bg)] text-xs transition-colors cursor-pointer"
                  >
                    Descartar Acción
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>

    <Footer />
    </ >
  );
}