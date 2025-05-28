import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';

const OrderSummary = ({price}) => {
  return (
    <motion.div 
      className="flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="mr-4 text-sm text-gray-500 flex items-center">
        <CreditCard className="text-gray-400 w-4 h-4 mr-1" />
        <span>Order Amount:</span>
      </div>
      <div className="font-bold text-xl">₹ {price}</div>
    </motion.div>
  );
};

export default OrderSummary;
