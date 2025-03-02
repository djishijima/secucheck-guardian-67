
import React from 'react';
import { Printer, Menu, X, ShoppingCart, BarChart, Leaf, List, FolderCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseEnter = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* ロゴ & ナビゲーション */}
          <div className="flex items-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center"
            >
              <Link to="/" className="flex items-center">
                <Printer className="h-8 w-8 text-indigo-600 mr-2" />
                <div className="text-lg font-semibold">
                  <span className="text-indigo-700">文唱堂印刷</span>
                  <span className="text-sm text-gray-500 block md:inline md:ml-2">GX x AI Marketplace</span>
                </div>
              </Link>
            </motion.div>

            {/* デスクトップナビゲーション */}
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                ホーム
              </Link>
              
              {/* 製品・サービスをグループ化（製品とGX×AI製品をまとめる） */}
              <div 
                className="relative group"
                onMouseEnter={() => handleMouseEnter('products')}
                onMouseLeave={handleMouseLeave}
              >
                <span className={`text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium cursor-pointer flex items-center relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${activeDropdown === 'products' ? 'text-indigo-600 after:scale-x-100' : ''}`}>
                  <List className="h-4 w-4 mr-1" />
                  製品・サービス
                </span>
                <div 
                  className={`absolute left-0 mt-2 w-80 bg-white shadow-lg rounded-md overflow-hidden z-10 transition-all duration-300 origin-top-left ${activeDropdown === 'products' ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
                >
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
                </div>
              </div>
              
              {/* 診断サービスをグループ化 */}
              <div 
                className="relative group"
                onMouseEnter={() => handleMouseEnter('diagnostics')}
                onMouseLeave={handleMouseLeave}
              >
                <span className={`text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium cursor-pointer flex items-center relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${activeDropdown === 'diagnostics' ? 'text-indigo-600 after:scale-x-100' : ''}`}>
                  <FolderCheck className="h-4 w-4 mr-1" />
                  診断サービス
                </span>
                <div
                  className={`absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md overflow-hidden z-10 transition-all duration-300 origin-top-left ${activeDropdown === 'diagnostics' ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
                >
                  <Link to="/about-gx" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
                    サステナビリティについて
                  </Link>
                  <Link to="/sustainability-check" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
                    サステナビリティ診断
                  </Link>
                  <Link to="/comprehensive-diagnostics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
                    サステナブルDX診断
                  </Link>
                  <Link to="/scope-one" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
                    Scope 1 排出量
                  </Link>
                  <Link to="/scope-two" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
                    Scope 2 排出量
                  </Link>
                </div>
              </div>

              {/* その他 */}
              <div 
                className="relative group"
                onMouseEnter={() => handleMouseEnter('others')}
                onMouseLeave={handleMouseLeave}
              >
                <span className={`text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium cursor-pointer flex items-center relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${activeDropdown === 'others' ? 'text-indigo-600 after:scale-x-100' : ''}`}>
                  その他
                </span>
                <div 
                  className={`absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10 transition-all duration-300 origin-top-left ${activeDropdown === 'others' ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
                >
                  <Link to="/ai-technology" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
                    AI技術
                  </Link>
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
                    ダッシュボード
                  </Link>
                  <Link to="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200">
                    お問い合わせ
                  </Link>
                </div>
              </div>
            </nav>
          </div>

          {/* アクションボタン */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-3">
              <Button variant="ghost" size="sm">
                <ShoppingCart className="h-4 w-4" />
              </Button>
              <Link to="/dashboard">
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex items-center" 
                  size="sm"
                >
                  <BarChart className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/sustainability-check">
                <Button 
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 flex items-center" 
                  size="sm"
                >
                  <Leaf className="h-4 w-4" />
                </Button>
              </Link>
            </div>

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
      {isMenuOpen && (
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
      )}
    </header>
  );
};

export default Header;
