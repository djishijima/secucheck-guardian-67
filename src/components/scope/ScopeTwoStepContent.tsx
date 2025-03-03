
import React from 'react';
import { ScopeTwoDataType } from '@/data/scopeTwoData';
import ScopeTwoDataForm from './ScopeTwoDataForm';
import ScopeTwoOverviewTab from './ScopeTwoOverviewTab';
import ScopeTwoDetailsTab from './ScopeTwoDetailsTab';
import ScopeTwoReductionTab from './ScopeTwoReductionTab';

interface ScopeTwoStepContentProps {
  activeStepId: string;
  formData: {
    electricity: number;
    heat: number;
    steam: number;
    targetYear: string;
    monthlyData: {
      month: string;
      value: number;
    }[];
    yearlyTrendData: {
      year: string;
      value: number;
    }[];
  };
  onFormSubmit: (e: React.FormEvent) => void;
  onInputChange: (field: string, value: string) => void;
  onMonthlyDataChange: (index: number, value: string) => void;
  onYearlyTrendDataChange: (index: number, value: string) => void;
  onSelectChange: (value: string) => void;
  onCancel: () => void;
  scopeTwoData: ScopeTwoDataType;
  onDownloadReport: () => void;
}

const ScopeTwoStepContent: React.FC<ScopeTwoStepContentProps> = ({
  activeStepId,
  formData,
  onFormSubmit,
  onInputChange,
  onMonthlyDataChange,
  onYearlyTrendDataChange,
  onSelectChange,
  onCancel,
  scopeTwoData,
  onDownloadReport
}) => {
  // Render the appropriate content based on the active step ID
  switch (activeStepId) {
    case "input":
      return (
        <ScopeTwoDataForm 
          formData={formData}
          onFormSubmit={onFormSubmit}
          onInputChange={onInputChange}
          onMonthlyDataChange={onMonthlyDataChange}
          onYearlyTrendDataChange={onYearlyTrendDataChange}
          onSelectChange={onSelectChange}
          onCancel={onCancel}
          scopeTwoData={scopeTwoData}
        />
      );
    case "overview":
      return (
        <ScopeTwoOverviewTab 
          scopeTwoData={scopeTwoData} 
          onDownloadReport={onDownloadReport}
          onViewDetails={() => {}} // This prop is passed in ScopeTwo.tsx but can be empty here
        />
      );
    case "details":
      return (
        <ScopeTwoDetailsTab scopeTwoData={scopeTwoData} />
      );
    case "reduction":
      return (
        <ScopeTwoReductionTab scopeTwoData={scopeTwoData} />
      );
    default:
      return null;
  }
};

export default ScopeTwoStepContent;
