
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf } from 'lucide-react';
import { Button } from "@/components/ui/button";

const GXHero = () => {
  return (
    <section className="mb-16">
      <div className="bg-gradient-to-r from-green-700 to-emerald-700 rounded-2xl p-8 md:p-12 shadow-xl text-white overflow-hidden relative">
        {/* Add subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIvPjxwYXRoIGQ9Ik0zMCAzMGgzMHYzMEgzMHoiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PHBhdGggZD0iTTAgMzBoMzB2MzBIMHoiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <Leaf className="h-8 w-8 text-green-300 mr-2 drop-shadow-md" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-shadow">
              グリーントランスフォーメーション（GX）<br className="hidden md:block" />の取り組み
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 text-green-50">
              文唱堂印刷は、持続可能な社会の実現に向けて、印刷業界におけるグリーントランスフォーメーションを推進しています。
            </p>
            <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 font-medium">
              GX製品を見る <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GXHero;
