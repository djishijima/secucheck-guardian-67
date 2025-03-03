
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

interface MonthlyItem {
  month: string;
  value: number;
}

interface MonthlyTrendCardProps {
  monthlyTrend: MonthlyItem[];
  unit: string;
}

const MonthlyTrendCard: React.FC<MonthlyTrendCardProps> = ({ monthlyTrend, unit }) => {
  // Convert monthly data for BarChart
  const barChartData = monthlyTrend.map(item => ({
    name: item.month,
    排出量: item.value
  }));
  
  return (
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
              <Tooltip formatter={(value) => `${value} ${unit}`} />
              <Legend />
              <Bar dataKey="排出量" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyTrendCard;
