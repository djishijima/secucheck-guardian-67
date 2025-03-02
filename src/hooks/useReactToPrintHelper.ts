
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

// Helper to handle react-to-print with proper TypeScript
export const useReactToPrintHelper = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    documentTitle: '診断結果',
    // Using contentRef instead of content for the correct type
    contentRef: componentRef, 
    onAfterPrint: () => console.log('Print completed successfully'),
  });
  
  // This function can be directly used as onClick handler
  const printDocument = () => {
    handlePrint();
  };
  
  return { componentRef, printDocument };
};
