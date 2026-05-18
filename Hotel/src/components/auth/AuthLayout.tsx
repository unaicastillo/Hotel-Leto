import React from "react";
import { Heading, Text } from "../ui/Typography"; 
import "../../styles/global.css";
import { Link } from "react-router-dom";
import logo from "../../imgs/logo_temporal.png";
interface LayoutProps {
  title: string;
  children: React.ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

export const AuthLayout = ({ title, children, footerText, footerLinkText, footerLinkHref }: LayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a33818] to-[#fed65b] p-4 font-sans">
      <div className="dark:bg-[var(--main-card)] rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        
        <div className="p-8 md:p-10 ">
          <div className="grid justify-items-center text-center mb-8">
            <Link to="/" className="header__logo">  
              <img src={logo} alt="logo hotel leto" />
            </Link>
            <Text variant="muted">{title}</Text>
          </div>

          {/* Aquí se insertan los inputs (el formulario) */}
          {children}

          <div className="h-6"></div>

        </div>

        <div className="py-6 text-center border-t border-gray-100 dark:border-gray-800">
          <Text variant="muted">
            {footerText} <a href={footerLinkHref} className="text-[var(--brand-rust)] font-bold hover:underline">{footerLinkText}</a>
          </Text>
        </div>

      </div>
    </div>
  );
};


export default AuthLayout;