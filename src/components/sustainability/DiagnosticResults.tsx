
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import ResultsHeader from '@/components/shared/ResultsHeader';
import OverallScoreCard from '@/components/shared/OverallScoreCard';
import CategoryScores from '@/components/shared/CategoryScores';
import RecommendationsCard from '@/components/shared/RecommendationsCard';
import { usePrintHandler, saveResultsToLocalStorage } from '@/components/shared/ResultsUtils';

interface DiagnosticResultsProps {
  companyName: string;
  industry: string;
  selectedSdgs: number[];
  answers: Record<string, boolean>;
  results: {
    overallScore: number;
    categoryScores: Record<string, number>;
    recommendations: string[];
  };
  onDetailedDiagnostics: () => void;
  onConsultantContact: () => void;
}

const DiagnosticResults: React.FC<DiagnosticResultsProps> = ({
  companyName,
  industry,
  selectedSdgs,
  answers,
  results,
  onDetailedDiagnostics,
  onConsultantContact
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { handlePrint, handleDownload } = usePrintHandler(
    `${companyName}サステナビリティ診断結果`, 
    printRef
  );
  
  // 結果をローカルストレージに保存
  const handleSaveResults = () => {
    const resultsToSave = {
      timestamp: new Date().toISOString(),
      companyName,
      industry,
      selectedSdgs,
      results
    };
    
    saveResultsToLocalStorage('sustainabilityResults', resultsToSave, toast);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <ResultsHeader 
        title="サステナビリティ診断結果"
        onSave={handleSaveResults}
        onPrint={handlePrint}
        onDownload={handleDownload}
      />
      
      <div ref={printRef} className="space-y-6 p-2">
        <OverallScoreCard 
          score={results.overallScore} 
          company={{ name: companyName, industry }}
        />
        
        <CategoryScores categoryScores={results.categoryScores} />
        
        <RecommendationsCard 
          recommendations={results.recommendations}
          title="推奨アクション"
          description="あなたの組織のサステナビリティ対応度を向上させるための推奨事項"
          onDetailedDiagnostics={onDetailedDiagnostics}
          onConsultantContact={onConsultantContact}
        />
      </div>
    </motion.div>
  );
};

export default DiagnosticResults;
