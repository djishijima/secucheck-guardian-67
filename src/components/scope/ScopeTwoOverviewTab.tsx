
import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

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
  // Convert categories data for PieChart
  const pieChartData = scopeTwoData.categories.map(category => ({
    name: category.name,
    value: category.value,
    color: category.color.replace('bg-', '#')
      .replace('purple-500', '8b5cf6')
      .replace('indigo-500', '6366f1')
      .replace('sky-500', '0ea5e9')
      .replace('teal-500', '14b8a6')
  }));
  
  // Convert monthly data for BarChart
  const barChartData = scopeTwoData.monthlyTrend.map(item => ({
    name: item.month,
    排出量: item.value
  }));

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
            
            <div className="flex justify-center items-center h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} ${scopeTwoData.unit}`} />
                </PieChart>
              </ResponsiveContainer>
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
        <CardContent className="pt-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} ${scopeTwoData.unit}`} />
                <Legend />
                <Bar dataKey="排出量" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScopeTwoOverviewTab;
