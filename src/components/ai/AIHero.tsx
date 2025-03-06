
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";

const AIHero = () => {
  return (
    <section className="mb-16">
      <div className="bg-gradient-to-r from-indigo-700 to-blue-700 rounded-2xl p-8 md:p-12 shadow-xl text-white">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <Sparkles className="h-8 w-8 text-yellow-300 mr-2" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AIが変える、印刷の未来
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              文唱堂印刷は、最先端のAI技術を活用し、印刷業界に革新をもたらします。データ分析から画像処理、多言語対応まで、AI技術の力でビジネスの可能性を広げます。
            </p>
            <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              AI製品を見る <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIHero;
