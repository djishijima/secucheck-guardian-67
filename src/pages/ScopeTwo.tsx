
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
import { defaultScopeTwoData } from '@/data/scopeTwoData';

const ScopeTwo = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const { toast } = useToast();
  const scopeTwoData = defaultScopeTwoData;
  
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
        
        {/* ナビゲーションリンク */}
        <ScopeNavbar />
        
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
