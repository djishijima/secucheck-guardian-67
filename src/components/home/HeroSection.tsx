
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Leaf, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="mb-16" id="hero">
      <div className="bg-gradient-to-r from-green-800 to-indigo-800 rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-green-300 mr-2" />
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-300" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
              <span className="block">文唱堂印刷の</span>
              <span className="text-yellow-300">次世代GX×AI</span> ソリューション
            </h1>
            <p className="text-base sm:text-lg md:text-xl opacity-90 mb-6 sm:mb-8 text-white">
              持続可能な未来を創る革新的テクノロジー。最先端AIと環境配慮型印刷技術の融合で、
              あなたのビジネスのサステナビリティと成長を同時に実現します。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 w-full sm:w-auto h-12 sm:h-auto">
                  お問い合わせ <MessageSquare className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <Link to="/products" className="w-full sm:w-auto">
                <Button size="lg" className="bg-indigo-600 text-white hover:bg-indigo-700 w-full sm:w-auto h-12 sm:h-auto">
                  全製品・サービスを見る
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
