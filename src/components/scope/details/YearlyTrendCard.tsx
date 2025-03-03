
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface YearOverYearData {
  year: string;
  value: number;
}

interface YearlyTrendCardProps {
  yearOverYear: YearOverYearData[];
  unit: string;
}

const YearlyTrendCard: React.FC<YearlyTrendCardProps> = ({ yearOverYear, unit }) => {
  return (
    <Card className="border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-md overflow-hidden">
      <CardHeader className="bg-purple-50 border-b border-purple-100">
        <CardTitle className="text-purple-800">年次排出量推移</CardTitle>
        <CardDescription>過去3年間の推移</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {yearOverYear.map((year, index) => (
            <motion.div 
              key={index}
              className={`p-4 rounded-lg border ${index === yearOverYear.length - 1 ? 'border-purple-200 bg-purple-50' : 'border-gray-200'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="text-lg font-semibold text-gray-800 mb-2">{year.year}</div>
              <div className="text-3xl font-bold text-purple-700 mb-2">{year.value.toFixed(1)} <span className="text-lg text-gray-500">{unit}</span></div>
              {index > 0 && (
                <div className={`text-sm font-medium ${
                  year.value < yearOverYear[index - 1].value ? 'text-green-600' : 'text-red-600'
                }`}>
                  {((1 - year.value / yearOverYear[index - 1].value) * 100).toFixed(1)}% {
                    year.value < yearOverYear[index - 1].value ? '削減' : '増加'
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
            {yearOverYear.map((year, index) => {
              const maxValue = Math.max(...yearOverYear.map(y => y.value));
              const heightPercentage = (year.value / maxValue) * 100;
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
                        index === yearOverYear.length - 1 
                          ? 'bg-purple-500' 
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
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default YearlyTrendCard;
