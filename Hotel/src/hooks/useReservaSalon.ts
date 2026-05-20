// src/hooks/useReservaSalon.ts
import { useState } from "react";
import emailjs from "@emailjs/browser";

export const useReservaSalon = () => {
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState("");

  const enviarSolicitud = async (formElement: HTMLFormElement) => {
    setLoading(true);
    setErrorMensaje("");

    try {
      // Envía todos los campos de texto del formulario de golpe
      await emailjs.sendForm(
        "service_n8gudrg",   // <-- PASO 4: Pon aquí tu Service ID
        "template_z1fc08u",  // <-- PASO 4: Pon aquí tu Template ID
        formElement,       
        "rkD1Siu2yU59DkNDV"    // <-- PASO 4: Pon aquí tu Public Key
      );
      
      setEnviado(true);
    } catch (error: any) {
      console.error("Error al enviar el email:", error);
      setErrorMensaje("Hubo un problema al enviar la solicitud. Por favor, inténtelo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, enviado, errorMensaje, enviarSolicitud };
};

export default useReservaSalon;