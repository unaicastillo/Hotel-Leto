import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// RoomsPage.tsx — "La Morada de los Eméritos"
// Sin menú lateral. Compatible con el global.css del proyecto.

interface RoomCategory {
  tag: string;
  title: string;
  description: string;
  badge: { icon: string; label: string };
  image: string;
  imageAlt: string;
  reverse?: boolean;
}

interface TechSpec {
  icon: string;
  title: string;
  description: string;
}

// ─── Datos ────────────────────────────────────────────────────────────────────

const ROOMS: RoomCategory[] = [
  {
    tag: "Categoría I",
    title: "Aposento Individual",
    description:
      "Inspirado en el concepto del cubiculum romano, este espacio está diseñado para el equilibrio del viajero solitario. Es un reducto para la reflexión, donde la presencia táctil de la piedra natural y la calidez del roble macizo configuran un entorno de introspección y claridad.",
    badge: { icon: "☽", label: "Esencia y Reflexión" },
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    imageAlt: "Aposento Individual",
    reverse: false,
  },
  {
    tag: "Categoría II",
    title: "Cámara Doble",
    description:
      "La simetría y el descanso compartido definen esta estancia, evocando la armonía de las estancias principales de una domus. La luz, filtrada a través de los patios interiores, baña las superficies de mármol pulido, creando una atmósfera de orden y serenidad compartida bajo la mirada de la historia.",
    badge: { icon: "⚖", label: "Armonía y Proporción" },
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    imageAlt: "Cámara Doble",
    reverse: true,
  },
];

const TECH_SPECS: TechSpec[] = [
  {
    icon: "◎",
    title: "Aislamiento Acústico Magistral",
    description:
      "Sistemas de insonorización de última generación integrados en los muros de piedra original.",
  },
  {
    icon: "◈",
    title: "Climatización Térmica Inerte",
    description:
      "Control de temperatura ambiente que emula la inercia térmica de sistemas naturales.",
  },
  {
    icon: "Λ",
    title: "Materiales de Noble Cuna",
    description:
      "Cada superficie incorpora madera de olivo macizo y herrajes de la propia fundición.",
  },
];

// ─── Subcomponentes ───────────────────────────────────────────────────────────

const Divider = () => (
  <span
    aria-hidden
    className="block w-10 h-px bg-[var(--brand-rust)] mt-3 mb-6"
  />
);

const RoomCard = ({
  tag,
  title,
  description,
  badge,
  image,
  imageAlt,
  reverse,
}: RoomCategory) => (
  <div
    className={`grid md:grid-cols-2 gap-0 items-stretch ${
      reverse ? "md:[&>*:first-child]:order-2" : ""
    }`}
  >
    {/* Texto */}
    <div className="flex flex-col justify-center px-8 py-14 md:px-16">
      <span className="text-xs font-bold tracking-widest uppercase text-[var(--brand-rust)] mb-2">
        {tag}
      </span>
      <h2
        className="text-3xl md:text-4xl font-bold leading-snug text-[var(--text-main)] mb-1"
        style={{ fontFamily: "var(--font-antiqua)" }}
      >
        {title}
      </h2>
      <Divider />
      <p className="text-sm text-[var(--text-muted)] leading-loose mb-8">
        {description}
      </p>
      <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <span className="text-[var(--brand-rust)]">{badge.icon}</span>
        <span className="tracking-wide">{badge.label}</span>
      </div>
    </div>

    {/* Imagen */}
    <div className="overflow-hidden aspect-[4/3] md:aspect-auto">
      <img
        src={image}
        alt={imageAlt}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      />
    </div>
  </div>
);

// ─── Página principal ─────────────────────────────────────────────────────────

export default function RoomsPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--bg-light)] text-[var(--text-main)]">

        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <section
        className="relative w-full h-[55vh] min-h-[420px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          
          <h1
            className="text-4xl md:text-6xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-antiqua)" }}
          >
            La Morada de los Eméritos
          </h1>
        </div>
      </section>

      {/* ── INTRODUCCIÓN ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-[var(--main-card)]">
        <div className="container-custom max-w-3xl text-center mx-auto">
          <p
            className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed italic"
            style={{ fontFamily: "var(--font-antiqua)" }}
          >
            Explora habitaciones creadas para combinar elegancia clásica y comodidad moderna.
            Cada estancia está pensada para ofrecer un descanso sereno, un diseño cuidado y una
            experiencia auténticamente palpable, desde el primer detalle hasta la última luz del día.
          </p>
        </div>
      </section>

      {/* ── HABITACIONES ─────────────────────────────────────────────────── */}
      <section className="divide-y divide-[var(--main-border)]">
        {ROOMS.map((room) => (
          <RoomCard key={room.title} {...room} />
        ))}
      </section>

      {/* ── SUITE AUGUSTA (destacada) ────────────────────────────────────── */}
      <section className="relative">
        <div className="relative h-[60vh] min-h-[480px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80"
            alt="Suite Augusta"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        {/* Card superpuesta */}
        <div className="absolute bottom-0 left-0 right-0 container-custom pb-10">
          <div className="max-w-sm bg-[var(--main-card)] p-8 rounded-sm shadow-[var(--card-shadow)]">
            <span className="text-xs font-bold tracking-widest uppercase text-[var(--brand-rust)] mb-2 block">
              Exclusividad Máxima
            </span>
            <h2
              className="text-3xl font-bold text-[var(--text-main)] mb-3"
              style={{ fontFamily: "var(--font-antiqua)" }}
            >
              Suite Augusta
            </h2>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">
              Nuestra propuesta más distinguida. Inspirada en las villas suntuarias de la élite
              del período imperial, un espacio de amplias proporciones que ofrece vistas
              privilegiadas al Teatro Romano y el Templo de Diana, permitiendo que la majestuosidad
              del pasado sirva como telón de fondo de un descanso sublime.
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <span className="text-[var(--brand-rust)]">✦</span>
              <span className="tracking-wide">Nobleza y Distinción</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── ESPECIFICACIONES TÉCNICAS ────────────────────────────────────── */}
      <section className="py-24 bg-[var(--main-card)]">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Intro texto */}
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold text-[var(--brand-rust)] leading-snug mb-4"
                style={{ fontFamily: "var(--font-antiqua)" }}
              >
                Especificaciones Técnicas
              </h2>
              <Divider />
              <p className="text-sm text-[var(--text-muted)] leading-loose">
                Cada habitación ha sido sometida a un riguroso proceso de validación técnica para
                garantizar los estándares más elevados de confort institucional, sin comprometer la
                integridad estética del edificio histórico.
              </p>
            </div>

            {/* Lista de specs */}
            <div className="flex flex-col gap-8">
              {TECH_SPECS.map((spec) => (
                <div key={spec.title} className="flex gap-5 items-start">
                  <span className="text-[var(--brand-rust)] text-xl mt-0.5 w-5 shrink-0 text-center">
                    {spec.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-main)] mb-1">
                      {spec.title}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {spec.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
    <Footer />
  </>
  );
}