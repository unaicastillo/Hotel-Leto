import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "info" | "ghost" | "danger"; // Añade danger aquí
  children: React.ReactNode;
}

export const Button = ({ variant = "primary", className = "", children, ...props }: ButtonProps) => {
  const baseClass = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    info: "btn-info",
    ghost: "btn-primary-ghost",
    danger: "btn-danger", // Añade la clave aquí
  }[variant];

  return (
    <button className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;