
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { ScopeOneDataType } from '@/data/scopeOneData';
import { SavedScopeOneData } from './SavedResultsPanel';

const useSavedResults = (
  scopeOneData: ScopeOneDataType,
  setScopeOneData: React.Dispatch<React.SetStateAction<ScopeOneDataType>>
) => {
  const { toast } = useToast();
  const [savedResults, setSavedResults] = useState<SavedScopeOneData[]>([]);
  const [showSavedResults, setShowSavedResults] = useState(false);
  
  // Load saved results from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('scopeOneSavedResults');
    if (savedData) {
      try {
        setSavedResults(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to parse saved results', e);
      }
    }
  }, []);

  const saveResult = () => {
    // Add current date and label to the saved result
    const resultToSave: SavedScopeOneData = {
      ...scopeOneData,
      savedAt: new Date().toISOString(),
      label: `保存 - ${new Date().toLocaleDateString('ja-JP')}`
    };
    
    const updatedResults = [...savedResults, resultToSave];
    setSavedResults(updatedResults);
    
    // Save to localStorage
    localStorage.setItem('scopeOneSavedResults', JSON.stringify(updatedResults));
    
    toast({
      title: "結果を保存しました",
      description: "Scope 1排出量の分析結果が保存されました。",
      duration: 3000,
    });
  };

  const loadSavedResult = (index: number) => {
    // Ensure we only set ScopeOneDataType fields to scopeOneData
    const { savedAt, label, ...scopeOneDataFields } = savedResults[index];
    setScopeOneData(scopeOneDataFields);
    setShowSavedResults(false);
    
    toast({
      title: "保存した結果を読み込みました",
      description: "過去に保存したScope 1分析結果が読み込まれました。",
      duration: 3000,
    });
  };

  const deleteSavedResult = (index: number) => {
    const updatedResults = [...savedResults];
    updatedResults.splice(index, 1);
    setSavedResults(updatedResults);
    
    // Update localStorage
    localStorage.setItem('scopeOneSavedResults', JSON.stringify(updatedResults));
    
    toast({
      title: "保存結果を削除しました",
      description: "選択した保存結果が削除されました。",
      duration: 3000,
    });
  };

  return {
    savedResults,
    showSavedResults,
    setShowSavedResults,
    saveResult,
    loadSavedResult,
    deleteSavedResult
  };
};

export default useSavedResults;
