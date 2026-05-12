import React from 'react';
import { Heading, Text } from '../ui/Typography';
import { Button } from '../ui/Button';
import "../../styles/global.css";

export const NewsletterSection = () => {
  return (
 <section className="bg-[var(--brand-rust)] py-16 md:py-24 transition-colors duration-300">
      <div className="container-custom text-center">
        
        {/* Título dinámico según el modo */}
        <Heading level={2} className="text-white text-4xl md:text-5xl mb-6">
          <span className="dark:hidden">Únete a nuestra comunidad</span>
          <span className="hidden dark:inline">Contacta con nosotros</span>
        </Heading>

        {/* Subtítulo en blanco semitransparente para que contraste con el fondo oscuro */}
        <Text className="text-white/90 max-w-2xl mx-auto mb-10 text-lg">
          Recibe ofertas exclusivas, guías culturales de Mérida y novedades directamente en tu correo.
        </Text>

        <form
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Input estilizado según los mockups (bordes blancos finos, fondo transparente) */}
          <input
            type="email"
            placeholder="Tu correo electrónico"
            required
            className="
              w-full sm:w-[400px]
              px-6 py-3.5
              bg-white/5
              text-white
              border border-white/40
              rounded-lg
              placeholder:text-white/70
              focus:outline-none focus:border-white focus:bg-white/10
              transition-all duration-200
            "
          />

          {/* Botón amarillo. Forzamos text-[#1c1917] (negro) para que no cambie a blanco en modo oscuro */}
          <Button variant="secondary" type="submit" >
            Suscribirse
          </Button>
        </form>
      </div>
    </section>
  )
};

export default NewsletterSection;