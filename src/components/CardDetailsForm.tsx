import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { motion } from 'framer-motion';
import CardDisplay from './CardDisplay';
import OrderSummary from './OrderSummary';
import { type UsePaymentStepReturn } from '@/hooks/use-payment-step';
import { formatCardNumber, formatExpiryDate } from '@/lib/utils';
import { validateCardNumber, validateCardHolder, validateExpiryDate, validateCvv } from '@/lib/validators';
import { type CardDetails } from '@/pages/PaymentGateway';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface CardDetailsFormProps {
  paymentStepHook: UsePaymentStepReturn;
  cardDetails: CardDetails;
  setCardDetails: React.Dispatch<React.SetStateAction<CardDetails>>;
  price: number;
}

// Create a Zod schema for card validation
const cardSchema = z.object({
  cardNumber: z.string()
    .min(19, "Card number must be 16 digits")
    .refine(val => validateCardNumber(val), "Invalid card number"),
  cardHolder: z.string()
    .min(3, "Please enter the cardholder name")
    .refine(val => validateCardHolder(val), "Invalid cardholder name"),
  expiryDate: z.string()
    .min(5, "Invalid expiry date")
    .refine(val => validateExpiryDate(val), "Card has expired or invalid date format"),
  cvv: z.string()
    .min(3, "CVV must be 3 digits")
    .max(3, "CVV must be 3 digits")
    .refine(val => validateCvv(val), "Invalid CVV"),
  saveCard: z.boolean().optional()
});

type CardFormValues = z.infer<typeof cardSchema>;

const CardDetailsForm = ({ paymentStepHook, cardDetails, setCardDetails, price }: CardDetailsFormProps) => {
  const { goToPreviousStep, goToStep } = paymentStepHook;

  const form = useForm<CardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardNumber: cardDetails.cardNumber,
      cardHolder: cardDetails.cardHolder,
      expiryDate: cardDetails.expiryDate,
      cvv: cardDetails.cvv,
      saveCard: cardDetails.saveCard
    }
  });

  const onSubmit = (data: CardFormValues) => {
    // Update cardDetails in parent component
    setCardDetails({
      cardNumber: data.cardNumber,
      cardHolder: data.cardHolder,
      expiryDate: data.expiryDate,
      cvv: data.cvv,
      saveCard: data.saveCard || false
    });

    // Move to processing step
    goToStep('processing');
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatCardNumber(value);
    form.setValue('cardNumber', formattedValue, { shouldValidate: true });
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatExpiryDate(value);
    form.setValue('expiryDate', formattedValue, { shouldValidate: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="step-transition"
    >
      <h2 className="text-2xl font-semibold mb-6">Card Details</h2>
      <p className="text-gray-600 mb-8">Enter your card information securely</p>

      <div className="max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Card Visual Representation */}
            <CardDisplay
              cardNumber={form.watch('cardNumber') || ''}
              cardHolder={form.watch('cardHolder') || ''}
              expiryDate={form.watch('expiryDate') || ''}
              cvv={form.watch('cvv') || ''}
            />

            <div className="space-y-4">
              {/* Card Number Input */}
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          {...field}
                          onChange={handleCardNumberChange}
                          className="w-full px-4 py-6 h-auto"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                          <svg width="24" height="24" viewBox="0 0 24 24" className="text-blue-500">
                            <path d="M1.7 13H9v-2H1.7c-.6 0-1.2.5-1.2 1.1 0 .6.6 1 1.2 1z" fill="currentColor" />
                            <path d="M12 5.3c6.9 0 10.8 6.9 10.8 6.9s-3.9 6.9-10.8 6.9S1.2 12.2 1.2 12.2 5.1 5.3 12 5.3M12 4C4.8 4 0 12 0 12s4.8 8 12 8 12-8 12-8-4.8-8-12-8" fill="currentColor" />
                            <path d="M12 9c1.6 0 3 1.3 3 3s-1.4 3-3 3-3-1.3-3-3 1.3-3 3-3m0-1c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4" fill="currentColor" />
                          </svg>
                          <svg width="24" height="24" viewBox="0 0 24 24" className="text-orange-500">
                            <path d="M22.5 12.3c0-3.7-3-6.7-6.7-6.7S9 8.6 9 12.3c0 3.7 3 6.7 6.8 6.7 3.7 0 6.7-3 6.7-6.7z" fill="currentColor" />
                            <path d="M9 12.2c0-3.7 3-6.7 6.8-6.7V0C9.5.4 4.3 5.7 4.3 12.2c0 6.5 5.2 11.8 11.5 12.2v-5.5c-3.8 0-6.8-3-6.8-6.7z" fill="currentColor" />
                          </svg>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cardholder Name */}
              <FormField
                control={form.control}
                name="cardHolder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Holder Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter cardholder's full name"
                        className="w-full px-4 py-6 h-auto"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Expiry Date and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-4 py-6 h-auto"
                          {...field}
                          onChange={handleExpiryDateChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="123"
                            maxLength={3}
                            className="w-full px-4 py-6 h-auto"
                            {...field}
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-help">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <title>3-digit security code on the back of your card</title>
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                              <path d="M12 17h.01"></path>
                            </svg>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Save Card Option */}
              <FormField
                control={form.control}
                name="saveCard"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Save card for future payments</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              {/* Order Summary */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mt-6">
                <h3 className="font-medium mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product Total</span>
                    <span>₹ {price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes</span>
                    <span>₹ {(price * .03).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t border-gray-200 pt-2 mt-2 text-base">
                    <span>Total Amount</span>
                    <span>₹ {((price * .03) + price).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <Button
                type="button"
                variant="ghost"
                onClick={goToPreviousStep}
                className="text-gray-600 font-medium px-6 py-6 h-auto transition-colors duration-300 hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
                Back
              </Button>
              <Button
                type="submit"
                className="bg-[hsl(var(--icici-orange))] hover:bg-[hsl(var(--icici-orange))] text-white font-semibold px-6 py-6 h-auto transition-colors duration-300"
              >
                Pay ₹ {((price * .03) + price).toFixed(2)}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-5 w-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
};

export default CardDetailsForm;
