
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';

interface CategoryItem {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

interface CategoryEmissionsCardProps {
  categories: CategoryItem[];
  unit: string;
}

const CategoryEmissionsCard: React.FC<CategoryEmissionsCardProps> = ({ categories, unit }) => {
  // Convert categories data for PieChart
  const pieChartData = categories.map(category => ({
    name: category.name,
    value: category.value,
    color: category.color.replace('bg-', '#')
      .replace('purple-500', '8b5cf6')
      .replace('indigo-500', '6366f1')
      .replace('sky-500', '0ea5e9')
      .replace('teal-500', '14b8a6')
      .replace('pink-500', 'ec4899')
      .replace('red-500', 'ef4444')
  }));
  
  return (
    <Card className="border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-md card-hover">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-100">
        <CardTitle className="text-gradient-purple">エネルギー源別排出量</CardTitle>
        <CardDescription>購入したエネルギー別の内訳</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {categories.map((category, index) => (
              <motion.div 
                key={index} 
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">{category.name}</span>
                  <div className="text-right">
                    <span className="font-semibold">{category.value}</span>
                    <span className="text-sm text-gray-500 ml-1">{unit}</span>
                    <span className="text-gray-400 text-sm ml-2">({category.percentage}%)</span>
                  </div>
                </div>
                <Progress value={category.percentage} className={`h-2 ${category.color}`} />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="flex justify-center items-center h-64"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
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
                <Tooltip formatter={(value) => `${value} ${unit}`} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryEmissionsCard;
