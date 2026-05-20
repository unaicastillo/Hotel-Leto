import { useGestionUsuarios } from '../hooks/useUserManagement'; // Importamos el Hook
import { Heading, Text } from '../components/ui/Typography';
import Button from '../components/ui/Button';
import IconInput from '../components/ui/IconInput';
import { useRequireAdmin } from '../hooks/useAuthGuards';
import { Hash, User, Mail, Phone, Eraser, Send, Trash2, CheckCircle, Loader2 } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export const UserManagementPage = () => {
  // Extraemos toda la lógica y estados desde nuestro Custom Hook
    useRequireAdmin();
    const { isCheckingAdmin } = useRequireAdmin();
  const {
    cargando,
    usuariosFiltrados,
    filtros,
    setFiltros,
    limpiarFiltros,
    eliminarUsuario,
    emailDestino,
    setEmailDestino,
    asunto,
    setAsunto,
    mensaje,
    setMensaje,
    estadoEnvio,
    handleEnviarMensaje
  } = useGestionUsuarios();


  // 3. Mientras se comprueba en la base de datos que es admin se muestra:  
  if (isCheckingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f8] dark:bg-[var(--bg-light)]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-[var(--brand-rust)] mx-auto mb-4" />
          <Text variant="muted">Verificando Credenciales...</Text>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-[#faf9f8] dark:bg-[var(--bg-light)]">

        <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
          {/* Cabecera */}
          <div className="mb-10">
            <Text className="uppercase tracking-widest text-xs font-bold text-[var(--brand-rust)] mb-2">
              Directorio Operativo
            </Text>
            <Heading level={1} className="text-[var(--brand-rust)] text-5xl mb-4">
              Gestión de<br/>Usuarios.
            </Heading>
            <Text variant="lead">Directorio operativo y control de comunicaciones</Text>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
            
            {/* COLUMNA IZQUIERDA: Filtros y Tabla */}
            <div className="xl:col-span-2 space-y-6">
              
              {/* Filtros */}
              <div className="bg-white dark:bg-[var(--main-card)] p-6 rounded-2xl shadow-sm border border-[var(--main-border)]">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <IconInput 
                    label="ID de Usuario" icon={Hash} placeholder="Ej. 550e8400..." 
                    value={filtros.id} onChange={(e) => setFiltros({...filtros, id: e.target.value})} 
                  />
                  <IconInput 
                    label="Nombre Completo" icon={User} placeholder="Buscar por nombre" 
                    value={filtros.nombre} onChange={(e) => setFiltros({...filtros, nombre: e.target.value})} 
                  />
                  <IconInput 
                    label="Correo Electrónico" icon={Mail} placeholder="usuario@correo.com" 
                    value={filtros.email} onChange={(e) => setFiltros({...filtros, email: e.target.value})} 
                  />
                  <div className="flex gap-2">
                    <IconInput 
                      label="Teléfono" icon={Phone} placeholder="+34..." 
                      value={filtros.telefono} onChange={(e) => setFiltros({...filtros, telefono: e.target.value})} 
                    />
                    <button 
                      onClick={limpiarFiltros}
                      title="Limpiar filtros"
                      className="h-10 px-3 mt-5 bg-[var(--input-bg)] hover:bg-[var(--input-bg-focus)] rounded-md text-[var(--brand-rust)] transition-colors flex items-center justify-center border border-transparent hover:border-[var(--brand-rust)]/30"
                    >
                      <Eraser className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabla */}
              <div className="bg-white dark:bg-[var(--main-card)] rounded-2xl shadow-sm border border-[var(--main-border)] overflow-hidden">
                <div className="overflow-x-auto min-h-[300px]">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase text-[var(--text-muted)] bg-[#faf9f8] dark:bg-black/20 border-b border-[var(--main-border)]">
                      <tr>
                        <th className="px-6 py-4 font-bold tracking-widest">Nombre</th>
                        <th className="px-6 py-4 font-bold tracking-widest">Correo Electrónico</th>
                        <th className="px-6 py-4 font-bold tracking-widest">Teléfono</th>
                        <th className="px-6 py-4 font-bold tracking-widest">Fecha Reg.</th>
                        <th className="px-6 py-4 font-bold tracking-widest text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cargando ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center">
                            <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-rust)] mx-auto mb-4" />
                            <span className="text-[var(--text-muted)]">Cargando base de datos...</span>
                          </td>
                        </tr>
                      ) : usuariosFiltrados.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-[var(--text-muted)]">
                            No se encontraron usuarios con esos filtros.
                          </td>
                        </tr>
                      ) : (
                        usuariosFiltrados.map((user, idx) => (
                          <tr 
                            key={user.id} 
                            onClick={() => setEmailDestino(user.email)}
                            className={`border-b border-[var(--main-border)] last:border-0 cursor-pointer transition-colors hover:bg-orange-50 dark:hover:bg-[var(--brand-rust)]/10 ${idx % 2 === 0 ? '' : 'bg-black/5 dark:bg-white/5'}`}
                          >
                            <td className="px-6 py-4 font-medium text-[var(--text-main)]">
                              {user.nombre}
                            </td>
                            <td className="px-6 py-4 text-[var(--text-muted)]">{user.email}</td>
                            <td className="px-6 py-4 text-[var(--text-muted)]">{user.telefono}</td>
                            <td className="px-6 py-4 text-[var(--text-muted)]">{user.fecha}</td>
                            <td className="px-6 py-4 text-right">
                              <button 
                                onClick={(e) => eliminarUsuario(user.id, e)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors"
                                title="Eliminar usuario"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 bg-[#faf9f8] dark:bg-black/20 text-xs text-[var(--text-muted)] border-t border-[var(--main-border)] flex justify-between">
                  <span>Mostrando {usuariosFiltrados.length} usuarios</span>
                </div>
              </div>
              
              <Text className="text-xs text-[var(--text-muted)] italic">
                * Seleccione un usuario en la tabla para rellenar automáticamente el formulario de comunicación.
              </Text>
            </div>

            {/* COLUMNA DERECHA: Formulario de Envío */}
            <div className="xl:col-span-1 bg-white dark:bg-[var(--main-card)] rounded-3xl shadow-xl border border-[var(--main-border)] overflow-hidden flex flex-col h-full relative">
              <div className="h-32 bg-[url('https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center relative">
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[var(--main-card)] to-transparent"></div>
              </div>
              
              <form onSubmit={handleEnviarMensaje} className="p-8 relative z-10 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-8 border-b border-[var(--main-border)] pb-4">
                  <Send className="text-[var(--brand-rust)] w-6 h-6" />
                  <Heading level={3} className="text-2xl text-[var(--text-main)]">Envío Directo</Heading>
                </div>

                <div className="space-y-5 flex-1">
                  <div>
                    <label className="text-xs text-[var(--text-muted)] font-medium mb-1 block">Correo del destinatario</label>
                    <IconInput 
                      icon={Mail} 
                      placeholder="correo@ejemplo.es" 
                      value={emailDestino}
                      onChange={(e) => setEmailDestino(e.target.value)}
                      required
                      className="!bg-orange-50/50 dark:!bg-black/30 border border-orange-100 dark:border-white/10"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs text-[var(--text-muted)] font-medium mb-1 block">Cabecera del mensaje</label>
                    <input 
                      type="text" 
                      placeholder="Ingrese el asunto" 
                      value={asunto}
                      onChange={(e) => setAsunto(e.target.value)}
                      required
                      className="input-primary" 
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <label className="text-xs text-[var(--text-muted)] font-medium mb-1 block">Cuerpo del mensaje</label>
                    <textarea 
                      placeholder="Escriba su mensaje aquí..." 
                      value={mensaje}
                      onChange={(e) => setMensaje(e.target.value)}
                      required
                      className="input-primary flex-1 min-h-[200px] resize-none !rounded-xl"
                    ></textarea>
                  </div>
                </div>

                {estadoEnvio === 'exito' ? (
                  <div className="w-full mt-8 py-3 bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400 border border-green-200 dark:border-green-500/20 rounded flex items-center justify-center gap-2 text-sm font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    MENSAJE ENVIADO
                  </div>
                ) : (
                  <Button 
                    variant="primary" 
                    type="submit"
                    disabled={estadoEnvio === 'enviando'}
                    className={`w-full mt-8 py-4 tracking-widest text-xs ${estadoEnvio === 'enviando' ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {estadoEnvio === 'enviando' ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
                  </Button>
                )}
              </form>
            </div>

          </div>
        </main>
      </div>

      <Footer />
    
    </>
  );
};

export default UserManagementPage;