
import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { sdgGoals } from './SdgData';

interface SdgSelectionSectionProps {
  selectedSdgs: number[];
  setSelectedSdgs: (sdgs: number[]) => void;
}

const SdgSelectionSection: React.FC<SdgSelectionSectionProps> = ({ selectedSdgs, setSelectedSdgs }) => {
  const { toast } = useToast();
  
  // SDG選択のトグル処理
  const toggleSdg = (id: number) => {
    const newSelected = selectedSdgs.includes(id)
      ? selectedSdgs.filter(sdgId => sdgId !== id)
      : [...selectedSdgs, id];
    
    setSelectedSdgs(newSelected);
    
    // 選択時のトースト通知
    if (!selectedSdgs.includes(id)) {
      const selectedGoal = sdgGoals.find(goal => goal.id === id);
      toast({
        title: `SDG ${id} を選択しました`,
        description: `「${selectedGoal?.name}」に取り組んでいることを記録しました`,
        duration: 3000,
      });
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
        取り組み中のSDGs
      </h2>
      <p className="text-gray-600 mb-6">該当するSDGsを選択してください（複数選択可）</p>
      
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        variants={{
          show: {
            transition: {
              staggerChildren: 0.05
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {sdgGoals.map((goal) => (
          <motion.div 
            key={goal.id}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              show: { opacity: 1, scale: 1 }
            }}
            onClick={() => toggleSdg(goal.id)}
            className={`
              flex items-center gap-2 p-2 rounded-md cursor-pointer transition-all
              ${selectedSdgs.includes(goal.id) 
                ? 'ring-2 ring-green-600 bg-green-50 shadow-sm transform -translate-y-1' 
                : 'hover:bg-gray-100 hover:shadow'}
            `}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${goal.color}`}>
              {goal.id}
            </div>
            <span className="text-sm">{goal.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default SdgSelectionSection;
