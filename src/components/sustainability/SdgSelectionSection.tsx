
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { sdgGoals } from './SdgData';

interface SdgSelectionSectionProps {
  selectedSdgs: number[];
  setSelectedSdgs: React.Dispatch<React.SetStateAction<number[]>>;
  onSubmit: () => void;
}

const SdgSelectionSection: React.FC<SdgSelectionSectionProps> = ({
  selectedSdgs,
  setSelectedSdgs,
  onSubmit
}) => {
  const toggleSdg = (id: number) => {
    if (selectedSdgs.includes(id)) {
      setSelectedSdgs(prev => prev.filter(sdgId => sdgId !== id));
    } else {
      setSelectedSdgs(prev => [...prev, id]);
    }
  };
  
  return (
    <motion.section 
      className="mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-green-200 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      whileHover={{ boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)" }}
    >
      <h2 className="text-xl font-bold mb-4 flex items-center text-green-700">
        <Globe className="mr-2 h-5 w-5 text-green-600" />
        関連するSDGs
      </h2>
      <p className="text-gray-600 mb-6">あなたの事業に関連するSDGsを選択してください。複数選択可能です。</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
        {sdgGoals.map((sdg) => (
          <motion.div
            key={sdg.id}
            className={`
              cursor-pointer rounded-lg overflow-hidden border-2 
              ${selectedSdgs.includes(sdg.id) ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'}
              transition-all hover:shadow-md
            `}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleSdg(sdg.id)}
          >
            <img 
              src={sdg.image} 
              alt={sdg.title} 
              className="w-full aspect-square object-cover" 
            />
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-between">
        <div className="text-sm text-gray-500">
          {selectedSdgs.length > 0 ? `${selectedSdgs.length}個のSDGsを選択中` : '選択されていません'}
        </div>
        
        <Button 
          onClick={onSubmit}
          className="bg-green-600 hover:bg-green-700 gap-2"
          disabled={selectedSdgs.length === 0}
        >
          次へ進む <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </motion.section>
  );
};

export default SdgSelectionSection;
