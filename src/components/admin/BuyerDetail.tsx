
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
import { ArrowLeft, User, Building, FileText, MapPin, Phone, Mail, ShoppingBag } from "lucide-react";

// Mock buyer data - would come from API in real implementation
const mockBuyers = {
  "buyer-1": {
    id: "buyer-1",
    name: "Aditya Joshi",
    businessName: "Metro Retail Chain",
    gstin: "27AADCB2230M1ZT",
    email: "aditya@metroretail.com",
    phone: "+91 98765 43210",
    joinDate: "2023-02-05",
    status: "active",
    address: "456 Commercial Avenue, Delhi, NCR",
    type: "Retail Chain",
    purchaseVolume: "₹1.2 Cr monthly",
    preferredCategories: ["Groceries", "Home Essentials", "Electronics", "Apparel"],
    recentPurchases: [
      { id: "ord-1001", date: "2023-05-10", amount: "₹28,500" },
      { id: "ord-982", date: "2023-05-02", amount: "₹35,200" },
      { id: "ord-965", date: "2023-04-25", amount: "₹42,800" }
    ]
  },
  "buyer-2": {
    id: "buyer-2",
    name: "Meena Reddy",
    businessName: "Hotel Supplies Co.",
    gstin: "24AAACT5816Q1ZM",
    email: "meena@hotelsupplies.com",
    phone: "+91 87654 32109",
    joinDate: "2023-02-18",
    status: "active",
    address: "78 Hospitality Hub, Chennai, Tamil Nadu",
    type: "Hospitality Supplier",
    purchaseVolume: "₹85 Lakhs monthly",
    preferredCategories: ["Linens", "Kitchen Equipment", "Food Products", "Hygiene Products"],
    recentPurchases: [
      { id: "ord-1012", date: "2023-05-12", amount: "₹18,900" },
      { id: "ord-996", date: "2023-05-05", amount: "₹24,600" },
      { id: "ord-981", date: "2023-04-29", amount: "₹31,200" }
    ]
  },
  "buyer-3": {
    id: "buyer-3",
    name: "Vikram Singh",
    businessName: "Restaurant Chain Ltd",
    gstin: "09AAACD1234F1ZP",
    email: "vikram@restaurantchain.com",
    phone: "+91 76543 21098",
    joinDate: "2023-03-22",
    status: "inactive",
    address: "23 Food District, Pune, Maharashtra",
    type: "Restaurant Chain",
    purchaseVolume: "₹65 Lakhs monthly",
    preferredCategories: ["Fresh Produce", "Meat & Seafood", "Spices", "Beverages"],
    recentPurchases: [
      { id: "ord-985", date: "2023-04-18", amount: "₹14,500" },
      { id: "ord-970", date: "2023-04-10", amount: "₹22,800" },
      { id: "ord-952", date: "2023-04-02", amount: "₹19,600" }
    ]
  },
  "buyer-4": {
    id: "buyer-4",
    name: "Shreya Kapoor",
    businessName: "Retail Outlet",
    gstin: "07AABCU9603R1ZP",
    email: "shreya@retailoutlet.com",
    phone: "+91 65432 10987",
    joinDate: "2023-04-10",
    status: "active",
    address: "101 Shopping Lane, Kolkata, West Bengal",
    type: "Single Store Retailer",
    purchaseVolume: "₹45 Lakhs monthly",
    preferredCategories: ["Fashion", "Accessories", "Beauty Products", "Home Decor"],
    recentPurchases: [
      { id: "ord-1018", date: "2023-05-15", amount: "₹9,800" },
      { id: "ord-1003", date: "2023-05-08", amount: "₹12,500" },
      { id: "ord-989", date: "2023-05-01", amount: "₹8,900" }
    ]
  }
};

const BuyerDetail = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  
  // Get buyer data based on ID
  const buyer = id ? mockBuyers[id as keyof typeof mockBuyers] : null;
  
  if (!buyer) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Buyer not found</h2>
        <Button onClick={() => navigate("/admin/buyers")}>Return to Buyer List</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate("/admin/buyers")}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">{buyer.name}</h1>
        <span className={`ml-4 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
          ${
            buyer.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {buyer.status.charAt(0).toUpperCase() + buyer.status.slice(1)}
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
              <span>{buyer.businessName}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Contact Person:</span>
              <span>{buyer.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">GSTIN:</span>
              <span>{buyer.gstin}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Address:</span>
              <span>{buyer.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Business Type:</span>
              <span>{buyer.type}</span>
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
              <span>{buyer.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Phone:</span>
              <span>{buyer.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Join Date:</span>
              <span>{buyer.joinDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Purchase Volume:</span>
              <span>{buyer.purchaseVolume}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Preferred Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {buyer.preferredCategories.map((category, index) => (
                <div 
                  key={index}
                  className="bg-primary/10 text-primary rounded-md px-3 py-1 text-sm"
                >
                  {category}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Purchases</CardTitle>
          <CardDescription>Last 3 orders placed by this buyer</CardDescription>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2">Order ID</th>
                <th className="pb-2">Date</th>
                <th className="pb-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {buyer.recentPurchases.map((purchase) => (
                <tr key={purchase.id} className="border-b">
                  <td className="py-2">{purchase.id}</td>
                  <td className="py-2">{purchase.date}</td>
                  <td className="py-2">{purchase.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/admin/buyers")}>
            Back to Buyers List
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className={buyer.status === "active" ? "text-red-600" : "text-green-600"}>
              {buyer.status === "active" ? "Deactivate Account" : "Activate Account"}
            </Button>
            <Button>Contact Buyer</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BuyerDetail;