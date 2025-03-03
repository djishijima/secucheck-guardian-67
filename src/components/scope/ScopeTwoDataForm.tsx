
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from 'framer-motion';
import { ScopeTwoDataType } from '@/data/scopeTwoData';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ScopeTwoDataFormProps {
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
}

const ScopeTwoDataForm: React.FC<ScopeTwoDataFormProps> = ({
  formData,
  onFormSubmit,
  onInputChange,
  onMonthlyDataChange,
  onYearlyTrendDataChange,
  onSelectChange,
  onCancel,
  scopeTwoData
}) => {
  return (
    <motion.div
      className="mb-8 p-6 bg-white rounded-xl border border-purple-200 shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-semibold text-purple-800 mb-4">自社データの入力</h3>
      <form onSubmit={onFormSubmit} className="space-y-4">
        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="categories">カテゴリー別排出量</TabsTrigger>
            <TabsTrigger value="monthly">月次排出量</TabsTrigger>
            <TabsTrigger value="yearly">年次排出量推移</TabsTrigger>
          </TabsList>
          
          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="electricity" className="text-gray-700">電力（tCO2e）</Label>
                  <Input
                    id="electricity"
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.electricity}
                    onChange={(e) => onInputChange('electricity', e.target.value)}
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>
                <div>
                  <Label htmlFor="heat" className="text-gray-700">熱供給（tCO2e）</Label>
                  <Input
                    id="heat"
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.heat}
                    onChange={(e) => onInputChange('heat', e.target.value)}
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="steam" className="text-gray-700">蒸気（tCO2e）</Label>
                  <Input
                    id="steam"
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.steam}
                    onChange={(e) => onInputChange('steam', e.target.value)}
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>
                <div>
                  <Label htmlFor="targetYear" className="text-gray-700">削減目標年度</Label>
                  <select
                    id="targetYear"
                    value={formData.targetYear}
                    onChange={(e) => onSelectChange(e.target.value)}
                    className="w-full rounded-md border border-purple-200 bg-white px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                  >
                    {scopeTwoData.reductionTargets.map((target) => (
                      <option key={target.year} value={target.year}>
                        {target.year}
                      </option>
                    ))}
                  </select>
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
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="yearly" className="space-y-4">
            <p className="text-sm text-gray-600 mb-2">年次排出量推移データを入力してください</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {formData.yearlyTrendData.map((item, index) => (
                <div key={index} className="space-y-1">
                  <Label htmlFor={`year-${index}`} className="text-gray-700 text-sm font-medium">
                    {item.year}
                  </Label>
                  <Input
                    id={`year-${index}`}
                    type="number"
                    step="0.1"
                    min="0"
                    value={item.value}
                    onChange={(e) => onYearlyTrendDataChange(index, e.target.value)}
                    className="border-purple-200 focus-visible:ring-purple-500"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>キャンセル</Button>
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">データを更新</Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ScopeTwoDataForm;
