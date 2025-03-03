
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface DataPoint {
  label: string;
  value: number;
}

interface GraphDataInputFormProps {
  onSubmit: (data: {
    title: string;
    description: string;
    dataPoints: DataPoint[];
  }) => void;
  initialData?: {
    title: string;
    description: string;
    dataPoints: DataPoint[];
  };
}

const GraphDataInputForm: React.FC<GraphDataInputFormProps> = ({
  onSubmit,
  initialData = {
    title: '',
    description: '',
    dataPoints: [
      { label: '2020年', value: 0 },
      { label: '2021年', value: 0 },
      { label: '2022年', value: 0 },
      { label: '2023年', value: 0 },
    ]
  }
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialData);
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, title: e.target.value }));
  };
  
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, description: e.target.value }));
  };
  
  const handleDataPointChange = (index: number, field: 'label' | 'value', value: string) => {
    setFormData(prev => {
      const newDataPoints = [...prev.dataPoints];
      if (field === 'label') {
        newDataPoints[index] = { ...newDataPoints[index], label: value };
      } else {
        newDataPoints[index] = { 
          ...newDataPoints[index], 
          value: parseFloat(value) || 0 
        };
      }
      return { ...prev, dataPoints: newDataPoints };
    });
  };
  
  const handleAddDataPoint = () => {
    setFormData(prev => ({
      ...prev,
      dataPoints: [...prev.dataPoints, { label: '', value: 0 }]
    }));
  };
  
  const handleRemoveDataPoint = (index: number) => {
    if (formData.dataPoints.length <= 2) {
      toast({
        title: "削除できません",
        description: "グラフには最低2つのデータポイントが必要です",
        variant: "destructive"
      });
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      dataPoints: prev.dataPoints.filter((_, i) => i !== index)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast({
        title: "入力エラー",
        description: "グラフタイトルを入力してください",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.dataPoints.some(dp => !dp.label.trim())) {
      toast({
        title: "入力エラー",
        description: "すべてのラベルを入力してください",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(formData);
    
    toast({
      title: "データ保存完了",
      description: "グラフデータが正常に保存されました",
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-green-200 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 border-b border-green-100">
          <CardTitle className="text-green-800">グラフデータ入力</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="graphTitle" className="text-gray-700 font-medium">
                  グラフタイトル
                </Label>
                <Input
                  id="graphTitle"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="例: 年間CO2排出量の推移"
                  className="border-green-200 focus-visible:ring-green-500 mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="graphDescription" className="text-gray-700 font-medium">
                  グラフの説明
                </Label>
                <Textarea
                  id="graphDescription"
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  placeholder="例: 2020年から2023年までの当社のCO2排出量の推移を示します"
                  className="border-green-200 focus-visible:ring-green-500 mt-1 min-h-[80px]"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-gray-700 font-medium">データポイント</Label>
                <Button 
                  type="button" 
                  onClick={handleAddDataPoint}
                  variant="outline" 
                  size="sm"
                  className="text-green-600 border-green-200 hover:bg-green-50"
                >
                  ＋ データポイント追加
                </Button>
              </div>
              
              <div className="space-y-3">
                {formData.dataPoints.map((dataPoint, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="flex-1">
                      <Label htmlFor={`label-${index}`} className="text-sm text-gray-600">
                        ラベル
                      </Label>
                      <Input
                        id={`label-${index}`}
                        value={dataPoint.label}
                        onChange={(e) => handleDataPointChange(index, 'label', e.target.value)}
                        placeholder="例: 2023年"
                        className="border-green-200 focus-visible:ring-green-500"
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={`value-${index}`} className="text-sm text-gray-600">
                        値
                      </Label>
                      <Input
                        id={`value-${index}`}
                        type="number"
                        step="0.1"
                        min="0"
                        value={dataPoint.value}
                        onChange={(e) => handleDataPointChange(index, 'value', e.target.value)}
                        placeholder="例: 120.5"
                        className="border-green-200 focus-visible:ring-green-500"
                      />
                    </div>
                    <div className="pt-6">
                      <Button
                        type="button"
                        onClick={() => handleRemoveDataPoint(index)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        削除
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end gap-4 pt-4">
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
              >
                グラフデータを保存
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GraphDataInputForm;
