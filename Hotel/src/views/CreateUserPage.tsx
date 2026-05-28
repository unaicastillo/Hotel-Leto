import { User, Mail, ShieldCheck, BellRing, Info } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useCreateUser } from '../hooks/useCreateUser';
import { useRequireAdmin } from '../hooks/useAuthGuards';

export default function CreateUserPage() {
  useRequireAdmin();

  // Ya no importamos setRol
  const { formData, handleChange, password, handleSubmit, loading, error, exito } = useCreateUser();
  
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[var(--bg-light)] p-4 sm:p-6 md:p-10 pt-24 md:pt-28 flex justify-center text-[var(--text-main)] transition-colors duration-300">
        <div className="w-full max-w-[1100px] flex flex-col gap-6">
          
          <div className="mb-2">
            <h1 className="text-3xl font-serif text-[var(--text-main)]" style={{ fontFamily: 'var(--font-antiqua)' }}>
              Alta de Nuevo Cliente
            </h1>
            <p className="text-[var(--text-muted)] text-sm">Registro de nuevos huéspedes en el sistema Leto.</p>
          </div>

          {error && <div className="bg-red-100 text-red-800 p-4 rounded-lg text-sm font-bold border border-red-200">{error}</div>}
          {exito && <div className="bg-green-100 text-green-800 p-4 rounded-lg text-sm font-bold border border-green-200">{exito}</div>}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-[var(--main-card)] p-6 md:p-8 rounded-xl shadow-[var(--card-shadow)] border border-[var(--main-border)]">
                
                <form className="space-y-8" onSubmit={handleSubmit}>
                  
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-[var(--brand-rust)] border-b border-[var(--main-border)] pb-2 mb-4">
                      <User size={18} />
                      <h3 className="font-semibold text-sm uppercase tracking-wider">Datos Personales</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label>Nombre *</label>
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="input-primary" required />
                      </div>
                      <div className="space-y-1.5">
                        <label>Apellidos *</label>
                        <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} className="input-primary" required />
                      </div>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-[var(--brand-rust)] border-b border-[var(--main-border)] pb-2 mb-4">
                      <Mail size={18} />
                      <h3 className="font-semibold text-sm uppercase tracking-wider">Información de Contacto</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label>Correo Electrónico *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-primary" required />
                      </div>
                      <div className="space-y-1.5">
                        <label>Teléfono</label>
                        <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="input-primary" />
                      </div>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-[var(--brand-rust)] border-b border-[var(--main-border)] pb-2 mb-4">
                      <ShieldCheck size={18} />
                      <h3 className="font-semibold text-sm uppercase tracking-wider">Seguridad y Nivel de Acceso</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label>Contraseña temporal</label>
                        <input type="text" value={password} className="input-primary bg-gray-50 text-gray-500 font-mono" readOnly />
                      </div>
                      

                      
                    </div>
                  </section>

                  <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-6 border-t border-[var(--main-border)]">
                    <button type="button" onClick={() => window.history.back()} className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--brand-rust)] transition-colors px-6 py-3">
                      VOLVER
                    </button>
                    <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto uppercase tracking-widest text-xs px-10 disabled:opacity-50">
                      {loading ? 'PROCESANDO...' : 'REGISTRAR CLIENTE'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[var(--main-card)] rounded-xl shadow-md border border-[var(--main-border)] overflow-hidden">
                <div className="bg-[var(--brand-yellow)] p-4 flex items-center gap-3">
                  <div className="bg-black/10 p-2 rounded-full">
                    <BellRing size={20} className="text-black" />
                  </div>
                  <div>
                    <h4 className="text-black font-bold text-sm">Notificación Automática</h4>
                    <p className="text-black/60 text-[10px] leading-tight">Al confirmar, se enviará este correo oficial.</p>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-[var(--brand-rust)]">
                    <Info size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Vista Previa</span>
                  </div>
                  
                  <div className="bg-[var(--input-bg)] p-4 rounded border border-[var(--main-border)] space-y-3">
                    <p className="text-[11px] font-bold">Asunto: Acceso Concedido - Directorio Leto</p>
                    <div className="h-px bg-[var(--main-border)] w-full"></div>
                    <p className="text-[11px] leading-relaxed text-[var(--text-muted)] italic">
                      Estimado/a <strong>{formData.nombre || '[Nombre]'} {formData.apellidos || '[Apellidos]'}</strong>,<br /><br />
                      Se ha completado su alta en el sistema. Sus credenciales son:<br /><br />
                      Email: <strong>{formData.email || '[Email]'}</strong><br />
                      Contraseña temporal: <strong>{password}</strong><br /><br />
                      Le recomendamos cambiarla al acceder por primera vez.
                    </p>
                  </div>
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