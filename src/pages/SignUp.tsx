
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SellerSignUpForm from '@/components/signup/SellerSignupForm';
import BuyerSignUpForm from '@/components/signup/BuyerSignupForm';
const SignUp = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 mt-[100px]">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold text-center text-bpower-blue mb-6">
                        Join B-Power Marketplace
                    </h1>
                    <p className="text-gray-600 text-center mb-8">
                        Register as a seller to list your products or as a buyer to purchase with interest-free credit
                    </p>

                    <Tabs defaultValue="buyer" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="buyer">Buyer Registration</TabsTrigger>
                            <TabsTrigger value="seller">Seller Registration</TabsTrigger>
                        </TabsList>

                        <TabsContent value="buyer">
                            <BuyerSignUpForm />
                        </TabsContent>

                        <TabsContent value="seller">
                            <SellerSignUpForm />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default SignUp;