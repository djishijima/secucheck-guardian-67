
import React from 'react';
import { motion } from 'framer-motion';
import { ChartBar, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ScopeHeader: React.FC = () => {
  return (
    <motion.section 
      className="mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white shadow-xl">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-blue-200 mb-2">
            <Link to="/sustainability-check" className="hover:text-white flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> サステナビリティ診断
            </Link>
            <span>/</span>
            <span>排出量データ</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center">
              <ChartBar className="mr-3 h-8 w-8" />
              Scope 1排出量データ
            </h1>
            <p className="text-lg opacity-90 mb-4 text-white">
              企業が直接排出する温室効果ガス（自社所有の設備や車両からの排出）のデータ分析と可視化。削減目標に対する進捗状況を確認し、効果的な排出削減策を策定するためのインサイトを提供します。
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ScopeHeader;
