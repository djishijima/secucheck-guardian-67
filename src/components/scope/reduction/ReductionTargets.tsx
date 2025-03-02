
import React from 'react';
import { ScopeOneDataType } from '@/data/scopeOneData';
import { motion } from 'framer-motion';
import { Leaf, ArrowDownRight } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

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
      
      <div className="space-y-6">
        {scopeOneData.reductionTargets.map((target, index) => {
          const progress = Math.min(100, Math.max(0, 100 - (target.target / scopeOneData.yearOverYear[0].value * 100)));
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center mb-2">
                <div className="md:w-1/4 flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    target.status === '進行中' ? 'bg-blue-500' : 'bg-gray-300'
                  }`}></div>
                  <span className="text-lg font-medium text-gray-800">{target.year}</span>
                  <span className="text-sm ml-2 text-gray-500">({target.status})</span>
                </div>
                <div className="md:w-3/4 mt-2 md:mt-0">
                  <div className="mb-2 flex justify-between">
                    <div className="flex items-center text-gray-700">
                      <span>目標: <span className="font-medium">{target.target}</span> {scopeOneData.unit}</span>
                      <span className="flex items-center ml-3 text-green-600 text-sm">
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                        {((1 - target.target / scopeOneData.yearOverYear[0].value) * 100).toFixed(0)}% 削減
                      </span>
                    </div>
                  </div>
                  <Progress value={progress} className="h-3 rounded-full bg-gray-100" />
                  <div className="mt-1 text-right text-xs text-gray-500">
                    基準年比削減率: {progress.toFixed(0)}%
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
