
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScopeOneDataType } from '@/data/scopeOneData';
import { motion } from 'framer-motion';

interface ScopeOneDataFormProps {
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
}

const ScopeOneDataForm: React.FC<ScopeOneDataFormProps> = ({
  formData,
  onFormSubmit,
  onInputChange,
  onSelectChange,
  onCancel,
  scopeOneData
}) => {
  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-green-100 shadow-md overflow-hidden">
        <CardHeader className="bg-green-50 border-b border-green-100">
          <CardTitle className="text-green-800">Scope 1排出量データ入力</CardTitle>
          <CardDescription>自社の直接排出データを入力してください</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={onFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyVehicles">社有車 (tCO2e)</Label>
                  <Input 
                    id="companyVehicles" 
                    type="number" 
                    step="0.1"
                    value={formData.companyVehicles.toString()} 
                    onChange={(e) => onInputChange('companyVehicles', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="stationaryEquipment">定置燃焼機器 (tCO2e)</Label>
                  <Input 
                    id="stationaryEquipment" 
                    type="number" 
                    step="0.1"
                    value={formData.stationaryEquipment.toString()} 
                    onChange={(e) => onInputChange('stationaryEquipment', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="hvacEquipment">空調設備 (tCO2e)</Label>
                  <Input 
                    id="hvacEquipment" 
                    type="number" 
                    step="0.1"
                    value={formData.hvacEquipment.toString()} 
                    onChange={(e) => onInputChange('hvacEquipment', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="other">その他 (tCO2e)</Label>
                  <Input 
                    id="other" 
                    type="number" 
                    step="0.1"
                    value={formData.other.toString()} 
                    onChange={(e) => onInputChange('other', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
            <div className="pt-2">
              <Label htmlFor="targetYear">削減目標年度</Label>
              <Select value={formData.targetYear} onValueChange={onSelectChange}>
                <SelectTrigger className="w-full md:w-[200px] mt-1">
                  <SelectValue placeholder="年度を選択" />
                </SelectTrigger>
                <SelectContent>
                  {scopeOneData.reductionTargets.map((target, index) => (
                    <SelectItem key={index} value={target.year}>
                      {target.year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
              >
                キャンセル
              </Button>
              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700"
              >
                データを更新
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScopeOneDataForm;
