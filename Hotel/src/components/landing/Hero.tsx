import { Play } from 'lucide-react';
import { Button } from '../ui/Button';
import { Heading, Text } from '../ui/Typography';

export const Hero = () => {
  return (
    <section className="hero-wrapper transition-all duration-300 bg-cover bg-center bg-[image:var(--hero-img)]" >
      <div className="hero-overlay"></div>
      
      <div className="container-custom relative z-10 text-white mt-16">
        <Heading level={1} variant="hero" className="mb-6 text-white">
          Donde la historia <br/> se encuentra <br/> con el descanso
        </Heading>
        
        <Text variant="lead" className="text[var(--text-main)] font-light">
          Descubre la elegancia y la herencia en el corazón de Mérida.
        </Text>
        
        <Button variant="secondary" >
          <Play className="w-4 h-4 fill-current" /> Reserva Virtual
        </Button>
      </div>
    </section>
  );
}
export default Hero;