
import React from 'react';
import { motion } from 'framer-motion';

const ReductionSimulation: React.FC = () => {
  return (
    <div>
      <div className="h-64 mb-6">
        <div className="h-60 relative">
          {/* 簡易的なシミュレーショングラフ */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300"></div>
          <div className="absolute left-0 right-0 bottom-0 h-px bg-gray-300"></div>
          
          {/* 実績線 */}
          <svg className="absolute top-0 left-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path 
              d="M 0,20 L 10,25 L 20,32"
              stroke="#3B82F6"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            />
            {/* 予測線 */}
            <motion.path 
              d="M 20,32 L 30,40 L 40,48 L 60,60 L 80,72 L 100,85"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray="4 2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            />
            {/* 目標線 */}
            <motion.path 
              d="M 20,32 L 30,37 L 40,42 L 60,55 L 80,65 L 100,75"
              stroke="#10B981"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1.2 }}
            />
          </svg>
          
          {/* Y軸ラベル */}
          <div className="absolute -left-10 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
            <span>300</span>
            <span>200</span>
            <span>100</span>
            <span>0</span>
          </div>
          
          {/* X軸ラベル */}
          <div className="absolute left-0 right-0 -bottom-6 flex justify-between text-xs text-gray-500">
            <span>2020</span>
            <span>2022</span>
            <span>2024</span>
            <span>2026</span>
            <span>2028</span>
            <span>2030</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-blue-500"></div>
          <span className="text-sm text-gray-600">現状予測</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-green-500"></div>
          <span className="text-sm text-gray-600">施策実施後</span>
        </div>
      </div>
    </div>
  );
};

export default ReductionSimulation;
