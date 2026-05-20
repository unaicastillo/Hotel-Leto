import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "../../styles/theme-toggle.css";

gsap.registerPlugin(ScrollTrigger);

const THEME_STORAGE_KEY = "leto_theme";
type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return (stored === "light" || stored === "dark") ? stored : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export default function ThemeToggle() {
  // CLAVE: Inicializamos el estado leyendo directamente el almacenamiento local
  const [theme, setTheme] = useState<Theme>(() => getPreferredTheme());
  const [isFixed, setIsFixed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // UN SÓLO useEffect para aplicar la clase y guardar cambios concurrentes
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  // Botón fijo al hacer scroll (Se mantiene igual)
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "800px top",
      onToggle: (self) => {
        setIsFixed(self.isActive);
      },
    });

    return () => trigger.kill();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className={`header__theme-toggle ${isFixed ? "header__theme-toggle--fixed" : ""}`}
    >
      <span className="header__theme-icon">
        {theme === "dark" ? "☀️" : "🌙"}
      </span>
    </button>
  );
}