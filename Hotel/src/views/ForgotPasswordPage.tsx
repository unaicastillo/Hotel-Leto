// import React, { useState } from "react";
// import { Mail } from "lucide-react";
// import { AuthLayout } from "../components/ui/AuthLayout.tsx";
// import { AuthInput } from "../components/ui/AuthInput.tsx";
// import Button from "../components/ui/Button.tsx";
// // import { supabase } from "../supabaseClient"; // Asegúrate de ajustar esta ruta a tu cliente de Supabase

// export const ForgotPasswordPage = () => {
//   const [email, setEmail] = useState("");
//   const [mensaje, setMensaje] = useState("");
//   const [cargando, setCargando] = useState(false);

//   const handleResetPassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setCargando(true);
//     setMensaje("");

//     try {
//       const { error } = await supabase.auth.resetPasswordForEmail(email, {
//         redirectTo: `${window.location.origin}/actualizar-password`,
//       });

//       if (error) throw error;
      
//       setMensaje("¡Revisa tu correo! Te hemos enviado un enlace para recuperar tu contraseña.");
//     } catch (error: any) {
//       setMensaje(error.message || "Ocurrió un error al enviar el correo.");
//     } finally {
//       setCargando(false);
//     }
//   };

//   return (
//     <AuthLayout 
//       title="Recuperar contraseña" 
//       footerText="¿Recordaste tu contraseña?" 
//       footerLinkText="Inicia sesión" 
//       footerLinkHref="/login"
//     >
//       <form className="space-y-5" onSubmit={handleResetPassword}>
//         <div className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center">
//           Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecer tu contraseña.
//         </div>

//         <AuthInput 
//           label="Email" 
//           icon={Mail} 
//           type="email" 
//           placeholder="tu@correo.com" 
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
        
//         {mensaje && (
//           <div className="text-sm text-center font-medium text-[var(--brand-rust)] bg-orange-50 p-2 rounded">
//             {mensaje}
//           </div>
//         )}

//         <Button variant="primary" className="w-full py-3.5 mt-2 rounded-md" disabled={cargando}>
//           {cargando ? "ENVIANDO..." : "ENVIAR ENLACE"}
//         </Button>
//       </form>
//     </AuthLayout>
//   );
// };

// export default ForgotPasswordPage;