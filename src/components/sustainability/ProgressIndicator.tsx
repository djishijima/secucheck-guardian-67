
import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  progress: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ progress }) => (
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
      {progress < 30 && "基本情報を入力してください"}
      {progress >= 30 && progress < 60 && "SDGsの目標選択と優先順位付けを行ってください"}
      {progress >= 60 && progress < 100 && "診断質問に回答してください"}
      {progress === 100 && "診断が完了しました！結果をご確認ください"}
    </p>
  </motion.div>
);

export default ProgressIndicator;
