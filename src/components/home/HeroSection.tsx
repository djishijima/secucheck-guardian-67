
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Leaf, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="mb-16" id="hero">
      <motion.div 
        className="relative overflow-hidden rounded-2xl shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Material Design background with matte finish */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-indigo-700 to-purple-800">
          {/* Subtle dot pattern for texture */}
          <div className="absolute inset-0 opacity-10" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3C/g%3E%3C/svg%3E")` 
          }}></div>
        </div>

        <div className="relative p-8 sm:p-10 md:p-16">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 mb-6 bg-white/20 backdrop-blur-sm rounded-full border border-white/10 shadow-sm">
                <Leaf className="h-5 w-5 text-green-200" />
                <Sparkles className="h-5 w-5 text-yellow-200" />
                <span className="text-white font-medium">サステナブルな未来を創る</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="block text-white">文唱堂印刷の</span>
                <span className="bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-100 bg-clip-text text-transparent">
                  次世代GX×AI
                </span>
                <span className="text-white"> ソリューション</span>
              </h1>
              
              <p className="text-lg md:text-xl text-blue-50 mb-8 leading-relaxed">
                持続可能な未来を創る革新的テクノロジー。最先端AIと環境配慮型印刷技術の融合で、
                あなたのビジネスのサステナビリティと成長を同時に実現します。
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="https://form.typeform.com/to/Qv6t1Q" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-white hover:bg-gray-50 text-blue-800 border-none shadow-md hover:shadow-lg transition-all duration-300 group h-12">
                    お問い合わせ 
                    <MessageSquare className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  </Button>
                </Link>
                <Link to="/products" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600/80 hover:bg-blue-700/90 text-white border-none shadow-md hover:shadow-lg transition-all duration-300 h-12">
                    全製品・サービスを見る
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements with reduced intensity for matte look */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/30 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
        <div className="absolute -top-5 -left-5 w-32 h-32 bg-blue-500/30 rounded-full mix-blend-overlay filter blur-3xl opacity-30"></div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
