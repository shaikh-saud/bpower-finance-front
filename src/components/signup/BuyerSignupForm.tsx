
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

// Define the form schema with validation
const buyerFormSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    businessName: z.string().min(2, { message: 'Business name is required' }),
    gstin: z
        .string()
        .length(15, { message: 'GSTIN must be exactly 15 characters' })
        .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, {
            message: 'Invalid GSTIN format',
        }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    phone: z
        .string()
        .min(10, { message: 'Phone number must be at least 10 digits' })
        .regex(/^[0-9]+$/, { message: 'Phone number must contain only digits' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type BuyerFormValues = z.infer<typeof buyerFormSchema>;

const BuyerSignUpForm = () => {
    const { signUp } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);

    // Initialize the form
    const form = useForm<BuyerFormValues>({
        resolver: zodResolver(buyerFormSchema),
        defaultValues: {
            name: '',
            businessName: '',
            gstin: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
        },
    });

    // Handle form submission
    const onSubmit = async (data: BuyerFormValues) => {
        setIsLoading(true);
        try {
            await signUp(data.email, data.password, data.name, 'buyer');
            navigate('/');
        } catch (error) {
            console.error('Buyer signup error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
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
                        control={form.control}
                        name="gstin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>GSTIN (Mandatory)</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., 22AAAAA0000A1Z5" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="email@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="10-digit phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Create a password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Confirm your password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-center mt-8">
                    <Button
                        type="submit"
                        className="bg-bpower-blue hover:bg-bpower-green duration-500 transition-all ease-in-out text-white px-8"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating Account...' : 'Register as Buyer'}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default BuyerSignUpForm;
