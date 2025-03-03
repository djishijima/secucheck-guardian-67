
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from "@/components/ui/use-toast";
import ScopeHeader from '@/components/scope/ScopeHeader';
import ScopeNavbar from '@/components/scope/ScopeNavbar';
import ScopeTwoOverviewTab from '@/components/scope/ScopeTwoOverviewTab';
import ScopeTwoDetailsTab from '@/components/scope/ScopeTwoDetailsTab';
import ScopeTwoReductionTab from '@/components/scope/ScopeTwoReductionTab';
import ScopeTwoDataForm from '@/components/scope/ScopeTwoDataForm';
import { defaultScopeTwoData, ScopeTwoDataType } from '@/data/scopeTwoData';
import { useLocation } from 'react-router-dom';
import StepNavigation from '@/components/scope/StepNavigation';
import useStepNavigation, { Step } from '@/components/scope/steps/useStepNavigation';

const ScopeTwo = () => {
  const { toast } = useToast();
  const [scopeTwoData, setScopeTwoData] = useState<ScopeTwoDataType>(defaultScopeTwoData);
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();
  const [formData, setFormData] = useState({
    electricity: defaultScopeTwoData.categories[0].value,
    heat: defaultScopeTwoData.categories[1].value,
    steam: defaultScopeTwoData.categories[2].value,
    targetYear: '2023年度'
  });
  
  // ステップの定義
  const steps: Step[] = [
    { id: "input", title: "データ入力", description: "自社データの入力" },
    { id: "overview", title: "データ概要", description: "排出量の全体像を把握" },
    { id: "details", title: "詳細分析", description: "カテゴリ別・期間別の詳細" },
    { id: "reduction", title: "削減計画", description: "目標と削減施策の策定" }
  ];
  
  // ステップナビゲーションフックを使用
  const { activeStep, setActiveStep, goToNextStep, goToPreviousStep } = useStepNavigation(steps);
  
  const downloadReport = () => {
    toast({
      title: "レポートのダウンロード",
      description: "Scope 2排出量の詳細レポートがダウンロードされました。",
      duration: 3000,
    });
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate new total
    const total = Object.values(formData)
      .filter((value): value is number => typeof value === 'number')
      .reduce((sum, value) => sum + value, 0);

    // Calculate new percentages
    const categories = [
      {
        name: '電力',
        value: formData.electricity,
        percentage: parseFloat(((formData.electricity / total) * 100).toFixed(1)),
        color: 'bg-purple-500'
      },
      {
        name: '熱供給',
        value: formData.heat,
        percentage: parseFloat(((formData.heat / total) * 100).toFixed(1)),
        color: 'bg-pink-500'
      },
      {
        name: '蒸気',
        value: formData.steam,
        percentage: parseFloat(((formData.steam / total) * 100).toFixed(1)),
        color: 'bg-red-500'
      }
    ];

    // Update the data
    setScopeTwoData(prev => ({
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
      description: "Scope 2排出量データが更新されました。",
      duration: 3000,
    });

    setShowForm(false);
    
    // データ入力後は概要ページに移動
    setActiveStep(1);
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
  
  // 現在のステップコンテンツを取得
  const renderStepContent = () => {
    const currentStepId = steps[activeStep].id;
    
    switch (currentStepId) {
      case "input":
        return (
          <ScopeTwoDataForm 
            formData={formData}
            onFormSubmit={handleFormSubmit}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onCancel={() => setActiveStep(1)}
            scopeTwoData={scopeTwoData}
          />
        );
      case "overview":
        return (
          <ScopeTwoOverviewTab 
            scopeTwoData={scopeTwoData} 
            onDownloadReport={downloadReport}
            onViewDetails={() => goToNextStep()}
          />
        );
      case "details":
        return (
          <ScopeTwoDetailsTab scopeTwoData={scopeTwoData} />
        );
      case "reduction":
        return (
          <ScopeTwoReductionTab scopeTwoData={scopeTwoData} />
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

        {/* ナビゲーションリンク */}
        <ScopeNavbar 
          currentPath={location.pathname}
          onShowForm={() => setActiveStep(0)} 
        />
        
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
          {renderStepContent()}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScopeTwo;
