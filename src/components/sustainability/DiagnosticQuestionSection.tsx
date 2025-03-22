
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { sustainabilityQuestions } from './QuestionData';
import QuestionItem from './QuestionItem';

interface DiagnosticQuestionSectionProps {
  answers: Record<string, boolean>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  onComplete: () => void;
}

const DiagnosticQuestionSection: React.FC<DiagnosticQuestionSectionProps> = ({
  answers,
  setAnswers,
  onComplete
}) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const { toast } = useToast();
  
  // カテゴリーの配列
  const categories = sustainabilityQuestions.map(q => q.category);
  const currentCategory = categories[currentSectionIndex];
  
  // 質問への回答を設定
  const handleQuestionChange = (questionId: string, value: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // チェックを入れた時のみトースト表示
    if (value) {
      toast({
        description: "回答を記録しました",
        duration: 1500,
      });
    }
  };
  
  // 次のセクションに進む
  const goToNextSection = () => {
    // 現在のセクションの回答状況をチェック
    const currentQuestions = sustainabilityQuestions[currentSectionIndex].questions;
    const answeredQuestions = currentQuestions.filter(q => answers[q.id] !== undefined);
    
    // 少なくとも1つは回答してほしい
    if (answeredQuestions.length === 0) {
      toast({
        title: "回答してください",
        description: "少なくとも1つの質問に回答してください",
        variant: "destructive"
      });
      return;
    }

    if (currentSectionIndex < categories.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      window.scrollTo(0, 0);
    } else {
      // 全セクション完了、診断結果へ
      checkCompletionAndProceed();
    }
  };
  
  // 前のセクションに戻る
  const goToPreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // 診断を完了する前に回答率をチェック
  const checkCompletionAndProceed = () => {
    // 全体の回答率をチェック
    const totalQuestions = sustainabilityQuestions.reduce(
      (sum, category) => sum + category.questions.length, 0
    );
    const answeredCount = Object.keys(answers).length;
    const answerRate = Math.round((answeredCount / totalQuestions) * 100);
    
    // 回答率が低くても進めるように修正（警告は表示）
    if (answerRate < 30) {
      toast({
        title: "回答率が低いですが、続行します",
        description: `現在の回答率は${answerRate}%です。より正確な診断のため、できるだけ多くの質問に回答することをお勧めします。`,
        variant: "default"
      });
    }
    
    // 診断完了へ進む
    onComplete();
  };
  
  // セクションの進捗度を表示する
  const sectionProgress = () => {
    return `セクション ${currentSectionIndex + 1}/${categories.length}`;
  };
  
  // 現在のカテゴリの質問を取得
  const getCurrentCategoryQuestions = () => {
    return sustainabilityQuestions[currentSectionIndex].questions || [];
  };
  
  return (
    <motion.section 
      className="mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-green-200 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      whileHover={{ boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)" }}
    >
      <h2 className="text-xl font-bold mb-4 flex items-center text-green-700">
        <ClipboardCheck className="mr-2 h-5 w-5 text-green-600" />
        サステナビリティ診断
      </h2>
      <p className="text-gray-600 mb-6">各質問に対して、該当する場合はチェックを入れてください</p>
      
      <div className="bg-gray-50 px-4 py-2 rounded-lg mb-6 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">{sectionProgress()}</span>
        <span className="text-sm font-medium text-green-600">{currentCategory}</span>
      </div>
      
      <motion.div 
        className="space-y-4 mb-8"
        key={currentCategory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {getCurrentCategoryQuestions().map((question, index) => (
          <QuestionItem
            key={question.id}
            id={question.id}
            text={question.text}
            isChecked={answers[question.id] || false}
            categoryName={currentCategory}
            index={index}
            onCheckedChange={handleQuestionChange}
          />
        ))}
      </motion.div>
      
      <div className="flex justify-between mt-8 pt-4 border-t">
        <Button 
          onClick={goToPreviousSection}
          variant="outline"
          disabled={currentSectionIndex === 0}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> 前へ
        </Button>
        
        <div className="text-sm text-gray-500 self-center">
          現在の回答数: {Object.values(answers).filter(Boolean).length} / 
          {sustainabilityQuestions.reduce((sum, cat) => sum + cat.questions.length, 0)}
        </div>
        
        <Button 
          onClick={goToNextSection}
          className="bg-green-600 hover:bg-green-700 gap-2"
        >
          {currentSectionIndex < categories.length - 1 ? (
            <>次へ <ArrowRight className="h-4 w-4" /></>
          ) : (
            <>診断を完了する <CheckCircle className="h-4 w-4" /></>
          )}
        </Button>
      </div>
    </motion.section>
  );
};

export default DiagnosticQuestionSection;
