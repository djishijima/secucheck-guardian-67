
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";

const AIHero = () => {
  return (
    <section className="mb-16">
      <div className="bg-gradient-to-r from-indigo-700 to-blue-700 rounded-2xl p-8 md:p-12 shadow-xl text-white overflow-hidden relative">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTIiIGhlaWdodD0iNTIiIHZpZXdCb3g9IjAgMCA1MiA1MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBjeD0iNiIgY3k9IjYiIHI9IjIiLz48Y2lyY2xlIGN4PSIzMiIgY3k9IjYiIHI9IjIiLz48Y2lyY2xlIGN4PSIxOSIgY3k9IjE5IiByPSIyIi8+PGNpcmNsZSBjeD0iNDUiIGN5PSIxOSIgcj0iMiIvPjxjaXJjbGUgY3g9IjYiIGN5PSIzMiIgcj0iMiIvPjxjaXJjbGUgY3g9IjMyIiBjeT0iMzIiIHI9IjIiLz48Y2lyY2xlIGN4PSIxOSIgY3k9IjQ1IiByPSIyIi8+PGNpcmNsZSBjeD0iNDUiIGN5PSI0NSIgcj0iMiIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <Sparkles className="h-8 w-8 text-yellow-300 mr-2 animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-shadow">
              AIが変える、印刷の未来
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-8 text-blue-50">
              文唱堂印刷は、最先端のAI技術を活用し、印刷業界に革新をもたらします。データ分析から画像処理、多言語対応まで、AI技術の力でビジネスの可能性を広げます。
            </p>
            <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 font-medium group">
              AI製品を見る <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIHero;
