import { motion } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type UsePaymentStepReturn } from '@/hooks/use-payment-step';

interface PaymentFailureProps {
  paymentStepHook: UsePaymentStepReturn;
}

const PaymentFailure = ({ paymentStepHook }: PaymentFailureProps) => {
  const { goToStep } = paymentStepHook;

  const tryAgain = () => {
    goToStep('card-details');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="text-center py-10"
    >
      <motion.div 
        className="flex justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white success-checkmark">
          <X className="h-10 w-10" />
        </div>
      </motion.div>
      
      <motion.h2 
        className="text-2xl font-semibold mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        Payment Failed
      </motion.h2>
      
      <motion.p 
        className="text-gray-600 max-w-md mx-auto mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        We couldn't process your payment. Please check your payment details and try again.
      </motion.p>
      
      <motion.div 
        className="max-w-md mx-auto bg-red-50 rounded-lg p-6 border border-red-100 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <div className="flex items-start">
          <AlertTriangle className="text-red-500 h-6 w-6 mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-500">Error Details</h3>
            <p className="text-sm text-gray-700 mt-1">
              Your transaction was declined by the issuing bank. Please try another payment method or contact your bank for more information.
            </p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
      >
        <Button 
          onClick={tryAgain}
          className="bg-[hsl(var(--icici-orange))] hover:bg-[hsl(var(--icici-orange))] text-white font-semibold px-8 py-6 h-auto transition-colors duration-300"
        >
          Try Again
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default PaymentFailure;
