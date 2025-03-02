
import React from 'react';
import { List } from 'lucide-react';
import { Link } from "react-router-dom";
import DropdownMenu from './DropdownMenu';
import DropdownContent from './DropdownContent';

interface ProductsDropdownProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const ProductsDropdown: React.FC<ProductsDropdownProps> = ({ 
  isOpen, 
  onMouseEnter, 
  onMouseLeave 
}) => {
  return (
    <DropdownMenu 
      isOpen={isOpen} 
      onMouseEnter={onMouseEnter}
      className="relative group"
    >
      <span 
        className={`text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium cursor-pointer flex items-center relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${isOpen ? 'text-indigo-600 after:scale-x-100' : ''}`}
      >
        <List className="h-4 w-4 mr-1" />
        製品・サービス
      </span>
      
      <DropdownContent isOpen={isOpen} className="w-80" onMouseLeave={onMouseLeave}>
        {/* 一般製品 */}
        <div className="border-b pb-2">
          <div className="px-4 py-2 bg-gray-50 font-medium text-sm text-gray-700">一般製品</div>
          <Link to="/products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
            製品一覧
          </Link>
          <Link to="/eco-printing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
            環境印刷
          </Link>
          <Link to="/gx-printing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
            GX印刷
          </Link>
          <Link to="/eco-logistics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
            環境物流
          </Link>
          <Link to="/gx-logistics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
            GX物流
          </Link>
        </div>
        
        {/* GX×AI製品 */}
        <div>
          <div className="px-4 py-2 bg-gray-50 font-medium text-sm text-gray-700">GX×AI製品</div>
          <Link to="/gx-ai-products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
            GX×AI製品一覧
          </Link>
          <Link to="/gx-eco-design" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
            エコデザインAI
          </Link>
          <Link to="/gx-energy-management" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
            エネルギー管理AI
          </Link>
          <Link to="/gx-sustainable-marketing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
            サステナブルマーケティングAI
          </Link>
          <Link to="/gx-supply-chain-audit" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
            サプライチェーン監査AI
          </Link>
          <Link to="/gx-education-platform" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
            教育プラットフォーム
          </Link>
        </div>
      </DropdownContent>
    </DropdownMenu>
  );
};

export default ProductsDropdown;
