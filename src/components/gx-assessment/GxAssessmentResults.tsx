
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import ResultsHeader from '@/components/shared/ResultsHeader';
import OverallScoreCard from '@/components/shared/OverallScoreCard';
import CategoryScores from '@/components/shared/CategoryScores';
import RecommendationsCard from '@/components/shared/RecommendationsCard';
import { usePrintHandler, saveResultsToLocalStorage } from '@/components/shared/ResultsUtils';

interface GxAssessmentResultsProps {
  results: {
    overallScore: number;
    categoryScores: Record<string, number>;
    company: {
      name: string;
      industry: string;
      employees: string;
      revenue: string;
      contact: string;
    };
    recommendations: string[];
  };
  onDetailedDiagnostics?: () => void;
  onConsultantContact?: () => void;
}

const GxAssessmentResults: React.FC<GxAssessmentResultsProps> = ({ 
  results,
  onDetailedDiagnostics = () => {},
  onConsultantContact = () => {}
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { handlePrint, handleDownload } = usePrintHandler(
    `${results.company.name}_GX対応度診断結果`, 
    printRef
  );
  
  // 結果をローカルストレージに保存
  const handleSaveResults = () => {
    const resultsToSave = {
      timestamp: new Date().toISOString(),
      ...results
    };
    
    saveResultsToLocalStorage('gxAssessmentResults', resultsToSave, toast);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <ResultsHeader 
        title="GX対応度診断結果"
        onSave={handleSaveResults}
        onPrint={handlePrint}
        onDownload={handleDownload}
      />
      
      <div ref={printRef} className="space-y-6 p-2">
        <OverallScoreCard 
          score={results.overallScore} 
          company={results.company} 
        />
        
        <CategoryScores categoryScores={results.categoryScores} />
        
        <RecommendationsCard 
          recommendations={results.recommendations}
          title="推奨アクション"
          description="あなたの組織のGX対応度を向上させるための推奨事項"
          onDetailedDiagnostics={onDetailedDiagnostics}
          onConsultantContact={onConsultantContact}
        />
      </div>
    </motion.div>
  );
};

export default GxAssessmentResults;
