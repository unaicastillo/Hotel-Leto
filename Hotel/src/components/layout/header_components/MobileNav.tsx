import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { NavItem } from "./NavItem";

interface Props {
  isOpen: boolean;
  menuItems: any[];
  onClose: () => void;
}

export const MobileNav = ({ isOpen, menuItems, onClose }: Props) => {
  return (
    <nav className={`header__mobile-nav ${isOpen ? "header__mobile-nav--open" : ""}`}>
      {/* Enlaces simples */}
      {/* <NavItem 
        item={{ label: "zzz", url: "/" }} 
        className="header__mobile-link" 
        onClick={onClose} 
      /> */}

      {/* Menús con sub-apartados (Acordeones) */}
      {menuItems.map((menu) => (
        <MobileAccordion key={menu.label} label={menu.label} items={menu.items} onClose={onClose} />
      ))}


    </nav>
  );
};

const MobileAccordion = ({ label, items, onClose }: { label: string; items: any[]; onClose: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="header__mobile-dropdown">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`header__mobile-trigger ${isOpen ? "header__mobile-trigger--open" : ""}`}
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="header__mobile-submenu">
          {items.map((item, i) => (
            <NavItem 
              key={i} 
              item={item} 
              className="header__mobile-submenu-item" 
              onClick={onClose} 
            />
          ))}
        </div>
      )}
    </div>
  );
};