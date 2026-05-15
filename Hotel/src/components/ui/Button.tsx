import { type ButtonHTMLAttributes } from 'react';
import "../../styles/global.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'info' | 'ghost';
  className?: string;
}

export const Button = ({ variant = 'primary', className = '', children, ...props}: ButtonProps) => {

  const baseStyles = "inline-flex items-center justify-center gap-2 transition-colors cursor-pointer font-semibold";
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    info: "btn-info",
    ghost: "btn-primary-ghost",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;