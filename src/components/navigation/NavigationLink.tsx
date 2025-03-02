
import React from 'react';
import { Link } from "react-router-dom";

interface NavigationLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ to, children, className }) => {
  return (
    <Link 
      to={to} 
      className={`text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${className || ''}`}
    >
      {children}
    </Link>
  );
};

export default NavigationLink;
