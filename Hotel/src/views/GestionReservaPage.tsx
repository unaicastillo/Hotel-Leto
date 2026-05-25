import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRequireAuth } from "../hooks/useAuthGuards";
import { Heading, Text } from "../components/ui/Typography";
import Button from "../components/ui/Button";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import handleDescargarFactura from "../hooks/pdfGenerator";
import { Calendar, FileText, XCircle, Clock, CheckCircle, AlertTriangle, CreditCard, X } from "lucide-react";

// --- IMPORTACIONES DE STRIPE ---
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutForm } from '../components/ui/CheckOutForm'; // Asegúrate de que la ruta sea correcta

// ⚠️ Pon tu Clave Pública de Stripe aquí
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const MisReservasPage = () => {
  useRequireAuth();
  const [reservas, setReservas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- NUEVOS ESTADOS PARA STRIPE ---
  const [procesandoPagoId, setProcesandoPagoId] = useState<number | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [reservaAPagar, setReservaAPagar] = useState<any | null>(null);

  useEffect(() => {
    const fetchReservas = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { data } = await supabase
        .from("reservas")
        .select(`
          *,
          habitaciones(tipo, precio),
          reservas_servicios(
            cantidad,
            precio_unitario,
            servicios(nombre)
          )
        `)
        .eq("usuario_id", user.id)
        .order("fecha_entrada", { ascending: true });
        
      if (data) setReservas(data);
      setLoading(false);
    };
    fetchReservas();
  }, []);

  const esModificable = (fechaEntradaStr: string) => {
    const diferenciaHoras = (new Date(fechaEntradaStr).getTime() - new Date().getTime()) / (1000 * 60 * 60);
    return diferenciaHoras >= 48;
  };

  const handleCancelar = async (id: number) => {
    if (!window.confirm("¿Estás seguro de que deseas cancelar esta reserva?")) return;
    const { error } = await supabase.from("reservas").update({ estado: "cancelada" }).eq("id", id);
    if (!error) {
      setReservas(prev => prev.map(r => r.id === id ? { ...r, estado: "cancelada" } : r));
    }
  };

  // --- LÓGICA PARA INICIAR EL PAGO ---
  const handleIniciarPago = async (reserva: any) => {
    setProcesandoPagoId(reserva.id);
    try {
      const { data: stripeData, error: stripeError } = await supabase.functions.invoke('crear-pago-stripe', {
        body: { precioTotal: reserva.precio_total }
      });

      if (stripeError || !stripeData?.clientSecret) {
        throw new Error("No se pudo conectar con la pasarela de pago.");
      }

      setClientSecret(stripeData.clientSecret);
      setReservaAPagar(reserva);
    } catch (error) {
      alert("Error al iniciar el pago. Inténtalo de nuevo más tarde.");
      console.error(error);
    } finally {
      setProcesandoPagoId(null);
    }
  };

  // --- FUNCIÓN QUE SE EJECUTA CUANDO EL PAGO SE COMPLETA ---
  const handlePagoCompletado = () => {
    // Actualizamos visualmente la reserva a "confirmada" sin tener que recargar la página
    setReservas(prev => prev.map(r => r.id === reservaAPagar.id ? { ...r, estado: "confirmada" } : r));
    alert("¡Pago completado con éxito! Tu reserva ha sido confirmada.");
    
    // Cerramos el modal
    setClientSecret(null);
    setReservaAPagar(null);
  };

  if (loading) return <div className="min-h-screen bg-[#faf9f8] dark:bg-[var(--bg-light)] pt-32 text-center">Cargando tus retiros...</div>;

  return (
    <>
      <Header />
      <div className="min-h-screen pt-24 pb-12 bg-[#faf9f8] dark:bg-[var(--bg-light)]">
        <div className="container-custom max-w-5xl">
          <Heading level={1} className="text-[var(--brand-rust)] mb-2">Mis Reservas</Heading>
          <Text variant="muted" className="mb-8 block">Historial y gestión de tus estancias en Hotel Leto.</Text>

          {reservas.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[var(--main-card)] rounded-2xl border border-[var(--main-border)] p-8 shadow-sm">
              <Heading level={3} className="mb-2">Aún no has escrito tu historia con nosotros</Heading>
              <Text variant="muted" className="mb-6 block">No tienes ninguna reserva activa asociada a tu cuenta.</Text>
              <Button variant="primary" onClick={() => window.location.href = "/reservar"}>Reservar una habitación</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {reservas.map((reserva) => {
                const puedeGestionar = esModificable(reserva.fecha_entrada) && reserva.estado !== "cancelada";

                return (
                  <div key={reserva.id} className="bg-white dark:bg-[var(--main-card)] border border-[var(--main-border)] rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all hover:shadow-md">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-xs font-bold tracking-widest uppercase text-gray-400">#LETO-{reserva.id}</span>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold uppercase flex items-center gap-1 ${
                          reserva.estado === "confirmada" ? "bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400" :
                          reserva.estado === "pendiente" ? "bg-orange-50 text-orange-700 dark:bg-orange-950/20 dark:text-orange-400" :
                          "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        }`}>
                          {reserva.estado === "confirmada" && <CheckCircle size={12} />}
                          {reserva.estado === "pendiente" && <Clock size={12} />}
                          {reserva.estado === "cancelada" && <XCircle size={12} />}
                          {reserva.estado}
                        </span>
                      </div>

                      <Heading level={2} className="!text-xl font-serif text-[var(--text-main)]">
                        Habitación {reserva.habitaciones?.tipo.charAt(0).toUpperCase() + reserva.habitaciones?.tipo.slice(1)}
                      </Heading>

                      <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
                        <span className="flex items-center gap-1.5"><Calendar size={16} className="text-[var(--brand-rust)]"/> {reserva.fecha_entrada} al {reserva.fecha_salida}</span>
                        <span className="font-bold text-[var(--text-main)]">€{reserva.precio_total}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 dark:border-gray-800">
                      
                      {/* BOTÓN DE PAGAR AHORA (Solo si está pendiente) */}
                      {reserva.estado === "pendiente" && puedeGestionar && (
                        <Button 
                          variant="primary" 
                          className="text-xs !py-2.5 flex items-center justify-center gap-1.5 flex-1 bg-green-600 hover:bg-green-700 border-none text-white" 
                          onClick={() => handleIniciarPago(reserva)}
                          disabled={procesandoPagoId === reserva.id}
                        >
                          <CreditCard size={14} /> 
                          {procesandoPagoId === reserva.id ? "Conectando..." : "Pagar Ahora"}
                        </Button>
                      )}

                      {puedeGestionar ? (
                        <Button variant="danger" className="text-xs !py-2.5 flex-1" onClick={() => handleCancelar(reserva.id)}>Cancelar Reserva</Button>
                      ) : (
                        reserva.estado !== "cancelada" && (
                          <div className="text-xs text-amber-600 dark:text-amber-400 font-medium bg-amber-50 dark:bg-amber-950/20 px-3 py-2 rounded-lg flex items-center gap-1.5 max-w-xs">
                            <AlertTriangle size={14} /> Fuera de plazo de modificación
                          </div>
                        )
                      )}
                      
                      <Button variant="info" className="text-xs !py-2.5 flex items-center justify-center gap-1.5 w-full sm:w-auto" onClick={() => handleDescargarFactura(reserva)}>
                        <FileText size={14} /> Factura
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* --- MODAL FLOTANTE PARA STRIPE --- */}
      {clientSecret && reservaAPagar && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-[var(--main-card)] p-6 md:p-8 rounded-2xl shadow-2xl max-w-md w-full relative">
            
            {/* Botón para cerrar el modal */}
            <button 
              onClick={() => { setClientSecret(null); setReservaAPagar(null); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X size={24} />
            </button>

            <Heading level={3} className="mb-1">Completar Pago</Heading>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 pb-4 border-b border-[var(--main-border)]">
              Reserva <strong>#{reservaAPagar.id}</strong> — Total: <strong className="text-[var(--brand-rust)]">€{reservaAPagar.precio_total}</strong>
            </p>

            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm 
                reservaId={reservaAPagar.id} 
                precioTotal={reservaAPagar.precio_total} 
                onPagoExitoso={handlePagoCompletado} 
              />
            </Elements>

          </div>
        </div>
      )}
    </>
  );
};

export default MisReservasPage;