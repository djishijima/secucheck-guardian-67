
import React, { useRef, useCallback } from 'react';

interface DropdownMenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
  className?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ 
  isOpen, 
  onMouseEnter, 
  onMouseLeave, 
  children, 
  className = '' 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const handleMouseLeave = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (onMouseLeave) {
      onMouseLeave(event);
    }
  }, [onMouseLeave]);

  return (
    <div 
      className={`relative group ${className}`}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default DropdownMenu;
