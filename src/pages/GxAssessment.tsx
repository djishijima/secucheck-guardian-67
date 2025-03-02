
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GxAssessmentHeader from '@/components/gx-assessment/GxAssessmentHeader';
import GxAssessmentContainer from '@/components/gx-assessment/GxAssessmentContainer';

const GxAssessment = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-12 px-4">
        <GxAssessmentHeader />
        <GxAssessmentContainer />
      </main>
      
      <Footer />
    </div>
  );
};

export default GxAssessment;
