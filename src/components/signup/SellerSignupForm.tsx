import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from 'sonner';
import SellerBusinessInfoSection from './SellerBusinessInfoSection';
import SellerBankDetailsSection from './SellerBankDetailsSection';
import SellerProductCategoriesSection from './SellerProductCategoriesSection';
import SellerContactInfoSection from './SellerContactInfoSection';
import SellerDocumentUploadSection from './SellerDocumentUploadSection';

// Define the form schema with validation
export const sellerFormSchema = z.object({
    businessName: z.string().min(2, { message: 'Business name is required' }),
    ownerName: z.string().min(2, { message: 'Owner name is required' }),
    gstin: z
        .string()
        .length(15, { message: 'GSTIN must be exactly 15 characters' })
        .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, {
            message: 'Invalid GSTIN format',
        }),
    turnover: z
        .string()
        .min(1, { message: 'Turnover is required' })
        .refine((val) => {
            const num = parseFloat(val);
            return num >= 2 && num <= 50;
        }, { message: 'Turnover must be between ₹2 Cr and ₹50 Cr' }),
    bankName: z.string().min(2, { message: 'Bank name is required' }),
    accountNumber: z
        .string()
        .min(9, { message: 'Account number must be at least 9 digits' })
        .regex(/^[0-9]+$/, { message: 'Account number must contain only digits' }),
    ifscCode: z
        .string()
        .length(11, { message: 'IFSC code must be exactly 11 characters' })
        .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, { message: 'Invalid IFSC code format' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    phone: z
        .string()
        .min(10, { message: 'Phone number must be at least 10 digits' })
        .regex(/^[0-9]+$/, { message: 'Phone number must contain only digits' }),
    address: z.string().min(5, { message: 'Address is required' }),
    panNumber: z
        .string()
        .length(10, { message: 'PAN must be exactly 10 characters' })
        .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { message: 'Invalid PAN format' }),
    categories: z.record(z.boolean()).refine((categories) => {
        return Object.values(categories).some(value => value === true);
    }, {
        message: "You must select at least one product category",
    }),
});

export type SellerFormValues = z.infer<typeof sellerFormSchema>;

export const productCategories = [
    { id: 'electronics', label: 'Electronics' },
    { id: 'fmcg', label: 'FMCG' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'homeAppliances', label: 'Home Appliances' },
    { id: 'furniture', label: 'Furniture' },
    { id: 'groceries', label: 'Groceries' },
];

const SellerSignUpForm = () => {
    // Initialize the form
    const form = useForm<SellerFormValues>({
        resolver: zodResolver(sellerFormSchema),
        defaultValues: {
            businessName: '',
            ownerName: '',
            gstin: '',
            turnover: '',
            bankName: '',
            accountNumber: '',
            ifscCode: '',
            email: '',
            phone: '',
            address: '',
            panNumber: '',
            categories: {
                electronics: false,
                fmcg: false,
                fashion: false,
                homeAppliances: false,
                furniture: false,
                groceries: false,
            },
        },
    });

    // Handle form submission
    const onSubmit = (data: SellerFormValues) => {
        console.log('Seller form submitted:', data);
        toast.success('Registration submitted successfully!');
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <SellerBusinessInfoSection control={form.control} />
                <SellerBankDetailsSection control={form.control} />
                <SellerProductCategoriesSection
                    control={form.control}
                    errors={form.formState.errors}
                    productCategories={productCategories}
                />
                <SellerContactInfoSection control={form.control} />
                <SellerDocumentUploadSection />

                <div className="flex justify-center mt-8">
                    <Button
                        type="submit"
                        className="bg-bpower-blue hover:bg-bpower-green  duration-500 transition-all ease-in-out text-white px-8"
                    >
                        Register as Seller
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default SellerSignUpForm;