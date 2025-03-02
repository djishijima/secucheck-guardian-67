
import React, { useRef } from 'react';

interface DropdownMenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  children: React.ReactNode;
  className?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ 
  isOpen, 
  onMouseEnter, 
  children, 
  className = '' 
}) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div 
      className={`relative group ${className}`}
      ref={ref}
      onMouseEnter={onMouseEnter}
    >
      {children}
    </div>
  );
};

export default DropdownMenu;
