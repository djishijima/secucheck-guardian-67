
import React from 'react';
import { ScopeOneDataType } from '@/data/scopeOneData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { Leaf, BarChart3 } from 'lucide-react';

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
                )
              })}
            </div>
          </div>
          
          {/* 主要削減施策 */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              主要削減施策
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h4 className="font-medium text-gray-800 mb-2">電気自動車への切り替え</h4>
                <p className="text-sm text-gray-600 mb-2">社有車の50%をEVに切り替え。充電インフラの整備も並行して実施。</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">想定削減量</span>
                  <span className="font-medium text-green-600">約30 tCO2e/年</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <h4 className="font-medium text-gray-800 mb-2">高効率ボイラーの導入</h4>
                <p className="text-sm text-gray-600 mb-2">老朽化した既存ボイラーを最新の高効率モデルに交換。エネルギー効率を25%向上。</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">想定削減量</span>
                  <span className="font-medium text-green-600">約45 tCO2e/年</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <h4 className="font-medium text-gray-800 mb-2">空調設備の冷媒管理強化</h4>
                <p className="text-sm text-gray-600 mb-2">定期点検頻度の増加と漏洩検知システムの導入。低GWP冷媒への計画的な切り替え。</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">想定削減量</span>
                  <span className="font-medium text-green-600">約15 tCO2e/年</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="border rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <h4 className="font-medium text-gray-800 mb-2">燃料使用の最適化</h4>
                <p className="text-sm text-gray-600 mb-2">運転時間の見直しと負荷管理によるエネルギー消費の削減。遠隔モニタリングの導入。</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">想定削減量</span>
                  <span className="font-medium text-green-600">約20 tCO2e/年</span>
                </div>
              </motion.div>
            </div>
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
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScopeOneReductionTab;
