
import React from 'react';
import { ScopeOneDataType } from '@/data/scopeOneData';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

interface ReductionTargetsProps {
  scopeOneData: ScopeOneDataType;
}

const ReductionTargets: React.FC<ReductionTargetsProps> = ({ scopeOneData }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Leaf className="h-5 w-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-800">2030年度までの削減目標</h3>
      </div>
      
      <div className="relative pt-6 pb-12">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200"></div>
        
        {scopeOneData.reductionTargets.map((target, index) => {
          const progress = Math.min(100, Math.max(0, 100 - (target.target / scopeOneData.yearOverYear[0].value * 100)));
          return (
            <motion.div 
              key={index}
              className="relative mb-8 pl-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
            >
              <div className="absolute left-0 top-2 -ml-2.5 h-5 w-5 rounded-full bg-white border-2 border-blue-500"></div>
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="mb-2 md:mb-0 md:w-1/4">
                  <span className="text-lg font-semibold text-gray-800">{target.year}</span>
                  <span className="text-sm ml-2 text-gray-500">({target.status})</span>
                </div>
                <div className="md:w-3/4">
                  <div className="mb-2 flex justify-between">
                    <span className="text-gray-700">目標: <span className="font-medium">{target.target}</span> {scopeOneData.unit}</span>
                    <span className="text-gray-700">基準年比 {((1 - target.target / scopeOneData.yearOverYear[0].value) * 100).toFixed(0)}% 削減</span>
                  </div>
                  <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-green-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: 0.3 + (index * 0.2) }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ReductionTargets;
