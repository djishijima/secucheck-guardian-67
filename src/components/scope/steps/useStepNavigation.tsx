
import { useState } from 'react';

export interface Step {
  id: string;
  title: string;
  description: string;
}

const useStepNavigation = (steps: Step[]) => {
  const [activeStep, setActiveStep] = useState(0);
  
  // ステップを進める
  const goToNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  // ステップを戻る
  const goToPreviousStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // ステップの進捗率を計算する（％）
  const calculateProgress = () => {
    return ((activeStep + 1) / steps.length) * 100;
  };

  return {
    activeStep,
    setActiveStep,
    goToNextStep,
    goToPreviousStep,
    calculateProgress
  };
};

export default useStepNavigation;
