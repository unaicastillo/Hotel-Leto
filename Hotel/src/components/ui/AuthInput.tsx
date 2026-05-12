import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ElementType;
  rightElement?: React.ReactNode; // Útil para el enlace "¿Olvidaste tu contraseña?"
}

export const AuthInput = ({ label, icon: Icon, rightElement, type, ...props }: AuthInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="block text-xs text-gray-500 font-medium">{label}</label>
        {rightElement}
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <Icon size={18} />
        </div>
        <input 
          type={inputType}
          className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-md text-sm focus:ring-2 focus:ring-[var(--brand-rust)] outline-none transition-all dark:text-white"
          {...props}
        />
        {isPassword && (
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthInput;