import { Heading, Text } from '../ui/Typography';
import { Button } from '../ui/Button';

export const GastronomySection = () => {
  return (
    <section className="py-24 transition-colors duration-300">
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="grid grid-cols-2 gap-4 relative">
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop" className="w-full h-[400px] object-cover rounded-xl" alt="Instalaciones del restaurante" />
          <div className="flex flex-col gap-4 mt-8">
            <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop" className="w-full h-[200px] object-cover rounded-xl" alt="Detalle de plato" />
            <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" className="w-full h-[200px] object-cover rounded-xl" alt="Bebida servida" />
          </div>
        </div>
        <div>
          <span className="text-[var(--brand-rust)] dark:text-[var(--brand-yellow)] font-bold tracking-widest text-xs uppercase mb-4 block">Servicio de Restauración</span>
          <Heading level={2} variant="section">Oferta Gastronómica</Heading>
          <Text variant="lead">
            Nuestra propuesta culinaria se basa en la gastronomía tradicional mediterránea, 
            aplicando técnicas de elaboración contemporáneas y priorizando el uso de materias primas de proximidad.
          </Text>
          <div className="grid grid-cols-2 gap-8 mb-10">
            <div>
              <Heading level={4} variant="default" className="text-lg mb-1">Desayuno Buffet</Heading>
              <Text variant="muted" className="text-sm">Selección de productos locales y opciones continentales.</Text>
            </div>
            <div>
              <Heading level={4} variant="default" className="text-lg mb-1">Menús Degustación</Heading>
              <Text variant="muted" className="text-sm">Propuestas basadas en la herencia culinaria de la región.</Text>
            </div>
          </div>
          <Button variant="primary">Información del Restaurante</Button>
        </div>
      </div>
    </section>
  );
};

export default GastronomySection;