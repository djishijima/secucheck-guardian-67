
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface CompanyInfo {
  name: string;
  industry: string;
  employees: string;
  contact: string;
}

interface EmissionData {
  companyVehicles: number;
  stationaryEquipment: number;
  hvacEquipment: number;
  other: number;
}

interface ScopeOneAssessmentFormProps {
  onSubmit: (companyInfo: CompanyInfo, emissionData: EmissionData) => void;
}

const ScopeOneAssessmentForm: React.FC<ScopeOneAssessmentFormProps> = ({ onSubmit }) => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: '',
    industry: '',
    employees: '',
    contact: '',
  });
  
  const [emissionData, setEmissionData] = useState<EmissionData>({
    companyVehicles: 0,
    stationaryEquipment: 0,
    hvacEquipment: 0,
    other: 0,
  });
  
  const { toast } = useToast();
  
  const handleCompanyInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleEmissionDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value) || 0;
    setEmissionData(prev => ({
      ...prev,
      [name]: numValue
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 基本的なバリデーション
    if (!companyInfo.name) {
      toast({
        title: "入力エラー",
        description: "会社名を入力してください",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(companyInfo, emissionData);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Card className="border-blue-100 hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <CardTitle className="text-blue-800">Scope 1 排出量診断</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-700">
                <ClipboardCheck className="h-5 w-5" />
                基本情報
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">会社名 <span className="text-red-500">*</span></Label>
                  <Input
                    id="name"
                    name="name"
                    value={companyInfo.name}
                    onChange={handleCompanyInfoChange}
                    placeholder="株式会社環境テック"
                    className="border-blue-200 focus-visible:ring-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="industry">業種</Label>
                  <Input
                    id="industry"
                    name="industry"
                    value={companyInfo.industry}
                    onChange={handleCompanyInfoChange}
                    placeholder="製造業"
                    className="border-blue-200 focus-visible:ring-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="employees">従業員規模</Label>
                  <Input
                    id="employees"
                    name="employees"
                    value={companyInfo.employees}
                    onChange={handleCompanyInfoChange}
                    placeholder="100-300名"
                    className="border-blue-200 focus-visible:ring-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact">担当者メール</Label>
                  <Input
                    id="contact"
                    name="contact"
                    value={companyInfo.contact}
                    onChange={handleCompanyInfoChange}
                    placeholder="tanaka@example.com"
                    className="border-blue-200 focus-visible:ring-blue-500"
                    type="email"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-blue-700">
                <ClipboardCheck className="h-5 w-5" />
                Scope 1 排出量データ (tCO2e)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyVehicles">社有車</Label>
                  <Input
                    id="companyVehicles"
                    name="companyVehicles"
                    value={emissionData.companyVehicles}
                    onChange={handleEmissionDataChange}
                    type="number"
                    min="0"
                    step="0.1"
                    className="border-blue-200 focus-visible:ring-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stationaryEquipment">定置燃焼機器</Label>
                  <Input
                    id="stationaryEquipment"
                    name="stationaryEquipment"
                    value={emissionData.stationaryEquipment}
                    onChange={handleEmissionDataChange}
                    type="number"
                    min="0"
                    step="0.1"
                    className="border-blue-200 focus-visible:ring-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hvacEquipment">空調設備</Label>
                  <Input
                    id="hvacEquipment"
                    name="hvacEquipment"
                    value={emissionData.hvacEquipment}
                    onChange={handleEmissionDataChange}
                    type="number"
                    min="0"
                    step="0.1"
                    className="border-blue-200 focus-visible:ring-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="other">その他</Label>
                  <Input
                    id="other"
                    name="other"
                    value={emissionData.other}
                    onChange={handleEmissionDataChange}
                    type="number"
                    min="0"
                    step="0.1"
                    className="border-blue-200 focus-visible:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 gap-2">
                診断を実行 <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScopeOneAssessmentForm;
