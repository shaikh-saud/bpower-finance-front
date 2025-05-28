import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { type PaymentStep } from '@/hooks/use-payment-step';

interface PaymentStepsProps {
  currentStep: PaymentStep;
}

const PaymentSteps = ({ currentStep }: PaymentStepsProps) => {
  // Calculate progress based on current step
  const getProgress = (): { progress1: number; progress2: number } => {
    switch (currentStep) {
      case 'method-selection':
        return { progress1: 33, progress2: 0 };
      case 'card-details':
        return { progress1: 100, progress2: 33 };
      case 'processing':
      case 'success':
      case 'failure':
        return { progress1: 100, progress2: 100 };
      default:
        return { progress1: 33, progress2: 0 };
    }
  };

  const { progress1, progress2 } = getProgress();

  return (
    <div className="bg-gray-50 px-6 py-4 border-b">
      <div className="flex justify-between items-center">
        <div className={cn(
          "flex items-center space-x-2 font-medium", 
          currentStep === 'method-selection' || currentStep === 'card-details' || currentStep === 'processing' || currentStep === 'success' || currentStep === 'failure' 
            ? "text-[hsl(var(--icici-orange))]" 
            : "text-gray-400"
        )}>
          <span className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors duration-300",
            currentStep === 'method-selection' || currentStep === 'card-details' || currentStep === 'processing' || currentStep === 'success' || currentStep === 'failure'
              ? "bg-[hsl(var(--icici-orange))] text-white" 
              : "bg-gray-200 text-gray-600"
          )}>
            1
          </span>
          <span className="hidden sm:inline">Payment Method</span>
        </div>

        <div className="flex-grow mx-2 sm:mx-4">
          <div className="h-1 bg-gray-200 rounded-full">
            <motion.div 
              className="h-1 bg-[hsl(var(--icici-orange))] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress1}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className={cn(
          "flex items-center space-x-2 font-medium",
          currentStep === 'card-details' || currentStep === 'processing' || currentStep === 'success' || currentStep === 'failure'
            ? "text-[hsl(var(--icici-orange))]" 
            : "text-gray-400"
        )}>
          <span className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors duration-300",
            currentStep === 'card-details' || currentStep === 'processing' || currentStep === 'success' || currentStep === 'failure'
              ? "bg-[hsl(var(--icici-orange))] text-white" 
              : "bg-gray-200 text-gray-600"
          )}>
            2
          </span>
          <span className="hidden sm:inline">Card Details</span>
        </div>

        <div className="flex-grow mx-2 sm:mx-4">
          <div className="h-1 bg-gray-200 rounded-full">
            <motion.div 
              className="h-1 bg-[hsl(var(--icici-orange))] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress2}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className={cn(
          "flex items-center space-x-2 font-medium",
          currentStep === 'processing' || currentStep === 'success' || currentStep === 'failure'
            ? "text-[hsl(var(--icici-orange))]" 
            : "text-gray-400"
        )}>
          <span className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors duration-300",
            currentStep === 'processing' || currentStep === 'success' || currentStep === 'failure'
              ? "bg-[hsl(var(--icici-orange))] text-white" 
              : "bg-gray-200 text-gray-600"
          )}>
            3
          </span>
          <span className="hidden sm:inline">Confirmation</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSteps;
