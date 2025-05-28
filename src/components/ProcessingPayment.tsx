import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Banknote } from 'lucide-react';
import { type UsePaymentStepReturn } from '@/hooks/use-payment-step';

interface ProcessingPaymentProps {
  paymentStepHook: UsePaymentStepReturn;
}

const ProcessingPayment = ({ paymentStepHook }: ProcessingPaymentProps) => {
  const { goToStep } = paymentStepHook;
  const [progress, setProgress] = useState(40);

  useEffect(() => {
    // Simulate processing animation
    const processingInterval = setInterval(() => {
      setProgress(prev => {
        // Increase by random amount between 5-15% for more realistic effect
        const increment = Math.floor(Math.random() * 10) + 5;
        const newProgress = prev + increment;
        
        if (newProgress >= 100) {
          clearInterval(processingInterval);
          
          // 90% chance of success, 10% chance of failure (for demo purposes)
          const isSuccess = Math.random() < 0.9;
          
          setTimeout(() => {
            goToStep(isSuccess ? 'success' : 'failure');
          }, 500);
          
          return 100;
        }
        
        return newProgress;
      });
    }, 300);

    return () => clearInterval(processingInterval);
  }, [goToStep]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="text-center py-12"
    >
      <div className="flex justify-center mb-8">
        <div className="loader"></div>
      </div>
      <motion.h2 
        className="text-xl font-semibold mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Processing Your Payment
      </motion.h2>
      <motion.p 
        className="text-gray-600 max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Please wait while we securely process your transaction with the bank.
      </motion.p>
      
      <motion.div 
        className="max-w-sm mx-auto mt-8 bg-gray-50 rounded-lg p-4 flex items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="w-12 h-12 min-w-[3rem] pulse-dot bg-[hsl(var(--icici-orange))] rounded-full flex items-center justify-center text-white">
          <Banknote className="h-5 w-5" />
        </div>
        <div className="ml-4 text-left">
          <p className="font-medium">Connecting to bank</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <motion.div 
              className="bg-[hsl(var(--icici-orange))] h-2 rounded-full"
              initial={{ width: '40%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-10 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <p>Do not close this window or refresh the page</p>
      </motion.div>
    </motion.div>
  );
};

export default ProcessingPayment;
