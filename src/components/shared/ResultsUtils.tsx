
import { useReactToPrint } from 'react-to-print';
import { useToast } from '@/components/ui/use-toast';

// スコアに基づく評価を取得
export const getScoreEvaluation = (score: number) => {
  if (score >= 80) return { text: "先進的", color: "text-green-600" };
  if (score >= 60) return { text: "発展的", color: "text-blue-600" };
  if (score >= 40) return { text: "基本的", color: "text-yellow-600" };
  return { text: "初期的", color: "text-red-600" };
};

// スコアに基づくプログレスバーの色を取得
export const getProgressColor = (score: number) => {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-blue-500";
  if (score >= 40) return "bg-yellow-500";
  return "bg-red-500";
};

// 印刷機能のフック
export const usePrintHandler = (documentTitle: string, contentRef: React.RefObject<HTMLDivElement>) => {
  const { toast } = useToast();
  
  const handlePrint = useReactToPrint({
    documentTitle,
    contentRef,
    onAfterPrint: () => {
      toast({
        title: "印刷が完了しました",
        description: "診断結果の印刷が完了しました。",
      });
    },
  });
  
  const handleDownload = () => {
    if (handlePrint) {
      handlePrint();
      toast({
        title: "ダウンロードのヒント",
        description: "印刷ダイアログでPDFとして保存を選択してください。",
      });
    }
  };
  
  return { handlePrint, handleDownload };
};

// 結果保存機能
export const saveResultsToLocalStorage = (
  key: string, 
  resultsToSave: any, 
  toast: ReturnType<typeof useToast>['toast']
) => {
  try {
    // 既存の保存結果を取得
    const savedResults = localStorage.getItem(key);
    let resultsArray = savedResults ? JSON.parse(savedResults) : [];
    
    // 新しい結果を追加
    resultsArray = [resultsToSave, ...resultsArray];
    
    // 最大10件まで保存
    if (resultsArray.length > 10) {
      resultsArray = resultsArray.slice(0, 10);
    }
    
    localStorage.setItem(key, JSON.stringify(resultsArray));
    
    toast({
      title: "診断結果を保存しました",
      description: "結果はブラウザに保存され、次回訪問時に閲覧できます。",
    });
  } catch (error) {
    toast({
      title: "保存に失敗しました",
      description: "診断結果を保存できませんでした。",
      variant: "destructive"
    });
  }
};
