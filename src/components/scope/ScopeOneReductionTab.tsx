
import React from 'react';
import { ScopeOneDataType } from '@/data/scopeOneData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';
import ReductionTargets from './reduction/ReductionTargets';
import ReductionInitiatives from './reduction/ReductionInitiatives';
import ReductionSimulation from './reduction/ReductionSimulation';

interface ScopeOneReductionTabProps {
  scopeOneData: ScopeOneDataType;
}

const ScopeOneReductionTab: React.FC<ScopeOneReductionTabProps> = ({ scopeOneData }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* 目標と進捗 */}
      <Card className="border-blue-100 hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <CardTitle className="text-blue-800">排出量削減目標</CardTitle>
          <CardDescription>短期・中期・長期目標の設定と進捗</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <ReductionTargets scopeOneData={scopeOneData} />
          
          {/* 主要削減施策 */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-blue-800">主要削減施策</h3>
            <ReductionInitiatives />
          </div>
        </CardContent>
      </Card>
      
      {/* 削減シミュレーション */}
      <Card className="border-blue-100 hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <CardTitle className="text-blue-800">削減シミュレーション</CardTitle>
          <CardDescription>施策実施による将来予測</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <ReductionSimulation scopeOneData={scopeOneData} />
        </CardContent>
      </Card>

      {/* 月次排出量推移 */}
      <Card className="border-blue-100 hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <CardTitle className="text-blue-800">月次排出量推移</CardTitle>
          <CardDescription>2022年度の月次データ</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 overflow-x-auto">
          <div className="min-w-[600px] h-64 px-4">
            <div className="flex justify-between items-end h-48 mb-4">
              {scopeOneData.monthlyTrend.map((month, index) => {
                const heightPercentage = (month.value / Math.max(...scopeOneData.monthlyTrend.map(m => m.value))) * 100;
                return (
                  <motion.div 
                    key={index}
                    className="flex flex-col items-center"
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercentage}%` }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <div className="relative w-10">
                      <motion.div 
                        className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-all rounded-t"
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPercentage}%` }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      ></motion.div>
                      <div className="absolute -top-6 left-0 right-0 text-center text-sm font-medium text-gray-700">
                        {month.value.toFixed(1)}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
            <div className="flex justify-between">
              {scopeOneData.monthlyTrend.map((month, index) => (
                <div key={index} className="text-center w-10">
                  <span className="text-xs text-gray-500">{month.month}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScopeOneReductionTab;
