
import React from 'react';
import { ScopeOneDataType } from '@/data/scopeOneData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';

interface ScopeOneDetailsTabProps {
  scopeOneData: ScopeOneDataType;
}

const ScopeOneDetailsTab: React.FC<ScopeOneDetailsTabProps> = ({ scopeOneData }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* 年次推移 */}
      <Card className="border-blue-100 hover:border-blue-300 transition-all shadow-sm hover:shadow-md overflow-hidden">
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <CardTitle className="text-blue-800">年次排出量推移</CardTitle>
          <CardDescription>過去3年間の推移</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scopeOneData.yearOverYear.map((year, index) => (
              <motion.div 
                key={index}
                className={`p-4 rounded-lg border ${index === scopeOneData.yearOverYear.length - 1 ? 'border-blue-200 bg-blue-50' : 'border-gray-200'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="text-lg font-semibold text-gray-800 mb-2">{year.year}</div>
                <div className="text-3xl font-bold text-blue-700 mb-2">{year.value} <span className="text-lg text-gray-500">{scopeOneData.unit}</span></div>
                {index > 0 && (
                  <div className={`text-sm font-medium ${
                    year.value < scopeOneData.yearOverYear[index - 1].value ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {((1 - year.value / scopeOneData.yearOverYear[index - 1].value) * 100).toFixed(1)}% {
                      year.value < scopeOneData.yearOverYear[index - 1].value ? '削減' : '増加'
                    }
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 h-64">
            <div className="h-4 border-b border-gray-200 mb-2 relative">
              <div className="absolute top-0 right-0 text-sm text-gray-500">tCO2e</div>
            </div>
            <div className="flex justify-around items-end h-48 mb-4">
              {scopeOneData.yearOverYear.map((year, index) => {
                const heightPercentage = (year.value / Math.max(...scopeOneData.yearOverYear.map(y => y.value))) * 100;
                return (
                  <motion.div 
                    key={index}
                    className="flex flex-col items-center w-1/3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <div className="relative w-20">
                      <motion.div 
                        className={`w-full ${
                          index === scopeOneData.yearOverYear.length - 1 
                            ? 'bg-blue-500' 
                            : 'bg-gray-400'
                        } rounded-t-lg transition-all`}
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPercentage}%` }}
                        transition={{ duration: 0.7, delay: index * 0.2 }}
                      ></motion.div>
                      <div className="absolute -top-6 left-0 right-0 text-center text-sm font-medium text-gray-700">
                        {year.value.toFixed(1)}
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <span className="text-sm font-medium">{year.year}</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 詳細なカテゴリ別分析 */}
      <Card className="border-blue-100 hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <CardTitle className="text-blue-800">カテゴリ別詳細</CardTitle>
          <CardDescription>各排出源の詳細分析</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-8">
            {scopeOneData.categories.map((category, index) => (
              <motion.div 
                key={index}
                className="p-4 border rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <div className="ml-auto text-right">
                    <span className="text-xl font-bold">{category.value}</span>
                    <span className="text-sm ml-1">{scopeOneData.unit}</span>
                    <div className="text-sm text-gray-500">総排出量の {category.percentage}%</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">主な排出源</h4>
                    <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                      {category.name === '社有車' && (
                        <>
                          <li>社用車のガソリン・軽油使用</li>
                          <li>営業・配送用車両</li>
                          <li>通勤バス</li>
                        </>
                      )}
                      {category.name === '定置燃焼機器' && (
                        <>
                          <li>ボイラー設備</li>
                          <li>自家発電機</li>
                          <li>調理・加熱設備</li>
                        </>
                      )}
                      {category.name === '空調設備' && (
                        <>
                          <li>冷媒ガスの漏洩</li>
                          <li>空調機器のメンテナンス</li>
                        </>
                      )}
                      {category.name === 'その他' && (
                        <>
                          <li>非常用発電機</li>
                          <li>小型機器燃料</li>
                        </>
                      )}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">削減対策例</h4>
                    <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                      {category.name === '社有車' && (
                        <>
                          <li>EV車両への切り替え</li>
                          <li>エコドライブ研修</li>
                          <li>配送ルート最適化</li>
                        </>
                      )}
                      {category.name === '定置燃焼機器' && (
                        <>
                          <li>高効率設備への更新</li>
                          <li>バイオマス燃料の利用</li>
                          <li>運転最適化</li>
                        </>
                      )}
                      {category.name === '空調設備' && (
                        <>
                          <li>定期点検の強化</li>
                          <li>低GWP冷媒への切り替え</li>
                        </>
                      )}
                      {category.name === 'その他' && (
                        <>
                          <li>使用頻度の見直し</li>
                          <li>代替エネルギーの検討</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScopeOneDetailsTab;
