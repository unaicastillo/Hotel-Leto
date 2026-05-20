import { Heading, Text } from '../ui/Typography';
import { Button } from '../ui/Button';

export const EventsSection = () => {
  return (
    <section 
      className="relative py-32 bg-cover bg-center"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop")' }}
    >
      <div className="absolute inset-0 bg-[var(--overlay-bg)] transition-colors duration-300"></div>
      <div className="container-custom relative z-10 text-center text-white">
        <Heading level={2} className="text-5xl md:text-6xl font-bold mb-6 text-white">
          Instalaciones para <br/> Eventos
        </Heading>
        <Text className="text-xl max-w-2xl mx-auto mb-10 text-white/90">
          Disponemos de espacios acondicionados para la celebración de eventos corporativos e institucionales. 
          Nuestras salas cuentan con equipamiento audiovisual y opciones de configuración de aforo modulares.
        </Text>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary">Solicitar presupuesto</Button>
          <Button variant="info">Especificaciones de las salas</Button>
        </div>
      </div>
    </section>
  );
}
export default EventsSection;