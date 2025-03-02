
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/diagnostics/HeroSection';
import DiagnosticTabs from '@/components/diagnostics/DiagnosticTabs';
import SupportSection from '@/components/diagnostics/SupportSection';
import FAQSection from '@/components/diagnostics/FAQSection';
import DiagnosticCTA from '@/components/diagnostics/DiagnosticCTA';

const ComprehensiveDiagnostics = () => {
  const [activeTab, setActiveTab] = useState("existing-gx");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-12 px-4">
        <HeroSection />
        <DiagnosticTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SupportSection />
        <FAQSection />
        <DiagnosticCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default ComprehensiveDiagnostics;
