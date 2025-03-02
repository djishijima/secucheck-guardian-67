
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, ChevronRight, Download, Printer } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useToast } from "@/components/ui/use-toast";

interface GxAssessmentResultsProps {
  results: {
    overallScore: number;
    categoryScores: Record<string, number>;
    company: {
      name: string;
      industry: string;
      employees: string;
      revenue: string;
    };
    recommendations: string[];
  };
}

const GxAssessmentResults: React.FC<GxAssessmentResultsProps> = ({ results }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const getScoreLevel = (score: number) => {
    if (score >= 80) return { level: "先進レベル", color: "text-green-600" };
    if (score >= 60) return { level: "実践レベル", color: "text-blue-600" };
    if (score >= 40) return { level: "基礎レベル", color: "text-yellow-600" };
    return { level: "導入レベル", color: "text-orange-600" };
  };
  
  const scoreInfo = getScoreLevel(results.overallScore);
  
  // チャートデータの準備
  const chartData = Object.entries(results.categoryScores).map(([name, value]) => ({
    name: name,
    value: value
  }));
  
  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

  // 印刷機能
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${results.company.name}_GX診断結果`,
    onAfterPrint: () => {
      toast({
        title: "印刷が完了しました",
        description: "GX診断結果の印刷が完了しました。",
      });
    },
  });

  // レポートのダウンロード機能
  const handleDownloadReport = () => {
    // 実際のアプリケーションでは、PDFやExcelなどのファイル生成ロジックを実装
    toast({
      title: "レポートをダウンロードしました",
      description: "GX診断の詳細レポートがダウンロードされました。",
      duration: 3000,
    });
  };

  // 詳細診断申込みへのナビゲーション
  const handleRequestDetailedDiagnostics = () => {
    navigate("/comprehensive-diagnostics");
  };

  // コンサルタントへの相談フォームへのナビゲーション
  const handleConsultantContact = () => {
    navigate("/contact");
  };
  
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      ref={printRef}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center justify-center p-2 mb-4"
        >
          <Award className="h-16 w-16 text-green-500" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">診断結果</h2>
        <p className="text-gray-600 mb-8">
          {results.company.name}のGX対応度診断結果です
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>総合スコア</CardTitle>
            <CardDescription>貴社のGX対応度は以下のレベルです</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <svg className="w-32 h-32">
                  <circle
                    className="text-gray-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                  />
                  <circle
                    className="text-green-500"
                    strokeWidth="8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                    strokeDasharray={`${results.overallScore * 3.51} 351`}
                    strokeDashoffset="0"
                  />
                </svg>
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold">
                  {results.overallScore}%
                </span>
              </div>
              <h3 className={`text-xl font-bold ${scoreInfo.color}`}>
                {scoreInfo.level}
              </h3>
            </div>
            
            <div className="space-y-4">
              {Object.entries(results.categoryScores).map(([category, score]) => (
                <div key={category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                    <span className="text-sm font-medium text-gray-700">{score}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>カテゴリ別評価</CardTitle>
            <CardDescription>分野ごとの対応状況</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>推奨アクション</CardTitle>
          <CardDescription>GX対応度を高めるための推奨事項</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {results.recommendations.map((recommendation, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-2"
              >
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{recommendation}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-3">
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={handlePrint}
          >
            <Printer className="mr-2 h-4 w-4" /> 結果を印刷
          </Button>
          <Button 
            variant="outline"
            onClick={handleDownloadReport}
          >
            <Download className="mr-2 h-4 w-4" /> レポートをダウンロード
          </Button>
          <Button 
            variant="outline"
            onClick={handleRequestDetailedDiagnostics}
          >
            詳細診断を申し込む <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      <div className="bg-green-50 border border-green-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-3">次のステップ</h3>
        <p className="text-green-700 mb-4">
          より詳細なGX対応度診断や具体的な改善サポートが必要な場合は、専門のコンサルタントによる支援も可能です。
          下記のボタンから詳細情報の確認や問い合わせができます。
        </p>
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="default" 
            className="bg-green-600 hover:bg-green-700"
            onClick={handleRequestDetailedDiagnostics}
          >
            詳細診断サービスを見る
          </Button>
          <Button 
            variant="outline"
            onClick={handleConsultantContact}
          >
            コンサルタントに相談する
          </Button>
        </div>
      </div>
      
      {/* 印刷時に非表示にするスタイル */}
      <style type="text/css" media="print">
        {`
          @page { size: auto; margin: 10mm; }
          button { display: none !important; }
        `}
      </style>
    </motion.div>
  );
};

export default GxAssessmentResults;
