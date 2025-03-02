
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from "@/components/ui/use-toast";

// Import refactored components
import SustainabilityHeader from '@/components/sustainability/SustainabilityHeader';
import ProgressIndicator from '@/components/sustainability/ProgressIndicator';
import BasicInfoSection from '@/components/sustainability/BasicInfoSection';
import SdgSelectionSection from '@/components/sustainability/SdgSelectionSection';
import DiagnosticQuestionSection from '@/components/sustainability/DiagnosticQuestionSection';
import DiagnosticResults from '@/components/sustainability/DiagnosticResults';

const SustainabilityCheck = () => {
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [selectedSdgs, setSelectedSdgs] = useState<number[]>([]);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();
  
  // 診断を実行
  const runDiagnostics = () => {
    if (!companyName.trim()) {
      toast({
        title: "入力エラー",
        description: "企業名を入力してください",
        variant: "destructive",
      });
      return;
    }
    
    setShowResults(true);
    
    toast({
      title: "診断完了",
      description: "サステナビリティ診断が完了しました",
      duration: 5000,
    });
  };
  
  // 診断をリセット
  const resetDiagnostics = () => {
    setCompanyName('');
    setIndustry('');
    setSelectedSdgs([]);
    setAnswers({});
    setShowResults(false);
    
    toast({
      title: "リセット完了",
      description: "診断がリセットされました",
      duration: 3000,
    });
  };
  
  // フォームの進捗状況を計算
  const calculateProgress = () => {
    const totalSections = 3; // 基本情報、SDGs、質問
    let completedSections = 0;
    
    // 基本情報のチェック
    if (companyName.trim()) completedSections += 1;
    
    // SDGsのチェック
    if (selectedSdgs.length > 0) completedSections += 1;
    
    // 質問回答のチェック
    if (Object.values(answers).some(value => value === true)) completedSections += 1;
    
    return (completedSections / totalSections) * 100;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        {/* ページヘッダー */}
        <SustainabilityHeader />

        {!showResults ? (
          <>
            {/* 進捗バー */}
            <ProgressIndicator progress={calculateProgress()} />
            
            {/* 基本情報入力セクション */}
            <BasicInfoSection 
              companyName={companyName}
              setCompanyName={setCompanyName}
              industry={industry}
              setIndustry={setIndustry}
            />
            
            {/* SDGs選択セクション */}
            <SdgSelectionSection 
              selectedSdgs={selectedSdgs}
              setSelectedSdgs={setSelectedSdgs}
            />
            
            {/* 診断質問セクション */}
            <DiagnosticQuestionSection 
              answers={answers}
              setAnswers={setAnswers}
              runDiagnostics={runDiagnostics}
            />
          </>
        ) : (
          <>
            {/* 診断結果セクション */}
            <DiagnosticResults 
              companyName={companyName}
              industry={industry}
              selectedSdgs={selectedSdgs}
              answers={answers}
              resetDiagnostics={resetDiagnostics}
            />
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SustainabilityCheck;
