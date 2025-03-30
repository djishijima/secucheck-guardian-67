
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import InitialUserForm from './InitialUserForm';

const DiagnosticHero = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 pt-16 pb-16">
      <div className="container mx-auto px-4 text-center">
        <motion.h1 
          className="text-3xl md:text-5xl font-bold mb-4 text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          あなたの企業の<span className="text-green-600">サステナビリティ</span>を徹底診断！
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          サステナビリティ診断、サステナブルDX診断、GX評価、スコープ1～3評価を無料で実施。
          今すぐ登録して、改善ポイントと戦略をチェック！
        </motion.p>
        
        <motion.div 
          className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ul className="text-left space-y-2 mb-6 md:mb-0">
            {[
              '環境・社会への取り組みを総合評価',
              'デジタル技術を活用した持続可能性向上',
              '脱炭素経営への取り組み状況を数値化',
              '具体的な削減アクションを提案'
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
          
          <div className="w-full max-w-md">
            <InitialUserForm />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm text-gray-600"
        >
          <p>※ご入力いただいた情報は診断サービス向上のために利用します</p>
          <p>※個人情報は厳重に管理し、診断サービス以外の目的では使用いたしません</p>
        </motion.div>
      </div>
    </section>
  );
};

export default DiagnosticHero;
