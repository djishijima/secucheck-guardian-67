
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsContent } from "@/components/ui/tabs";
import { Leaf, Recycle, Database } from 'lucide-react';
import TabButton from './TabButton';
import ServiceSection from './ServiceSection';
import { sustainabilityDiagnostics, dxDiagnostics, existingGxDiagnostics } from './DiagnosticData';

interface DiagnosticTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const DiagnosticTabs: React.FC<DiagnosticTabsProps> = ({ activeTab, setActiveTab }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="max-w-5xl mx-auto mb-12 p-6 bg-white rounded-xl shadow-sm"
  >
    <div className="flex justify-center mb-8">
      <Tabs defaultValue={activeTab} className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabButton 
              value="existing-gx" 
              icon={<Leaf className="h-4 w-4 text-green-600" />} 
              label="GX対応度診断" 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <TabButton 
              value="sustainability" 
              icon={<Recycle className="h-4 w-4 text-green-600" />} 
              label="サステナビリティ診断" 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <TabButton 
              value="dx" 
              icon={<Database className="h-4 w-4 text-blue-600" />} 
              label="DX診断" 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </TabsList>
        </div>

        <TabsContent value="existing-gx" className="space-y-4">
          <ServiceSection 
            title="GX対応度診断サービス" 
            description="企業のグリーントランスフォーメーション（GX）対応度を評価し、環境負荷低減と持続可能なビジネスモデル構築をサポートします。" 
            diagnostics={existingGxDiagnostics} 
          />
        </TabsContent>

        <TabsContent value="sustainability" className="space-y-4">
          <ServiceSection 
            title="サステナビリティ診断サービス" 
            description="サステナビリティに関する様々な側面から企業活動を評価し、持続可能な事業運営のための具体的な改善策を提案します。" 
            diagnostics={sustainabilityDiagnostics} 
          />
        </TabsContent>

        <TabsContent value="dx" className="space-y-4">
          <ServiceSection 
            title="DX診断サービス" 
            description="デジタルトランスフォーメーション（DX）の観点から企業のデジタル成熟度を評価し、競争力強化のための戦略的なデジタル化推進を支援します。" 
            diagnostics={dxDiagnostics} 
          />
        </TabsContent>
      </Tabs>
    </div>
  </motion.div>
);

export default DiagnosticTabs;
