
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { ScopeOneDataType, defaultScopeOneData } from '@/data/scopeOneData';

interface FormData {
  companyVehicles: number;
  stationaryEquipment: number;
  hvacEquipment: number;
  other: number;
  targetYear: string;
}

const useFormManager = (
  scopeOneData: ScopeOneDataType, 
  setScopeOneData: React.Dispatch<React.SetStateAction<ScopeOneDataType>>,
  setActiveStep: (step: number) => void
) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    companyVehicles: defaultScopeOneData.categories[0].value,
    stationaryEquipment: defaultScopeOneData.categories[1].value,
    hvacEquipment: defaultScopeOneData.categories[2].value,
    other: defaultScopeOneData.categories[3].value,
    targetYear: '2023年度'
  });
  
  const [showForm, setShowForm] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate new total
    const total = formData.companyVehicles + 
                 formData.stationaryEquipment + 
                 formData.hvacEquipment + 
                 formData.other;

    // Calculate new percentages
    const categories = [
      {
        name: '社有車',
        value: formData.companyVehicles,
        percentage: parseFloat(((formData.companyVehicles / total) * 100).toFixed(1)),
        color: 'bg-purple-500'
      },
      {
        name: '定置燃焼機器',
        value: formData.stationaryEquipment,
        percentage: parseFloat(((formData.stationaryEquipment / total) * 100).toFixed(1)),
        color: 'bg-indigo-500'
      },
      {
        name: '空調設備',
        value: formData.hvacEquipment,
        percentage: parseFloat(((formData.hvacEquipment / total) * 100).toFixed(1)),
        color: 'bg-sky-500'
      },
      {
        name: 'その他',
        value: formData.other,
        percentage: parseFloat(((formData.other / total) * 100).toFixed(1)),
        color: 'bg-teal-500'
      }
    ];

    // 月次データも更新（データ入力に応じて調整）
    const scaleFactor = total / scopeOneData.total;
    const updatedMonthlyTrend = scopeOneData.monthlyTrend.map(item => ({
      ...item,
      value: parseFloat((item.value * scaleFactor).toFixed(1))
    }));

    // Update the data
    setScopeOneData(prev => ({
      ...prev,
      total,
      categories,
      monthlyTrend: updatedMonthlyTrend,
      yearOverYear: prev.yearOverYear.map(item => 
        item.year === '2022年度' ? { ...item, value: total } : item
      ),
      reductionTargets: prev.reductionTargets.map(target => 
        target.year === formData.targetYear 
          ? { ...target, target: Math.round(total * 0.9) }
          : target
      )
    }));

    toast({
      title: "データが更新されました",
      description: "入力したデータでScope 1排出量が計算されました。次のステップに進んで結果を確認してください。",
      duration: 5000,
    });

    // After submitting form, move to overview tab automatically
    setShowForm(false);
    setActiveStep(1); // Set to the second step (overview) after data entry
  };

  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      targetYear: value
    }));
  };

  return {
    formData,
    showForm,
    setShowForm,
    handleFormSubmit,
    handleInputChange,
    handleSelectChange
  };
};

export default useFormManager;
