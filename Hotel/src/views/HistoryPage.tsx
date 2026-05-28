import { Landmark, Castle, Shield } from "lucide-react"; 

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Heading, Text } from "../components/ui/Typography";
import Button from "../components/ui/Button";
import "../styles/global.css";

import acueducto from "../imgs/history/acueducto.png";
import augusto from "../imgs/history/augusto.jpg";
import museo from "../imgs/history/museo.jpg";
import teatro from "../imgs/history/teatro.jpg";
import templo_diana from "../imgs/history/templo_diana.jpg";

export const HistoryPage = () => {
  const chronologicalData = [
    { 
      title: "Periodo Romano", 
      desc: "Época de mayor esplendor monumental y desarrollo urbanístico como capital de la provincia Lusitania.",
      icon: Landmark
    },
    { 
      title: "Dominación Musulmana", 
      desc: "La ciudad adaptó su fisonomía y construyó la Alcazaba, manteniendo su relevancia estratégica y militar.",
      icon: Castle
    },
    { 
      title: "Transición Medieval", 
      desc: "Recuperación por las tropas cristianas en el siglo XIII, marcando un cambio profundo en su arquitectura y sociedad.",
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-light)] text-[var(--text-main)] transition-colors duration-300">
      <Header />

      <main className="pt-32 pb-24">
        <div className="container-custom">
          
          {/* Encabezado de la página */}
          <div className="mb-12">
            <span className="text-[var(--brand-rust)] text-xs md:text-sm font-bold tracking-widest uppercase mb-4 block">
              Descubre nuestra historia local
            </span>
            <Heading level={1} variant="hero">
              Historia y Patrimonio de Mérida
            </Heading>
          </div>

          {/* Sección 1: Fundación e Importancia Imperial */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 items-start">
            <img 
              src={augusto} 
              alt="Estatua de Augusto"
              className="md:col-span-5 h-[500px] md:h-[700px] w-full object-cover object-center bg-slate-200 dark:bg-slate-800 rounded-sm"
            />
            <div className="md:col-span-7 bg-slate-50 dark:bg-[var(--main-card)] p-8 md:p-14 border border-[var(--main-border)] rounded-sm">
              <Heading level={2} variant="section" className="!text-3xl md:!text-4xl mb-6">
                Fundación e Importancia Imperial
              </Heading>
              <div className="space-y-4">
                <Text variant="muted">
                  Mérida, en el actual territorio de Extremadura, España, representa un enclave arqueológico fundamental para comprender la romanización de la Península Ibérica.
                </Text>
                <Text variant="muted">
                  Fundada en el año 25 a.C. por orden del emperador Octavio Augusto con el nombre de Colonia Augusta Emerita, la ciudad fue creada para asentar a los soldados eméritos (veteranos licenciados) de las legiones romanas que lucharon en las guerras cántabras.
                </Text>
                <Text variant="muted">
                  Estratégicamente ubicada a orillas del río Guadiana y en el cruce de importantes vías de comunicación, Emerita Augusta se convirtió rápidamente en un próspero centro económico, cultural y administrativo.
                </Text>
              </div>
            </div>
          </section>

          {/* Sección 2: Evolución Cronológica */}
          <section className="mb-24">
            <Heading level={2} variant="section" className="mb-8">
              Evolución Cronológica
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {chronologicalData.map((item, index) => {
                const IconComponent = item.icon;
                
                return (
                  <div key={index} className="bg-slate-50 dark:bg-[var(--main-card)] p-8 border border-[var(--main-border)] rounded-sm transition-transform hover:-translate-y-1 duration-300">
                    <div className="text-[var(--brand-rust)] mb-4">
                      <IconComponent size={32} strokeWidth={1.5} />
                    </div>
                    <Heading level={3} variant="card">{item.title}</Heading>
                    <Text variant="muted">{item.desc}</Text>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Sección 3: Conjunto Monumental */}
          <section className="mb-24">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <Heading level={2} variant="section">Conjunto Monumental</Heading>
                <Text variant="muted">
                  El Conjunto Arqueológico de Mérida fue declarado Patrimonio de la Humanidad por la UNESCO en 1993, reconociendo su excepcional estado de conservación y la importancia histórica de sus monumentos. El recorrido por la ciudad actual ofrece una inmersión completa en la antigüedad.
                </Text>
              </div>
              <Button 
                variant="info" 
                className="whitespace-nowrap border-[var(--main-border)] text-[var(--text-main)] hover:bg-[var(--brand-rust)] hover:text-white hover:border-[var(--brand-rust)]"
              >
                VER GALERÍA COMPLETA
              </Button>
            </div>

            <div className="space-y-16">
              {/* Elemento 1: Teatro */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <img 
                  src={teatro} 
                  alt="Teatro Romano"
                  className="w-full h-[250px] md:h-[350px] object-cover object-center rounded-sm shadow-md"
                />
                <div>
                  <Heading level={3} variant="card">Teatro y Anfiteatro Romano</Heading>
                  <Text variant="muted">
                    Construidos entre los años 16 y 8 a.C. respectivamente. El teatro, con su grandioso frente escénico, sigue en uso hoy en día albergando el Festival Internacional de Teatro Clásico. El anfiteatro, colindante, era el escenario de las luchas de gladiadores y espectáculos venatorios.
                  </Text>
                </div>
              </div>

              {/* Elemento 2: Acueducto (Alternado) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="order-2 md:order-1">
                  <Heading level={3} variant="card">Infraestructuras Hídricas y Termas</Heading>
                  <Text variant="muted">
                    Destacan los acueductos de Los Milagros y San Lázaro, imponentes obras de ingeniería que abastecían de agua a la ciudad romana, junto con los restos de diferentes conjuntos termales públicos y privados que ilustran la cultura del baño en la antigüedad.
                  </Text>
                </div>
                <img 
                  src={acueducto} 
                  alt="Acueducto de los Milagros"
                  className="w-full h-[250px] md:h-[350px] object-cover object-center rounded-sm shadow-md order-1 md:order-2"
                />
              </div>

              {/* Elemento 3: Templo de Diana */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <img 
                  src={templo_diana} 
                  alt="Templo de Diana"
                  className="w-full h-[250px] md:h-[350px] object-cover object-center rounded-sm shadow-md"
                />
                <div>
                  <Heading level={3} variant="card">Arquitectura Religiosa y Defensiva</Heading>
                  <Text variant="muted">
                    El Templo de Diana, majestuoso edificio de culto imperial situado en el antiguo foro municipal, es uno de los mejores conservados. Por su parte, la Alcazaba Árabe, erigida en el siglo IX por Abderramán II, constituye la fortificación musulmana más antigua de la Península Ibérica.
                  </Text>
                </div>
              </div>
            </div>
          </section>

          {/* Banner de Actividad Institucional (Museo) */}
          <section className="relative w-full h-[400px] md:h-[500px] rounded-sm overflow-hidden flex items-end justify-center pb-8 shadow-lg mt-12">
            <img 
              src={museo} 
              alt="Museo Nacional de Arte Romano"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Capa superpuesta para oscurecer el fondo y asegurar legibilidad */}
            <div className="absolute inset-0 bg-black/40"></div>
            
            {/* Tarjeta de contenido */}
            <div className="relative z-10 bg-white dark:bg-[var(--main-card)] p-8 md:p-12 max-w-4xl mx-4 text-center border border-[var(--main-border)] rounded-sm">
              <Heading level={3} variant="card" className="!mb-4 text-black dark:text-white">
                Actividad Institucional Contemporánea
              </Heading>
              <Text variant="muted">
                La ciudad no solo vive de su pasado romano, sino que mantiene un pulso institucional vibrante como capital de la comunidad autónoma. Aquí tienen su sede la Asamblea de Extremadura y la Presidencia de la Junta, integrando la vida política moderna en un entorno urbano cargado de milenios de historia.
              </Text>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HistoryPage;