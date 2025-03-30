
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SustainabilityHeader from '@/components/sustainability/SustainabilityHeader';
import ProgressIndicator from '@/components/sustainability/ProgressIndicator';
import BasicInfoSection from '@/components/sustainability/BasicInfoSection';
import SdgSelectionSection from '@/components/sustainability/SdgSelectionSection';
import DiagnosticQuestionSection from '@/components/sustainability/DiagnosticQuestionSection';
import DiagnosticResults from '@/components/sustainability/DiagnosticResults';
import { useToast } from "@/components/ui/use-toast";
import { getDiagnosticUserData } from '@/utils/diagnosticUtils';

const SustainabilityCheck = () => {
  const [progress, setProgress] = useState(10);
  const [step, setStep] = useState('basic-info');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [selectedSdgs, setSelectedSdgs] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check for user data on component mount
  useEffect(() => {
    const userData = getDiagnosticUserData();
    if (userData) {
      // Use company name from initial form
      setCompanyName(userData.companyName || '');
      
      // Welcome the user
      toast({
        title: `${userData.userName}様、ようこそ`,
        description: "サステナビリティ診断を始めましょう",
      });
    } else {
      // If no user data, redirect to diagnostic landing
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
    
    // 回答数によって進捗状況を更新
    const answeredCount = Object.keys(newAnswers).length;
    const totalQuestions = 30; // Assuming we have 30 questions
    const newProgress = Math.min(30 + Math.floor((answeredCount / totalQuestions) * 70), 95);
    setProgress(newProgress);
  };
  
  const handleDiagnosticComplete = () => {
    setProgress(100);
    setStep('results');
    window.scrollTo(0, 0);
  };
  
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
        
        {step === 'results' && (
          <DiagnosticResults 
            companyName={companyName}
            industry={industry}
            selectedSdgs={selectedSdgs}
            answers={answers}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SustainabilityCheck;
