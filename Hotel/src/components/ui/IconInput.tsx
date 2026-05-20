import { type LucideIcon } from 'lucide-react';

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  label?: string;
}

export const IconInput = ({ icon: Icon, label, className = '', ...props }: IconInputProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-xs text-[var(--text-muted)] font-medium">{label}</label>}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-4 w-4 text-[var(--text-muted)] opacity-70" />
        </div>
        <input
          className={`input-primary !pl-10 !py-2.5 ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};

export default IconInput;