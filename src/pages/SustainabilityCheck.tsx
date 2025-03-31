import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SustainabilityHeader from '@/components/sustainability/SustainabilityHeader';
import ProgressIndicator from '@/components/sustainability/ProgressIndicator';
import BasicInfoSection from '@/components/sustainability/BasicInfoSection';
import SdgSelectionSection from '@/components/sustainability/SdgSelectionSection';
import DiagnosticQuestionSection from '@/components/sustainability/DiagnosticQuestionSection';
import { useToast } from "@/components/ui/use-toast";
import { getDiagnosticUserData } from '@/utils/diagnosticUtils';
import { toast as sonnerToast } from 'sonner';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from 'lucide-react';

const SustainabilityCheck = () => {
  const [progress, setProgress] = useState(10);
  const [step, setStep] = useState('basic-info');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [selectedSdgs, setSelectedSdgs] = useState<number[]>([]);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const userData = getDiagnosticUserData();
    if (userData) {
      setCompanyName(userData.companyName || '');
      toast({
        title: `${userData.userName}様、ようこそ`,
        description: "サステナビリティ診断を始めましょう",
      });
    } else {
      navigate('/diagnostic-landing');
      toast({
        title: "診断を始めるには情報が必要です",
        description: "診断ランディングページから情報を入力してください",
      });
    }
  }, [navigate, toast]);
  
  const handleBasicInfoSubmit = () => {
    setProgress(20);
    setStep('sdg-selection');
    window.scrollTo(0, 0);
  };
  
  const handleSdgSelectionSubmit = () => {
    setProgress(30);
    setStep('questions');
    window.scrollTo(0, 0);
  };
  
  const handleAnswersChange = (newAnswers: Record<string, boolean>) => {
    setAnswers(newAnswers);
    const answeredCount = Object.keys(newAnswers).length;
    const totalQuestions = 30;
    const newProgress = Math.min(30 + Math.floor((answeredCount / totalQuestions) * 70), 95);
    setProgress(newProgress);
  };
  
  const handleDiagnosticComplete = () => {
    setProgress(100);
    setStep('completion');
    window.scrollTo(0, 0);
  };

  const handleSubmitDiagnostic = async () => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Diagnostic data submitted:', {
        companyName,
        industry,
        selectedSdgs,
        answers
      });
      
      sonnerToast.success('診断リクエストを受け付けました', {
        description: '診断結果は3営業日以内にメールでお送りします',
        duration: 5000,
      });
      
      setTimeout(() => {
        navigate('/');
      }, 3000);
      
    } catch (error) {
      sonnerToast.error('エラーが発生しました', {
        description: 'しばらく経ってからもう一度お試しください',
      });
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const CompletionMessage = () => (
    <motion.section 
      className="mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center py-6">
        <motion.div 
          className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CheckCircle className="h-10 w-10 text-green-600" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">診断情報の入力が完了しました</h2>
        
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          入力いただいた情報をもとに、弊社の専門チームが詳細な診断を実施いたします。
          診断結果と改善提案は、3営業日以内にメールでお送りします。
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6 max-w-md mx-auto">
          <p className="text-sm text-gray-500 mb-2">診断項目：サステナビリティ診断</p>
          <p className="text-sm text-gray-500 mb-2">企業名：{companyName}</p>
          <p className="text-sm text-gray-500">選択されたSDGs：{selectedSdgs.length}個</p>
        </div>
        
        <Button
          onClick={handleSubmitDiagnostic}
          className="bg-green-600 hover:bg-green-700 gap-2 px-6"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? '送信中...' : '診断を申し込む'}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.section>
  );
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-12 px-4">
        <SustainabilityHeader />
        <ProgressIndicator progress={progress} />
        
        {step === 'basic-info' && (
          <BasicInfoSection 
            companyName={companyName}
            setCompanyName={setCompanyName}
            industry={industry}
            setIndustry={setIndustry}
            onSubmit={handleBasicInfoSubmit}
          />
        )}
        
        {step === 'sdg-selection' && (
          <SdgSelectionSection 
            selectedSdgs={selectedSdgs}
            setSelectedSdgs={setSelectedSdgs}
            onSubmit={handleSdgSelectionSubmit}
          />
        )}
        
        {step === 'questions' && (
          <DiagnosticQuestionSection 
            answers={answers}
            setAnswers={handleAnswersChange}
            onComplete={handleDiagnosticComplete}
          />
        )}
        
        {step === 'completion' && <CompletionMessage />}
      </main>
      
      <Footer />
    </div>
  );
};

export default SustainabilityCheck;
