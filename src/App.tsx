
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import AboutGX from "./pages/AboutGX";
import AITechnology from "./pages/AITechnology";
import Contact from "./pages/Contact";
import SustainabilityCheck from "./pages/SustainabilityCheck";
import EcoPrinting from "./pages/EcoPrinting";
import GXPrinting from "./pages/GXPrinting";
import EcoLogistics from "./pages/EcoLogistics";
import GXLogistics from "./pages/GXLogistics";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about-gx" element={<AboutGX />} />
          <Route path="/ai-technology" element={<AITechnology />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sustainability-check" element={<SustainabilityCheck />} />
          <Route path="/eco-printing" element={<EcoPrinting />} />
          <Route path="/gx-printing" element={<GXPrinting />} />
          <Route path="/eco-logistics" element={<EcoLogistics />} />
          <Route path="/gx-logistics" element={<GXLogistics />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
