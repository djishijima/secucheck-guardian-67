
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const SustainabilityHeader: React.FC = () => (
  <motion.section 
    className="mb-10"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white shadow-xl">
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Leaf className="h-8 w-8 text-green-300 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">サステナビリティ自己診断ツール</h1>
          </div>
          <p className="text-lg opacity-90 mb-4">
            貴社のSDGs取り組み状況やサステナビリティへの対応レベルを診断し、サステナビリティレポート作成の準備をサポートします。
            簡単な質問に答えるだけで、現状の評価と改善ポイントをAIが分析します。
          </p>
        </motion.div>
      </div>
    </div>
  </motion.section>
);

export default SustainabilityHeader;
