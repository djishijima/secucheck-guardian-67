
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Cpu } from 'lucide-react';
import { Button } from "@/components/ui/button";

const AIHero = () => {
  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative rounded-2xl overflow-hidden shadow-xl"
      >
        {/* Background with gradient and texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-800">
          <div className="absolute inset-0 opacity-10" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23ffffff' fill-opacity='0.25'%3E%3Cpath fill-rule='evenodd' d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/svg%3E")` 
          }}></div>
        </div>

        <div className="relative p-10 md:p-16 z-10">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center px-4 py-1.5 bg-white/10 backdrop-blur-sm text-indigo-100 rounded-full border border-indigo-400/20 font-medium">
                  <Brain className="h-4 w-4 mr-2 text-blue-300" />
                  <span>最先端テクノロジー</span>
                </div>
                <div className="flex items-center px-4 py-1.5 bg-white/10 backdrop-blur-sm text-purple-100 rounded-full border border-purple-400/20 font-medium">
                  <Cpu className="h-4 w-4 mr-2 text-purple-300" />
                  <span>インテリジェントソリューション</span>
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-md">
                <span className="bg-gradient-to-r from-blue-300 to-indigo-200 bg-clip-text text-transparent">AI</span>
                <span className="text-white">が変える、印刷の未来</span>
              </h2>
              
              <p className="text-lg md:text-xl text-indigo-50 opacity-90 mb-8 leading-relaxed">
                文唱堂印刷は、最先端のAI技術を活用し、印刷業界に革新をもたらします。データ分析から画像処理、多言語対応まで、AI技術の力でビジネスの可能性を広げます。
              </p>
              
              <Button size="lg" className="bg-white text-indigo-900 hover:bg-gray-100 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
                AI製品を見る <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </motion.div>
    </section>
  );
};

export default AIHero;
