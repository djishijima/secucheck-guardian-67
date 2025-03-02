
import React from 'react';
import { ScopeOneDataType } from '@/data/scopeOneData';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from 'framer-motion';
import { Download, ArrowRight, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ScopeOneOverviewTabProps {
  scopeOneData: ScopeOneDataType;
  onDownloadReport: () => void;
}

const ScopeOneOverviewTab: React.FC<ScopeOneOverviewTabProps> = ({ 
  scopeOneData, 
  onDownloadReport 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* 総排出量カード */}
      <Card className="overflow-hidden border-indigo-100 hover:border-indigo-200 transition-all shadow-sm hover:shadow">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
          <CardTitle className="text-indigo-800">Scope 1 総排出量</CardTitle>
          <CardDescription>2022年度実績</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <span className="text-5xl font-bold text-indigo-700">{scopeOneData.total}</span>
              <span className="text-xl ml-2 text-gray-500">{scopeOneData.unit}</span>
              <p className="text-gray-600 mt-2">前年度比 {((1 - scopeOneData.total / scopeOneData.yearOverYear[1].value) * 100).toFixed(1)}% 削減</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex gap-2" onClick={onDownloadReport}>
                <Download className="h-4 w-4" />
                レポート
              </Button>
              <Link to={`/scope-one?tab=details`}>
                <Button className="flex gap-2 bg-indigo-600 hover:bg-indigo-700">
                  詳細を見る
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* カテゴリ別排出量 */}
      <Card className="border-indigo-100 hover:border-indigo-200 transition-all shadow-sm hover:shadow">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
          <CardTitle className="text-indigo-800">カテゴリ別排出量</CardTitle>
          <CardDescription>排出源ごとの内訳</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {scopeOneData.categories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">{category.name}</span>
                    <div className="text-right">
                      <span className="font-semibold">{category.value}</span>
                      <span className="text-sm text-gray-500 ml-1">{scopeOneData.unit}</span>
                      <span className="text-gray-400 text-sm ml-2">({category.percentage}%)</span>
                    </div>
                  </div>
                  <Progress value={category.percentage} className={`h-2 ${category.color}`} />
                </div>
              ))}
            </div>
            
            <div className="flex justify-center items-center">
              <div className="relative w-52 h-52 flex items-center justify-center">
                {/* 円グラフの表現 */}
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {scopeOneData.categories.map((category, index) => {
                    const previousPercentages = scopeOneData.categories
                      .slice(0, index)
                      .reduce((acc, cat) => acc + cat.percentage, 0);
                    const start = previousPercentages * 3.6; // 360度の円を100%で割った値
                    const end = start + category.percentage * 3.6;
                    
                    const startAngle = (start - 90) * (Math.PI / 180);
                    const endAngle = (end - 90) * (Math.PI / 180);
                    
                    const startX = 50 + 40 * Math.cos(startAngle);
                    const startY = 50 + 40 * Math.sin(startAngle);
                    const endX = 50 + 40 * Math.cos(endAngle);
                    const endY = 50 + 40 * Math.sin(endAngle);
                    
                    const largeArcFlag = category.percentage > 50 ? 1 : 0;
                    
                    const pathData = [
                      `M 50 50`,
                      `L ${startX} ${startY}`,
                      `A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                      `Z`
                    ].join(' ');

                    // Get the color class without the bg- prefix for fill
                    const colorClass = category.color.replace('bg-', '');
                    
                    return (
                      <path
                        key={index}
                        d={pathData}
                        className={`fill-${colorClass}`}
                        stroke="#fff"
                        strokeWidth="1"
                      />
                    );
                  })}
                  <circle cx="50" cy="50" r="25" fill="white" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <PieChart className="h-6 w-6 text-indigo-500 mb-1" />
                  <span className="text-sm font-medium">カテゴリ別</span>
                  <span className="text-xs text-gray-500">排出割合</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 月次推移 */}
      <Card className="border-indigo-100 hover:border-indigo-200 transition-all shadow-sm hover:shadow">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
          <CardTitle className="text-indigo-800">月次排出量推移</CardTitle>
          <CardDescription>2022年度</CardDescription>
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
                        className="absolute bottom-0 w-full bg-gradient-to-t from-indigo-600 to-purple-500 hover:from-indigo-700 hover:to-purple-600 transition-all rounded-t"
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

export default ScopeOneOverviewTab;
