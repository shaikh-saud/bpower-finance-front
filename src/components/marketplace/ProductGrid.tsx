
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { useNavigate } from 'react-router-dom';

interface ProductGridProps {
    products: Product[];
    onBuyNow: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onBuyNow }) => {
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleConfirm = () => {
        if (selectedProduct) {
            onBuyNow(selectedProduct);
            navigate('/payment', { state: { product: selectedProduct }, replace: true });
        }
    };

    const handleCancel = () => {
        setSelectedProduct(null);
    };


    if (products.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-gray-500">No products match your criteria.</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms.</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Card key={product.id} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-bpower-blue">
                        <div className="w-full h-48 bg-gray-100 relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-contain p-4"
                            />
                            {product.discount > 0 && (
                                <div className="absolute top-2 right-2 bg-bpower-gold text-white text-xs font-bold px-2 py-1 rounded">
                                    -{product.discount}% OFF
                                </div>
                            )}
                        </div>

                        <CardContent className="flex-grow py-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-medium text-gray-900 line-clamp-2">{product.name}</h3>
                                <span className="text-bpower-blue font-bold">₹{product.price.toLocaleString('en-IN')}</span>
                            </div>
                            <p className="text-gray-500 text-sm line-clamp-3">{product.description}</p>

                            <div className="flex flex-wrap gap-2 mt-3">
                                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                    {product.category}
                                </span>
                                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                    {product.location}
                                </span>
                            </div>
                        </CardContent>

                        <CardFooter className="border-t bg-gray-50 pt-3">
                            <Button
                                // onClick={() => onBuyNow(product)}
                                onClick={() => setSelectedProduct(product)}
                                className="w-full bg-bpower-blue hover:bg-bpower-green duration-500 transition-all ease-in-out"
                            >
                                <ShoppingCart className="mr-2 h-4 w-4" /> Buy Now
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Confirmation Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-bold mb-2">Confirm Payment</h2>
                        <p className="mb-4">Are you sure you want to buy <strong>{selectedProduct.name}</strong>?</p>
                        <div className="flex justify-between gap-2 mt-4">
                            <Button
                                variant="ghost"
                                onClick={handleCancel}
                                className="w-1/2 border border-gray-300"
                            >
                                Cancel
                            </Button>
                            <Button
                                className="w-1/2 bg-bpower-blue text-white"
                                onClick={handleConfirm}
                            >
                                OK
                            </Button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default ProductGrid;