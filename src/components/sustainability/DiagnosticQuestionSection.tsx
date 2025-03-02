
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { sustainabilityQuestions } from './QuestionData';
import QuestionItem from './QuestionItem';

interface DiagnosticQuestionSectionProps {
  answers: Record<string, boolean>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  runDiagnostics: () => void;
}

const DiagnosticQuestionSection: React.FC<DiagnosticQuestionSectionProps> = ({
  answers,
  setAnswers,
  runDiagnostics
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(sustainabilityQuestions[0].category);
  const [animateQuestions, setAnimateQuestions] = useState(true);
  const { toast } = useToast();
  
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
  
  // カテゴリを変更
  const changeCategory = (category: string) => {
    setAnimateQuestions(false);
    setTimeout(() => {
      setActiveCategory(category);
      setAnimateQuestions(true);
    }, 300);
  };
  
  // 現在のカテゴリの質問を取得
  const getCurrentCategoryQuestions = () => {
    return sustainabilityQuestions.find(category => category.category === activeCategory)?.questions || [];
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
      
      {/* カテゴリ切り替えタブ */}
      <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
        {sustainabilityQuestions.map((category) => (
          <motion.button
            key={category.category}
            onClick={() => changeCategory(category.category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all
              ${activeCategory === category.category
                ? 'bg-green-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.category}
          </motion.button>
        ))}
      </div>
      
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: animateQuestions ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {getCurrentCategoryQuestions().map((question, index) => (
          <QuestionItem
            key={question.id}
            id={question.id}
            text={question.text}
            isChecked={answers[question.id] || false}
            categoryName={activeCategory}
            index={index}
            onCheckedChange={handleQuestionChange}
          />
        ))}
      </motion.div>
      
      <motion.div 
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Button 
          onClick={runDiagnostics}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
          size="lg"
        >
          診断を実行 <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </motion.section>
  );
};

export default DiagnosticQuestionSection;
