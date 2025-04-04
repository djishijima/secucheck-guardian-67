
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PowerProcurementCard: React.FC = () => {
  return (
    <Card className="border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-md">
      <CardHeader className="bg-purple-50 border-b border-purple-100">
        <CardTitle className="text-purple-800">電力調達分析</CardTitle>
        <CardDescription>電源構成と再エネ比率</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">現在の電源構成</h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">石炭火力</span>
                  <span className="font-medium">32%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gray-700"
                    initial={{ width: 0 }}
                    animate={{ width: '32%' }}
                    transition={{ duration: 0.8 }}
                  ></motion.div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">LNG火力</span>
                  <span className="font-medium">38%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-yellow-500"
                    initial={{ width: 0 }}
                    animate={{ width: '38%' }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  ></motion.div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">原子力</span>
                  <span className="font-medium">6%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-purple-400"
                    initial={{ width: 0 }}
                    animate={{ width: '6%' }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  ></motion.div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">水力</span>
                  <span className="font-medium">9%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-400"
                    initial={{ width: 0 }}
                    animate={{ width: '9%' }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  ></motion.div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">太陽光・風力</span>
                  <span className="font-medium">12%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: '12%' }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  ></motion.div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">その他</span>
                  <span className="font-medium">3%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gray-400"
                    initial={{ width: 0 }}
                    animate={{ width: '3%' }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  ></motion.div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">再生可能エネルギー比率</h3>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 font-medium">現在の再エネ比率</span>
                <span className="text-xl font-bold text-purple-700">21%</span>
              </div>
              <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mb-4">
                <motion.div 
                  className="h-full bg-green-500"
                  initial={{ width: 0 }}
                  animate={{ width: '21%' }}
                  transition={{ duration: 1 }}
                ></motion.div>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 font-medium">2030年目標</span>
                <span className="text-xl font-bold text-green-600">60%</span>
              </div>
              <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-gray-400 w-[60%]"></div>
              </div>
              
              <div className="text-sm text-gray-600 mt-4">
                <p className="mb-2">再エネ電力への切り替えによる削減ポテンシャル:</p>
                <p className="font-medium text-green-700">約 187 tCO2e/年</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 border rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-yellow-500">⚡</span>
                電力調達の選択肢
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5"></div>
                  <span>再エネ電力メニューへの切り替え</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5"></div>
                  <span>オンサイト太陽光発電の導入</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5"></div>
                  <span>コーポレートPPA（電力購入契約）</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5"></div>
                  <span>非化石証書・J-クレジットの購入</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerProcurementCard;
