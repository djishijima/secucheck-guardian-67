
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from 'framer-motion';
import { ScopeOneDataType } from '@/data/scopeOneData';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-purple-200 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
          <CardTitle className="text-purple-800">自社データの入力</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={onFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyVehicles" className="text-gray-700 font-medium">社有車（tCO2e）</Label>
                  <Input
                    id="companyVehicles"
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.companyVehicles}
                    onChange={(e) => onInputChange('companyVehicles', e.target.value)}
                    className="border-purple-200 focus-visible:ring-purple-500 mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="stationaryEquipment" className="text-gray-700 font-medium">定置燃焼機器（tCO2e）</Label>
                  <Input
                    id="stationaryEquipment"
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.stationaryEquipment}
                    onChange={(e) => onInputChange('stationaryEquipment', e.target.value)}
                    className="border-purple-200 focus-visible:ring-purple-500 mt-1"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="hvacEquipment" className="text-gray-700 font-medium">空調設備（tCO2e）</Label>
                  <Input
                    id="hvacEquipment"
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.hvacEquipment}
                    onChange={(e) => onInputChange('hvacEquipment', e.target.value)}
                    className="border-purple-200 focus-visible:ring-purple-500 mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="other" className="text-gray-700 font-medium">その他（tCO2e）</Label>
                  <Input
                    id="other"
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.other}
                    onChange={(e) => onInputChange('other', e.target.value)}
                    className="border-purple-200 focus-visible:ring-purple-500 mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Label htmlFor="targetYear" className="text-gray-700 font-medium">削減目標年度</Label>
              <select
                id="targetYear"
                value={formData.targetYear}
                onChange={(e) => onSelectChange(e.target.value)}
                className="w-full mt-1 rounded-md border border-purple-200 bg-white px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
              >
                {scopeOneData.reductionTargets.map((target) => (
                  <option key={target.year} value={target.year}>
                    {target.year}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="border-purple-200 text-purple-800"
              >
                キャンセル
              </Button>
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
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
