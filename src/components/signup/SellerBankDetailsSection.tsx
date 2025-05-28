
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { SellerFormValues } from './SellerSignupForm';

interface BankDetailsSectionProps {
    control: Control<SellerFormValues>;
}

const SellerBankDetailsSection: React.FC<BankDetailsSectionProps> = ({ control }) => {
    return (
        <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Bank Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={control}
                    name="bankName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bank Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name of your Bank" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="accountNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Account Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Your Bank Account Number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="ifscCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>IFSC Code</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., SBIN0000123" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};

export default SellerBankDetailsSection;