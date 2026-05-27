import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { supabase } from '../../lib/supabaseClient';

interface CheckoutFormProps {
  reservaId: number;
  precioTotal: number;
  onPagoExitoso: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ reservaId, precioTotal, onPagoExitoso }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [procesando, setProcesando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return; // Stripe no ha cargado aún

    setProcesando(true);
    setError(null);

    // 1. Confirmar el pago con Stripe
    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/pago-completado", 
      },
      redirect: 'if_required', // Evita que recargue la página si no es necesario
    });

    if (stripeError) {
      setError(stripeError.message || "Ocurrió un error al procesar la tarjeta.");
      setProcesando(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // 2. Si el pago es exitoso, actualizamos Supabase
      const { error: dbError } = await supabase
        .from('reservas')
        .update({ estado: 'confirmada' }) // Pasamos de 'pendiente' a 'confirmada'
        .eq('id', reservaId);

      if (dbError) {
        setError("El pago se realizó, pero hubo un error actualizando la reserva.");
      } else {
        onPagoExitoso(); // Llamamos a la función que actualiza la vista
      }
      setProcesando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 animate-fadeIn">
      <div className="p-4 bg-white dark:bg-[#1e1e1e] rounded-lg border border-[var(--main-border)]">
        {/* PaymentElement inyecta automáticamente el input de tarjeta, caducidad y CVC */}
        <PaymentElement /> 
      </div>
      
      {error && (
        <div className="text-sm text-[var(--brand-red)] bg-[var(--brand-red)]/10 p-3 rounded border border-dashed border-[var(--brand-red)]">
          {error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={!stripe || procesando}
        className="w-full py-3 bg-[var(--brand-rust)] text-white font-bold rounded hover:bg-[var(--brand-rust-hover)] transition-colors disabled:opacity-50 flex justify-center items-center"
      >
        {procesando ? "PROCESANDO PAGO..." : `PAGAR ${precioTotal}€`}
      </button>
    </form>
  );
};