import { Heading, Text } from '../ui/Typography';
import { Button } from '../ui/Button';
import "../../styles/global.css";

export const NewsletterSection = () => {
  return (
 <section className="bg-[var(--brand-rust)] py-16 md:py-24 transition-colors duration-300">
      <div className="container-custom text-center">
        
        <Heading level={2} className="text-white text-4xl md:text-5xl mb-6">
          <span className="dark:hidden">Boletín Informativo</span>
          <span className="hidden dark:inline">Información de Contacto</span>
        </Heading>

        <Text className="text-white/90 max-w-2xl mx-auto mb-10 text-lg">
          Suscríbase para recibir comunicaciones institucionales, actualizaciones sobre nuestras instalaciones y agenda de eventos.
        </Text>

        <form
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Dirección de correo electrónico"
            required
            className="input-primary"
          />

          <Button variant="secondary" type="submit" >
            Suscribirse
          </Button>
        </form>
      </div>
    </section>
  )
};

export default NewsletterSection;