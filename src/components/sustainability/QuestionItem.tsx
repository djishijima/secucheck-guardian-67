
import React from 'react';
import { motion } from 'framer-motion';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface QuestionItemProps {
  id: string;
  text: string;
  isChecked: boolean;
  categoryName: string;
  index: number;
  onCheckedChange: (id: string, checked: boolean) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  id,
  text,
  isChecked,
  categoryName,
  index,
  onCheckedChange
}) => (
  <motion.div 
    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all text-left"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ x: 5 }}
  >
    <Checkbox 
      id={id}
      checked={isChecked}
      onCheckedChange={(checked) => onCheckedChange(id, checked as boolean)}
      className="mt-1"
    />
    <div className="flex-1">
      <Label htmlFor={id} className="text-sm font-medium flex items-center gap-2 text-left">
        {text}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-gray-400 cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-xs">この項目は「{categoryName}」カテゴリの重要な指標です。取り組みがある場合はチェックしてください。</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Label>
    </div>
  </motion.div>
);

export default QuestionItem;
