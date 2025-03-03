
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, BarChart3 } from 'lucide-react';

const GxAssessmentHeader: React.FC = () => (
  <motion.section 
    className="mb-10"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white shadow-xl">
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center">
            <Leaf className="mr-3 h-8 w-8" />
            GX対応度診断ツール
          </h1>
          <p className="text-lg opacity-90 mb-4">
            貴社のグリーントランスフォーメーション（GX）への取り組み状況を診断し、改善点を明確化します。
            各項目に対する取り組み状況をチェックすることで、現在のGX対応レベルと今後の優先課題を特定します。
          </p>
          <div className="flex items-center gap-2 text-white/90 mt-6">
            <BarChart3 className="h-5 w-5" />
            <span className="text-sm font-medium">5分程度で簡易診断が完了します</span>
          </div>
        </motion.div>
      </div>
    </div>
  </motion.section>
);

export default GxAssessmentHeader;
