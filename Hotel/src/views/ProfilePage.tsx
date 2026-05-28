import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { User, Mail, Phone, Edit2, Save, XCircle, LogOut, Moon, Sun, AlertTriangle } from "lucide-react";
import { AuthInput } from "../components/auth/AuthInput";
import Button from "../components/ui/Button";
import { Heading, Text } from "../components/ui/Typography";
import Header from "../components/layout/Header";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [yearJoined, setYearJoined] = useState("");
  
  // Sincronizar el estado del tema visual (.dark)
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  
  // Copia de seguridad para poder "Descartar"
  const [profileData, setProfileData] = useState({ nombre: "", apellidos: "", telefono: "" });
  // Estado en tiempo real del formulario
  const [form, setForm] = useState({ nombre: "", apellidos: "", email: "", telefono: "" });

  // 1. Verificar sesión activa y cargar datos del perfil
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return navigate("/login"); 
      
      setUserId(user.id);
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      
      if (data) {
        const savedData = { nombre: data.nombre, apellidos: data.apellidos, telefono: data.telefono || "" };
        setProfileData(savedData);
        setForm({ ...savedData, email: user.email || "" });
        setYearJoined(new Date(data.created_at).getFullYear().toString());
      }
      setLoading(false);
    };
    fetchProfile();
  }, [navigate]);

  // 2. Guardar modificaciones en la base de datos
  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setMensaje("");
    
    const { error } = await supabase
      .from("profiles")
      .update({ nombre: form.nombre, apellidos: form.apellidos, telefono: form.telefono })
      .eq("id", userId);

    if (error) {
      setMensaje(error.message);
    } else {
      setProfileData({ nombre: form.nombre, apellidos: form.apellidos, telefono: form.telefono });
      setMensaje("Perfil actualizado correctamente.");
      setIsEditing(false);
    }
    setLoading(false);
  };

  // 3. Descartar cambios
  const handleDiscard = () => {
    setForm(prev => ({ ...prev, ...profileData }));
    setIsEditing(false);
    setMensaje("");
  };

  // 4. Cerrar sesión de Supabase
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      
      const currentTheme = localStorage.getItem("leto_theme");
      
      localStorage.clear();
      
      if (currentTheme) {
        localStorage.setItem("leto_theme", currentTheme);
      }
      
      navigate("/login");
      
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // 5. Alternar modo oscuro
  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    
    if (isCurrentlyDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem("leto_theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem("leto_theme", "dark");
      setIsDark(true);
    }
  };

  // 6. Eliminar cuenta
  const handleEliminarCuenta = async () => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar tu cuenta permanentemente? Perderás todo tu historial de reservas y esta acción no se puede deshacer.")) return;
    
    setLoading(true);
    try {
      // 1. Esto elimina en cascada todos los datos del usuario en la DB
      const { error } = await supabase.rpc('eliminar_mi_cuenta');
      
      if (error) throw error;

      // 2. Cerramos la sesión en el navegador
      await supabase.auth.signOut();
      
      alert("Tu cuenta ha sido eliminada correctamente.");
      
      // 3. Redirigimos directo a la página de login
      navigate("/login"); 
      
    } catch (error: any) {
      console.error("Error al eliminar la cuenta:", error);
        if (error.code === 'P0001' || error.message?.includes('administrador')) {
          setMensaje("⚠️ Acción denegada: Tu cuenta tiene rol de administrador y está protegida por seguridad. No puede ser eliminada.");
        } else {
          setMensaje("Hubo un error al intentar eliminar tu cuenta: " + error.message);
        }
      } finally {
      setLoading(false);
    }
  };

  if (loading && !userId) return <div className="min-h-screen bg-white dark:bg-black" />;

  return (
    <>
    <Header />
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#a33818] to-[#fed65b] p-4 font-sans pt-24">
      
      <div className="w-full max-w-2xl bg-white dark:bg-[var(--main-card)] p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-900 relative">
        
        {/* Cabecera interna */}
        <div className="flex justify-between items-start mb-8 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <Heading level={2} className="text-3xl mb-1">
              {profileData.nombre} {profileData.apellidos}
            </Heading>
            <Text variant="muted" className="text-xs font-medium uppercase tracking-wider">
              Miembro Heritage desde {yearJoined}
            </Text>
          </div>
          <button 
            onClick={toggleTheme} 
            className="inline-flex items-center justify-center w-9 h-9 rounded-full border-2 border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-[var(--brand-rust)] dark:border-gray-700 dark:bg-transparent dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-[var(--brand-yellow)] transition-all duration-200 cursor-pointer shadow-sm"
            title="Alternar modo visual"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mensaje de feedback */}
        {mensaje && (
          <div className="mb-6 p-3 text-center text-sm font-medium rounded-lg bg-orange-50 dark:bg-orange-950/20 text-[var(--brand-rust)] dark:text-orange-400 border border-orange-100 dark:border-orange-900/50">
            {mensaje}
          </div>
        )}

        {/* Formulario principal */}
        <form onSubmit={handleSave} className="space-y-6">
          <Text variant="muted">Datos Personales</Text>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            <AuthInput label="Nombre" icon={User} value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} disabled={!isEditing} required />
            <AuthInput label="Apellidos" icon={User} value={form.apellidos} onChange={e => setForm({...form, apellidos: e.target.value})} disabled={!isEditing} required />
            <AuthInput label="Email" icon={Mail} type="email" value={form.email} disabled={true} />
            <AuthInput label="Teléfono" icon={Phone} type="tel" value={form.telefono} onChange={e => setForm({...form, telefono: e.target.value})} disabled={!isEditing} />
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-800/60">
            {isEditing ? (
              <>
                <Button variant="primary" type="button" disabled={loading} onClick={handleSave} className="flex-1 py-3 text-xs tracking-wider uppercase">
                  <Save size={16}/> Guardar Cambios
                </Button>
                <Button 
                  variant="ghost" 
                  type="button" 
                  onClick={handleDiscard} 
                  className="flex-1 py-3 text-xs tracking-wider uppercase !border-gray-300 dark:!border-gray-700 !text-gray-500 dark:!text-gray-400 hover:!bg-gray-100 dark:hover:!bg-gray-900"
                >
                  <XCircle size={16}/> Descartar
                </Button>
              </>
            ) : (
              <Button variant="primary" type="button" onClick={() => setIsEditing(true)} className="w-full py-3 text-xs tracking-wider uppercase">
                <Edit2 size={16}/> Editar Datos
              </Button>
            )}
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
          
          <button 
            type="button"
            onClick={handleLogout} 
            className="w-full sm:w-auto flex justify-center items-center gap-2 py-2.5 px-4 rounded-md text-xs font-bold tracking-widest uppercase text-[var(--text-main)] hover:text-[var(--brand-rust)] dark:hover:text-[var(--brand-yellow)] transition-colors cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900"
          >
            <LogOut size={16} /> Cerrar Sesión
          </button>
          
          <Button 
            variant="danger" 
            type="button" 
            disabled={loading} 
            onClick={handleEliminarCuenta} 
            className="w-full sm:w-auto flex items-center justify-center gap-2 py-2.5 px-6 text-xs tracking-wider uppercase"
          >
            <AlertTriangle size={16} /> Eliminar mi cuenta
          </Button>

        </div>

      </div>
    </div>
    </>
  );
};

export default ProfilePage;