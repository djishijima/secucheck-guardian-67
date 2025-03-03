
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from 'framer-motion';
import { ScopeOneDataType } from '@/data/scopeOneData';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface ScopeOneDataFormProps {
  formData: {
    companyVehicles: number;
    stationaryEquipment: number;
    hvacEquipment: number;
    other: number;
    targetYear: string;
    monthlyData: {
      month: string;
      value: number;
    }[];
  };
  onFormSubmit: (e: React.FormEvent) => void;
  onInputChange: (field: string, value: string) => void;
  onMonthlyDataChange: (index: number, value: string) => void;
  onSelectChange: (value: string) => void;
  onCancel: () => void;
  scopeOneData: ScopeOneDataType;
}

const ScopeOneDataForm: React.FC<ScopeOneDataFormProps> = ({
  formData,
  onFormSubmit,
  onInputChange,
  onMonthlyDataChange,
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
      <Card className="border-blue-200 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
          <CardTitle className="text-blue-800">自社データの入力</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={onFormSubmit} className="space-y-6">
            <Tabs defaultValue="categories" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="categories">カテゴリー別排出量</TabsTrigger>
                <TabsTrigger value="monthly">月次排出量</TabsTrigger>
              </TabsList>
              
              <TabsContent value="categories" className="space-y-6">
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
                        className="border-blue-200 focus-visible:ring-blue-500 mt-1"
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
                        className="border-blue-200 focus-visible:ring-blue-500 mt-1"
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
                        className="border-blue-200 focus-visible:ring-blue-500 mt-1"
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
                        className="border-blue-200 focus-visible:ring-blue-500 mt-1"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="monthly" className="space-y-4">
                <p className="text-sm text-gray-600 mb-2">2022年度の月次排出量データを入力してください</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {formData.monthlyData.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <Label htmlFor={`month-${index}`} className="text-gray-700 text-sm font-medium">
                        {item.month}
                      </Label>
                      <Input
                        id={`month-${index}`}
                        type="number"
                        step="0.1"
                        min="0"
                        value={item.value}
                        onChange={(e) => onMonthlyDataChange(index, e.target.value)}
                        className="border-blue-200 focus-visible:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <Separator className="my-4" />

            <div className="pt-2">
              <Label htmlFor="targetYear" className="text-gray-700 font-medium">削減目標年度</Label>
              <Select defaultValue={formData.targetYear} onValueChange={onSelectChange}>
                <SelectTrigger className="w-full mt-1 border-blue-200">
                  <SelectValue placeholder="目標年度を選択" />
                </SelectTrigger>
                <SelectContent>
                  {scopeOneData.reductionTargets.map((target) => (
                    <SelectItem key={target.year} value={target.year}>
                      {target.year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="border-blue-200 text-blue-800"
              >
                キャンセル
              </Button>
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
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
