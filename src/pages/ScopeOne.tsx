
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, LineChart, BarChart3, PieChart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';
import ScopeOneOverviewTab from '@/components/scope/ScopeOneOverviewTab';
import ScopeOneDetailsTab from '@/components/scope/ScopeOneDetailsTab';
import ScopeOneReductionTab from '@/components/scope/ScopeOneReductionTab';
import ScopeOneDataForm from '@/components/scope/ScopeOneDataForm';
import { defaultScopeOneData, ScopeOneDataType } from '@/data/scopeOneData';
import { Progress } from "@/components/ui/progress";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const ScopeOne = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { toast } = useToast();
  const [scopeOneData, setScopeOneData] = useState<ScopeOneDataType>(defaultScopeOneData);
  const [showForm, setShowForm] = useState(false);
  
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
          <motion.section
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white shadow-xl">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-blue-200 mb-2">
                  <Link to="/sustainability-check" className="hover:text-white flex items-center gap-1">
                    <ArrowLeft className="h-4 w-4" /> サステナビリティ診断
                  </Link>
                  <span>/</span>
                  <span>排出量データ</span>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center">
                    <LineChart className="mr-3 h-8 w-8" />
                    Scope 1排出量データ
                  </h1>
                  <p className="text-lg opacity-90 mb-4 text-white">
                    企業が直接排出する温室効果ガス（自社所有の設備や車両からの排出）のデータ分析と可視化。削減目標に対する進捗状況を確認し、効果的な排出削減策を策定するためのインサイトを提供します。
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.section>
        </div>
        
        {/* スコープナビゲーション */}
        <div className="mb-8">
          <Card className="border-blue-100">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4">
                <Link to="/scope-one">
                  <Button 
                    variant="default"
                    className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                  >
                    <LineChart className="h-4 w-4" />
                    Scope 1
                  </Button>
                </Link>
                <Link to="/scope-two">
                  <Button 
                    variant="outline"
                    className="border-blue-200 text-blue-700 flex items-center gap-2"
                  >
                    <BarChart3 className="h-4 w-4" />
                    Scope 2
                  </Button>
                </Link>
                <Link to="/scope-three">
                  <Button 
                    variant="outline"
                    className="border-blue-200 text-blue-700 flex items-center gap-2"
                  >
                    <PieChart className="h-4 w-4" />
                    Scope 3
                  </Button>
                </Link>
                <div className="ml-auto">
                  {!showForm && (
                    <Button 
                      onClick={() => setShowForm(true)}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      自社データを入力する
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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
            <div className="space-y-6">
              {/* プログレスバー */}
              <Card className="border-blue-100">
                <CardContent className="p-6">
                  <div className="mb-2 flex justify-between text-sm text-gray-500">
                    <span>ステップ {activeStep + 1}/{steps.length}</span>
                    <span>{steps[activeStep].title}</span>
                  </div>
                  <Progress value={((activeStep + 1) / steps.length) * 100} className="h-2 bg-gray-100" />
                  
                  {/* ステップナビゲーション */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {steps.map((step, index) => (
                      <button
                        key={step.id}
                        onClick={() => setActiveStep(index)}
                        className={`text-left p-3 rounded-lg transition-all ${
                          activeStep === index 
                            ? 'bg-blue-50 border border-blue-200' 
                            : 'hover:bg-gray-50 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            activeStep === index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{step.title}</div>
                            <div className="text-xs text-gray-500">{step.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* ステップコンテンツ */}
              <motion.div 
                key={steps[activeStep].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
              
              {/* ナビゲーションボタン */}
              <div className="flex justify-between mt-8 pt-4 border-t border-blue-100">
                <Button 
                  onClick={goToPreviousStep}
                  variant="outline"
                  disabled={activeStep === 0}
                  className="gap-2 border-blue-200 text-blue-800 disabled:opacity-50"
                >
                  <ArrowLeft className="h-4 w-4" /> 前へ
                </Button>
                
                <Button 
                  onClick={goToNextStep}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 gap-2 disabled:opacity-50"
                  disabled={activeStep === steps.length - 1}
                >
                  次へ <ArrowLeft className="h-4 w-4 rotate-180" />
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ScopeOne;
