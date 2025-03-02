import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Import our new components
import NavigationLink from '@/components/navigation/NavigationLink';
import ProductsDropdown from '@/components/navigation/ProductsDropdown';
import DiagnosticsDropdown from '@/components/navigation/DiagnosticsDropdown';
import OthersDropdown from '@/components/navigation/OthersDropdown';
import MobileMenu from '@/components/navigation/MobileMenu';
import HeaderActionButtons from '@/components/navigation/HeaderActionButtons';
import HeaderLogo from '@/components/navigation/HeaderLogo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Create refs for each dropdown menu container
  const productsRef = useRef<HTMLDivElement>(null);
  const diagnosticsRef = useRef<HTMLDivElement>(null);
  const othersRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    // Check if we're moving from the dropdown to outside the dropdown
    const dropdownRef = 
      activeDropdown === 'products' ? productsRef :
      activeDropdown === 'diagnostics' ? diagnosticsRef :
      activeDropdown === 'others' ? othersRef : null;
    
    // Only close if we're actually leaving the dropdown entirely
    if (dropdownRef && !dropdownRef.current?.contains(event.relatedTarget as Node)) {
      setActiveDropdown(null);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeDropdown &&
        ((activeDropdown === 'products' && productsRef.current && !productsRef.current.contains(event.target as Node)) ||
        (activeDropdown === 'diagnostics' && diagnosticsRef.current && !diagnosticsRef.current.contains(event.target as Node)) ||
        (activeDropdown === 'others' && othersRef.current && !othersRef.current.contains(event.target as Node)))
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* ロゴ & ナビゲーション */}
          <div className="flex items-center">
            <HeaderLogo />

            {/* デスクトップナビゲーション */}
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <NavigationLink to="/">
                ホーム
              </NavigationLink>
              
              {/* Products Dropdown */}
              <div ref={productsRef}>
                <ProductsDropdown 
                  isOpen={activeDropdown === 'products'} 
                  onMouseEnter={() => handleMouseEnter('products')}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
              
              {/* Diagnostics Dropdown */}
              <div ref={diagnosticsRef}>
                <DiagnosticsDropdown 
                  isOpen={activeDropdown === 'diagnostics'} 
                  onMouseEnter={() => handleMouseEnter('diagnostics')}
                  onMouseLeave={handleMouseLeave}
                />
              </div>

              {/* Others Dropdown */}
              <div ref={othersRef}>
                <OthersDropdown 
                  isOpen={activeDropdown === 'others'} 
                  onMouseEnter={() => handleMouseEnter('others')}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </nav>
          </div>

          {/* アクションボタン */}
          <div className="flex items-center space-x-4">
            <HeaderActionButtons />

            {/* モバイルメニューボタン */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-600 hover:bg-gray-100"
              >
                <span className="sr-only">メニューを開く</span>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* モバイルメニュー */}
      <MobileMenu isOpen={isMenuOpen} />
    </header>
  );
};

export default Header;
