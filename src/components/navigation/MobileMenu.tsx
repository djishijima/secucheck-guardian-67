
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { List, FolderCheck, ShoppingCart, BarChart, Leaf } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen }) => {
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="md:hidden"
    >
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
          ホーム
        </Link>
        
        {/* 製品・サービス（モバイル用） */}
        <div className="px-3 py-2">
          <details className="group">
            <summary className="flex items-center text-base font-medium text-gray-700 cursor-pointer list-none">
              <List className="h-4 w-4 mr-1" /> 
              <span className="flex-1">製品・サービス</span>
              <span className="transform group-open:rotate-180 transition-transform duration-200">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </summary>
            
            <div className="pl-4 mt-2 space-y-2">
              {/* 一般製品 */}
              <div className="pl-2 mb-2">
                <div className="text-sm font-medium text-gray-600 py-1">一般製品</div>
                <div className="pl-2 space-y-1">
                  <Link to="/products" className="block px-3 py-1 text-sm text-gray-700 hover:text-indigo-600 rounded-md hover:bg-gray-50">
                    製品一覧
                  </Link>
                  <Link to="/eco-printing" className="block px-3 py-1 text-sm text-gray-700 hover:text-indigo-600 rounded-md hover:bg-gray-50">
                    環境印刷
                  </Link>
                  <Link to="/gx-printing" className="block px-3 py-1 text-sm text-gray-700 hover:text-indigo-600 rounded-md hover:bg-gray-50">
                    GX印刷
                  </Link>
                  <Link to="/eco-logistics" className="block px-3 py-1 text-sm text-gray-700 hover:text-indigo-600 rounded-md hover:bg-gray-50">
                    環境物流
                  </Link>
                  <Link to="/gx-logistics" className="block px-3 py-1 text-sm text-gray-700 hover:text-indigo-600 rounded-md hover:bg-gray-50">
                    GX物流
                  </Link>
                </div>
              </div>
              
              {/* GX×AI製品 */}
              <div className="pl-2">
                <div className="text-sm font-medium text-gray-600 py-1">GX×AI製品</div>
                <div className="pl-2 space-y-1">
                  <Link to="/gx-ai-products" className="block px-3 py-1 text-sm text-gray-700 hover:text-indigo-600 rounded-md hover:bg-gray-50">
                    GX×AI製品一覧
                  </Link>
                  <Link to="/gx-eco-design" className="block px-3 py-1 text-sm text-gray-700 hover:text-indigo-600 rounded-md hover:bg-gray-50">
                    エコデザインAI
                  </Link>
                  <Link to="/gx-energy-management" className="block px-3 py-1 text-sm text-gray-700 hover:text-indigo-600 rounded-md hover:bg-gray-50">
                    エネルギー管理AI
                  </Link>
                  <Link to="/gx-sustainable-marketing" className="block px-3 py-1 text-sm text-gray-700 hover:text-indigo-600 rounded-md hover:bg-gray-50">
                    サステナブルマーケティングAI
                  </Link>
                  <Link to="/gx-supply-chain-audit" className="block px-3 py-1 text-sm text-gray-700 hover:text-indigo-600 rounded-md hover:bg-gray-50">
                    サプライチェーン監査AI
                  </Link>
                  <Link to="/gx-education-platform" className="block px-3 py-1 text-sm text-gray-700 hover:text-indigo-600 rounded-md hover:bg-gray-50">
                    教育プラットフォーム
                  </Link>
                </div>
              </div>
            </div>
          </details>
        </div>
        
        {/* 診断サービス（モバイル用） */}
        <div className="px-3 py-2">
          <details className="group">
            <summary className="flex items-center text-base font-medium text-gray-700 cursor-pointer list-none">
              <FolderCheck className="h-4 w-4 mr-1" />
              <span className="flex-1">診断サービス</span>
              <span className="transform group-open:rotate-180 transition-transform duration-200">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </summary>
            <div className="pl-4 mt-2 space-y-1">
              <Link to="/about-gx" className="block px-3 py-1 text-sm text-gray-700 hover:text-indigo-600 rounded-md hover:bg-gray-50">
                サステナビリティについて
              </Link>
              <Link to="/sustainability-check" className="block px-3 py-1 text-sm text-gray-700 hover:text-indigo-600 rounded-md hover:bg-gray-50">
                サステナビリティ診断
              </Link>
              <Link to="/comprehensive-diagnostics" className="block px-3 py-1 text-sm text-gray-700 hover:text-indigo-600 rounded-md hover:bg-gray-50">
                サステナブルDX診断
              </Link>
              <Link to="/scope-one" className="block px-3 py-1 text-sm text-gray-700 hover:text-indigo-600 rounded-md hover:bg-gray-50">
                Scope 1 排出量
              </Link>
              <Link to="/scope-two" className="block px-3 py-1 text-sm text-gray-700 hover:text-indigo-600 rounded-md hover:bg-gray-50">
                Scope 2 排出量
              </Link>
            </div>
          </details>
        </div>
        
        {/* その他（モバイル用） */}
        <div className="px-3 py-2">
          <details className="group">
            <summary className="flex items-center text-base font-medium text-gray-700 cursor-pointer list-none">
              <span className="flex-1">その他</span>
              <span className="transform group-open:rotate-180 transition-transform duration-200">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </summary>
            <div className="pl-4 mt-2 space-y-1">
              <Link to="/ai-technology" className="block px-3 py-1 text-sm text-gray-700 hover:text-indigo-600 rounded-md hover:bg-gray-50">
                AI技術
              </Link>
              <Link to="/dashboard" className="block px-3 py-1 text-sm text-gray-700 hover:text-indigo-600 rounded-md hover:bg-gray-50">
                ダッシュボード
              </Link>
              <Link to="/contact" className="block px-3 py-1 text-sm text-gray-700 hover:text-indigo-600 rounded-md hover:bg-gray-50">
                お問い合わせ
              </Link>
            </div>
          </details>
        </div>
        
        <div className="pt-4 flex flex-col space-y-3">
          <Button variant="outline" size="sm" className="justify-center">
            <ShoppingCart className="h-4 w-4" />
          </Button>
          <Link to="/dashboard" className="w-full">
            <Button 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex items-center w-full justify-center" 
              size="sm"
            >
              <BarChart className="h-4 w-4 mr-2" /> ダッシュボード
            </Button>
          </Link>
          <Link to="/sustainability-check" className="w-full">
            <Button 
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 flex items-center w-full justify-center" 
              size="sm"
            >
              <Leaf className="h-4 w-4 mr-2" /> サステナビリティ診断
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileMenu;
