
import React from 'react';
import { motion } from 'framer-motion';
import DiagnosticCard from './DiagnosticCard';

interface DiagnosticItem {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  link: string;
}

interface ServiceSectionProps {
  title: string;
  description: string;
  diagnostics: DiagnosticItem[];
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ title, description, diagnostics }) => (
  <>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-700 border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-md">
        {description}
      </p>
    </motion.div>
    <div className="grid grid-cols-1 gap-6">
      {diagnostics.map((diagnostic, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <DiagnosticCard 
            title={diagnostic.title} 
            description={diagnostic.description} 
            features={diagnostic.features} 
            icon={diagnostic.icon}
            link={diagnostic.link}
          />
        </motion.div>
      ))}
    </div>
  </>
);

export default ServiceSection;
