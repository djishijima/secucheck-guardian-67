
import React from 'react';
import ScopeOneContainer from '@/components/scope/ScopeOneContainer';
import { ScopeOneDataType, defaultScopeOneData } from '@/data/scopeOneData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from "@/components/ui/use-toast";
import ResultsHeader from '@/components/shared/ResultsHeader';
import { SavedScopeOneData } from '@/components/scope/saved-results/SavedResultsPanel';
import InquiryDialog from '@/components/shared/InquiryDialog';

const ScopeOne = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <ScopeOneContainer />
      </div>
      <Footer />
    </div>
  );
};

export default ScopeOne;
