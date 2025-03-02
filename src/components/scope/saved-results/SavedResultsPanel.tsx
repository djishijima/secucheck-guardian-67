
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ScopeOneDataType } from '@/data/scopeOneData';

// Extended type to include saved result properties
export interface SavedScopeOneData extends ScopeOneDataType {
  savedAt: string; // Timestamp when result was saved
  label: string;   // Display label for saved result
}

interface SavedResultsPanelProps {
  savedResults: SavedScopeOneData[];
  onLoadResult: (index: number) => void;
  onDeleteResult: (index: number) => void;
}

const SavedResultsPanel: React.FC<SavedResultsPanelProps> = ({ 
  savedResults, 
  onLoadResult, 
  onDeleteResult 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200"
    >
      <h3 className="font-medium text-lg mb-3">保存された結果</h3>
      {savedResults.length === 0 ? (
        <p className="text-gray-500">保存された結果はありません</p>
      ) : (
        <div className="space-y-2">
          {savedResults.map((result, index) => (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <div>
                <span className="font-medium">{result.label || `結果 ${index + 1}`}</span>
                <span className="text-sm text-gray-500 ml-2">
                  合計: {result.total} {result.unit}
                </span>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onLoadResult(index)}
                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                >
                  読み込み
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onDeleteResult(index)}
                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                >
                  削除
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default SavedResultsPanel;
