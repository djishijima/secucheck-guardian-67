
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { AlertCircle } from 'lucide-react';

interface MonthlyItem {
  month: string;
  value: number;
}

interface MonthlyTrendCardProps {
  monthlyTrend: MonthlyItem[];
  unit: string;
}

const MonthlyTrendCard: React.FC<MonthlyTrendCardProps> = ({ monthlyTrend, unit }) => {
  // Check if we have valid data (at least one non-zero entry)
  const hasValidData = monthlyTrend && monthlyTrend.some(item => item.value > 0);
  
  // Convert monthly data for BarChart (only if we have valid data)
  const barChartData = hasValidData 
    ? monthlyTrend.map(item => ({
        name: item.month,
        排出量: item.value
      }))
    : [];
  
  return (
    <Card className="border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-md overflow-hidden">
      <CardHeader className="bg-purple-50 border-b border-purple-100">
        <CardTitle className="text-purple-800">月次排出量推移</CardTitle>
        <CardDescription>2022年度</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-64">
          {hasValidData ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} ${unit}`} />
                <Legend />
                <Bar dataKey="排出量" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">データが入力されていません</h3>
              <p className="text-gray-500">
                正確な月次排出量推移を表示するには、データ入力タブでデータを入力してください。
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyTrendCard;
