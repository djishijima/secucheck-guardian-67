
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={`text-left p-3 rounded-lg transition-all ${
                  activeStep === index 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    activeStep === index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{step.title}</div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ナビゲーションボタン */}
      <div className="flex justify-between mt-8 pt-4 border-t border-blue-100">
        <Button 
          onClick={goToPreviousStep}
          variant="outline"
          disabled={activeStep === 0}
          className="gap-2 border-blue-200 text-blue-800 disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" /> 前へ
        </Button>
        
        <Button 
          onClick={goToNextStep}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 gap-2 disabled:opacity-50"
          disabled={activeStep === steps.length - 1}
        >
          次へ <ArrowLeft className="h-4 w-4 rotate-180" />
        </Button>
      </div>
    </div>
  );
};

export default StepNavigation;
