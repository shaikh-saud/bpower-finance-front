
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data - would come from API in real implementation
const mockProducts = [
  {
    id: "prod-1",
    name: "Organic Basmati Rice",
    seller: "Organic Foods Ltd",
    category: "Food & Grocery",
    submissionDate: "2023-05-10",
    status: "pending",
  },
  {
    id: "prod-2",
    name: "Handmade Ceramic Plates (Set of 4)",
    seller: "Artisan Crafts Co.",
    category: "Home & Kitchen",
    submissionDate: "2023-05-12",
    status: "pending",
  },
  {
    id: "prod-3",
    name: "Cotton Bath Towels",
    seller: "Textile House",
    category: "Home & Kitchen",
    submissionDate: "2023-05-14",
    status: "pending",
  },
  {
    id: "prod-4",
    name: "Stainless Steel Water Bottle",
    seller: "EcoGoods",
    category: "Kitchen",
    submissionDate: "2023-05-15",
    status: "pending",
  },
];

type Product = {
  id: string;
  name: string;
  seller: string;
  category: string;
  submissionDate: string;
  status: string;
};

const ProductApproval = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const { toast } = useToast();

  const handleApprove = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, status: "approved" } : product
    ));
    
    toast({
      title: "Product Approved",
      description: "The product listing has been approved successfully.",
    });
  };

  const handleReject = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, status: "rejected" } : product
    ));
    
    toast({
      title: "Product Rejected",
      description: "The product listing has been rejected.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Product Approval</h1>
      
      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.seller}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.submissionDate}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${
                        product.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : product.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleApprove(product.id)}
                        disabled={product.status !== "pending"}
                        className="border-green-500 hover:bg-green-50 text-green-600"
                      >
                        <Check className="h-4 w-4" />
                        <span className="sr-only md:not-sr-only md:ml-2">Approve</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleReject(product.id)}
                        disabled={product.status !== "pending"}
                        className="border-red-500 hover:bg-red-50 text-red-600"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only md:not-sr-only md:ml-2">Reject</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductApproval;