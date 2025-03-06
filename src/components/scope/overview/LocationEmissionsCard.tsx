
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface LocationItem {
  name: string;
  value: number;
  percentage: number;
}

interface LocationEmissionsCardProps {
  locations: LocationItem[];
  unit: string;
}

const LocationEmissionsCard: React.FC<LocationEmissionsCardProps> = ({ locations, unit }) => {
  return (
    <Card className="border-purple-100 hover:border-purple-300 transition-all shadow-sm hover:shadow-md">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-100">
        <CardTitle className="text-gradient-purple">拠点別排出量</CardTitle>
        <CardDescription>施設・拠点ごとの排出量</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {locations.map((location, index) => (
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
                  <span className="text-sm text-gray-500 ml-1">{unit}</span>
                  <span className="text-gray-400 text-sm ml-2">({location.percentage}%)</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden shadow-inner">
                <motion.div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
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
  );
};

export default LocationEmissionsCard;
