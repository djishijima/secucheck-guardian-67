
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ScopeTwoDataType {
  total: number;
  unit: string;
  categories: {
    name: string;
    value: number;
    percentage: number;
    color: string;
  }[];
  monthlyTrend: {
    month: string;
    value: number;
  }[];
  yearOverYear: {
    year: string;
    value: number;
  }[];
  locations: {
    name: string;
    value: number;
    percentage: number;
  }[];
  reductionTargets: {
    year: string;
    target: number;
    status: string;
  }[];
}

interface ScopeTwoReductionTabProps {
  scopeTwoData: ScopeTwoDataType;
}

const ScopeTwoReductionTab: React.FC<ScopeTwoReductionTabProps> = ({ scopeTwoData }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* 目標と進捗 */}
      <Card className="border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-md">
        <CardHeader className="bg-purple-50 border-b border-purple-100">
          <CardTitle className="text-purple-800">排出量削減目標</CardTitle>
          <CardDescription>短期・中期・長期目標の設定と進捗</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500">⚡</span>
              <h3 className="text-lg font-semibold text-gray-800">2030年度までの削減目標</h3>
            </div>
            
            <div className="relative pt-6 pb-12">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200"></div>
              
              {scopeTwoData.reductionTargets.map((target, index) => {
                const progress = Math.min(100, Math.max(0, 100 - (target.target / scopeTwoData.yearOverYear[0].value * 100)));
                return (
                  <motion.div 
                    key={index}
                    className="relative mb-8 pl-8"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                  >
                    <div className="absolute left-0 top-2 -ml-2.5 h-5 w-5 rounded-full bg-white border-2 border-purple-500"></div>
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="mb-2 md:mb-0 md:w-1/4">
                        <span className="text-lg font-semibold text-gray-800">{target.year}</span>
                        <span className="text-sm ml-2 text-gray-500">({target.status})</span>
                      </div>
                      <div className="md:w-3/4">
                        <div className="mb-2 flex justify-between">
                          <span className="text-gray-700">目標: <span className="font-medium">{target.target}</span> {scopeTwoData.unit}</span>
                          <span className="text-gray-700">基準年比 {((1 - target.target / scopeTwoData.yearOverYear[0].value) * 100).toFixed(0)}% 削減</span>
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
          
          {/* 主要削減施策 */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              主要削減施策
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                className="border rounded-lg p-4 hover:border-purple-300 hover:bg-purple-50 transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h4 className="font-medium text-gray-800 mb-2">再生可能エネルギーへの切り替え</h4>
                <p className="text-sm text-gray-600 mb-2">2025年までに電力の40%、2030年までに60%を再エネ由来に切り替え</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">想定削減量</span>
                  <span className="font-medium text-green-600">約187 tCO2e/年</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="border rounded-lg p-4 hover:border-purple-300 hover:bg-purple-50 transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <h4 className="font-medium text-gray-800 mb-2">オンサイト太陽光発電の導入</h4>
                <p className="text-sm text-gray-600 mb-2">本社屋上および駐車場に太陽光パネルを設置し、自家消費型の再エネを導入</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">想定削減量</span>
                  <span className="font-medium text-green-600">約58 tCO2e/年</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="border rounded-lg p-4 hover:border-purple-300 hover:bg-purple-50 transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <h4 className="font-medium text-gray-800 mb-2">省エネ設備への更新</h4>
                <p className="text-sm text-gray-600 mb-2">照明のLED化、高効率空調設備の導入、断熱改修などを計画的に実施</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">想定削減量</span>
                  <span className="font-medium text-green-600">約42 tCO2e/年</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="border rounded-lg p-4 hover:border-purple-300 hover:bg-purple-50 transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <h4 className="font-medium text-gray-800 mb-2">エネルギーマネジメントシステムの導入</h4>
                <p className="text-sm text-gray-600 mb-2">リアルタイムのエネルギー消費監視と最適化による効率改善</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">想定削減量</span>
                  <span className="font-medium text-green-600">約25 tCO2e/年</span>
                </div>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 削減シナリオ */}
      <Card className="border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-md">
        <CardHeader className="bg-purple-50 border-b border-purple-100">
          <CardTitle className="text-purple-800">削減シナリオ</CardTitle>
          <CardDescription>主要施策ごとの削減効果シミュレーション</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-3">2030年度目標達成見込み</h3>
              <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden mb-3 relative">
                <div className="h-full bg-green-500 w-[74%]"></div>
                <div className="absolute top-0 left-[74%] h-full border-l-2 border-red-500 border-dashed"></div>
                <div className="absolute -top-7 left-[74%] transform -translate-x-1/2 text-sm font-medium text-red-500">
                  目標
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>現在: 532.7 tCO2e</span>
                <span>2030年予測: 312.1 tCO2e</span>
                <span>目標: 250.0 tCO2e</span>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium text-gray-800 mb-3">施策別削減効果（累積）</h4>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg flex justify-between items-center">
                  <div>
                    <span className="font-medium">施策実施なし（基準ケース）</span>
                    <p className="text-sm text-gray-500">自然減のみ</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">480.0</span>
                    <span className="text-sm text-gray-500 ml-1">tCO2e</span>
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg flex justify-between items-center bg-green-50">
                  <div>
                    <span className="font-medium">再エネ電力への切り替え</span>
                    <p className="text-sm text-gray-500">60%再エネ化</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">306.2</span>
                    <span className="text-sm text-gray-500 ml-1">tCO2e</span>
                    <span className="text-green-600 text-sm ml-2">(-173.8)</span>
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg flex justify-between items-center bg-green-50">
                  <div>
                    <span className="font-medium">オンサイト太陽光発電</span>
                    <p className="text-sm text-gray-500">本社・工場Aに導入</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">248.2</span>
                    <span className="text-sm text-gray-500 ml-1">tCO2e</span>
                    <span className="text-green-600 text-sm ml-2">(-58.0)</span>
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg flex justify-between items-center bg-gray-50 text-gray-400">
                  <div>
                    <span className="font-medium">2030年度目標</span>
                    <p className="text-sm">基準年比 -60%</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">250.0</span>
                    <span className="text-sm ml-1">tCO2e</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScopeTwoReductionTab;
