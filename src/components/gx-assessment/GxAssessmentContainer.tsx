
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import GxProgressIndicator from './GxProgressIndicator';
import GxCompanyInfoSection from './GxCompanyInfoSection';
import GxAssessmentQuestionSection from './GxAssessmentQuestionSection';
import GxAssessmentResults from './GxAssessmentResults';
import { calculateCategoryScores, calculateOverallScore, generateResultsObject } from './GxResultUtils';
import { gxQuestionData } from './GxQuestionData';

const GxAssessmentContainer = () => {
  const [progress, setProgress] = useState<number>(10);
  const [step, setStep] = useState<'company-info' | 'questions' | 'results'>('company-info');
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    industry: '',
    employees: '',
    revenue: '',
    contact: ''
  });
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [assessmentResults, setAssessmentResults] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCompanyInfoSubmit = (info: any) => {
    setCompanyInfo(info);
    setProgress(30);
    setStep('questions');
    window.scrollTo(0, 0);
    toast({
      title: "企業情報を保存しました",
      description: "診断質問に回答してください",
    });
  };

  const handleAnswersUpdate = (newAnswers: Record<string, boolean>) => {
    setAnswers(newAnswers);
    
    // 回答数に基づいて進捗状況を更新
    const totalQuestions = Object.keys(gxQuestionData).reduce(
      (sum, category) => sum + gxQuestionData[category].length, 0
    );
    const answeredCount = Object.keys(newAnswers).length;
    const newProgress = Math.min(30 + Math.round((answeredCount / totalQuestions) * 70), 99);
    setProgress(newProgress);
  };

  const handleAssessmentComplete = () => {
    setProgress(100);
    setStep('results');
    window.scrollTo(0, 0);
    
    // スコア計算
    const score = calculateOverallScore(answers);
    const categoryScores = calculateCategoryScores(answers);
    
    // 結果の生成
    setAssessmentResults(generateResultsObject(score, categoryScores, companyInfo));
    
    toast({
      title: "診断が完了しました",
      description: "結果をご確認ください",
    });
  };

  // 詳細診断ページへの移動関数
  const handleDetailedDiagnostics = () => {
    navigate("/comprehensive-diagnostics", { 
      state: { fromGxAssessment: true } 
    });
  };
  
  // コンサルタントへの相談フォームへの移動関数
  const handleConsultantContact = () => {
    navigate("/contact");
  };

  return (
    <>
      <GxProgressIndicator progress={progress} />

      {step === 'company-info' && (
        <GxCompanyInfoSection 
          companyInfo={companyInfo}
          onSubmit={handleCompanyInfoSubmit}
        />
      )}
      
      {step === 'questions' && (
        <GxAssessmentQuestionSection 
          answers={answers}
          setAnswers={handleAnswersUpdate}
          onComplete={handleAssessmentComplete}
        />
      )}
      
      {step === 'results' && assessmentResults && (
        <GxAssessmentResults 
          results={assessmentResults} 
          onDetailedDiagnostics={handleDetailedDiagnostics}
          onConsultantContact={handleConsultantContact}
        />
      )}
    </>
  );
};

export default GxAssessmentContainer;
