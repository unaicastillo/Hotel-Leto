import React from "react";
import { Link } from "react-router-dom";
import { Heading, Text } from "../components/ui/Typography";
import Button from "../components/ui/Button";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useReservaSalon } from "../hooks/useReservaSalon";
import { CheckCircle, CheckCircle2 } from "lucide-react";

export const ReservaSalonPage = () => {
  // Hook exclusivo para enviar los textos a EmailJS
  const { loading, enviado, errorMensaje, enviarSolicitud } = useReservaSalon();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    enviarSolicitud(e.currentTarget);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-32 pb-16 bg-[#faf9f8] dark:bg-[var(--bg-light)]">
        <div className="container-custom max-w-6xl">
          
          {/* 1. SECCIÓN HERO (Título + Imagen) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <Heading level={1} className="text-[var(--brand-rust)] dark:text-[var(--brand-yellow)] mb-6 text-5xl md:text-6xl leading-tight">
                Reserva del<br />Salón de Eventos
              </Heading>
              <Text variant="lead" className="mb-6">
                Instalación con una superficie de 140m² y capacidad para 80-96 personas. Espacio habilitado para la celebración de Cenas de Gala, Eventos de Empresa, Presentaciones de Producto y Reuniones Corporativas.
              </Text>
              <Link to="/info-salon">
                <Text className="font-semibold hover:underline text-[var(--brand-rust)] dark:text-[var(--brand-yellow)] flex items-center gap-2">
                  Más información sobre las instalaciones &rarr;
                </Text>
              </Link>
            </div>
            <div className="h-64 lg:h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop" 
                alt="Salón de eventos Hotel Leto" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 2. SECCIÓN PROCEDIMIENTO Y ESPECIFICACIONES */}
          <div className="bg-white dark:bg-[var(--main-card)] rounded-3xl p-8 md:p-14 shadow-sm border border-[var(--main-border)] mb-16">
            <Heading level={2} className="text-center mb-12 text-3xl">
              Procedimiento y Especificaciones
            </Heading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
              
              {/* Columna Izquierda: Proceso */}
              <div>
                <Heading level={3} className="text-[var(--brand-rust)] dark:text-[var(--brand-yellow)] text-xl mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">
                  Proceso de Reserva
                </Heading>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-950/30 text-[var(--brand-rust)] dark:text-[var(--brand-yellow)] flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-bold text-[var(--text-main)] mb-1">Envío de Solicitud</h4>
                      <Text variant="muted" className="text-sm">Deberá rellenar y enviar el formulario de contacto con los detalles de su evento. El sistema notificará automáticamente a nuestra administración.</Text>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-950/30 text-[var(--brand-rust)] dark:text-[var(--brand-yellow)] flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-bold text-[var(--text-main)] mb-1">Coordinación y Respuesta</h4>
                      <Text variant="muted" className="text-sm">Los administradores evaluarán su solicitud y enviarán una respuesta personalizada por correo electrónico para continuar la gestión de forma directa.</Text>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-950/30 text-[var(--brand-rust)] dark:text-[var(--brand-yellow)] flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-bold text-[var(--text-main)] mb-1">Confirmación y Registro</h4>
                      <Text variant="muted" className="text-sm">Una vez acordados los términos, el equipo administrativo procederá a la creación manual de la reserva en el sistema utilizando los datos proporcionados.</Text>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Usos */}
              <div>
                <Heading level={3} className="text-[var(--brand-rust)] dark:text-[var(--brand-yellow)] text-xl mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">
                  Capacidad y Usos
                </Heading>
                <ul className="space-y-6">
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-[var(--brand-yellow)] shrink-0 mt-0.5" />
                    <Text className="text-sm"><strong className="text-[var(--text-main)]">Características Técnicas:</strong> Superficie total de 140m² con capacidad máxima para 80-96 personas.</Text>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-[var(--brand-yellow)] shrink-0 mt-0.5" />
                    <Text className="text-sm"><strong className="text-[var(--text-main)]">Eventos Sociales y de Ocio (Tarde-Noche):</strong> Disponible para cenas de gala, cenas de empresa, fiestas de cumpleaños y cócteles (a partir de las 21:00h).</Text>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-[var(--brand-yellow)] shrink-0 mt-0.5" />
                    <Text className="text-sm"><strong className="text-[var(--text-main)]">Eventos Corporativos y de Negocios:</strong> Adecuado para reuniones, juntas de accionistas, talleres de teambuilding, formaciones, presentaciones de producto y ruedas de prensa (1-2 horas).</Text>
                  </li>
                  <li className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-[var(--brand-yellow)] shrink-0 mt-0.5" />
                    <Text className="text-sm"><strong className="text-[var(--text-main)]">Formatos de Montaje:</strong> Posibilidad de configurar el mobiliario en formato banquete, escuela o reunión, según los requerimientos del acto.</Text>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* 3. SECCIÓN FORMULARIO DE SOLICITUD */}
          <div className="bg-[#a33818] dark:bg-[#822b11] rounded-3xl p-8 md:p-14 shadow-xl">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <Heading level={2} className="text-white mb-4 text-3xl">Formulario de Solicitud</Heading>
              <p className="text-white/80 text-sm md:text-base">
                Cumplimente los siguientes campos para iniciar el trámite. Nuestro equipo contactará con usted a la mayor brevedad.
              </p>
            </div>

            {enviado ? (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-10 text-center text-white max-w-2xl mx-auto">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-[var(--brand-yellow)]" />
                <Heading level={3} className="text-white mb-2">¡Solicitud Enviada!</Heading>
                <p className="text-white/80">Hemos recibido los detalles de su evento. El administrador evaluará la propuesta y le responderá a la brevedad.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
                
                {errorMensaje && (
                  <div className="bg-red-500/20 text-red-100 p-4 rounded-md border border-red-500/50 text-sm text-center">
                    {errorMensaje}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-white/90 mb-2 block font-semibold text-sm">Nombre Completo</label>
                    <input 
                      type="text" 
                      name="nombre_cliente" 
                      required
                      placeholder="Ej. Juan Pérez"
                      className="input-primary !bg-black/15 !text-white !border !border-white/20 placeholder-white/50 focus:!border-[var(--brand-yellow)] focus:!ring-[var(--brand-yellow)]" 
                    />
                  </div>
                  <div>
                    <label className="text-white/90 mb-2 block font-semibold text-sm">Correo Electrónico</label>
                    <input 
                      type="email" 
                      name="email_cliente" 
                      required
                      placeholder="Ej. juan@empresa.com"
                      className="input-primary !bg-black/15 !text-white !border !border-white/20 placeholder-white/50 focus:!border-[var(--brand-yellow)] focus:!ring-[var(--brand-yellow)]" 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <label className="text-white/90 block font-semibold text-sm">
                      Detalles del Evento
                    </label>
                    <span className="text-white/50 text-xs italic">
                      (Puedes pegar enlaces a Drive/WeTransfer aquí)
                    </span>
                  </div>
                  <textarea 
                    name="mensaje_evento" 
                    required
                    placeholder="Fechas tentativas, número estimado de asistentes, necesidades de montaje..."
                    className="input-primary !bg-black/15 !text-white !border !border-white/20 placeholder-white/50 focus:!border-[var(--brand-yellow)] focus:!ring-[var(--brand-yellow)] h-40 resize-none !px-4"
                  />
                </div>

                {/* BOTÓN ENVIAR */}
                <div className="pt-4 flex justify-center">
                  <Button 
                    variant="secondary" 
                    type="submit" 
                    disabled={loading}
                    className="w-full md:w-auto px-12 py-4 text-sm tracking-widest disabled:opacity-50"
                  >
                    {loading ? "ENVIANDO..." : "ENVIAR SOLICITUD DE RESERVA"}
                  </Button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReservaSalonPage;