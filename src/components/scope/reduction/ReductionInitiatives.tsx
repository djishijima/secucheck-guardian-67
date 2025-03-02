
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

const ReductionInitiatives: React.FC = () => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-blue-600" />
        主要削減施策
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div 
          className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h4 className="font-medium text-gray-800 mb-2">電気自動車への切り替え</h4>
          <p className="text-sm text-gray-600 mb-2">社有車の50%をEVに切り替え。充電インフラの整備も並行して実施。</p>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">想定削減量</span>
            <span className="font-medium text-green-600">約30 tCO2e/年</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h4 className="font-medium text-gray-800 mb-2">高効率ボイラーの導入</h4>
          <p className="text-sm text-gray-600 mb-2">老朽化した既存ボイラーを最新の高効率モデルに交換。エネルギー効率を25%向上。</p>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">想定削減量</span>
            <span className="font-medium text-green-600">約45 tCO2e/年</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h4 className="font-medium text-gray-800 mb-2">空調設備の冷媒管理強化</h4>
          <p className="text-sm text-gray-600 mb-2">定期点検頻度の増加と漏洩検知システムの導入。低GWP冷媒への計画的な切り替え。</p>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">想定削減量</span>
            <span className="font-medium text-green-600">約15 tCO2e/年</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <h4 className="font-medium text-gray-800 mb-2">燃料使用の最適化</h4>
          <p className="text-sm text-gray-600 mb-2">運転時間の見直しと負荷管理によるエネルギー消費の削減。遠隔モニタリングの導入。</p>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">想定削減量</span>
            <span className="font-medium text-green-600">約20 tCO2e/年</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReductionInitiatives;
