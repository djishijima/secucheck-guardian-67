
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { defaultScopeOneData } from '@/data/scopeOneData';
import ScopeHeader from '@/components/scope/ScopeHeader';
import ScopeNavbar from '@/components/scope/ScopeNavbar';
import StepNavigation from '@/components/scope/StepNavigation';
import { useLocation } from 'react-router-dom';
import ScopeOneStepContent from '@/components/scope/ScopeOneStepContent';
import SavedResultsPanel from './saved-results/SavedResultsPanel';
import SavedResultsControls from './saved-results/SavedResultsControls';
import useFormManager from './form/useFormManager';
import useSavedResults from './saved-results/useSavedResults';
import useStepNavigation from './steps/useStepNavigation';
import { useReportActions } from './report/ReportActions';
import { useToast } from "@/components/ui/use-toast";
import { getDiagnosticUserData } from '@/utils/diagnosticUtils';

const ScopeOneContainer = () => {
  const [scopeOneData, setScopeOneData] = useState(defaultScopeOneData);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check for user data on component mount
  useEffect(() => {
    const userData = getDiagnosticUserData();
    if (userData) {
      // Welcome the user
      toast({
        title: `${userData.userName}様、ようこそ`,
        description: "Scope 1排出量診断を始めましょう",
      });
      
      // Set company name if we have form data
      if (userData.companyName) {
        setScopeOneData(prev => ({
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
  
  // Define steps for the Scope 1 emissions data page
  const steps = [
    { id: "input", title: "データ入力", description: "自社データの入力" },
    { id: "overview", title: "データ概要", description: "排出量の全体像を把握" },
    { id: "details", title: "詳細分析", description: "カテゴリ別・期間別の詳細" },
    { id: "reduction", title: "削減計画", description: "目標と削減施策の策定" }
  ];
  
  // Custom hooks to manage different aspects of functionality
  const { activeStep, setActiveStep, goToNextStep, goToPreviousStep } = useStepNavigation(steps);
  const { downloadReport } = useReportActions();
  const { 
    formData, 
    showForm, 
    setShowForm,
    handleFormSubmit, 
    handleInputChange,
    handleMonthlyDataChange,
    handleSelectChange 
  } = useFormManager(scopeOneData, setScopeOneData, setActiveStep);
  const {
    savedResults,
    showSavedResults,
    setShowSavedResults,
    saveResult,
    loadSavedResult,
    deleteSavedResult
  } = useSavedResults(scopeOneData, setScopeOneData);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        {/* ページヘッダー */}
        <div className="mb-8">
          <ScopeHeader 
            title="Scope 1排出量データ"
            description="企業が直接排出する温室効果ガス（自社所有の設備や車両からの排出）のデータ分析と可視化。削減目標に対する進捗状況を確認し、効果的な排出削減策を策定するためのインサイトを提供します。"
            icon={<LineChart className="mr-3 h-8 w-8" />}
          />
        </div>
        
        {/* スコープナビゲーション */}
        <ScopeNavbar 
          currentPath={location.pathname}
          onShowForm={() => {
            setShowForm(true);
            setActiveStep(0); // Set to input step when clicking form button
          }}
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

        {/* ステップナビゲーションとコンテンツ */}
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
          <ScopeOneStepContent
            activeStepId={steps[activeStep].id}
            formData={formData}
            onFormSubmit={handleFormSubmit}
            onInputChange={handleInputChange}
            onMonthlyDataChange={handleMonthlyDataChange}
            onSelectChange={handleSelectChange}
            onCancel={() => setActiveStep(1)}
            scopeOneData={scopeOneData}
            onDownloadReport={downloadReport}
          />
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScopeOneContainer;
