
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Products from '@/pages/Products';
import AboutGX from '@/pages/AboutGX';
import GxAssessment from '@/pages/GxAssessment';
import ScopeOne from '@/pages/ScopeOne';
import ScopeTwo from '@/pages/ScopeTwo';
import ScopeThree from '@/pages/ScopeThree';
import ComprehensiveDiagnostics from '@/pages/ComprehensiveDiagnostics';
import SustainabilityCheck from '@/pages/SustainabilityCheck';
import Contact from '@/pages/Contact';
import AITechnology from '@/pages/AITechnology';
import EcoPrinting from '@/pages/EcoPrinting';
import EcoLogistics from '@/pages/EcoLogistics';
import GXPrinting from '@/pages/GXPrinting';
import GXLogistics from '@/pages/GXLogistics';
import GxAiProducts from '@/pages/GxAiProducts';
import GxEcoDesign from '@/pages/GxEcoDesign';
import GxEnergyManagement from '@/pages/GxEnergyManagement';
import GxEducationPlatform from '@/pages/GxEducationPlatform';
import GxSupplyChainAudit from '@/pages/GxSupplyChainAudit';
import GxSustainableMarketing from '@/pages/GxSustainableMarketing';
import Dashboard from '@/pages/Dashboard';
import NotFound from '@/pages/NotFound';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about-gx" element={<AboutGX />} />
        <Route path="/gx-assessment" element={<GxAssessment />} />
        <Route path="/scope-one" element={<ScopeOne />} />
        <Route path="/scope-two" element={<ScopeTwo />} />
        <Route path="/scope-three" element={<ScopeThree />} />
        <Route path="/comprehensive-diagnostics" element={<ComprehensiveDiagnostics />} />
        <Route path="/sustainability-check" element={<SustainabilityCheck />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ai-technology" element={<AITechnology />} />
        <Route path="/eco-printing" element={<EcoPrinting />} />
        <Route path="/eco-logistics" element={<EcoLogistics />} />
        <Route path="/gx-printing" element={<GXPrinting />} />
        <Route path="/gx-logistics" element={<GXLogistics />} />
        <Route path="/gx-ai-products" element={<GxAiProducts />} />
        <Route path="/gx-eco-design" element={<GxEcoDesign />} />
        <Route path="/gx-energy-management" element={<GxEnergyManagement />} />
        <Route path="/gx-education-platform" element={<GxEducationPlatform />} />
        <Route path="/gx-supply-chain-audit" element={<GxSupplyChainAudit />} />
        <Route path="/gx-sustainable-marketing" element={<GxSustainableMarketing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      <Sonner />
    </Router>
  );
}

export default App;
