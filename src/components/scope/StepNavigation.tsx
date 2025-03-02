
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileInput, PieChart, BarChart3, LineChart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Step {
  id: string;
  title: string;
  description: string;
}

interface StepNavigationProps {
  steps: Step[];
  activeStep: number;
  setActiveStep: (index: number) => void;
  goToPreviousStep: () => void;
  goToNextStep: () => void;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  steps,
  activeStep,
  setActiveStep,
  goToPreviousStep,
  goToNextStep
}) => {
  // Helper function to get the appropriate icon for each step
  const getStepIcon = (stepId: string) => {
    switch (stepId) {
      case 'input':
        return <FileInput className="h-4 w-4" />;
      case 'overview':
        return <PieChart className="h-4 w-4" />;
      case 'details':
        return <BarChart3 className="h-4 w-4" />;
      case 'reduction':
        return <LineChart className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-blue-100">
        <CardContent className="p-6">
          <div className="mb-2 flex justify-between text-sm text-gray-500">
            <span>ステップ {activeStep + 1}/{steps.length}</span>
            <span>{steps[activeStep].title}</span>
          </div>
          <Progress value={((activeStep + 1) / steps.length) * 100} className="h-2 bg-gray-100" />
          
          {/* ステップナビゲーション */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={`text-left p-3 rounded-lg transition-all ${
                  activeStep === index 
                    ? 'bg-blue-50 border border-blue-200' 
                    : index < activeStep 
                      ? 'bg-gray-50 border border-gray-200'
                      : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    activeStep === index 
                      ? 'bg-blue-600 text-white' 
                      : index < activeStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium flex items-center gap-1">
                      {getStepIcon(step.id)}
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ナビゲーションボタン - ボタンラベルを更新 */}
      <div className="flex justify-between mt-8 pt-4 border-t border-blue-100">
        <Button 
          onClick={goToPreviousStep}
          variant="outline"
          disabled={activeStep === 0}
          className="gap-2 border-blue-200 text-blue-800 disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" /> 前のステップ
        </Button>
        
        <Button 
          onClick={goToNextStep}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 gap-2 disabled:opacity-50"
          disabled={activeStep === steps.length - 1}
        >
          次のステップ <ArrowLeft className="h-4 w-4 rotate-180" />
        </Button>
      </div>
    </div>
  );
};

export default StepNavigation;
