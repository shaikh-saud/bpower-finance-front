import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type UsePaymentStepReturn } from '@/hooks/use-payment-step';
import { type CardDetails } from '@/pages/PaymentGateway';
import { formatCurrentDate, displayCardNumber } from '@/lib/utils';

interface PaymentSuccessProps {
  paymentStepHook: UsePaymentStepReturn;
  cardDetails: CardDetails;
  price: number;
}

const PaymentSuccess = ({ paymentStepHook, cardDetails, price }: PaymentSuccessProps) => {
  const { transactionId, resetPaymentFlow } = paymentStepHook;

  // Get last 4 digits of card number
  const getLastFourDigits = () => {
    if (!cardDetails.cardNumber) return '0000';
    const digits = cardDetails.cardNumber.replace(/\s/g, '');
    return digits.slice(-4);
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
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white success-checkmark">
          <Check className="h-10 w-10" />
        </div>
      </motion.div>

      <motion.h2
        className="text-2xl font-semibold mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        Payment Successful!
      </motion.h2>

      <motion.p
        className="text-gray-600 max-w-md mx-auto mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        Your transaction has been completed successfully. A confirmation has been sent to your email.
      </motion.p>

      <motion.div
        className="max-w-md mx-auto bg-gray-50 rounded-lg p-6 border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <div className="flex justify-between mb-4 pb-4 border-b border-gray-200">
          <span className="text-gray-600">Transaction ID</span>
          <span className="font-medium">{transactionId}</span>
        </div>
        <div className="flex justify-between mb-4 pb-4 border-b border-gray-200">
          <span className="text-gray-600">Payment Date</span>
          <span className="font-medium">{formatCurrentDate()}</span>
        </div>
        <div className="flex justify-between mb-4 pb-4 border-b border-gray-200">
          <span className="text-gray-600">Payment Method</span>
          <span className="font-medium">Credit Card (Visa)</span>
        </div>
        <div className="flex justify-between mb-4 pb-4 border-b border-gray-200">
          <span className="text-gray-600">Card Number</span>
          <span className="font-medium">•••• {getLastFourDigits()}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold">
          <span>Amount Paid</span>
          <span>₹ {((price * .03) + price).toFixed(2)}</span>
        </div>
      </motion.div>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
      >
        <Button
          onClick={resetPaymentFlow}
          className="bg-[hsl(var(--icici-orange))] hover:bg-[hsl(var(--icici-orange))] text-white font-semibold px-8 py-6 h-auto transition-colors duration-300"
        >
          Return to Merchant Site
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default PaymentSuccess;
