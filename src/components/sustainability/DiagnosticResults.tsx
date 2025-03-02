
import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, RefreshCw, DownloadCloud, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { sustainabilityQuestions } from './QuestionData';
import { sdgGoals } from './SdgData';

interface DiagnosticResultsProps {
  companyName: string;
  industry: string;
  selectedSdgs: number[];
  answers: Record<string, boolean>;
  resetDiagnostics: () => void;
}

const DiagnosticResults: React.FC<DiagnosticResultsProps> = ({
  companyName,
  industry,
  selectedSdgs,
  answers,
  resetDiagnostics
}) => {
  // カテゴリごとのスコアを計算
  const calculateCategoryScore = (category: string) => {
    const categoryQuestions = sustainabilityQuestions.find(c => c.category === category)?.questions || [];
    const answeredQuestions = categoryQuestions.filter(q => answers[q.id] === true);
    return (answeredQuestions.length / categoryQuestions.length) * 100;
  };
  
  // 総合スコアを計算
  const calculateTotalScore = () => {
    const totalQuestions = sustainabilityQuestions.flatMap(c => c.questions).length;
    const answeredYes = Object.values(answers).filter(v => v === true).length;
    return (answeredYes / totalQuestions) * 100;
  };
  
  // スコアに基づいた色を返す
  const getScoreColor = (score: number) => {
    if (score < 30) return 'bg-red-500';
    if (score < 60) return 'bg-yellow-500';
    if (score < 80) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <motion.section 
      className="mb-10 bg-white p-6 rounded-xl shadow-lg border border-green-100"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center text-green-700">
          <ClipboardCheck className="mr-2 h-5 w-5 text-green-600" />
          診断結果
        </h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={resetDiagnostics}
          className="gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
        >
          <RefreshCw className="h-4 w-4" /> 診断をやり直す
        </Button>
      </div>
      
      <motion.div 
        className="mb-6 bg-green-50 p-6 rounded-lg border border-green-100"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h3 className="text-lg font-semibold text-green-800 mb-2 md:mb-0">総合スコア</h3>
          <div className="flex items-center">
            <motion.div 
              className="text-3xl font-bold text-green-700"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              {calculateTotalScore().toFixed(1)}%
            </motion.div>
          </div>
        </div>
        <div className="w-full bg-white rounded-full h-4 mb-4 overflow-hidden shadow-inner">
          <motion.div 
            className={`h-4 rounded-full ${getScoreColor(calculateTotalScore())}`}
            initial={{ width: 0 }}
            animate={{ width: `${calculateTotalScore()}%` }}
            transition={{ delay: 0.5, duration: 1 }}
          ></motion.div>
        </div>
      </motion.div>
      
      <div className="space-y-6 mb-8">
        {sustainabilityQuestions.map((category, index) => (
          <motion.div 
            key={category.category} 
            className="bg-white p-4 rounded-lg border hover:border-green-200 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (index * 0.1) }}
            whileHover={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)", y: -2 }}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{category.category}</h3>
              <div className="flex items-center gap-2">
                <span className={`
                  px-2 py-0.5 rounded-full text-xs font-bold
                  ${calculateCategoryScore(category.category) < 40 ? 'bg-red-100 text-red-700' :
                    calculateCategoryScore(category.category) < 70 ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-green-100 text-green-700'}
                `}>
                  {calculateCategoryScore(category.category).toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <motion.div 
                className={`h-2 rounded-full ${
                  calculateCategoryScore(category.category) < 40 ? 'bg-red-500' :
                  calculateCategoryScore(category.category) < 70 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${calculateCategoryScore(category.category)}%` }}
                transition={{ delay: 0.2 + (index * 0.1) + 0.3, duration: 0.8 }}
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-lg mb-6 border border-green-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="font-semibold mb-3 text-green-800">診断コメント</h3>
        <p className="text-gray-700">
          {calculateTotalScore() < 30 ? (
            'サステナビリティへの取り組みはまだ初期段階です。基本的な方針の策定から始めることをお勧めします。文唱堂印刷のGX支援サービスがお役に立てます。'
          ) : calculateTotalScore() < 60 ? (
            'いくつかの分野で取り組みを進めていますが、体系的なアプローチが必要です。特に弱い分野を重点的に強化しましょう。当社のサステナビリティコンサルティングで改善策をご提案できます。'
          ) : calculateTotalScore() < 80 ? (
            '全体的に良好な取り組みが見られます。さらなる発展のため、先進的な取り組みへのチャレンジを検討してください。文唱堂印刷のGXレポート作成支援で、あなたの成果を効果的に伝えましょう。'
          ) : (
            'サステナビリティへの取り組みは非常に進んでいます。業界リーダーとして、イノベーティブな取り組みを続けてください。文唱堂印刷のGX×AIソリューションで、さらなる価値創造をサポートします。'
          )}
        </p>
      </motion.div>
      
      <motion.div 
        className="bg-blue-50 p-5 rounded-lg border border-blue-100 mb-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <h3 className="font-semibold flex items-center mb-3 text-blue-800">
          <Check className="mr-1 h-4 w-4 text-blue-600" />
          改善のためのアクションプラン
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {calculateCategoryScore('環境への取り組み') < 60 && (
            <motion.li 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
            >
              環境パフォーマンスの測定方法を確立し、具体的な削減目標を設定しましょう
            </motion.li>
          )}
          {calculateCategoryScore('社会的責任') < 60 && (
            <motion.li 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              従業員の多様性と包括性を高める具体的な施策を検討してください
            </motion.li>
          )}
          {calculateCategoryScore('ガバナンス') < 60 && (
            <motion.li 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
            >
              ESG情報の開示を体系化し、透明性を高める仕組みを整備しましょう
            </motion.li>
          )}
          {calculateCategoryScore('イノベーション') < 60 && (
            <motion.li 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
            >
              サステナビリティを推進するための新たな製品・サービス開発を検討してください
            </motion.li>
          )}
          <motion.li 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
          >
            サステナビリティに関する社内研修を定期的に実施し、全社的な意識向上を図りましょう
          </motion.li>
          <motion.li 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6 }}
          >
            ステークホルダーとの対話を通じて、重要課題（マテリアリティ）を特定・更新しましょう
          </motion.li>
        </ul>
      </motion.div>
      
      <motion.div 
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <Button
          className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 
          hover:to-emerald-700 shadow-lg hover:shadow-xl transform transition-all 
          duration-300 hover:-translate-y-1"
          size="lg"
        >
          <DownloadCloud className="h-4 w-4" />
          サステナビリティレポート作成支援を依頼
        </Button>
        
        <Button
          variant="outline"
          className="gap-2 border-green-200 hover:bg-green-50 hover:border-green-300
          shadow hover:shadow-md transition-all"
        >
          <RefreshCw className="h-4 w-4" />
          詳細な診断を依頼する
        </Button>
      </motion.div>
    </motion.section>
  );
};

export default DiagnosticResults;
