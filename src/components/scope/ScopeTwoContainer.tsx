
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ScopeHeader from '@/components/scope/ScopeHeader';
import ScopeNavbar from '@/components/scope/ScopeNavbar';
import { defaultScopeTwoData, ScopeTwoDataType } from '@/data/scopeTwoData';
import { useLocation } from 'react-router-dom';
import StepNavigation from '@/components/scope/StepNavigation';
import useStepNavigation, { Step } from '@/components/scope/steps/useStepNavigation';
import ScopeTwoStepContent from '@/components/scope/ScopeTwoStepContent';
import SavedResultsPanel from './saved-results/SavedResultsPanel';
import SavedResultsControls from './saved-results/SavedResultsControls';
import useSavedResults from './saved-results/useSavedResults';
import { useReportActions } from './report/ReportActions';
import useScopeTwoFormManager from './form/useScopeTwoFormManager';
import { getDiagnosticUserData } from '@/utils/diagnosticUtils';

const ScopeTwoContainer = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [scopeTwoData, setScopeTwoData] = useState<ScopeTwoDataType>({
    ...defaultScopeTwoData,
    total: Math.round(defaultScopeTwoData.total * 10) / 10 // Round to 1 decimal place
  });
  const location = useLocation();
  
  // Check for user data on component mount
  useEffect(() => {
    const userData = getDiagnosticUserData();
    if (userData) {
      // Welcome the user
      toast({
        title: `${userData.userName}様、ようこそ`,
        description: "Scope 2排出量診断を始めましょう",
      });
      
      // Set company name if we have form data
      if (userData.companyName) {
        setScopeTwoData(prev => ({
          ...prev,
          companyName: userData.companyName
        }));
      }
    } else {
      // If no user data, redirect to diagnostic landing
      navigate('/diagnostic-landing');
      toast({
        title: "診断を始めるには情報が必要です",
        description: "診断ランディングページから情報を入力してください",
      });
    }
  }, [navigate, toast]);
  
  // ステップの定義
  const steps: Step[] = [
    { id: "input", title: "データ入力", description: "自社データの入力" },
    { id: "overview", title: "データ概要", description: "排出量の全体像を把握" },
    { id: "details", title: "詳細分析", description: "カテゴリ別・期間別の詳細" },
    { id: "reduction", title: "削減計画", description: "目標と削減施策の策定" }
  ];
  
  // ステップナビゲーションフックを使用
  const { activeStep, setActiveStep, goToNextStep, goToPreviousStep } = useStepNavigation(steps);
  const { downloadReport } = useReportActions();
  
  // カスタムフォーム管理フックを使用
  const { 
    formData, 
    handleFormSubmit, 
    handleInputChange,
    handleMonthlyDataChange,
    handleYearlyTrendDataChange,
    handleSelectChange 
  } = useScopeTwoFormManager(scopeTwoData, setScopeTwoData, setActiveStep, toast);
  
  // 保存結果管理フックを使用
  const {
    savedResults,
    showSavedResults,
    setShowSavedResults,
    saveResult,
    loadSavedResult,
    deleteSavedResult
  } = useSavedResults(scopeTwoData, setScopeTwoData);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        {/* ページヘッダー */}
        <ScopeHeader 
          title="Scope 2排出量データ"
          description="企業が間接的に排出する温室効果ガス（購入した電力・熱・蒸気等の使用による排出）のデータ分析と可視化。削減目標に対する進捗状況を確認し、効果的な排出削減策を策定するためのインサイトを提供します。"
          icon={<BarChart3 className="mr-3 h-8 w-8" />}
        />
        
        {/* 自社データ入力ボタン */}
        {activeStep !== 0 && (
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Button 
              onClick={() => setActiveStep(0)} 
              className="bg-purple-600 hover:bg-purple-700 font-semibold"
            >
              自社データを入力する
            </Button>
          </motion.div>
        )}

        {/* スコープナビゲーション */}
        <ScopeNavbar 
          currentPath={location.pathname} 
          onShowForm={() => setActiveStep(0)}
        />
        
        {/* 保存と読み込みボタン */}
        <SavedResultsControls
          showSavedResults={showSavedResults}
          canSaveCurrentResult={activeStep > 0}
          onToggleShowResults={() => setShowSavedResults(!showSavedResults)}
          onSaveResult={saveResult}
        />

        {/* 保存された結果一覧 */}
        {showSavedResults && (
          <SavedResultsPanel
            savedResults={savedResults}
            onLoadResult={loadSavedResult}
            onDeleteResult={deleteSavedResult}
          />
        )}
        
        {/* ステップナビゲーション */}
        <StepNavigation 
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          goToPreviousStep={goToPreviousStep}
          goToNextStep={goToNextStep}
        />
        
        {/* ステップコンテンツ */}
        <motion.div 
          key={steps[activeStep].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <ScopeTwoStepContent
            activeStepId={steps[activeStep].id}
            formData={formData}
            onFormSubmit={handleFormSubmit}
            onInputChange={handleInputChange}
            onMonthlyDataChange={handleMonthlyDataChange}
            onYearlyTrendDataChange={handleYearlyTrendDataChange}
            onSelectChange={handleSelectChange}
            onCancel={() => setActiveStep(1)}
            scopeTwoData={scopeTwoData}
            onDownloadReport={downloadReport}
          />
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScopeTwoContainer;
