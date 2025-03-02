
import React from 'react';

interface DropdownContentProps {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const DropdownContent: React.FC<DropdownContentProps> = ({ 
  isOpen, 
  children, 
  className = '', 
  onMouseLeave 
}) => {
  return (
    <div 
      className={`absolute left-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden z-10 transition-all duration-300 origin-top-left ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'} ${className}`}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

export default DropdownContent;
