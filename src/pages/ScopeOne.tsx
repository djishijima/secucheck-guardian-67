
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

        {/* データ入力ボタン */}
        <div className="mb-6 flex gap-4 flex-wrap">
          {!showForm && (
            <Button 
              onClick={() => setShowForm(true)} 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 font-semibold shadow-sm"
            >
              自社データを入力する
            </Button>
          )}
          
          {showForm && (
            <Button 
              variant="outline"
              onClick={() => setShowForm(false)}
              className="border-indigo-200 text-indigo-800"
            >
              ダッシュボードに戻る
            </Button>
          )}
        </div>

        {/* データ入力フォーム */}
        {showForm && (
          <ScopeOneDataForm 
            formData={formData}
            onFormSubmit={handleFormSubmit}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onCancel={() => setShowForm(false)}
            scopeOneData={scopeOneData}
          />
        )}

        {/* フォームが表示されていない場合のみナビゲーションとコンテンツを表示 */}
        {!showForm && (
          <>
            {/* ナビゲーションリンク */}
            <ScopeNavbar onShowForm={() => setShowForm(true)} />
            
            {/* セクション進捗バー */}
            <div className="bg-white px-4 py-2 rounded-lg mb-6 flex justify-between items-center shadow-sm border border-indigo-100">
              <span className="text-sm font-medium text-gray-600">{sectionProgress()}</span>
              <span className="text-sm font-medium text-indigo-600">{sectionTitles[currentSectionIndex]}</span>
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
            <div className="flex justify-between mt-8 pt-4 border-t border-indigo-100">
              <Button 
                onClick={goToPreviousSection}
                variant="outline"
                disabled={currentSectionIndex === 0}
                className="gap-2 border-indigo-200 text-indigo-800 disabled:opacity-50"
              >
                <ArrowLeft className="h-4 w-4" /> 前へ
              </Button>
              
              <Button 
                onClick={goToNextSection}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 gap-2 disabled:opacity-50"
                disabled={currentSectionIndex === sections.length - 1}
              >
                次へ <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ScopeOne;
