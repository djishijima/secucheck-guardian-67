
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
          <ReductionInitiatives />
        </CardContent>
      </Card>
      
      {/* 削減シミュレーション */}
      <Card className="border-blue-100 hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <CardTitle className="text-blue-800">削減シミュレーション</CardTitle>
          <CardDescription>施策実施による将来予測</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <ReductionSimulation />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScopeOneReductionTab;
