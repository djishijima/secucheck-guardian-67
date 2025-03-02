
import React from 'react';
import { Button } from "@/components/ui/button";
import { Save } from 'lucide-react';

interface SavedResultsControlsProps {
  showSavedResults: boolean;
  canSaveCurrentResult: boolean;
  onToggleShowResults: () => void;
  onSaveResult: () => void;
}

const SavedResultsControls: React.FC<SavedResultsControlsProps> = ({
  showSavedResults,
  canSaveCurrentResult,
  onToggleShowResults,
  onSaveResult
}) => {
  return (
    <div className="flex justify-end mb-4 gap-2">
      <Button 
        variant="outline" 
        className="flex items-center gap-1 text-blue-600 border-blue-200 hover:bg-blue-50"
        onClick={onToggleShowResults}
      >
        <Save className="h-4 w-4" /> {showSavedResults ? '保存結果を隠す' : '保存結果を表示'}
      </Button>
      {canSaveCurrentResult && (
        <Button 
          variant="outline" 
          className="flex items-center gap-1 text-green-600 border-green-200 hover:bg-green-50"
          onClick={onSaveResult}
        >
          <Save className="h-4 w-4" /> 現在の結果を保存
        </Button>
      )}
    </div>
  );
};

export default SavedResultsControls;
