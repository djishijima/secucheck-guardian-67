
import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  progress: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ progress }) => (
  <motion.div 
    className="mb-6 bg-white p-4 rounded-lg shadow-sm"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
  >
    <div className="flex justify-between mb-2">
      <span className="text-sm font-medium">診断の進捗状況</span>
      <span className="text-sm font-medium">{Math.round(progress)}%</span>
    </div>
    <Progress value={progress} className="h-2" />
  </motion.div>
);

export default ProgressIndicator;
