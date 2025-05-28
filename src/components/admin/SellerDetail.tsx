
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, User, Building, FileText, MapPin, Phone, Mail } from "lucide-react";

// Mock seller data - would come from API in real implementation
const mockSellers = {
  "seller-1": {
    id: "seller-1",
    businessName: "Organic Foods Ltd",
    ownerName: "Rajesh Sharma",
    gstin: "27AADCB2230M1ZT",
    turnover: "₹28 Cr",
    joinDate: "2023-01-15",
    status: "active",
    email: "rajesh@organicfoods.com",
    phone: "+91 98765 12345",
    address: "123 Farming District, Mumbai, Maharashtra",
    products: ["Organic Rice", "Pulses", "Millets", "Vegetables"],
    description: "Leading supplier of certified organic foods and products across India.",
    bankDetails: {
      accountNumber: "XXXX XXXX 1234",
      ifsc: "SBIN0001234",
      bankName: "State Bank of India"
    }
  },
  "seller-2": {
    id: "seller-2",
    businessName: "Artisan Crafts Co.",
    ownerName: "Priya Patel",
    gstin: "24AAACT5816Q1ZM",
    turnover: "₹5 Cr",
    joinDate: "2023-02-22",
    status: "active",
    email: "priya@artisancrafts.com",
    phone: "+91 87654 23456",
    address: "45 Crafts Village, Ahmedabad, Gujarat",
    products: ["Handwoven Textiles", "Pottery", "Embroidery", "Wooden Crafts"],
    description: "Curating the finest handcrafted products from artisans across rural India.",
    bankDetails: {
      accountNumber: "XXXX XXXX 5678",
      ifsc: "HDFC0002345",
      bankName: "HDFC Bank"
    }
  },
  "seller-3": {
    id: "seller-3",
    businessName: "Textile House",
    ownerName: "Sunil Agarwal",
    gstin: "09AAACD1234F1ZP",
    turnover: "₹12 Cr",
    joinDate: "2023-03-10",
    status: "inactive",
    email: "sunil@textilehouse.com",
    phone: "+91 76543 34567",
    address: "78 Textile Hub, Surat, Gujarat",
    products: ["Cotton Fabrics", "Silk Sarees", "Woolen Textiles", "Denim"],
    description: "Specialized in high-quality textiles for fashion and home decor industries.",
    bankDetails: {
      accountNumber: "XXXX XXXX 9012",
      ifsc: "ICIC0003456",
      bankName: "ICICI Bank"
    }
  },
  "seller-4": {
    id: "seller-4",
    businessName: "EcoGoods",
    ownerName: "Neha Gupta",
    gstin: "07AABCU9603R1ZP",
    turnover: "₹3.5 Cr",
    joinDate: "2023-03-18",
    status: "active",
    email: "neha@ecogoods.com",
    phone: "+91 65432 45678",
    address: "23 Green Park, Bengaluru, Karnataka",
    products: ["Bamboo Products", "Recycled Paper Goods", "Sustainable Packaging", "Eco-friendly Bags"],
    description: "Providing environmentally sustainable alternatives to everyday products.",
    bankDetails: {
      accountNumber: "XXXX XXXX 3456",
      ifsc: "AXIS0004567",
      bankName: "Axis Bank"
    }
  }
};

const SellerDetail = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  
  // Get seller data based on ID
  const seller = id ? mockSellers[id as keyof typeof mockSellers] : null;
  
  if (!seller) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Seller not found</h2>
        <Button onClick={() => navigate("/admin/sellers")}>Return to Seller List</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate("/admin/sellers")}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">{seller.businessName}</h1>
        <span className={`ml-4 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
          ${
            seller.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {seller.status.charAt(0).toUpperCase() + seller.status.slice(1)}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Business Name:</span>
              <span>{seller.businessName}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Owner:</span>
              <span>{seller.ownerName}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">GSTIN:</span>
              <span>{seller.gstin}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Address:</span>
              <span>{seller.address}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Email:</span>
              <span>{seller.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Phone:</span>
              <span>{seller.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Join Date:</span>
              <span>{seller.joinDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Annual Turnover:</span>
              <span>{seller.turnover}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Bank Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-2">
              <span className="font-medium">Bank Name:</span>
              <span>{seller.bankDetails.bankName}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">Account Number:</span>
              <span>{seller.bankDetails.accountNumber}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium">IFSC Code:</span>
              <span>{seller.bankDetails.ifsc}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Products offered by this seller</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {seller.products.map((product, index) => (
              <div 
                key={index}
                className="bg-primary/10 text-primary rounded-md px-3 py-1 text-sm"
              >
                {product}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Business Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{seller.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/admin/sellers")}>
            Back to Sellers List
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className={seller.status === "active" ? "text-red-600" : "text-green-600"}>
              {seller.status === "active" ? "Deactivate Account" : "Activate Account"}
            </Button>
            <Button>Contact Seller</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SellerDetail;