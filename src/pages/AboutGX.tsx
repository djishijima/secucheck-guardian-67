
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// GX Components
import GXHero from '@/components/gx/GXHero';
import GXIntroduction from '@/components/gx/GXIntroduction';
import GXInitiatives from '@/components/gx/GXInitiatives';
import GxCertifications from '@/components/gx/GxCertifications';

// AI Components
import AIHero from '@/components/ai/AIHero';
import AITechnologies from '@/components/ai/AITechnologies';
import AiUseCases from '@/components/ai/AiUseCases';

// Shared Components
import AiGxSynergy from '@/components/shared/AiGxSynergy';
import CallToAction from '@/components/shared/CallToAction';

const AboutGX = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        {/* GXセクション */}
        <GXHero />
        <GXIntroduction />
        <GXInitiatives />
        
        {/* AIセクション */}
        <AIHero />
        <AITechnologies />
        
        {/* 共有セクション */}
        <AiGxSynergy />
        <GxCertifications />
        <AiUseCases />
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutGX;
