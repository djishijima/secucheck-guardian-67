
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useReactToPrint } from 'react-to-print';
import { useToast } from "@/components/ui/use-toast";
import { Printer, DownloadCloud, ChartBar, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Target, Zap } from 'lucide-react';

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
  
  // スコアに基づく評価を取得
  const getEvaluation = (score: number) => {
    if (score >= 80) return { text: "先進的", color: "text-green-600" };
    if (score >= 60) return { text: "発展的", color: "text-blue-600" };
    if (score >= 40) return { text: "基本的", color: "text-yellow-600" };
    return { text: "初期的", color: "text-red-600" };
  };
  
  // 印刷機能
  const handlePrint = useReactToPrint({
    documentTitle: `${companyName}サステナビリティ診断結果`,
    getPrintContent: () => printRef.current,
    onAfterPrint: () => {
      toast({
        title: "印刷が完了しました",
        description: "診断結果の印刷が完了しました。",
      });
    },
  });
  
  // PDF保存（印刷ダイアログを利用）
  const handleDownload = () => {
    handlePrint();
    toast({
      title: "ダウンロードのヒント",
      description: "印刷ダイアログでPDFとして保存を選択してください。",
    });
  };

  // スコアに基づくプログレスバーの色を取得
  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-blue-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">
          サステナビリティ診断結果
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
        <Card className="border-green-100 bg-gradient-to-br from-green-50 to-white">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>総合スコア</span>
              <span className={`${getEvaluation(results.overallScore).color} font-bold text-2xl`}>
                {results.overallScore}%
              </span>
            </CardTitle>
            <CardDescription>
              {companyName} ({industry})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className={`h-4 rounded-full ${getProgressColor(results.overallScore)}`} 
                style={{ width: `${results.overallScore}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              評価: <span className={getEvaluation(results.overallScore).color}>
                {getEvaluation(results.overallScore).text}
              </span>
            </p>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(results.categoryScores).map(([category, score]) => (
            <Card key={category} className="border-gray-200 hover:border-green-200 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-1">
                  <span className={`${getEvaluation(score).color} font-semibold`}>
                    {score}%
                  </span>
                  <span className="text-xs text-gray-500">
                    {getEvaluation(score).text}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(score)}`} 
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              推奨アクション
            </CardTitle>
            <CardDescription>
              あなたの組織のサステナビリティ対応度を向上させるための推奨事項
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.recommendations.map((rec, index) => (
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
                onClick={onDetailedDiagnostics}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 w-full sm:w-auto gap-2"
              >
                <ChartBar className="h-4 w-4" />
                詳細診断を申し込む
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

export default DiagnosticResults;
