// src/services/emailService.ts
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_n8gudrg";
const PUBLIC_KEY = "rkD1Siu2yU59DkNDV";

// IDs de las plantillas
const TEMPLATE_SALON = "template_z1fc08u";
const TEMPLATE_INFORMATIVO = "template_iq9pg0y";

export const emailService = {
  // 1. Envío de formulario del Salón de Eventos (Usa el formElement directo)
  enviarReservaSalon: async (formElement: HTMLFormElement) => {
    try {
      const result = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_SALON,
        formElement,
        PUBLIC_KEY
      );
      return result;
    } catch (error) {
      console.error("Error en emailService (Salón):", error);
      throw error;
    }
  },

  // 2. Envío de correos genéricos (Cancelaciones, avisos, etc.)
  enviarMensajeInformativo: async (emailCliente: string, asunto: string, contenido: string) => {
    const parametros = {
      email_cliente: emailCliente,
      asunto_mensaje: asunto,
      contenido_mensaje: contenido,
    };

    try {
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_INFORMATIVO,
        parametros,
        PUBLIC_KEY
      );
      return result;
    } catch (error) {
      console.error("Error en emailService (Informativo):", error);
      throw error;
    }
  }
};