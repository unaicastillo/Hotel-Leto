import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRequireAuth } from "../hooks/useAuthGuards";
import { Heading, Text } from "../components/ui/Typography";
import Button from "../components/ui/Button";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import handleDescargarFactura from "../hooks/pdfGenerator.ts"
import { Calendar, FileText, XCircle, Clock, CheckCircle, AlertTriangle } from "lucide-react";

export const MisReservasPage = () => {
  useRequireAuth(); // Protege la ruta de usuarios no logueados
  const [reservas, setReservas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservas = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      // Hacemos un JOIN automático con la tabla habitaciones para traer el tipo y precio base
      const { data } = await supabase.from("reservas").select("*, habitaciones(tipo, precio)").eq("usuario_id", user.id).order("fecha_entrada", { ascending: true });
      if (data) setReservas(data);
      setLoading(false);
    };
    fetchReservas();
  }, []);

  // VALIDACIÓN: Comprueba si faltan más de 48 horas para la entrada
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

  const handleModificar = () => {
    alert("Para modificar las fechas de su estancia, por favor póngase en contacto con Recepción o cancele su reserva actual y realice una nueva.");
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
                        {/* Estado Badge */}
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
                        <span className="font-bold text-[var(--text-main)]">€{reserva.precio}</span>
                      </div>
                    </div>

                    {/* Acciones de la tarjeta */}
                    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 dark:border-gray-800">
                      {puedeGestionar ? (
                        <>
                            <Button variant="danger" className="text-xs !py-2.5 flex-1" onClick={() => handleCancelar(reserva.id)}>Cancelar Reserva</Button>
                        </>
                      ) : (
                        reserva.estado !== "cancelada" && (
                          <div className="text-xs text-amber-600 dark:text-amber-400 font-medium bg-amber-50 dark:bg-amber-950/20 px-3 py-2 rounded-lg flex items-center gap-1.5 max-w-xs">
                            <AlertTriangle size={14} /> Fuera de plazo de modificación (48h de antelación obligatorias)
                          </div>
                        )
                      )}
                      <Button variant="primary" className="text-xs !py-2.5 flex items-center justify-center gap-1.5 w-full sm:w-auto" onClick={() => handleDescargarFactura(reserva)}>
                        <FileText size={14} /> Factura PDF
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
    </>
  );
};

export default MisReservasPage;