import { displayCardNumber } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardDisplayProps {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

const CardDisplay = ({ cardNumber, cardHolder, expiryDate, cvv }: CardDisplayProps) => {
  return (
    <motion.div 
      className="relative bg-gradient-to-r from-red-500 to-yellow-600 text-white rounded-xl p-6 mb-6 shadow-lg overflow-hidden"
      initial={{ scale: 0.95, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mt-16 -mr-16"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -mb-8 -ml-8"></div>
      
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="text-xs uppercase tracking-wider opacity-80 mb-1">Card Holder</div>
          <motion.div 
            className="font-medium"
            key={cardHolder}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {cardHolder || 'Your Name'}
          </motion.div>
        </div>
        <div>
          <svg width="48" height="28" viewBox="0 0 48 28">
            <path d="M1.7 13H9v-2H1.7c-.6 0-1.2.5-1.2 1.1 0 .6.6 1 1.2 1z" fill="white"/>
            <path d="M12 5.3c6.9 0 10.8 6.9 10.8 6.9s-3.9 6.9-10.8 6.9S1.2 12.2 1.2 12.2 5.1 5.3 12 5.3M12 4C4.8 4 0 12 0 12s4.8 8 12 8 12-8 12-8-4.8-8-12-8" fill="white"/>
            <path d="M12 9c1.6 0 3 1.3 3 3s-1.4 3-3 3-3-1.3-3-3 1.3-3 3-3m0-1c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4" fill="white"/>
            <path d="M22.5 12.3c0-3.7-3-6.7-6.7-6.7S9 8.6 9 12.3c0 3.7 3 6.7 6.8 6.7 3.7 0 6.7-3 6.7-6.7z" fill="white" transform="translate(24, 0)"/>
            <path d="M9 12.2c0-3.7 3-6.7 6.8-6.7V0C9.5.4 4.3 5.7 4.3 12.2c0 6.5 5.2 11.8 11.5 12.2v-5.5c-3.8 0-6.8-3-6.8-6.7z" fill="white" transform="translate(24, 0)"/>
          </svg>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider opacity-80 mb-1">Card Number</div>
        <motion.div 
          className="font-medium tracking-wider text-lg"
          key={cardNumber}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {displayCardNumber(cardNumber)}
        </motion.div>
      </div>
      
      <div className="flex justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider opacity-80 mb-1">Expiry</div>
          <motion.div 
            className="font-medium"
            key={expiryDate}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {expiryDate || 'MM/YY'}
          </motion.div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider opacity-80 mb-1">CVV</div>
          <motion.div 
            className="font-medium"
            key={cvv}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {'•'.repeat(cvv.length) || '•••'}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CardDisplay;
