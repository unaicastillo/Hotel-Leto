import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// EventsPage.tsx — "Eventos y Espacios Institucionales"
// Compatible con el global.css del proyecto.

interface CoordService {
  icon: string;
  title: string;
  description: string;
}

const COORD_SERVICES: CoordService[] = [
  {
    icon: "📋",
    title: "Protocolo y Asistencia",
    description:
      "Nuestro equipo especializado garantiza el estricto cumplimiento de las normas de protocolo requeridas para su acto. Proveemos asistencia técnica continua desde la planificación hasta la ejecución del evento.",
  },
  {
    icon: "🍴",
    title: "Catering Institucional",
    description:
      "Servicios de restauración diseñados para complementar la formalidad de su encuentro. Ofrecemos propuestas gastronómicas basadas en la excelencia del producto local, adaptadas a los tiempos y formatos de su agenda.",
  },
];

export default function EventsPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--bg-light)] text-[var(--text-main)]">

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full min-h-[520px] flex items-end bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80')",
        }}
      >
        {/* Gradiente izquierda sólido → derecha transparente */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-light)]/95 via-[var(--bg-light)]/60 to-transparent" />

        <div className="relative z-10 container-custom py-20 max-w-lg">
          <h1
            className="font-bold leading-tight mb-4"
            style={{ fontFamily: "var(--font-antiqua)", fontSize: "clamp(2.2rem,5vw,3.2rem)" }}
          >
            Eventos y Espacios{" "}
            <span className="italic text-[var(--brand-rust)]">Institucionales</span>
          </h1>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-8 max-w-sm">
            La versatilidad de los espacios históricos de Mérida proporciona un marco de
            distinción incomparable. Instalaciones concebidas para el desarrollo de actos
            solemnes, asambleas y encuentros profesionales con el máximo rigor.
          </p>
          <Link to="/reserva-salon" className="btn-primary-ghost text-[var(--text-main)] border-[var(--text-main)] hover:bg-[var(--text-main)] hover:text-white text-xs tracking-widest uppercase px-6 py-3">
            Consultar Disponibilidad
          </Link>
        </div>
      </section>

      {/* ── SALÓN AUGUSTA ────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Texto */}
            <div>
              <h2
                className="text-4xl font-bold mb-3"
                style={{ fontFamily: "var(--font-antiqua)" }}
              >
                Salón Augusta
              </h2>
              <span className="block w-10 h-px bg-[var(--brand-rust)] mb-6" />
              <p className="text-sm text-[var(--text-muted)] leading-loose mb-8">
                El recinto principal de nuestras instalaciones, diseñado bajo premisas de
                funcionalidad y elegancia sobria. Sus 140 metros cuadrados diáfanos permiten
                configuraciones flexibles para conferencias de alto nivel, juntas directivas y
                presentaciones institucionales.
              </p>

              {/* Specs */}
              <ul className="flex flex-col gap-4">
                {[
                  { text: "Superficie: 140m²" },
                  { text: "Capacidad: Hasta 120 asistentes en formato auditorio." },
                  { text: "Equipamiento acústico y audiovisual de última generación integrados.",},
                ].map(({ text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                    <span className="text-[var(--brand-rust)] mt-0.5 text-base shrink-0">{}</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Imagen */}
            <div className="overflow-hidden rounded-sm aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80"
                alt="Salón Augusta"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── PATIOS ROMANOS ───────────────────────────────────────────────── */}
      <section className="relative py-0">
        {/* Imagen a full-width con texto superpuesto */}
        <div className="relative min-h-[520px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1600&q=80"
            alt="Patios Romanos"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Card de texto superpuesta izquierda */}
          <div className="relative z-10 h-full flex items-center container-custom py-20">
            <div
              className="bg-[var(--main-card)]/95 backdrop-blur-sm p-10 max-w-xs rounded-sm shadow-[var(--card-shadow)]"
            >
              <h2
                className="text-3xl font-bold mb-4 text-[var(--text-main)]"
                style={{ fontFamily: "var(--font-antiqua)" }}
              >
                Patios Romanos
              </h2>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">
                Una extensión al aire libre que rinde homenaje a la herencia arquitectónica de la
                ciudad. Este entorno arqueológico proporciona un escenario inigualable para
                recepciones oficiales, cócteles de clausura y actos culturales de relevancia.
              </p>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                La integración del patrimonio histórico aporta un valor simbólico que enriquece
                cualquier convocatoria institucional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICIOS DE COORDINACIÓN ────────────────────────────────────── */}
      <section className="py-24 bg-[#f5f3f0] dark:bg-[var(--main-card)]">
        <div className="container-custom">
          {/* Cabecera */}
          <div className="text-center mb-14">
            <h2
              className="text-4xl font-bold mb-3"
              style={{ fontFamily: "var(--font-antiqua)" }}
            >
              Servicios de Coordinación
            </h2>
            <span className="block w-10 h-px bg-[var(--brand-rust)] mx-auto" />
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {COORD_SERVICES.map(({ icon, title, description }) => (
              <div
                key={title}
                className="bg-[var(--main-card)] border border-[var(--main-border)] rounded-sm p-8 flex flex-col gap-4"
              >
                <span className="text-[var(--brand-rust)] text-2xl">{icon}</span>
                <h3
                  className="text-lg font-bold text-[var(--text-main)]"
                  style={{ fontFamily: "var(--font-antiqua)" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
    <Footer />
    </>
  );
}