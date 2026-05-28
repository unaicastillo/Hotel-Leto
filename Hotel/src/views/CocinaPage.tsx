import { useEffect, useRef } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface SectionBadgeProps {
  text: string;
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

// ─── Subcomponentes ──────────────────────────────────────────────────────────

const SectionBadge = ({ text }: SectionBadgeProps) => (
  <span className="text-xs font-bold tracking-widest uppercase text-[var(--brand-rust)] mb-3 block">
    {text}
  </span>
);

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="bg-[var(--main-card)] border border-[var(--main-border)] rounded-sm p-8 flex flex-col gap-3">
    <span className="text-[var(--brand-rust)] text-2xl">{icon}</span>
    <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-antiqua)" }}>
      {title}
    </h3>
    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{description}</p>
  </div>
);

// ─── Componente principal ────────────────────────────────────────────────────

export default function DiningPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax suave en el hero
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.backgroundPositionY = `calc(50% + ${scrollY * 0.35}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header />
      <main className="bg-[var(--bg-light)] text-[var(--text-main)]">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative w-full h-[75vh] min-h-[520px] flex items-end pb-16 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80')",
        }}
      >
        {/* Gradiente: izquierda oscura, derecha más transparente */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />

        <div className="container-custom relative z-10">
          <div className="max-w-xl bg-[var(--brand-rust)]/85 dark:bg-[var(--brand-rust)]/80 border border-[var(--brand-rust)] dark:border-[var(--brand-rust)]/60 backdrop-blur-sm p-8 rounded-sm">
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight text-white mb-4"
              style={{ fontFamily: "var(--font-antiqua)" }}
            >
              Herencia Gastronómica de Augusta Emerita
            </h1>
            <p className="text-sm text-white leading-relaxed">
              Un estudio académico sobre la evolución y persistencia de las prácticas culinarias
              en la región de Extremadura, desde sus raíces en el Imperio Romano hasta su
              consolidación contemporánea.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 1: La Influencia de la Antigua Roma ───────────────────── */}
      <section className="py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Texto */}
            <div>
              <SectionBadge text="Orígenes Históricos" />
              <h2
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                style={{ fontFamily: "var(--font-antiqua)" }}
              >
                La Influencia de la Antigua Roma
              </h2>
              <p className="text-sm text-[var(--text-muted)] leading-loose">
                La gastronomía extremeña contemporánea es incomprensible sin el sustrato técnico
                heredado de Augusta Emerita. Procedimientos de conservación como la salazón,
                indispensables en la época romana, sentaron las bases metodológicas para el
                tratamiento posterior de las carnes locales. Asimismo, la preparación del{" "}
                <em>garum</em>, aunque extinta, influyó en el desarrollo de marinados complejos
                que persisten en la memoria gustativa de la región.
              </p>
            </div>

            {/* Imagen */}
            <div className="overflow-hidden rounded-sm aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                alt="Ánfora romana"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 2: El Ecosistema de la Dehesa ────────────────────────── */}
      <section className="py-24 bg-[var(--main-card)]">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Imagen con caption */}
            <div className="relative">
              <div className="overflow-hidden rounded-sm aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80"
                  alt="Dehesa extremeña con cerdo ibérico"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              {/* Caption superpuesta */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm p-4 rounded-sm">
                <p className="text-sm font-semibold text-[var(--text-main)]">Cerdo Ibérico</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-relaxed">
                  Especie autóctona fundamental para el ecosistema, cuya cría en extensivo
                  garantiza el equilibrio medioambiental.
                </p>
              </div>
            </div>

            {/* Texto */}
            <div>
              <SectionBadge text="Ecosistema y Biodiversidad" />
              <h2
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                style={{ fontFamily: "var(--font-antiqua)" }}
              >
                El Ecosistema de la Dehesa
              </h2>
              <p className="text-sm text-[var(--text-muted)] leading-loose">
                La Dehesa extremeña constituye un modelo agroforestal único de gestión sostenible
                del territorio. Este ecosistema antropizado, donde coexisten quercíneas (encinas y
                alcornoques) con pastizales, proporciona el hábitat indispensable para la cría del
                cerdo ibérico. La bellota, fruto de estas especies, dicta los ciclos de engorde
                (la montanera) y define estructuralmente las propiedades organolépticas de los
                productos derivados, siendo un pilar económico y ecológico de la región.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 3: Tríada Mediterránea ───────────────────────────────── */}
      <section className="py-24">
        <div className="container-custom">
          {/* Cabecera centrada */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <SectionBadge text="Recursos Agroalimentarios" />
            <h2
              className="text-4xl md:text-5xl font-bold leading-tight mb-6"
              style={{ fontFamily: "var(--font-antiqua)" }}
            >
              Tríada Mediterránea y Productos de la Tierra
            </h2>
            <p className="text-sm text-[var(--text-muted)] leading-loose">
              El paisaje agrario de Extremadura sustenta la producción de los tres pilares de la
              dieta mediterránea, cultivados bajo estrictos parámetros cualitativos que responden
              a condiciones edafoclimáticas específicas.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon="🫒"
              title="Aceite de Oliva"
              description="Extracción en frío de variedades autóctonas como la Manzanilla Cacereña. Su perfil lipídico y contenido en polifenoles lo sitúan como elemento vertebrador de la nutrición regional."
            />
            <FeatureCard
              icon="🍷"
              title="Viticultura"
              description="Cultivo documentado desde la antigüedad. Las vinificaciones actuales combinan técnicas enológicas modernas con la adaptación de cepas tradicionales al clima continentalizado."
            />
            <FeatureCard
              icon="🍯"
              title="Producción Apícola"
              description="Mieles procedentes de la vasta flora silvestre autóctona (brezo, cantueso, encina). Constituye un recurso fundamental para la polinización y el mantenimiento del ecosistema."
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
    </>
  );
}