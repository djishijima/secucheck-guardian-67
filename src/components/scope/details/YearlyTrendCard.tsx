
import React from 'react';
import { motion } from 'framer-motion';
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
    <Card className="border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-md overflow-hidden card-hover">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-100">
        <CardTitle className="text-gradient-purple">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-64">
          {hasValidData ? (
            <motion.div 
              className="h-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    formatter={(value) => `${value} ${unit}`} 
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', border: '1px solid #eee' }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="排出量" 
                    stroke="#8b5cf6" 
                    strokeWidth={3} 
                    dot={{ r: 6, strokeWidth: 2, fill: "#fff" }} 
                    activeDot={{ r: 8, strokeWidth: 0, fill: "#8b5cf6" }} 
                    fill="url(#colorGradient)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          ) : (
            <motion.div 
              className="h-full flex flex-col items-center justify-center text-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">データが入力されていません</h3>
              <p className="text-gray-500">
                正確な年次排出量推移を表示するには、データ入力タブでデータを入力してください。
              </p>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default YearlyTrendCard;
