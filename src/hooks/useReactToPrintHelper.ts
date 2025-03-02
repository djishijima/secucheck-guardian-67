
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface UseReactToPrintHelperOptions {
  documentTitle?: string;
  onAfterPrint?: () => void;
  successMessage?: string;
}

// Helper to handle react-to-print with proper TypeScript
export const useReactToPrintHelper = (options: UseReactToPrintHelperOptions = {}) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const { 
    documentTitle = '診断結果', 
    onAfterPrint,
    successMessage = '印刷が完了しました'
  } = options;
  
  const handlePrint = useReactToPrint({
    documentTitle,
    contentRef: componentRef,
    onAfterPrint: () => {
      toast({
        title: "印刷が完了しました",
        description: successMessage,
      });
      
      if (onAfterPrint) {
        onAfterPrint();
      }
    },
  });
  
  // This function can be directly used as onClick handler
  const printDocument = () => {
    handlePrint();
  };
  
  // Function for PDF download via print dialog
  const downloadPdf = () => {
    handlePrint();
    toast({
      title: "ダウンロードのヒント",
      description: "印刷ダイアログでPDFとして保存を選択してください。",
    });
  };
  
  return { componentRef, printDocument, downloadPdf };
};
