
import React from 'react';
import { motion } from 'framer-motion';
import YearlyTrendCard from './details/YearlyTrendCard';
import PowerProcurementCard from './details/PowerProcurementCard';

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

interface ScopeTwoDetailsTabProps {
  scopeTwoData: ScopeTwoDataType;
}

const ScopeTwoDetailsTab: React.FC<ScopeTwoDetailsTabProps> = ({ scopeTwoData }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* 年次推移 */}
      <YearlyTrendCard 
        yearOverYear={scopeTwoData.yearOverYear} 
        unit={scopeTwoData.unit} 
      />
      
      {/* 電力調達分析 */}
      <PowerProcurementCard />
    </motion.div>
  );
};

export default ScopeTwoDetailsTab;
