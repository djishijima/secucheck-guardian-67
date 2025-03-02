
import React from 'react';
import { motion } from 'framer-motion';
import { Download, PieChart, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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

interface ScopeTwoOverviewTabProps {
  scopeTwoData: ScopeTwoDataType;
  onDownloadReport: () => void;
  onViewDetails: () => void;
}

const ScopeTwoOverviewTab: React.FC<ScopeTwoOverviewTabProps> = ({ 
  scopeTwoData, 
  onDownloadReport,
  onViewDetails
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* 総排出量カード */}
      <Card className="overflow-hidden border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-md">
        <CardHeader className="bg-purple-50 border-b border-purple-100">
          <CardTitle className="text-purple-800">Scope 2 総排出量</CardTitle>
          <CardDescription>2022年度実績</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <span className="text-5xl font-bold text-purple-700">{scopeTwoData.total}</span>
              <span className="text-xl ml-2 text-gray-500">{scopeTwoData.unit}</span>
              <p className="text-gray-600 mt-2">前年度比 {((1 - scopeTwoData.total / scopeTwoData.yearOverYear[1].value) * 100).toFixed(1)}% 削減</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex gap-2" onClick={onDownloadReport}>
                <Download className="h-4 w-4" />
                レポート
              </Button>
              <Button className="flex gap-2 bg-purple-600 hover:bg-purple-700" onClick={onViewDetails}>
                詳細を見る
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* カテゴリ別排出量 */}
      <Card className="border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-md">
        <CardHeader className="bg-purple-50 border-b border-purple-100">
          <CardTitle className="text-purple-800">エネルギー源別排出量</CardTitle>
          <CardDescription>購入したエネルギー別の内訳</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {scopeTwoData.categories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">{category.name}</span>
                    <div className="text-right">
                      <span className="font-semibold">{category.value}</span>
                      <span className="text-sm text-gray-500 ml-1">{scopeTwoData.unit}</span>
                      <span className="text-gray-400 text-sm ml-2">({category.percentage}%)</span>
                    </div>
                  </div>
                  <Progress value={category.percentage} className={`h-2 ${category.color}`} />
                </div>
              ))}
            </div>
            
            <div className="flex justify-center items-center">
              <div className="relative w-48 h-48 flex items-center justify-center">
                {/* 円グラフの簡易表現 */}
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {scopeTwoData.categories.map((category, index) => {
                    const previousPercentages = scopeTwoData.categories
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
                    
                    return (
                      <path
                        key={index}
                        d={pathData}
                        fill={category.color.replace('bg-', 'fill-').replace('-500', '-400')}
                        stroke="#fff"
                        strokeWidth="1"
                      />
                    );
                  })}
                  <circle cx="50" cy="50" r="25" fill="white" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <PieChart className="h-6 w-6 text-purple-500 mb-1" />
                  <span className="text-sm font-medium">エネルギー源別</span>
                  <span className="text-xs text-gray-500">排出割合</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 拠点別排出量 */}
      <Card className="border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-md">
        <CardHeader className="bg-purple-50 border-b border-purple-100">
          <CardTitle className="text-purple-800">拠点別排出量</CardTitle>
          <CardDescription>施設・拠点ごとの排出量</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {scopeTwoData.locations.map((location, index) => (
              <motion.div 
                key={index} 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">{location.name}</span>
                  <div className="text-right">
                    <span className="font-semibold">{location.value}</span>
                    <span className="text-sm text-gray-500 ml-1">{scopeTwoData.unit}</span>
                    <span className="text-gray-400 text-sm ml-2">({location.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <motion.div 
                    className="h-full bg-indigo-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${location.percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + (index * 0.1) }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* 月次推移 */}
      <Card className="border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-md overflow-hidden">
        <CardHeader className="bg-purple-50 border-b border-purple-100">
          <CardTitle className="text-purple-800">月次排出量推移</CardTitle>
          <CardDescription>2022年度</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 overflow-x-auto">
          <div className="min-w-[600px] h-64 px-4">
            <div className="flex justify-between items-end h-48 mb-4">
              {scopeTwoData.monthlyTrend.map((month, index) => {
                const heightPercentage = (month.value / Math.max(...scopeTwoData.monthlyTrend.map(m => m.value))) * 100;
                return (
                  <motion.div 
                    key={index}
                    className="flex flex-col items-center"
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercentage}%` }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <div className="relative w-10">
                      <div className="absolute bottom-0 w-full bg-purple-500 hover:bg-purple-600 transition-all rounded-t"></div>
                      <motion.div 
                        className="absolute bottom-0 w-full bg-purple-500 hover:bg-purple-600 transition-all rounded-t"
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPercentage}%` }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      ></motion.div>
                      <div className="absolute -top-6 left-0 right-0 text-center text-sm font-medium text-gray-700">
                        {month.value.toFixed(1)}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="flex justify-between">
              {scopeTwoData.monthlyTrend.map((month, index) => (
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

export default ScopeTwoOverviewTab;
