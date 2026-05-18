import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Heading, Text } from "../components/ui/Typography";
import Button from "../components/ui/Button";
import { Calendar, User, Users, Coffee, Utensils } from "lucide-react";
import { useRequireAuth } from "../hooks/useAuthGuards";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export const ReservaPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [usuarioId, setUsuarioId] = useState<string | null>(null);

  // Estados del formulario
  const [fechaEntrada, setFechaEntrada] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [tipo, setTipo] = useState<"individual" | "doble" | "suite">("doble");
  const [huespedes, setHuespedes] = useState(2);
  const [servicios, setServicios] = useState<string[]>([]);

  const categorias = [
    { id: "individual", label: "Individual", icon: User, cap: 1, precioBase: 90 },
    { id: "doble", label: "Doble", icon: Users, cap: 2, precioBase: 140 },
    { id: "suite", label: "Familiar (Suite)", icon: Users, cap: 4, precioBase: 250 },
  ];

  useRequireAuth();


  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
      } else {
        setUsuarioId(user.id);
      }
    };
    checkUser();
  }, [navigate]);

  const calcularPrecio = () => {
    if (!fechaEntrada || !fechaSalida) return 0;
    const dias = Math.ceil((new Date(fechaSalida).getTime() - new Date(fechaEntrada).getTime()) / (1000 * 60 * 60 * 24));
    if (dias <= 0) return 0;
    
    const precioHabitacion = categorias.find(c => c.id === tipo)?.precioBase || 0;
    const precioServicios = servicios.length * 25; // 25€ por extra (ejemplo)
    
    return (precioHabitacion + precioServicios) * dias;
  };

  const toggleServicio = (servicio: string) => {
    setServicios(prev => prev.includes(servicio) ? prev.filter(s => s !== servicio) : [...prev, servicio]);
  };

  const handleReservar = async () => {
    if (!fechaEntrada || !fechaSalida) return setMensaje("Por favor, selecciona las fechas.");
    if (new Date(fechaEntrada) >= new Date(fechaSalida)) return setMensaje("La fecha de salida debe ser posterior a la de entrada.");
    
    setLoading(true);
    setMensaje("");

    try {
      const { data: habitacionIdLibre, error: errRpc } = await supabase.rpc('buscar_habitacion_libre', {
        p_tipo: tipo,
        p_entrada: fechaEntrada,
        p_salida: fechaSalida
      });

      if (errRpc) throw errRpc;

      // Si devuelve null, es que todo está ocupado
      if (!habitacionIdLibre) {
        setMensaje("Lo sentimos, no hay habitaciones disponibles de este tipo para las fechas seleccionadas.");
        setLoading(false);
        return;
      }

      const { error: errInsert } = await supabase.from("reservas").insert({
        usuario_id: usuarioId,
        habitacion_id: habitacionIdLibre, // Usamos la que nos dio la base de datos
        fecha_entrada: fechaEntrada,
        fecha_salida: fechaSalida,
        precio: calcularPrecio(),
        servicios: servicios,
        estado: "pendiente"
      });

      if (errInsert) throw errInsert;

      setMensaje("¡Reserva confirmada con éxito!");
      setTimeout(() => navigate("/"), 3000);

    } catch (error: any) {
      setMensaje(error.message || "Error al procesar la reserva.");
    } finally {
      setLoading(false);
    }
  };

  const total = calcularPrecio();

  return (
    <>
    <Header />
    <div className="min-h-screen pt-24 pb-12 bg-[#faf9f8] dark:bg-[var(--bg-light)]">
      <div className="container-custom max-w-6xl">
        <Heading level={1} className="text-[var(--brand-rust)] mb-8">Tu Retiro</Heading>

        {mensaje && (
          <div className={`p-4 mb-6 rounded text-sm font-medium ${mensaje.includes("éxito") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {mensaje}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white dark:bg-[var(--main-card)] p-6 rounded-xl shadow-sm border border-[var(--main-border)]">
              <Heading level={3} variant="default" className="mb-4 text-lg">Fechas de Estancia</Heading>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>LLEGADA</label>
                  <div className="relative mt-1">
                    <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input type="date" className="input-primary pl-10 bg-gray-50 dark:bg-gray-800" value={fechaEntrada} onChange={e => setFechaEntrada(e.target.value)} min={new Date().toISOString().split("T")[0]} />
                  </div>
                </div>
                <div>
                  <label>SALIDA</label>
                  <div className="relative mt-1">
                    <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input type="date" className="input-primary pl-10 bg-gray-50 dark:bg-gray-800" value={fechaSalida} onChange={e => setFechaSalida(e.target.value)} min={fechaEntrada} />
                  </div>
                </div>
              </div>
            </div>

            {/* Categoría */}
            <div className="bg-white dark:bg-[var(--main-card)] p-6 rounded-xl shadow-sm border border-[var(--main-border)]">
              <Heading level={3} variant="default" className="mb-4 text-lg">Categoría de Habitación</Heading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categorias.map((cat) => (
                  <div 
                    key={cat.id} 
                    onClick={() => setTipo(cat.id as any)}
                    className={`cursor-pointer p-4 rounded-lg border-2 text-center transition-all ${tipo === cat.id ? 'border-[var(--brand-rust)] bg-orange-50/50 dark:bg-orange-900/10' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}
                  >
                    <cat.icon className={`w-8 h-8 mx-auto mb-2 ${tipo === cat.id ? 'text-[var(--brand-rust)]' : 'text-gray-400'}`} />
                    <h4 className="font-bold text-sm">{cat.label}</h4>
                    <span className="text-xs text-gray-500">Máx. {cat.cap} Personas</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                <Text className="font-medium">Número de Huéspedes</Text>
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => setHuespedes(Math.max(1, huespedes - 1))} className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50 text-gray-600">-</button>
                  <span className="font-bold w-4 text-center">{huespedes}</span>
                  <button type="button" onClick={() => setHuespedes(Math.min(4, huespedes + 1))} className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50 text-gray-600">+</button>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[var(--main-card)] p-6 rounded-xl shadow-sm border border-[var(--main-border)]">
              <Heading level={3} variant="default" className="mb-4 text-lg">Añadidos Gastronómicos</Heading>
              <div className="space-y-3">
                {[
                  { id: "desayuno", label: "Desayuno Buffet", desc: "Comienza tu día con repostería artesanal local.", icon: Coffee },
                  { id: "media_pension", label: "Media Pensión (Comida)", desc: "Incluye almuerzo de tres platos en nuestro restaurante.", icon: Utensils }
                ].map((extra) => (
                  <label key={extra.id} className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <input type="checkbox" className="mt-1 mr-4 w-5 h-5 accent-[var(--brand-rust)]" checked={servicios.includes(extra.id)} onChange={() => toggleServicio(extra.id)} />
                    <div>
                      <span className="font-bold text-sm block flex items-center gap-2"><extra.icon className="w-4 h-4 text-[var(--brand-rust)]"/> {extra.label}</span>
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
                  <h3 className="font-antiqua text-2xl font-bold mb-2">Habitación {categorias.find(c => c.id === tipo)?.label}</h3>
                  <p className="text-sm text-gray-300 opacity-80 mb-6">
                    {fechaEntrada && fechaSalida ? `Estancia de ${Math.ceil((new Date(fechaSalida).getTime() - new Date(fechaEntrada).getTime()) / (1000 * 60 * 60 * 24))} noches` : "Selecciona fechas para calcular."}
                  </p>
                  
                  <div className="border-t border-white/20 pt-4 flex justify-between items-end">
                    <span className="text-sm tracking-widest uppercase opacity-80">Total</span>
                    <span className="text-3xl font-bold text-[var(--brand-yellow)]">{total > 0 ? `€${total}` : "—"}</span>
                  </div>
                </div>

                <Button 
                  variant="primary" 
                  className="w-full py-4 text-sm tracking-widest" 
                  onClick={handleReservar} 
                  disabled={loading || total === 0}
                >
                  {loading ? "PROCESANDO..." : "CONFIRMAR RESERVA"}
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ReservaPage;