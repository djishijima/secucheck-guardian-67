
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DiagnosticHero from '@/components/diagnostics/DiagnosticHero';
import DiagnosticServiceCards from '@/components/diagnostics/DiagnosticServiceCards';
import DiagnosticProcess from '@/components/diagnostics/DiagnosticProcess';
import DiagnosticTestimonials from '@/components/diagnostics/DiagnosticTestimonials';
import DiagnosticCTASection from '@/components/diagnostics/DiagnosticCTASection';
import { Toaster } from "@/components/ui/sonner";

const DiagnosticLanding = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <DiagnosticHero />
        <DiagnosticServiceCards />
        <DiagnosticProcess />
        <DiagnosticTestimonials />
        <DiagnosticCTASection />
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default DiagnosticLanding;
