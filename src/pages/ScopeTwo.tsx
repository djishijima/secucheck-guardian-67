
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ScopeHeader from '@/components/scope/ScopeHeader';
import ScopeNavbar from '@/components/scope/ScopeNavbar';
import ScopeTwoOverviewTab from '@/components/scope/ScopeTwoOverviewTab';
import ScopeTwoDetailsTab from '@/components/scope/ScopeTwoDetailsTab';
import ScopeTwoReductionTab from '@/components/scope/ScopeTwoReductionTab';
import ScopeTwoDataForm from '@/components/scope/ScopeTwoDataForm';
import { defaultScopeTwoData, ScopeTwoDataType } from '@/data/scopeTwoData';

const ScopeTwo = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const { toast } = useToast();
  const [scopeTwoData, setScopeTwoData] = useState<ScopeTwoDataType>(defaultScopeTwoData);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    electricity: defaultScopeTwoData.categories[0].value,
    heat: defaultScopeTwoData.categories[1].value,
    steam: defaultScopeTwoData.categories[2].value,
    targetYear: '2023年度'
  });
  
  // セクションの配列
  const sections = ["overview", "details", "reduction"];
  const sectionTitles = ["概要", "詳細分析", "削減計画"];
  const currentSection = sections[currentSectionIndex];
  
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
          <ScopeTwoOverviewTab 
            scopeTwoData={scopeTwoData} 
            onDownloadReport={downloadReport}
            onViewDetails={goToNextSection}
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
              className="bg-purple-600 hover:bg-purple-700 font-semibold"
            >
              自社データを入力する
            </Button>
          </motion.div>
        ) : (
          <ScopeTwoDataForm 
            formData={formData}
            onFormSubmit={handleFormSubmit}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onCancel={() => setShowForm(false)}
            scopeTwoData={scopeTwoData}
          />
        )}

        {/* ナビゲーションリンク */}
        <ScopeNavbar onShowForm={() => setShowForm(true)} />
        
        {/* セクション進捗バー */}
        <div className="bg-gray-50 px-4 py-2 rounded-lg mb-6 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">{sectionProgress()}</span>
          <span className="text-sm font-medium text-purple-600">{sectionTitles[currentSectionIndex]}</span>
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
            className="bg-purple-600 hover:bg-purple-700 gap-2"
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

export default ScopeTwo;
