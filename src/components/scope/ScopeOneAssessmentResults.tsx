
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useReactToPrint } from 'react-to-print';
import { useToast } from '@/components/ui/use-toast';
import { Printer, DownloadCloud, ChartBar, Target, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScopeOneDataType } from '@/data/scopeOneData';

interface ScopeOneAssessmentResultsProps {
  results: ScopeOneDataType;
  companyInfo: {
    name: string;
    industry: string;
    employees: string;
    contact: string;
  };
  recommendations: string[];
  onDetailedAnalysis?: () => void;
  onConsultantContact?: () => void;
}

const ScopeOneAssessmentResults: React.FC<ScopeOneAssessmentResultsProps> = ({ 
  results,
  companyInfo,
  recommendations,
  onDetailedAnalysis,
  onConsultantContact
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // スコアに基づく評価を取得
  const getPerformanceEvaluation = (reduction: number) => {
    if (reduction >= 15) return { text: "先進的", color: "text-green-600" };
    if (reduction >= 10) return { text: "発展的", color: "text-blue-600" };
    if (reduction >= 5) return { text: "基本的", color: "text-yellow-600" };
    return { text: "初期的", color: "text-red-600" };
  };
  
  // 前年度比削減率を計算
  const calculateReduction = () => {
    if (results.yearOverYear.length < 2) return 0;
    const currentYear = results.yearOverYear[results.yearOverYear.length - 1].value;
    const previousYear = results.yearOverYear[results.yearOverYear.length - 2].value;
    return ((1 - currentYear / previousYear) * 100);
  };
  
  const reductionPercentage = calculateReduction();
  const evaluation = getPerformanceEvaluation(reductionPercentage);
  
  // 印刷機能
  const handlePrint = useReactToPrint({
    documentTitle: `${companyInfo.name}_Scope1排出量診断結果`,
    content: () => printRef.current,
    onAfterPrint: () => {
      toast({
        title: "印刷が完了しました",
        description: "診断結果の印刷が完了しました。",
      });
    },
  });
  
  // PDFダウンロード
  const handleDownload = () => {
    if (handlePrint) {
      handlePrint();
      toast({
        title: "ダウンロードのヒント",
        description: "印刷ダイアログでPDFとして保存を選択してください。",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-800">
          Scope 1 排出量診断結果
        </h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handlePrint()}
            className="flex items-center gap-1"
          >
            <Printer className="h-4 w-4" />
            <span className="hidden sm:inline">印刷</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDownload}
            className="flex items-center gap-1"
          >
            <DownloadCloud className="h-4 w-4" />
            <span className="hidden sm:inline">保存</span>
          </Button>
        </div>
      </div>
      
      <div ref={printRef} className="space-y-6 p-2">
        <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>総排出量</span>
              <span className="font-bold text-2xl text-blue-700">
                {results.total} {results.unit}
              </span>
            </CardTitle>
            <CardDescription>
              {companyInfo.name} ({companyInfo.industry}) - {companyInfo.employees}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className="h-4 rounded-full bg-blue-500" 
                style={{ width: `${Math.min(100, (results.total / (results.yearOverYear[0]?.value || results.total) * 100))}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              前年度比: <span className={reductionPercentage >= 0 ? "text-green-600" : "text-red-600"}>
                {reductionPercentage.toFixed(1)}% {reductionPercentage >= 0 ? '削減' : '増加'}
              </span>
              <span className="ml-2">評価: <span className={evaluation.color}>{evaluation.text}</span></span>
            </p>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.categories.map((category, index) => (
            <Card key={index} className="border-gray-200 hover:border-blue-200 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-blue-700">
                    {category.value} {results.unit}
                  </span>
                  <span className="text-xs text-gray-500">
                    {category.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${category.color}`} 
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              推奨アクション
            </CardTitle>
            <CardDescription>
              Scope 1排出量を削減するための推奨事項
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Zap className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Separator />
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button 
                onClick={onDetailedAnalysis}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 w-full sm:w-auto gap-2"
              >
                <ChartBar className="h-4 w-4" />
                詳細分析を見る
              </Button>
              <Button 
                variant="outline" 
                onClick={onConsultantContact}
                className="w-full sm:w-auto gap-2"
              >
                <ArrowRight className="h-4 w-4" />
                コンサルタントに相談する
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </motion.div>
  );
};

export default ScopeOneAssessmentResults;
