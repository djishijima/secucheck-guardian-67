
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf } from 'lucide-react';
import { Button } from "@/components/ui/button";

const GXHero = () => {
  return (
    <section className="mb-16">
      <div className="bg-gradient-to-r from-green-700 to-emerald-700 rounded-2xl p-8 md:p-12 shadow-xl text-white">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <Leaf className="h-8 w-8 text-green-300 mr-2" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              グリーントランスフォーメーション（GX）の取り組み
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              文唱堂印刷は、持続可能な社会の実現に向けて、印刷業界におけるグリーントランスフォーメーションを推進しています。
            </p>
            <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              GX製品を見る <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GXHero;
