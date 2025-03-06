
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Leaf, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="mb-16" id="hero">
      <motion.div 
        className="relative overflow-hidden rounded-2xl shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background gradient with texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
          <div className="absolute inset-0 opacity-20" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
          }}></div>
        </div>

        <div className="relative p-8 sm:p-10 md:p-16">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 mb-6 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Leaf className="h-5 w-5 text-green-300" />
                <Sparkles className="h-5 w-5 text-yellow-300" />
                <span className="text-white font-medium">サステナブルな未来を創る</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="block text-white drop-shadow-md">文唱堂印刷の</span>
                <span className="bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
                  次世代GX×AI
                </span>
                <span className="text-white drop-shadow-md"> ソリューション</span>
              </h1>
              
              <p className="text-lg md:text-xl opacity-90 mb-8 text-blue-50 leading-relaxed drop-shadow-sm">
                持続可能な未来を創る革新的テクノロジー。最先端AIと環境配慮型印刷技術の融合で、
                あなたのビジネスのサステナビリティと成長を同時に実現します。
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-white hover:bg-gray-100 text-blue-900 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group h-12">
                    お問い合わせ 
                    <MessageSquare className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  </Button>
                </Link>
                <Link to="/products" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white border border-blue-500/50 shadow-lg hover:shadow-xl transition-all duration-300 h-12">
                    全製品・サービスを見る
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -top-5 -left-5 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
