
import React from 'react';
import { Printer, DownloadCloud, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultsHeaderProps {
  title: string;
  onSave: () => void;
  onPrint: () => void;
  onDownload: () => void;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({ 
  title, 
  onSave, 
  onPrint, 
  onDownload 
}) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-green-800">
        {title}
      </h2>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onSave}
          className="flex items-center gap-1"
        >
          <Save className="h-4 w-4" />
          <span className="hidden sm:inline">保存</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onPrint}
          className="flex items-center gap-1"
        >
          <Printer className="h-4 w-4" />
          <span className="hidden sm:inline">印刷</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onDownload}
          className="flex items-center gap-1"
        >
          <DownloadCloud className="h-4 w-4" />
          <span className="hidden sm:inline">保存</span>
        </Button>
      </div>
    </div>
  );
};

export default ResultsHeader;
