
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, BarChart as BarChartIcon } from 'lucide-react';

interface DataPoint {
  label: string;
  value: number;
}

interface GraphDisplayProps {
  title: string;
  description?: string;
  dataPoints: DataPoint[];
  type?: 'bar' | 'line';
  color?: string;
}

const GraphDisplay: React.FC<GraphDisplayProps> = ({
  title,
  description,
  dataPoints,
  type = 'bar',
  color = '#10b981' // Default to green
}) => {
  // Format data for Recharts
  const chartData = dataPoints.map(point => ({
    name: point.label,
    value: Number(point.value.toFixed(1)) // Round to 1 decimal place
  }));
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border border-green-200 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 border-b border-green-100 py-4">
          <div className="flex items-center">
            {type === 'bar' ? (
              <BarChartIcon className="h-5 w-5 text-green-700 mr-2" />
            ) : (
              <TrendingUp className="h-5 w-5 text-green-700 mr-2" />
            )}
            <CardTitle className="text-green-800">{title}</CardTitle>
          </div>
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </CardHeader>
        <CardContent className="p-4 bg-white">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {type === 'bar' ? (
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70} 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    width={50}
                  />
                  <Tooltip 
                    formatter={(value: number) => [value.toFixed(1), '値']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #f0f0f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill={color} 
                    radius={[6, 6, 0, 0]} 
                    animationDuration={1500}
                  />
                </BarChart>
              ) : (
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70} 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    width={50}
                  />
                  <Tooltip 
                    formatter={(value: number) => [value.toFixed(1), '値']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #f0f0f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={color} 
                    strokeWidth={3}
                    activeDot={{ r: 8, strokeWidth: 1, stroke: 'white' }}
                    dot={{ r: 4, strokeWidth: 1, stroke: 'white' }}
                    animationDuration={1500}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GraphDisplay;
