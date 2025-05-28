import { useState } from "react";
import { motion } from "framer-motion";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Phone, Mail, Linkedin, Twitter, Facebook } from "lucide-react";

const formSchema = z.object({
    businessName: z.string().min(2, {
        message: "Business name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    phone: z.string().min(10, {
        message: "Please enter a valid phone number.",
    }),
    businessType: z.string().min(1, {
        message: "Please select a business type.",
    })
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            businessName: "",
            email: "",
            phone: "",
            businessType: ""
        },
    });

    function onSubmit(data: FormValues) {
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            console.log(data);
            setIsSubmitting(false);
            setIsSubmitted(true);
            form.reset();

            // Reset submitted state after some time
            setTimeout(() => {
                setIsSubmitted(false);
            }, 5000);
        }, 1500);
    }

    return (
        <section id="contact" className="py-16 bg-muted">
            <div className="container mx-auto px-4">
                <motion.div
                    className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="md:flex">
                        <div className="md:w-1/2 p-8 md:p-12  bg-gradient-to-tr from-bpower-blue to-bpower-darkGreen text-white">
                            <h2 className="text-2xl md:text-3xl font-bold mb-6">Get Started</h2>
                            <p className="mb-6">
                                Fill out this form and our team will contact you within 24 hours to guide you through the onboarding process.
                            </p>

                            <div className="mb-8">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                                        <Phone className="h-5 w-5 text-accent" />
                                    </div>
                                    <div>
                                        <div className="text-sm opacity-75">Call us at</div>
                                        <div className="font-medium">+91 1800-XXX-XXXX</div>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4">
                                        <Mail className="h-5 w-5 text-accent" />
                                    </div>
                                    <div>
                                        <div className="text-sm opacity-75">Email us at</div>
                                        <div className="font-medium">contact@bpower.in</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                    <Linkedin className="h-5 w-5 text-white" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                    <Twitter className="h-5 w-5 text-white" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                    <Facebook className="h-5 w-5 text-white" />
                                </a>
                            </div>
                        </div>

                        <div className="md:w-1/2 p-8 md:p-12">
                            {isSubmitted ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                                    <p className="text-muted-foreground">
                                        Your application has been submitted successfully. Our team will get in touch with you soon.
                                    </p>
                                </div>
                            ) : (
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="businessName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Business Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Your business name" {...field} />
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
                                                        <Input placeholder="your@email.com" type="email" {...field} />
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
                                                        <Input placeholder="+91 XXXXX XXXXX" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="businessType"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Business Type</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select your business type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                                            <SelectItem value="service">Service Provider</SelectItem>
                                                            <SelectItem value="trading">Trading</SelectItem>
                                                            <SelectItem value="retail">Retail</SelectItem>
                                                            <SelectItem value="other">Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <Button
                                            type="submit"
                                            className="w-full bg-primary hover:bg-primary/90"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                        </Button>
                                    </form>
                                </Form>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactForm;
