
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, LineChart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ScopeOneOverviewTab from '@/components/scope/ScopeOneOverviewTab';
import ScopeOneDetailsTab from '@/components/scope/ScopeOneDetailsTab';
import ScopeOneReductionTab from '@/components/scope/ScopeOneReductionTab';
import ScopeOneDataForm from '@/components/scope/ScopeOneDataForm';
import { defaultScopeOneData, ScopeOneDataType } from '@/data/scopeOneData';
import ScopeHeader from '@/components/scope/ScopeHeader';
import ScopeNavbar from '@/components/scope/ScopeNavbar';
import StepNavigation from '@/components/scope/StepNavigation';
import { useLocation } from 'react-router-dom';

const ScopeOne = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { toast } = useToast();
  const [scopeOneData, setScopeOneData] = useState<ScopeOneDataType>(defaultScopeOneData);
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    companyVehicles: defaultScopeOneData.categories[0].value,
    stationaryEquipment: defaultScopeOneData.categories[1].value,
    hvacEquipment: defaultScopeOneData.categories[2].value,
    other: defaultScopeOneData.categories[3].value,
    targetYear: '2023年度'
  });
  
  // Steps for the Scope 1 emissions data page
  const steps = [
    { id: "overview", title: "データ概要", description: "排出量の全体像を把握" },
    { id: "details", title: "詳細分析", description: "カテゴリ別・期間別の詳細" },
    { id: "reduction", title: "削減計画", description: "目標と削減施策の策定" }
  ];
  
  const downloadReport = () => {
    toast({
      title: "レポートのダウンロード",
      description: "Scope 1排出量の詳細レポートがダウンロードされました。",
      duration: 3000,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate new total
    const total = formData.companyVehicles + 
                 formData.stationaryEquipment + 
                 formData.hvacEquipment + 
                 formData.other;

    // Calculate new percentages
    const categories = [
      {
        name: '社有車',
        value: formData.companyVehicles,
        percentage: parseFloat(((formData.companyVehicles / total) * 100).toFixed(1)),
        color: 'bg-purple-500'
      },
      {
        name: '定置燃焼機器',
        value: formData.stationaryEquipment,
        percentage: parseFloat(((formData.stationaryEquipment / total) * 100).toFixed(1)),
        color: 'bg-indigo-500'
      },
      {
        name: '空調設備',
        value: formData.hvacEquipment,
        percentage: parseFloat(((formData.hvacEquipment / total) * 100).toFixed(1)),
        color: 'bg-sky-500'
      },
      {
        name: 'その他',
        value: formData.other,
        percentage: parseFloat(((formData.other / total) * 100).toFixed(1)),
        color: 'bg-teal-500'
      }
    ];

    // Update the data
    setScopeOneData(prev => ({
      ...prev,
      total,
      categories,
      // Update the current year value in yearOverYear
      yearOverYear: prev.yearOverYear.map(item => 
        item.year === '2022年度' ? { ...item, value: total } : item
      ),
      // Update corresponding target
      reductionTargets: prev.reductionTargets.map(target => 
        target.year === formData.targetYear 
          ? { ...target, target: Math.round(total * 0.9) }
          : target
      )
    }));

    toast({
      title: "データ更新",
      description: "Scope 1排出量データが更新されました。",
      duration: 3000,
    });

    setShowForm(false);
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      targetYear: value
    }));
  };
  
  // ステップを進める
  const goToNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  // ステップを戻る
  const goToPreviousStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // 現在のステップコンテンツをレンダリング
  const renderStepContent = () => {
    switch (steps[activeStep].id) {
      case "overview":
        return (
          <ScopeOneOverviewTab 
            scopeOneData={scopeOneData} 
            onDownloadReport={downloadReport} 
          />
        );
      case "details":
        return (
          <ScopeOneDetailsTab scopeOneData={scopeOneData} />
        );
      case "reduction":
        return (
          <ScopeOneReductionTab scopeOneData={scopeOneData} />
        );
      default:
        return null;
    }
  };
  
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
          onShowForm={() => setShowForm(true)}
        />

        {/* データ入力フォームまたはステップコンテンツを表示 */}
        {showForm ? (
          <>
            {/* フォーム表示時のキャンセルボタン */}
            <div className="mb-4">
              <Button 
                variant="outline"
                onClick={() => setShowForm(false)}
                className="border-blue-200 text-blue-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                ダッシュボードに戻る
              </Button>
            </div>
            
            {/* データ入力フォーム */}
            <ScopeOneDataForm 
              formData={formData}
              onFormSubmit={handleFormSubmit}
              onInputChange={handleInputChange}
              onSelectChange={handleSelectChange}
              onCancel={() => setShowForm(false)}
              scopeOneData={scopeOneData}
            />
          </>
        ) : (
          <>
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
              {renderStepContent()}
            </motion.div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ScopeOne;
