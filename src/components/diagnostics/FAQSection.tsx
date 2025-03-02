
import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

const FAQSection: React.FC = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.6 }}
    className="max-w-5xl mx-auto mt-12"
  >
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Info className="h-5 w-5 text-blue-500" />
        よくある質問
      </h2>
      <div className="space-y-4">
        <div className="border-b border-gray-200 pb-4">
          <h3 className="font-medium text-green-700 mb-2">診断にはどれくらいの時間がかかりますか？</h3>
          <p className="text-gray-600">
            簡易診断は約2週間、詳細診断は企業規模や範囲によって3〜6週間程度です。オンライン診断ツールを使った自己診断は即時結果が得られます。
          </p>
        </div>
        <div className="border-b border-gray-200 pb-4">
          <h3 className="font-medium text-green-700 mb-2">診断結果はどのような形で提供されますか？</h3>
          <p className="text-gray-600">
            診断結果は詳細なレポートとして提供され、経営層向けのエグゼクティブサマリーと実務担当者向けの詳細分析が含まれます。オプションでプレゼンテーションも可能です。
          </p>
        </div>
        <div>
          <h3 className="font-medium text-green-700 mb-2">中小企業でも利用できますか？</h3>
          <p className="text-gray-600">
            はい、企業規模に合わせたプランをご用意しています。中小企業向けの簡易診断パッケージもございますので、お気軽にご相談ください。
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

export default FAQSection;
