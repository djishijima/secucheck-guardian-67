
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="mb-16">
      <div className="bg-gradient-to-r from-indigo-800 to-purple-800 rounded-2xl p-8 md:p-12 shadow-lg">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              <span className="block">文唱堂印刷の</span>
              <span className="text-yellow-300">次世代GX×AI</span> ソリューション
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 text-white">
              持続可能な未来を創る革新的テクノロジー。最先端AIと環境配慮型印刷技術の融合で、
              あなたのビジネスのサステナビリティと成長を同時に実現します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100">
                  お問い合わせ <MessageSquare className="ml-2 h-5 w-5" />
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
