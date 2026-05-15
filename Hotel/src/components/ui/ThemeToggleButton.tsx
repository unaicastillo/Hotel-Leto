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

  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle(
    "dark",
    theme === "dark"
  );
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [isFixed, setIsFixed] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  // Inicializar tema
  useEffect(() => {
    const initialTheme = getPreferredTheme();

    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  // Aplicar y guardar tema
  useEffect(() => {
    applyTheme(theme);

    localStorage.setItem(
      THEME_STORAGE_KEY,
      theme
    );
  }, [theme]);

  // Botón fijo al hacer scroll
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
    setTheme((prev) =>
      prev === "dark" ? "light" : "dark"
    );
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      title={
        theme === "dark"
          ? "Cambiar a modo claro"
          : "Cambiar a modo oscuro"
      }
      className={`
        header__theme-toggle
        ${isFixed ? "header__theme-toggle--fixed" : ""}
      `}
    >
      <span className="header__theme-icon">
        {theme === "dark" ? "☀️" : "🌙"}
      </span>
    </button>
  );
}