import { ArrowRight, Quote } from 'lucide-react';
import { Heading, Text } from '../ui/Typography';
import "../../styles/global.css";

export const HistorySection = () => (
  <section className="py-24 container-custom">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div>
        <Heading level={2} variant="section">Nuestra Historia</Heading>
        <Text variant="lead" className="text-base mb-6">
          Situado a escasos metros del Teatro Romano, Letoh fue construido 
          sobre los cimientos de una antigua domus romana. Hemos preservado su 
          esencia original combinándola con el confort contemporáneo para crear 
          un espacio único.
        </Text>
        <a href="#" className="link-action text-[var(--brand-yellow-hover)] font-bold">
           <ArrowRight className="w-4 h-4" /> Conoce más sobre nuestra restauración arqueológica
        </a>
      </div>
      <div className="testimonial-box rounded-xl bg-[var(--card-bg)] shadow-[var(--card-shadow)] p-8 border-white/10 transition-colors duration-300">
        <Quote className="w-10 h-10 text-[var(--brand-yellow)] mb-6 opacity-80" />
        <Text className="font-antiqua text-xl font-medium leading-relaxed mb-8 italic text-[var(--text-main)]">
          "Una experiencia inigualable. Dormir rodeado de tanta historia, 
          y levantarte para desayunar viendo el templo de Diana... Es un viaje en el tiempo."
        </Text>
        <div className="flex items-center gap-4">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" alt="User" className="w-12 h-12 rounded-full object-cover" />
          <div>
            <Heading level={5} variant="default">Laura Castillo</Heading>
            <Text variant="muted" className="text-sm">Viajera Cultural</Text>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HistorySection;