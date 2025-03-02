
import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from "@/components/ui/progress";

interface GxProgressIndicatorProps {
  progress: number;
}

const GxProgressIndicator: React.FC<GxProgressIndicatorProps> = ({ progress }) => (
  <motion.div 
    className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-green-100"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
  >
    <div className="flex justify-between mb-2">
      <span className="text-sm font-medium text-gray-700">診断の進捗状況</span>
      <span className="text-sm font-medium text-green-600">{Math.round(progress)}%</span>
    </div>
    <Progress value={progress} className="h-2 bg-gray-100" />
    <p className="text-xs text-gray-500 mt-2">
      {progress < 30 && "企業情報を入力してください"}
      {progress >= 30 && progress < 40 && "最初のセクションの質問に回答してください"}
      {progress >= 40 && progress < 60 && "引き続き質問に回答してください"}
      {progress >= 60 && progress < 80 && "もう少しで質問が完了します"}
      {progress >= 80 && progress < 100 && "最後のセクションに回答してください"}
      {progress === 100 && "診断が完了しました！結果をご確認ください"}
    </p>
  </motion.div>
);

export default GxProgressIndicator;
