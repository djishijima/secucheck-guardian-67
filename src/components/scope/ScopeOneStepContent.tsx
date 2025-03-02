
import React from 'react';
import { ScopeOneDataType } from '@/data/scopeOneData';
import ScopeOneDataForm from './ScopeOneDataForm';
import ScopeOneOverviewTab from './ScopeOneOverviewTab';
import ScopeOneDetailsTab from './ScopeOneDetailsTab';
import ScopeOneReductionTab from './ScopeOneReductionTab';

interface ScopeOneStepContentProps {
  activeStepId: string;
  formData: {
    companyVehicles: number;
    stationaryEquipment: number;
    hvacEquipment: number;
    other: number;
    targetYear: string;
  };
  onFormSubmit: (e: React.FormEvent) => void;
  onInputChange: (field: string, value: string) => void;
  onSelectChange: (value: string) => void;
  onCancel: () => void;
  scopeOneData: ScopeOneDataType;
  onDownloadReport: () => void;
}

const ScopeOneStepContent: React.FC<ScopeOneStepContentProps> = ({
  activeStepId,
  formData,
  onFormSubmit,
  onInputChange,
  onSelectChange,
  onCancel,
  scopeOneData,
  onDownloadReport
}) => {
  // Render the appropriate content based on the active step ID
  switch (activeStepId) {
    case "input":
      return (
        <ScopeOneDataForm 
          formData={formData}
          onFormSubmit={onFormSubmit}
          onInputChange={onInputChange}
          onSelectChange={onSelectChange}
          onCancel={onCancel}
          scopeOneData={scopeOneData}
        />
      );
    case "overview":
      return (
        <ScopeOneOverviewTab 
          scopeOneData={scopeOneData} 
          onDownloadReport={onDownloadReport} 
        />
      );
    case "details":
      return (
        <ScopeOneDetailsTab scopeOneData={scopeOneData} />
      );
    case "reduction":
      return (
        <ScopeOneReductionTab scopeOneData={scopeOneData} />
      );
    default:
      return null;
  }
};

export default ScopeOneStepContent;
