
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { SellerFormValues } from './SellerSignupForm';

interface BusinessInfoSectionProps {
  control: Control<SellerFormValues>;
}

const SellerBusinessInfoSection: React.FC<BusinessInfoSectionProps> = ({ control }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-4">Business Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Business Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="ownerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name of Owner" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="gstin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GSTIN</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 22AAAAA0000A1Z5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="turnover"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Annual Turnover (in Crores ₹)</FormLabel>
              <FormControl>
                <Input type="number" min="2" max="50" placeholder="Between 2 and 50" {...field} />
              </FormControl>
              <FormDescription>Must be between ₹2 Cr and ₹50 Cr</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="panNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PAN Number</FormLabel>
              <FormControl>
                <Input placeholder="e.g., ABCDE1234F" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default SellerBusinessInfoSection;