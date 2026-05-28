import { Heading, Text } from "../components/ui/Typography";
import Button from "../components/ui/Button";
import { Calendar, User, Users, Coffee, Utensils, ShieldCheck } from "lucide-react";
import { useRequireAuth } from "../hooks/useAuthGuards";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useReserva, categorias } from "../hooks/useReservation";
import { useNavigate } from "react-router-dom";

// IMPORTACIONES DE STRIPE (Asegúrate de ajustar la ruta del CheckoutForm)
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutForm } from "../components/ui/CheckoutForm"; 

// ⚠️ CARGAR STRIPE FUERA DEL COMPONENTE (Usa tu Clave Pública "pk_test_...")
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const uiCategorias = [
  { id: "individual", label: "Individual", icon: User },
  { id: "doble", label: "Doble", icon: Users },
  { id: "suite", label: "Familiar (Suite)", icon: Users },
];

export const ReservaPage = () => {
  useRequireAuth();
  const navigate = useNavigate();

  const {
    fechaEntrada, handleCambioEntrada, fechaSalida, setFechaSalida,
    getFechaMinimaSalida, getFechaMaximaSalida,
    tipo, setTipo, huespedes, setHuespedes,
    servicios, toggleServicio,
    loading, mensaje, total, noches, handleReservar,
    clientSecret, reservaIdActual, setMensaje
  } = useReserva();

  // Función que se ejecutará cuando Stripe apruebe el pago en el CheckoutForm
  const handlePagoCompletado = () => {
    alert("¡Pago completado con éxito! Tu reserva está confirmada.");
    navigate("/"); // Ahora sí redirigimos
  };

  return (
    <>
    <Header />
    <div className="min-h-screen pt-24 pb-12 bg-[#faf9f8] dark:bg-[var(--bg-light)]">
      <div className="container-custom max-w-6xl">
        <Heading level={1} className="text-[var(--brand-rust)] mb-8">
          {clientSecret ? "Completar Pago Seguro" : "Tu Retiro"}
        </Heading>

        {mensaje && (
          <div className={`p-4 mb-6 rounded text-sm font-medium ${mensaje.includes("éxito") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {mensaje}
          </div>
        )}

        {/* SI EXISTE CLIENT SECRET: MOSTRAMOS EL PAGO */}
        {clientSecret ? (
          <div className="max-w-xl mx-auto bg-white dark:bg-[var(--main-card)] p-8 rounded-xl shadow-lg border border-[var(--main-border)]">
            <div className="flex items-center gap-2 text-green-600 mb-6">
              <ShieldCheck size={24} />
              <p className="font-bold">Reserva guardada. Por favor, completa el pago.</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mb-6 text-sm">
              <p className="mb-1 text-gray-500">Reserva ID: <strong>#{reservaIdActual}</strong></p>
              <p className="mb-1 text-gray-500">Estancia: <strong>{noches} Noches</strong> ({fechaEntrada} a {fechaSalida})</p>
              <p className="text-lg font-bold text-[var(--brand-rust)] mt-2">Total a pagar: {total}€</p>
            </div>

            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm 
                reservaId={reservaIdActual!} 
                precioTotal={total} 
                onPagoExitoso={handlePagoCompletado} 
              />
            </Elements>
            
            <button 
              onClick={() => {
                setMensaje("Pago cancelado. La reserva queda como 'Pendiente' en tu historial.");
                navigate("/");
              }}
              className="mt-6 w-full text-center text-sm text-gray-500 hover:underline"
            >
              Pagar más tarde
            </button>
          </div>
        ) : (
          
          /* SI NO HAY CLIENT SECRET: MOSTRAMOS EL FORMULARIO ORIGINAL */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              
              <div className="bg-white dark:bg-[var(--main-card)] p-6 rounded-xl shadow-sm border border-[var(--main-border)]">
                <Heading level={3} variant="default" className="mb-4 text-lg">Fechas de Estancia (Máx. 7 Noches)</Heading>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label>LLEGADA</label>
                    <div className="relative mt-1">
                      <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <input type="date" className="input-primary pl-10" value={fechaEntrada} onChange={e => handleCambioEntrada(e.target.value)} min={new Date().toISOString().split("T")[0]} />
                    </div>
                  </div>
                  <div>
                    <label>SALIDA</label>
                    <div className="relative mt-1">
                      <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                      <input type="date" className="input-primary pl-10 disabled:opacity-50" value={fechaSalida} onChange={e => setFechaSalida(e.target.value)} min={getFechaMinimaSalida()} max={getFechaMaximaSalida()} disabled={!fechaEntrada} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[var(--main-card)] p-6 rounded-xl shadow-sm border border-[var(--main-border)]">
                <Heading level={3} variant="default" className="mb-4 text-lg">Categoría de Habitación</Heading>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {uiCategorias.map((cat) => {
                    const dataCat = categorias.find(c => c.id === cat.id);
                    return (
                      <div key={cat.id} onClick={() => setTipo(cat.id as any)} className={`cursor-pointer p-4 rounded-lg border-2 text-center transition-all ${tipo === cat.id ? 'border-[var(--brand-rust)] bg-orange-50/50 dark:bg-orange-900/10' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
                        <cat.icon className={`w-8 h-8 mx-auto mb-2 ${tipo === cat.id ? 'text-[var(--brand-rust)]' : 'text-gray-400'}`} />
                        <h4 className="font-bold text-sm">{cat.label}</h4>
                        <span className="text-xs text-gray-500">Máx. {dataCat?.cap} Personas</span>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <Text className="font-medium">Número de Huéspedes</Text>
                  <div className="flex items-center gap-4">
                    <button type="button" onClick={() => setHuespedes(Math.max(1, huespedes - 1))} className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">-</button>
                    <span className="font-bold w-4 text-center">{huespedes}</span>
                    <button type="button" onClick={() => setHuespedes(Math.min(categorias.find(c => c.id === tipo)?.cap || 1, huespedes + 1))} className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">+</button>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[var(--main-card)] p-6 rounded-xl shadow-sm border border-[var(--main-border)]">
                <Heading level={3} variant="default" className="mb-4 text-lg">Añadidos Gastronómicos</Heading>
                <div className="space-y-3">
                  {[
                    { id: "Desayuno Buffet", label: "Desayuno Buffet", desc: "Comienza tu día con repostería artesanal local.", icon: Coffee },
                    { id: "Media Pensión", label: "Media Pensión (Comida)", desc: "Incluye almuerzo de tres platos en nuestro restaurante.", icon: Utensils }
                  ].map((extra) => (
                    <label key={extra.id} className="flex items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <input type="checkbox" className="mt-1 mr-4 w-5 h-5 accent-[var(--brand-rust)] cursor-pointer" checked={servicios.includes(extra.id)} onChange={() => toggleServicio(extra.id)} />
                      <div>
                        <span className="font-bold text-sm flex items-center gap-2"><extra.icon className="w-4 h-4 text-[var(--brand-rust)]"/> {extra.label}</span>
                        <span className="text-xs text-gray-500">{extra.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

            </div>

            <div className="lg:col-span-1">
              <div className="bg-[#2A2624] text-white rounded-xl overflow-hidden sticky top-24 shadow-xl">
                <div className="h-48 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop" alt="Room" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A2624] to-transparent"></div>
                </div>
                
                <div className="p-6 relative z-10 -mt-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/20 mb-6">
                    <h3 className="font-antiqua text-2xl font-bold mb-2">Habitación {uiCategorias.find(c => c.id === tipo)?.label}</h3>
                    <p className="text-sm text-gray-300 opacity-80 mb-6">
                      {noches > 0 ? `Estancia de ${noches} noche${noches > 1 ? 's' : ''}` : "Selecciona fechas para calcular."}
                    </p>
                    
                    <div className="border-t border-white/20 pt-4 flex justify-between items-end">
                      <span className="text-sm tracking-widest uppercase opacity-80">Total</span>
                      <span className="text-3xl font-bold text-[var(--brand-yellow)]">{total > 0 ? `€${total}` : "—"}</span>
                    </div>
                  </div>

                  {/* EL BOTÓN AHORA INICIA EL PROCESO HACIA STRIPE */}
                  <Button variant="primary" className="w-full py-4 text-sm tracking-widest" onClick={handleReservar} disabled={loading || total === 0 || !fechaEntrada || !fechaSalida || noches <= 0 || noches > 7}>
                    {loading ? "PROCESANDO..." : "PROCEDER AL PAGO"}
                  </Button>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
    <Footer />
    </>
  );
};

export default ReservaPage;