
import React from 'react';
import { Printer, DownloadCloud, Save, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InquiryDialog from './InquiryDialog';

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
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-green-800">
        {title}
      </h2>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onSave}
          className="flex items-center gap-1 border-green-200 text-green-600 hover:bg-green-50"
        >
          <Save className="h-4 w-4" />
          <span className="hidden sm:inline">保存</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onPrint}
          className="flex items-center gap-1 border-blue-200 text-blue-600 hover:bg-blue-50"
        >
          <Printer className="h-4 w-4" />
          <span className="hidden sm:inline">印刷</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onDownload}
          className="flex items-center gap-1 border-purple-200 text-purple-600 hover:bg-purple-50"
        >
          <DownloadCloud className="h-4 w-4" />
          <span className="hidden sm:inline">ダウンロード</span>
        </Button>
        <InquiryDialog 
          buttonClassName="flex items-center gap-1 border-blue-200 text-blue-600 hover:bg-blue-50"
          buttonLabel={<span className="hidden sm:inline">お問合せ</span>}
        />
      </div>
    </div>
  );
};

export default ResultsHeader;
