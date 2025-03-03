
import React from 'react';
import { motion } from 'framer-motion';
import { ScopeOneDataType } from '@/data/scopeOneData';

interface ReductionSimulationProps {
  scopeOneData: ScopeOneDataType;
}

const ReductionSimulation: React.FC<ReductionSimulationProps> = ({ scopeOneData }) => {
  // Calculate the end point of actual data (represents current emissions)
  const currentEmissions = scopeOneData.total;
  
  // Calculate "business as usual" line - no reduction (slightly increasing trend)
  const businessAsUsual = Array.from({ length: 5 }).map((_, i) => 
    Math.round(currentEmissions * (1 + 0.02 * (i + 1))));
  
  // Calculate "with measures" line - showing reductions based on targets
  const withMeasures = scopeOneData.reductionTargets.map(target => target.target);
  
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
              d={`M 0,${80 - (scopeOneData.yearOverYear[0].value / 4)} L 10,${80 - (scopeOneData.yearOverYear[1].value / 4)} L 20,${80 - (currentEmissions / 4)}`}
              stroke="#3B82F6"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            />
            {/* 予測線 (現状予測) - 増加傾向 */}
            <motion.path 
              d={`M 20,${80 - (currentEmissions / 4)} L 40,${80 - (businessAsUsual[0] / 4)} L 60,${80 - (businessAsUsual[2] / 4)} L 80,${80 - (businessAsUsual[3] / 4)} L 100,${80 - (businessAsUsual[4] / 4)}`}
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray="4 2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            />
            {/* 目標線 (施策実施後 - 改善される) */}
            <motion.path 
              d={`M 20,${80 - (currentEmissions / 4)} L 40,${80 - (withMeasures[0] / 4)} L 60,${80 - (withMeasures[1] / 4)} L 80,${80 - (withMeasures[2] / 4)} L 100,${80 - (withMeasures[3] / 4)}`}
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
      <div className="mt-4 text-left text-sm text-gray-600">
        <p>施策を実施することで、CO2排出量を2030年までに大幅に削減できる見込みです</p>
      </div>
    </div>
  );
};

export default ReductionSimulation;
