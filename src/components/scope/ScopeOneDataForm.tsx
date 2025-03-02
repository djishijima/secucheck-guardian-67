import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScopeOneDataType } from '@/data/scopeOneData';
import { motion } from 'framer-motion';
import { Save, X, BarChart3, PieChart, TrendingUp } from 'lucide-react';

interface ScopeOneDataFormProps {
  formData: {
    companyVehicles: number;
    stationaryEquipment: number;
    hvacEquipment: number;
    other: number;
    targetYear: string;
    notes?: string;
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
  // Calculate preview total
  const previewTotal = formData.companyVehicles + formData.stationaryEquipment + 
                      formData.hvacEquipment + formData.other;
  
  // Calculate preview percentages
  const getPreviewPercentage = (value: number) => {
    return previewTotal > 0 ? parseFloat(((value / previewTotal) * 100).toFixed(1)) : 0;
  };

  return (
    <motion.div 
      className="mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-green-100 shadow-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-100">
          <CardTitle className="text-green-800 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Scope 1排出量データ入力
          </CardTitle>
          <CardDescription>自社の直接排出データを入���してグラフを更新します</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={onFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="space-y-6 lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="companyVehicles" className="flex items-center justify-between">
                        <span>社有車 (tCO2e)</span>
                        <span className="text-sm text-blue-600 font-medium">{getPreviewPercentage(formData.companyVehicles)}%</span>
                      </Label>
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
                      <Label htmlFor="stationaryEquipment" className="flex items-center justify-between">
                        <span>定置燃焼機器 (tCO2e)</span>
                        <span className="text-sm text-green-600 font-medium">{getPreviewPercentage(formData.stationaryEquipment)}%</span>
                      </Label>
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
                      <Label htmlFor="hvacEquipment" className="flex items-center justify-between">
                        <span>空調設備 (tCO2e)</span>
                        <span className="text-sm text-amber-600 font-medium">{getPreviewPercentage(formData.hvacEquipment)}%</span>
                      </Label>
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
                      <Label htmlFor="other" className="flex items-center justify-between">
                        <span>その他 (tCO2e)</span>
                        <span className="text-sm text-red-600 font-medium">{getPreviewPercentage(formData.other)}%</span>
                      </Label>
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="targetYear">削減目標年度</Label>
                    <Select value={formData.targetYear} onValueChange={onSelectChange}>
                      <SelectTrigger className="w-full mt-1">
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
                  <div>
                    <Label htmlFor="notes">メモ (任意)</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="データについての補足情報があれば入力してください"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="text-sm font-medium text-gray-600 mb-3 flex items-center gap-1">
                  <PieChart className="h-4 w-4" />
                  データプレビュー
                </div>
                
                {/* Simple preview chart */}
                <div className="relative aspect-square mb-4 flex justify-center items-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Vehicles */}
                    <motion.path 
                      d={`M 50 50 L 50 10 A 40 40 0 0 1 ${50 + 40 * Math.cos(Math.PI * 2 * getPreviewPercentage(formData.companyVehicles) / 100)} ${50 - 40 * Math.sin(Math.PI * 2 * getPreviewPercentage(formData.companyVehicles) / 100)} Z`}
                      fill="#3B82F6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    {/* Equipment */}
                    <motion.path 
                      d={`M 50 50 L ${50 + 40 * Math.cos(Math.PI * 2 * getPreviewPercentage(formData.companyVehicles) / 100)} ${50 - 40 * Math.sin(Math.PI * 2 * getPreviewPercentage(formData.companyVehicles) / 100)} A 40 40 0 0 1 ${50 + 40 * Math.cos(Math.PI * 2 * (getPreviewPercentage(formData.companyVehicles) + getPreviewPercentage(formData.stationaryEquipment)) / 100)} ${50 - 40 * Math.sin(Math.PI * 2 * (getPreviewPercentage(formData.companyVehicles) + getPreviewPercentage(formData.stationaryEquipment)) / 100)} Z`}
                      fill="#10B981"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    />
                    
                    {/* HVAC */}
                    <motion.path 
                      d={`M 50 50 L ${50 + 40 * Math.cos(Math.PI * 2 * (getPreviewPercentage(formData.companyVehicles) + getPreviewPercentage(formData.stationaryEquipment)) / 100)} ${50 - 40 * Math.sin(Math.PI * 2 * (getPreviewPercentage(formData.companyVehicles) + getPreviewPercentage(formData.stationaryEquipment)) / 100)} A 40 40 0 0 1 ${50 + 40 * Math.cos(Math.PI * 2 * (getPreviewPercentage(formData.companyVehicles) + getPreviewPercentage(formData.stationaryEquipment) + getPreviewPercentage(formData.hvacEquipment)) / 100)} ${50 - 40 * Math.sin(Math.PI * 2 * (getPreviewPercentage(formData.companyVehicles) + getPreviewPercentage(formData.stationaryEquipment) + getPreviewPercentage(formData.hvacEquipment)) / 100)} Z`}
                      fill="#F59E0B"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                    
                    {/* Other */}
                    <motion.path 
                      d={`M 50 50 L ${50 + 40 * Math.cos(Math.PI * 2 * (getPreviewPercentage(formData.companyVehicles) + getPreviewPercentage(formData.stationaryEquipment) + getPreviewPercentage(formData.hvacEquipment)) / 100)} ${50 - 40 * Math.sin(Math.PI * 2 * (getPreviewPercentage(formData.companyVehicles) + getPreviewPercentage(formData.stationaryEquipment) + getPreviewPercentage(formData.hvacEquipment)) / 100)} A 40 40 0 0 1 50 10 Z`}
                      fill="#EF4444"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                    
                    <circle cx="50" cy="50" r="20" fill="white" />
                    <text x="50" y="54" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#4B5563">
                      {previewTotal.toFixed(1)}
                    </text>
                    <text x="50" y="60" textAnchor="middle" fontSize="4" fill="#6B7280">
                      tCO₂e
                    </text>
                  </svg>
                </div>
                
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-xs">社有車</span>
                    </div>
                    <span className="text-xs font-medium">{formData.companyVehicles.toFixed(1)} tCO₂e</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-xs">定置燃焼機器</span>
                    </div>
                    <span className="text-xs font-medium">{formData.stationaryEquipment.toFixed(1)} tCO₂e</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span className="text-xs">空調設備</span>
                    </div>
                    <span className="text-xs font-medium">{formData.hvacEquipment.toFixed(1)} tCO₂e</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <span className="text-xs">その他</span>
                    </div>
                    <span className="text-xs font-medium">{formData.other.toFixed(1)} tCO₂e</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm p-2 bg-white rounded border border-gray-200">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                    <span className="font-medium">合計</span>
                  </div>
                  <span className="font-bold text-purple-700">{previewTotal.toFixed(1)} tCO₂e</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                キャンセル
              </Button>
              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
              >
                <Save className="h-4 w-4" />
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
