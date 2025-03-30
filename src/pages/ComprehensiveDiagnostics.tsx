
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/diagnostics/HeroSection';
import DiagnosticTabs from '@/components/diagnostics/DiagnosticTabs';
import SupportSection from '@/components/diagnostics/SupportSection';
import FAQSection from '@/components/diagnostics/FAQSection';
import DiagnosticCTA from '@/components/diagnostics/DiagnosticCTA';
import { useToast } from "@/components/ui/use-toast";
import { getDiagnosticUserData } from '@/utils/diagnosticUtils';

const ComprehensiveDiagnostics = () => {
  const [activeTab, setActiveTab] = useState("existing-gx");
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for user data and handle redirects
  useEffect(() => {
    const userData = getDiagnosticUserData();
    
    if (location.state?.fromGxAssessment) {
      // タブをセット（GX対応度診断に戻す）
      setActiveTab("existing-gx");
      
      // 少し時間を置いてからスクロール（コンポーネントのレンダリング完了後）
      setTimeout(() => {
        const element = document.getElementById("diagnostic-tabs");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else if (!userData) {
      // 診断ランディングページへのリダイレクト
      navigate('/diagnostic-landing');
      toast({
        title: "診断を始めるには情報が必要です",
        description: "診断ランディングページから情報を入力してください",
      });
    } else {
      // Welcome the user
      toast({
        title: `${userData.userName}様、ようこそ`,
        description: "DX診断サービスを始めましょう",
      });
    }
  }, [location, navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-12 px-4">
        <HeroSection />
        <div id="diagnostic-tabs">
          <DiagnosticTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <SupportSection />
        <FAQSection />
        <DiagnosticCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default ComprehensiveDiagnostics;
