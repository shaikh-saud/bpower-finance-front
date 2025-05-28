
import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import ProductGrid from "@/components/marketplace/ProductGrid";
import { Product } from "@/types/product";
import { PRODUCTS } from "@/data/products";

const Marketplace = () => {
    const [products, setProducts] = useState<Product[]>(PRODUCTS);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [priceRange, setPriceRange] = useState<string>('all');
    const [locationFilter, setLocationFilter] = useState<string>('all');

    // Filter products when filters change
    useEffect(() => {
        let result = products;

        // Apply search filter
        if (searchQuery) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply category filter
        if (categoryFilter !== 'all') {
            result = result.filter(product => product.category === categoryFilter);
        }

        // Apply price filter
        if (priceRange !== 'all') {
            switch (priceRange) {
                case 'under5000':
                    result = result.filter(product => product.price < 5000);
                    break;
                case '5000-10000':
                    result = result.filter(product => product.price >= 5000 && product.price <= 10000);
                    break;
                case '10000-25000':
                    result = result.filter(product => product.price > 10000 && product.price <= 25000);
                    break;
                case 'above25000':
                    result = result.filter(product => product.price > 25000);
                    break;
            }
        }

        // Apply location filter
        if (locationFilter !== 'all') {
            result = result.filter(product => product.location === locationFilter);
        }

        setFilteredProducts(result);
    }, [searchQuery, categoryFilter, priceRange, locationFilter, products]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleBuyNow = (product: Product) => {
        // Mock ICICI Bank gateway integration
        // toast.success(`Processing payment for ${product.name} via ICICI Bank gateway`);
        // setTimeout(() => {
        //     toast.info("Payment successful! Your order has been placed.");
        // }, 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 mt-[100px]">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-bpower-blue">MSME Marketplace</h1>

            {/* Search and filter section */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="pl-10 w-full"
                    />
                </div>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="fmcg">FMCG</SelectItem>
                        <SelectItem value="fashion">Fashion</SelectItem>
                        <SelectItem value="home-appliances">Home Appliances</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                        <SelectItem value="chennai">Chennai</SelectItem>
                        <SelectItem value="kolkata">Kolkata</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Main content area with filters and products */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters sidebar */}
                <div className="w-full lg:w-64 bg-white p-4 rounded-lg border border-gray-200 h-fit">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter size={18} />
                        <h2 className="font-semibold">Filters</h2>
                    </div>

                    <Separator className="mb-4" />

                    <div className="mb-6">
                        <h3 className="text-sm font-medium mb-3">Price Range</h3>
                        <RadioGroup value={priceRange} onValueChange={setPriceRange}>
                            <div className="flex items-center space-x-2 mb-2">
                                <RadioGroupItem value="all" id="all-price" />
                                <Label htmlFor="all-price">All Prices</Label>
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                                <RadioGroupItem value="under5000" id="under-5000" />
                                <Label htmlFor="under-5000">Under ₹5,000</Label>
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                                <RadioGroupItem value="5000-10000" id="5000-10000" />
                                <Label htmlFor="5000-10000">₹5,000 - ₹10,000</Label>
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                                <RadioGroupItem value="10000-25000" id="10000-25000" />
                                <Label htmlFor="10000-25000">₹10,000 - ₹25,000</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="above25000" id="above-25000" />
                                <Label htmlFor="above-25000">Above ₹25,000</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <Separator className="mb-4" />

                    <div className="mb-6">
                        <h3 className="text-sm font-medium mb-3">POD Customization</h3>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="cod" />
                                <Label htmlFor="cod">Cash on Delivery</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="gift" />
                                <Label htmlFor="gift">Gift Wrap</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="express" />
                                <Label htmlFor="express">Express Delivery</Label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product grid */}
                <div className="flex-1">
                    <ProductGrid
                        products={filteredProducts}
                        onBuyNow={handleBuyNow}
                    />
                </div>
            </div>
        </div>
    );
};

export default Marketplace;