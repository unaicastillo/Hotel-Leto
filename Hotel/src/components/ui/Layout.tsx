import React from "react";
import { Heading } from "./Typography"; // Ajusta la ruta

interface LayoutProps {
  title: string;
  children: React.ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

export const Layout = ({ title, children, footerText, footerLinkText, footerLinkHref }: LayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#b35d34] via-[#d98b48] to-[#f4d068] p-4 font-sans">
      <div className="bg-white dark:bg-[var(--main-card)] rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        
        <div className="p-8 md:p-10 pb-8">
          <div className="text-center mb-8">
            <Heading level={2} className="text-[var(--brand-rust)] !text-3xl mb-2">Hotel Letoh</Heading>
            <Heading level={3} className="text-gray-800 dark:text-white !text-xl font-medium">{title}</Heading>
          </div>

          {/* Aquí se insertan los inputs (el formulario) */}
          {children}

          <div className="h-6"></div>

          {/* Botones Sociales reutilizados */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-2.5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors">
              <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" className="w-4 h-4 dark:invert" /> Apple
            </button>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 py-6 text-center border-t border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {footerText} <a href={footerLinkHref} className="text-[var(--brand-rust)] font-bold hover:underline">{footerLinkText}</a>
          </p>
        </div>

      </div>
    </div>
  );
};


export default Layout;