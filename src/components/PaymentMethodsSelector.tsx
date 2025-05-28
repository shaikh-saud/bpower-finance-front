import { CreditCard, Building, QrCode, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type UsePaymentStepReturn, type PaymentMethod } from '@/hooks/use-payment-step';
import OrderSummary from './OrderSummary';

interface PaymentMethodsProps {
  paymentStepHook: UsePaymentStepReturn;
  price: number;
}

const PaymentMethodsSelector = ({ paymentStepHook, price }: PaymentMethodsProps) => {
  const { selectedMethod, setPaymentMethod, goToNextStep } = paymentStepHook;

  const paymentMethods = [
    {
      id: 'credit-card',
      title: 'Credit / Debit Card',
      description: 'Visa, MasterCard, Rupay, Amex',
      icon: <CreditCard className="h-6 w-6 text-blue-600" />,
      bgColor: 'bg-blue-50'
    },
    {
      id: 'net-banking',
      title: 'Net Banking',
      description: 'All major banks supported',
      icon: <Building className="h-6 w-6 text-green-600" />,
      bgColor: 'bg-green-50'
    },
    {
      id: 'upi',
      title: 'UPI',
      description: 'GooglePay, PhonePe, BHIM',
      icon: <QrCode className="h-6 w-6 text-purple-600" />,
      bgColor: 'bg-purple-50'
    },
    {
      id: 'wallet',
      title: 'Mobile Wallet',
      description: 'Paytm, Amazon Pay, Freecharge',
      icon: <Wallet className="h-6 w-6 text-yellow-600" />,
      bgColor: 'bg-yellow-50'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="step-transition"
    >
      <h2 className="text-2xl font-semibold mb-6">Select Payment Method</h2>
      <p className="text-gray-600 mb-8">Choose your preferred payment method to continue</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={cn(
              "payment-method border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md",
              selectedMethod === method.id && "selected"
            )}
            onClick={() => setPaymentMethod(method.id as PaymentMethod)}
          >
            <div className="flex items-start">
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mr-4", method.bgColor)}>
                {method.icon}
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">{method.title}</h3>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
              <div className="ml-2">
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                  selectedMethod === method.id
                    ? "border-[hsl(var(--icici-orange))]"
                    : "border-gray-300"
                )}>
                  <div className={cn(
                    "w-3 h-3 rounded-full transition-colors",
                    selectedMethod === method.id
                      ? "bg-[hsl(var(--icici-orange))]"
                      : "bg-transparent"
                  )}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-6">
        <OrderSummary price={price} />
        <Button
          onClick={goToNextStep}
          className="w-full md:w-auto bg-[hsl(var(--icici-orange))] hover:bg-[hsl(var(--icici-orange))] text-white font-semibold px-6 py-6 h-auto transition-colors duration-300"
        >
          Continue
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-5 w-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </Button>
      </div>
    </motion.div>
  );
};

export default PaymentMethodsSelector;
