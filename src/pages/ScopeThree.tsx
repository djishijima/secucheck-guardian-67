
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLocation } from 'react-router-dom';
import StepNavigation from '@/components/scope/StepNavigation';
import useStepNavigation, { Step } from '@/components/scope/steps/useStepNavigation';
import ScopeHeader from '@/components/scope/ScopeHeader';
import ScopeNavbar from '@/components/scope/ScopeNavbar';
import ScopeThreeStepContent from '@/components/scope/ScopeThreeStepContent';

const ScopeThree = () => {
  const { toast } = useToast();
  const location = useLocation();
  
  // ステップの定義
  const steps: Step[] = [
    { id: "input", title: "データ入力", description: "自社データの入力" },
    { id: "overview", title: "データ概要", description: "排出量の全体像を把握" },
    { id: "details", title: "詳細分析", description: "カテゴリ別・期間別の詳細" },
    { id: "reduction", title: "削減計画", description: "目標と削減施策の策定" }
  ];
  
  // ステップナビゲーションフックを使用
  const { activeStep, setActiveStep, goToNextStep, goToPreviousStep } = useStepNavigation(steps);
  
  const handleShowForm = () => {
    toast({
      title: "開発中の機能",
      description: "Scope 3データ入力機能は現在開発中です。近日公開予定です。",
      duration: 3000,
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        {/* ページヘッダー */}
        <ScopeHeader 
          title="Scope 3排出量データ"
          description="バリューチェーン全体で発生する温室効果ガス排出（調達、販売、製品使用など）の包括的なデータ分析と可視化。サプライチェーン全体での排出削減に向けた戦略立案に役立ちます。"
          icon={<PieChart className="mr-3 h-8 w-8" />}
        />
        
        {/* 自社データ入力ボタン */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button 
            onClick={handleShowForm} 
            className="bg-amber-600 hover:bg-amber-700 font-semibold"
          >
            自社データを入力する
          </Button>
        </motion.div>

        {/* ナビゲーションリンク */}
        <ScopeNavbar 
          currentPath={location.pathname}
          onShowForm={handleShowForm} 
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
          <ScopeThreeStepContent activeStepId={steps[activeStep].id} />
        </motion.div>
        
        <div className="flex justify-center mt-8">
          <Button 
            variant="outline"
            onClick={() => toast({
              title: "お知らせ登録",
              description: "Scope 3機能のリリース時にお知らせいたします。",
            })}
            className="border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            Scope 3機能のリリース通知を受け取る
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ScopeThree;
