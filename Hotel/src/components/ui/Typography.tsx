import React, { type JSX } from 'react';
import "../../styles/global.css";

// --- COMPONENTE PARA TÍTULOS ---
interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'hero' | 'section' | 'card' | 'default';
  className?: string;
  children: React.ReactNode;
}

export const Heading = ({ level = 2, variant = 'default', className = '', children }: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const variants = {
    hero: "text-5xl md:text-7xl font-bold leading-tight max-w-3xl",
    section: "text-4xl md:text-5xl font-bold mb-4]",
    card: "text-2xl font-bold mb-2",
    default: "font-bold"
  };

  // Aplicamos siempre la fuente antiqua a los headings desde la variable CSS
  return (
    <Tag 
      className={`${variants[variant]} ${className}`} 
      style={{ fontFamily: 'var(--font-antiqua)' }}
    >
      {children}
    </Tag>
  );
};

// --- COMPONENTE PARA PÁRRAFOS ---
interface TextProps {
  variant?: 'lead' | 'muted' | 'default';
  className?: string;
  children: React.ReactNode;
}

export const Text = ({ variant = 'default', className = '', children }: TextProps) => {
  const variants = {
    lead: "text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mb-8",
    muted: "text-sm text-[var(--text-muted)] leading-relaxed",
    default: "text-[var(--text-main)]"
  };

  return <p className={`${variants[variant]} ${className}`}>{children}</p>;
};