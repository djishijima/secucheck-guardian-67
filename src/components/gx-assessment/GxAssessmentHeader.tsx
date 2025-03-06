
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
    <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl p-8 text-white shadow-xl overflow-hidden relative">
      {/* Add subtle pattern background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBjeD0iNCIgY3k9IjQiIHI9IjEiLz48Y2lyY2xlIGN4PSIzNiIgY3k9IjQiIHI9IjEiLz48Y2lyY2xlIGN4PSI2OCIgY3k9IjQiIHI9IjEiLz48Y2lyY2xlIGN4PSI0IiBjeT0iMzYiIHI9IjEiLz48Y2lyY2xlIGN4PSIzNiIgY3k9IjM2IiByPSIxIi8+PGNpcmNsZSBjeD0iNjgiIGN5PSIzNiIgcj0iMSIvPjxjaXJjbGUgY3g9IjQiIGN5PSI2OCIgcj0iMSIvPjxjaXJjbGUgY3g9IjM2IiBjeT0iNjgiIHI9IjEiLz48Y2lyY2xlIGN4PSI2OCIgY3k9IjY4IiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      <div className="max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Leaf className="h-8 w-8 text-green-300 mr-3 drop-shadow-md" />
            <h1 className="text-3xl md:text-4xl font-bold text-shadow">GX対応度診断ツール</h1>
          </div>
          <p className="text-lg opacity-90 mb-4 text-green-50">
            貴社のグリーントランスフォーメーション（GX）への取り組み状況を診断し、改善点を明確化します。
            各項目に対する取り組み状況をチェックすることで、現在のGX対応レベルと今後の優先課題を特定します。
          </p>
          <div className="flex items-center gap-2 text-white/90 mt-6 bg-green-700/40 p-3 rounded-lg inline-block backdrop-blur-sm shadow-inner">
            <BarChart3 className="h-5 w-5" />
            <span className="text-sm font-medium">5分程度で簡易診断が完了します</span>
          </div>
        </motion.div>
      </div>
    </div>
  </motion.section>
);

export default GxAssessmentHeader;
