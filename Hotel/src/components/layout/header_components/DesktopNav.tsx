import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { NavItem } from "./NavItem";

export const DesktopNav = ({ menuItems }: { menuItems: any[] }) => {
  return (
    <nav className="header__nav">
      {/* <NavItem item={{ label: "zzz", url: "/" }} className="header__nav-link" /> */}
      
      {menuItems.map((menu) => (
        <Dropdown key={menu.label} label={menu.label} items={menu.items} />
      ))}

      {/* <NavItem item={{ label: "zzz", url: "/" }} className="header__nav-link" /> */}
    </nav>
  );
};

const Dropdown = ({ label, items }: { label: string; items: any[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setIsOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="header__dropdown">
      <button onClick={() => setIsOpen(!isOpen)} className={`header__nav-link gap-2 ${isOpen ? "text-[var(--brand-rust)]" : ""}`}>
        {label} <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="header__dropdown-menu">
          {items.map((item, i) => (
            <NavItem key={i} item={item} className="header__dropdown-item" onClick={() => setIsOpen(false)} />
          ))}
        </div>
      )}
    </div>
  );
};