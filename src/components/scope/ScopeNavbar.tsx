
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { LineChart, BarChart3, PieChart } from 'lucide-react';

interface ScopeNavbarProps {
  onShowForm?: () => void;
}

const ScopeNavbar: React.FC<ScopeNavbarProps> = ({ onShowForm }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <div className="mb-8">
      <motion.div 
        className="p-5 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-blue-100 shadow-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="text-lg font-medium text-blue-800 mb-3">温室効果ガス排出量データ</h3>
        <div className="flex flex-wrap gap-4">
          <Link to="/scope-one">
            <Button 
              variant={currentPath === "/scope-one" ? "default" : "outline"} 
              className={currentPath === "/scope-one" 
                ? "bg-blue-600 hover:bg-blue-700 shadow-sm flex items-center gap-2" 
                : "bg-white hover:bg-blue-50 border-blue-200 text-blue-700 shadow-sm flex items-center gap-2"}
            >
              <LineChart className="h-4 w-4" />
              Scope 1
            </Button>
          </Link>
          <Link to="/scope-two">
            <Button 
              variant={currentPath === "/scope-two" ? "default" : "outline"} 
              className={currentPath === "/scope-two" 
                ? "bg-blue-600 hover:bg-blue-700 shadow-sm flex items-center gap-2" 
                : "bg-white hover:bg-blue-50 border-blue-200 text-blue-700 shadow-sm flex items-center gap-2"}
            >
              <BarChart3 className="h-4 w-4" />
              Scope 2
            </Button>
          </Link>
          <Link to="/scope-three">
            <Button 
              variant={currentPath === "/scope-three" ? "default" : "outline"} 
              className={currentPath === "/scope-three" 
                ? "bg-blue-600 hover:bg-blue-700 shadow-sm flex items-center gap-2" 
                : "bg-white hover:bg-blue-50 border-blue-200 text-blue-700 shadow-sm flex items-center gap-2"}
            >
              <PieChart className="h-4 w-4" />
              Scope 3
            </Button>
          </Link>
          <div className="ml-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={onShowForm}
                className="bg-green-600 hover:bg-green-700 font-semibold shadow-md"
              >
                自社データ入力
              </Button>
            </motion.div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-3">各スコープの排出量データを入力・分析して、効果的な削減計画を立てましょう。</p>
      </motion.div>
    </div>
  );
};

export default ScopeNavbar;
