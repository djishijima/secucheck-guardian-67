
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/diagnostics/HeroSection';
import DiagnosticTabs from '@/components/diagnostics/DiagnosticTabs';
import SupportSection from '@/components/diagnostics/SupportSection';
import FAQSection from '@/components/diagnostics/FAQSection';
import DiagnosticCTA from '@/components/diagnostics/DiagnosticCTA';

const ComprehensiveDiagnostics = () => {
  const [activeTab, setActiveTab] = useState("existing-gx");
  const location = useLocation();

  // 診断結果からのリダイレクトの場合、スクロールして表示
  useEffect(() => {
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
    }
  }, [location]);

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
