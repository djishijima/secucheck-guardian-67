
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => (
  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center mb-12"
  >
    <div className="inline-block p-2 px-4 bg-blue-100 rounded-full text-blue-800 font-medium mb-4">
      持続可能な未来へのビジネス変革
    </div>
    <h1 className="text-4xl font-bold text-gray-900 mb-4">サステナブルDX診断サービス</h1>
    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
      持続可能な成長と競争力強化を実現するための診断サービスを提供しています。
      サステナビリティとDXの両面から企業の現状を評価し、明確なアクションプランをご提案します。
    </p>
  </motion.div>
);

export default HeroSection;
