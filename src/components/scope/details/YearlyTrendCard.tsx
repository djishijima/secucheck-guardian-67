
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { AlertCircle } from 'lucide-react';

interface YearlyItem {
  year: string;
  value: number;
}

interface YearlyTrendCardProps {
  yearlyTrend: YearlyItem[];
  unit: string;
  title?: string;
  description?: string;
}

const YearlyTrendCard: React.FC<YearlyTrendCardProps> = ({ 
  yearlyTrend, 
  unit, 
  title = "年次排出量推移", 
  description = "過去3年間の排出量" 
}) => {
  // Check if we have valid data (at least one non-zero entry)
  const hasValidData = yearlyTrend && yearlyTrend.some(item => item.value > 0);
  
  // Convert yearly data for LineChart (only if we have valid data)
  const lineChartData = hasValidData 
    ? yearlyTrend.map(item => ({
        name: item.year,
        排出量: item.value
      }))
    : [];
  
  return (
    <Card className="border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-md overflow-hidden">
      <CardHeader className="bg-purple-50 border-b border-purple-100">
        <CardTitle className="text-purple-800">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-64">
          {hasValidData ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} ${unit}`} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="排出量" 
                  stroke="#8b5cf6" 
                  strokeWidth={2} 
                  dot={{ r: 4 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">データが入力されていません</h3>
              <p className="text-gray-500">
                正確な年次排出量推移を表示するには、データ入力タブでデータを入力してください。
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default YearlyTrendCard;
