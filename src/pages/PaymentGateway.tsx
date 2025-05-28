import { useState } from 'react';
import { usePaymentStep, type PaymentMethod } from '@/hooks/use-payment-step';
import PaymentSteps from '@/components/PaymentSteps';
import PaymentMethodsSelector from '@/components/PaymentMethodsSelector';
import CardDetailsForm from '@/components/CardDetailsForm';
import ProcessingPayment from '@/components/ProcessingPayment';
import PaymentSuccess from '@/components/PaymentSuccess';
import PaymentFailure from '@/components/PaymentFailure';
import { Shield, Lock, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Product } from '@/types/product';

export interface CardDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  saveCard: boolean;
}

const PaymentGateway = () => {
  const paymentStepHook = usePaymentStep();
  const location = useLocation();
  const navigate = useNavigate();
  const product = (location.state as { product: Product })?.product;
  const { currentStep } = paymentStepHook;
  // Optional: Redirect if no product passed
  if (!product) {
    navigate('/', { replace: true }); // Go back to home or product page
    return null;
  }

  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'method-selection':
        return <PaymentMethodsSelector paymentStepHook={paymentStepHook} price={product.price} />;
      case 'card-details':
        return <CardDetailsForm price={product.price} paymentStepHook={paymentStepHook} cardDetails={cardDetails} setCardDetails={setCardDetails} />;
      case 'processing':
        return <ProcessingPayment paymentStepHook={paymentStepHook} />;
      case 'success':
        return <PaymentSuccess price={product.price} paymentStepHook={paymentStepHook} cardDetails={cardDetails} />;
      case 'failure':
        return <PaymentFailure paymentStepHook={paymentStepHook} />;
      default:
        return <PaymentMethodsSelector price={product.price} paymentStepHook={paymentStepHook} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* ICICI Bank Logo */}
          <div className="flex items-center space-x-2">
            {/* <div className="w-10 h-10 bg-[hsl(var(--icici-orange))] rounded-md flex items-center justify-center"> */}
              {/* <span className="text-white font-bold text-xl">i</span> */}
              <img src="https://gujrdmvjqtkntkhmgbyb.supabase.co/storage/v1/object/public/test//image-removebg-preview%20(11).png" alt="ICICI Bank" className='h-14' />
            {/* </div> */}
            {/* <div>
              <h1 className="font-bold text-lg text-gray-800">ICICI Bank</h1>
              <p className="text-xs text-gray-500">Secure Payment Gateway</p>
            </div> */}
          </div>

          {/* Security Badge */}
          <div className="flex items-center space-x-1 text-gray-600">
            <Shield className="text-green-500 h-5 w-5" />
            <span className="text-sm hidden sm:inline">256-bit Encrypted</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6 md:py-10">
        <div className="max-w-4xl mx-auto">
          {/* Payment Gateway Container */}
          <motion.div
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Progress Bar */}
            <PaymentSteps currentStep={currentStep} />

            {/* Payment Steps Container */}
            <div className="px-6 py-8 relative overflow-hidden">
              {renderCurrentStep()}
            </div>
          </motion.div>

          {/* Security Badges */}
          <div className="mt-8 text-center">
            <div className="flex justify-center items-center space-x-6 text-gray-500">
              <div className="flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                <span className="text-sm">Secure Checkout</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                <span className="text-sm">Data Protection</span>
              </div>
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                <span className="text-sm">PCI DSS Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-500">© {new Date().getFullYear()} ICICI Bank Ltd. All Rights Reserved.</p>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className={cn("text-sm text-gray-600 hover:text-[hsl(var(--icici-orange))] transition-colors")}>Privacy Policy</a>
              <a href="#" className={cn("text-sm text-gray-600 hover:text-[hsl(var(--icici-orange))] transition-colors")}>Terms of Service</a>
              <a href="#" className={cn("text-sm text-gray-600 hover:text-[hsl(var(--icici-orange))] transition-colors")}>Help & Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PaymentGateway;
