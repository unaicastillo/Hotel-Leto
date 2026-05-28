import { Heading, Text } from '../ui/Typography';

export const Hero = () => {
  return (
    <section className="hero-wrapper transition-all duration-300 bg-cover bg-center bg-[image:var(--hero-img)]" >
      <div className="hero-overlay"></div>
      
      <div className="container-custom relative z-10 text-white mt-16">
        <Heading level={1} variant="hero" className="mb-6 text-white">
          Alojamiento en el <br/> centro histórico <br/> de Mérida
        </Heading>
        
        <Text variant="lead" className="text-white font-light max-w-2xl">
          Instalaciones hoteleras integradas en el entorno arqueológico de la ciudad.
        </Text>
      </div>
    </section>
  );
}
export default Hero;