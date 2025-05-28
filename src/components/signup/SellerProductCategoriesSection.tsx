
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Control, FieldErrors } from 'react-hook-form';
import { SellerFormValues } from './SellerSignupForm';

interface ProductCategoriesSectionProps {
  control: Control<SellerFormValues>;
  errors: FieldErrors<SellerFormValues>;
  productCategories: Array<{ id: string; label: string }>;
}

const SellerProductCategoriesSection: React.FC<ProductCategoriesSectionProps> = ({ 
  control, 
  errors, 
  productCategories 
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-4">Product Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {productCategories.map((category) => (
          <FormField
            key={category.id}
            control={control}
            name={`categories.${category.id}`}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  {category.label}
                </FormLabel>
              </FormItem>
            )}
          />
        ))}
      </div>
      {errors.categories && (
        <p className="text-sm font-medium text-destructive mt-2">
          {errors.categories.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default SellerProductCategoriesSection;