import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type PaymentStep =
  | 'method-selection'
  | 'card-details'
  | 'processing'
  | 'success'
  | 'failure';

export type PaymentMethod =
  | 'credit-card'
  | 'net-banking'
  | 'upi'
  | 'wallet';

interface UsePaymentStepReturn {
  currentStep: PaymentStep;
  selectedMethod: PaymentMethod;
  progress: number;
  transactionId: string;
  goToStep: (step: PaymentStep) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  resetPaymentFlow: () => void;
}

const stepOrder: PaymentStep[] = [
  'method-selection',
  'card-details',
  'processing',
  'success'
];

export const usePaymentStep = (): UsePaymentStepReturn => {
  let navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<PaymentStep>('method-selection');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('credit-card');
  const [progress, setProgress] = useState(40);
  const [transactionId] = useState(`ICICI${Math.floor(Math.random() * 90000000) + 10000000}`);

  const goToStep = (step: PaymentStep) => {
    setCurrentStep(step);
  };

  const goToNextStep = () => {
    const currentIndex = stepOrder.findIndex(step => step === currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = stepOrder.findIndex(step => step === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const setPaymentMethod = (method: PaymentMethod) => {
    setSelectedMethod(method);
  };

  const resetPaymentFlow = () => {
    setCurrentStep('method-selection');
    setProgress(40);
    navigate('/');
  };

  return {
    currentStep,
    selectedMethod,
    progress,
    transactionId,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    setPaymentMethod,
    resetPaymentFlow
  };
};
