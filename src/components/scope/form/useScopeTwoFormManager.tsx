
import { useState } from 'react';
import { ScopeTwoDataType } from '@/data/scopeTwoData';

// Define form data interface
interface ScopeTwoFormData {
  electricity: number;
  heat: number;
  steam: number;
  targetYear: string;
  monthlyData: {
    month: string;
    value: number;
  }[];
}

const useScopeTwoFormManager = (
  scopeTwoData: ScopeTwoDataType,
  setScopeTwoData: React.Dispatch<React.SetStateAction<ScopeTwoDataType>>,
  setActiveStep: (step: number) => void,
  toast: any
) => {
  // Initialize form data from the default data
  const [formData, setFormData] = useState<ScopeTwoFormData>({
    electricity: scopeTwoData.categories[0].value,
    heat: scopeTwoData.categories[1].value,
    steam: scopeTwoData.categories[2].value,
    targetYear: '2023年度',
    monthlyData: scopeTwoData.monthlyTrend.map(item => ({
      month: item.month,
      value: item.value
    }))
  });

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate new total
    const total = Object.values(formData)
      .filter((value): value is number => typeof value === 'number')
      .reduce((sum, value) => sum + value, 0);

    // Calculate new percentages
    const categories = [
      {
        name: '電力',
        value: formData.electricity,
        percentage: parseFloat(((formData.electricity / total) * 100).toFixed(1)),
        color: 'bg-purple-500'
      },
      {
        name: '熱供給',
        value: formData.heat,
        percentage: parseFloat(((formData.heat / total) * 100).toFixed(1)),
        color: 'bg-pink-500'
      },
      {
        name: '蒸気',
        value: formData.steam,
        percentage: parseFloat(((formData.steam / total) * 100).toFixed(1)),
        color: 'bg-red-500'
      }
    ];

    // Update the data
    setScopeTwoData(prev => ({
      ...prev,
      total: Math.round(total * 10) / 10, // Round to 1 decimal place
      categories,
      // Use the monthly data from the form
      monthlyTrend: formData.monthlyData.map(item => ({
        month: item.month,
        value: item.value
      })),
      // Update the current year value in yearOverYear
      yearOverYear: prev.yearOverYear.map(item => 
        item.year === '2022年度' ? { ...item, value: Math.round(total * 10) / 10 } : item
      ),
      // Update corresponding target
      reductionTargets: prev.reductionTargets.map(target => 
        target.year === formData.targetYear 
          ? { ...target, target: Math.round(total * 0.9 * 10) / 10 }
          : target
      )
    }));

    toast({
      title: "データ更新",
      description: "Scope 2排出量データが更新されました。",
      duration: 3000,
    });
    
    // データ入力後は概要ページに移動
    setActiveStep(1);
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  // Handle monthly data changes
  const handleMonthlyDataChange = (index: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => {
      const updatedMonthlyData = [...prev.monthlyData];
      updatedMonthlyData[index] = {
        ...updatedMonthlyData[index],
        value: numValue
      };
      return {
        ...prev,
        monthlyData: updatedMonthlyData
      };
    });
  };

  // Handle select changes
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      targetYear: value
    }));
  };

  return {
    formData,
    handleFormSubmit,
    handleInputChange,
    handleMonthlyDataChange,
    handleSelectChange
  };
};

export default useScopeTwoFormManager;
