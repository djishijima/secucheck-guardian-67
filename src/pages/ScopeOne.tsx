
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ScopeHeader from '@/components/scope/ScopeHeader';
import ScopeNavbar from '@/components/scope/ScopeNavbar';
import ScopeOneOverviewTab from '@/components/scope/ScopeOneOverviewTab';
import ScopeOneDetailsTab from '@/components/scope/ScopeOneDetailsTab';
import ScopeOneReductionTab from '@/components/scope/ScopeOneReductionTab';
import ScopeOneDataForm from '@/components/scope/ScopeOneDataForm';
import { defaultScopeOneData, ScopeOneDataType } from '@/data/scopeOneData';

const ScopeOne = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
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
  
  // セクションの配列
  const sections = ["overview", "details", "reduction"];
  const sectionTitles = ["概要", "詳細分析", "削減計画"];
  const currentSection = sections[currentSectionIndex];
  
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
    const total = Object.values(formData)
      .filter((value): value is number => typeof value === 'number')
      .reduce((sum, value) => sum + value, 0);

    // Calculate new percentages
    const categories = [
      {
        name: '社有車',
        value: formData.companyVehicles,
        percentage: parseFloat(((formData.companyVehicles / total) * 100).toFixed(1)),
        color: 'bg-blue-500'
      },
      {
        name: '定置燃焼機器',
        value: formData.stationaryEquipment,
        percentage: parseFloat(((formData.stationaryEquipment / total) * 100).toFixed(1)),
        color: 'bg-green-500'
      },
      {
        name: '空調設備',
        value: formData.hvacEquipment,
        percentage: parseFloat(((formData.hvacEquipment / total) * 100).toFixed(1)),
        color: 'bg-amber-500'
      },
      {
        name: 'その他',
        value: formData.other,
        percentage: parseFloat(((formData.other / total) * 100).toFixed(1)),
        color: 'bg-red-400'
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
  
  // 次のセクションに進む
  const goToNextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      window.scrollTo(0, 0);
    }
  };
  
  // 前のセクションに戻る
  const goToPreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // セクションの進捗度を表示する
  const sectionProgress = () => {
    return `セクション ${currentSectionIndex + 1}/${sections.length}`;
  };
  
  // 現在のセクションコンテンツを取得
  const renderSectionContent = () => {
    switch (currentSection) {
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
        <ScopeHeader />

        {/* データ入力フォーム */}
        {!showForm ? (
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Button 
              onClick={() => setShowForm(true)} 
              className="bg-green-600 hover:bg-green-700 font-semibold"
            >
              自社データを入力する
            </Button>
          </motion.div>
        ) : (
          <ScopeOneDataForm 
            formData={formData}
            onFormSubmit={handleFormSubmit}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onCancel={() => setShowForm(false)}
            scopeOneData={scopeOneData}
          />
        )}

        {/* ナビゲーションリンク */}
        <ScopeNavbar onShowForm={() => setShowForm(true)} />
        
        {/* セクション進捗バー */}
        <div className="bg-gray-50 px-4 py-2 rounded-lg mb-6 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">{sectionProgress()}</span>
          <span className="text-sm font-medium text-green-600">{sectionTitles[currentSectionIndex]}</span>
        </div>
        
        {/* セクションコンテンツ */}
        <motion.div 
          key={currentSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          {renderSectionContent()}
        </motion.div>
        
        {/* ナビゲーションボタン */}
        <div className="flex justify-between mt-8 pt-4 border-t">
          <Button 
            onClick={goToPreviousSection}
            variant="outline"
            disabled={currentSectionIndex === 0}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> 前へ
          </Button>
          
          <Button 
            onClick={goToNextSection}
            className="bg-green-600 hover:bg-green-700 gap-2"
            disabled={currentSectionIndex === sections.length - 1}
          >
            次へ <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScopeOne;
