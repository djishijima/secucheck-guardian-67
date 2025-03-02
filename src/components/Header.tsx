
import React from 'react';
import { Printer, Menu, X, HeartHandshake, Users, ShoppingCart, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
              <Link to="/" className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                ホーム
              </Link>
              <Link to="/products" className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                製品一覧
              </Link>
              <Link to="/about-gx" className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                GXについて
              </Link>
              <Link to="/ai-technology" className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                AI技術
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                お問い合わせ
              </Link>
            </nav>
          </div>

          {/* アクションボタン */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-3">
              <Button variant="ghost" size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                カート
              </Button>
              <Link to="/sustainability-check">
                <Button 
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 flex items-center gap-2" 
                  size="sm"
                >
                  <Leaf className="h-4 w-4" />
                  サステナビリティ診断
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
            <Link to="/products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
              製品一覧
            </Link>
            <Link to="/about-gx" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
              GXについて
            </Link>
            <Link to="/ai-technology" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
              AI技術
            </Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
              お問い合わせ
            </Link>
            <div className="pt-4 flex flex-col space-y-3">
              <Button variant="outline" size="sm" className="justify-center">
                <ShoppingCart className="h-4 w-4 mr-2" />
                カート
              </Button>
              <Link to="/sustainability-check" className="w-full">
                <Button 
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 flex items-center gap-2 w-full justify-center" 
                  size="sm"
                >
                  <Leaf className="h-4 w-4" />
                  サステナビリティ診断
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
