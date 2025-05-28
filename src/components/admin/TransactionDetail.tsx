
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
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Calendar, 
  CreditCard, 
  Building, 
  CheckCircle, 
  Truck, 
  Package 
} from "lucide-react";

// Mock transaction data - would come from API in real implementation
const mockTransactionDetails = {
  "txn-1": {
    id: "txn-1",
    orderNumber: "#58214",
    buyer: {
      name: "Metro Retail Chain",
      id: "buyer-1",
      contact: "Aditya Joshi",
      email: "aditya@metroretail.com",
      phone: "+91 98765 43210"
    },
    seller: {
      name: "Organic Foods Ltd",
      id: "seller-1",
      contact: "Rajesh Sharma",
      email: "rajesh@organicfoods.com",
      phone: "+91 98765 12345"
    },
    amount: "₹125,000",
    tax: "₹22,500",
    total: "₹147,500",
    date: "2023-05-15",
    deliveryDate: "2023-05-22",
    paymentMethod: "Bank Transfer",
    status: "completed",
    items: [
      { name: "Organic Rice", quantity: "500 kg", price: "₹50,000" },
      { name: "Organic Wheat", quantity: "400 kg", price: "₹40,000" },
      { name: "Organic Pulses", quantity: "350 kg", price: "₹35,000" }
    ],
    timeline: [
      { status: "Order Placed", date: "2023-05-15 10:30 AM", completed: true },
      { status: "Payment Confirmed", date: "2023-05-15 02:45 PM", completed: true },
      { status: "Processing", date: "2023-05-16 09:15 AM", completed: true },
      { status: "Shipped", date: "2023-05-18 11:20 AM", completed: true },
      { status: "Delivered", date: "2023-05-22 03:40 PM", completed: true }
    ]
  },
  "txn-2": {
    id: "txn-2",
    orderNumber: "#58215",
    buyer: {
      name: "Hotel Supplies Co.",
      id: "buyer-2",
      contact: "Meena Reddy",
      email: "meena@hotelsupplies.com",
      phone: "+91 87654 32109"
    },
    seller: {
      name: "Textile House",
      id: "seller-3",
      contact: "Sunil Agarwal",
      email: "sunil@textilehouse.com",
      phone: "+91 76543 34567"
    },
    amount: "₹78,500",
    tax: "₹14,130",
    total: "₹92,630",
    date: "2023-05-15",
    deliveryDate: "2023-05-25",
    paymentMethod: "Net Banking",
    status: "processing",
    items: [
      { name: "Premium Bed Sheets", quantity: "100 sets", price: "₹40,000" },
      { name: "Bath Towels", quantity: "200 units", price: "₹20,000" },
      { name: "Table Linens", quantity: "150 sets", price: "₹18,500" }
    ],
    timeline: [
      { status: "Order Placed", date: "2023-05-15 01:20 PM", completed: true },
      { status: "Payment Confirmed", date: "2023-05-16 10:10 AM", completed: true },
      { status: "Processing", date: "2023-05-17 09:30 AM", completed: true },
      { status: "Shipped", date: "Pending", completed: false },
      { status: "Delivered", date: "Pending", completed: false }
    ]
  },
  "txn-3": {
    id: "txn-3",
    orderNumber: "#58216",
    buyer: {
      name: "Restaurant Chain Ltd",
      id: "buyer-3",
      contact: "Vikram Singh",
      email: "vikram@restaurantchain.com",
      phone: "+91 76543 21098"
    },
    seller: {
      name: "Artisan Crafts Co.",
      id: "seller-2",
      contact: "Priya Patel",
      email: "priya@artisancrafts.com",
      phone: "+91 87654 23456"
    },
    amount: "₹42,000",
    tax: "₹7,560",
    total: "₹49,560",
    date: "2023-05-16",
    deliveryDate: "2023-05-23",
    paymentMethod: "Credit Card",
    status: "completed",
    items: [
      { name: "Handcrafted Plates", quantity: "200 units", price: "₹20,000" },
      { name: "Serving Bowls", quantity: "150 units", price: "₹15,000" },
      { name: "Decorative Items", quantity: "70 units", price: "₹7,000" }
    ],
    timeline: [
      { status: "Order Placed", date: "2023-05-16 11:15 AM", completed: true },
      { status: "Payment Confirmed", date: "2023-05-16 11:20 AM", completed: true },
      { status: "Processing", date: "2023-05-17 10:45 AM", completed: true },
      { status: "Shipped", date: "2023-05-19 09:30 AM", completed: true },
      { status: "Delivered", date: "2023-05-23 02:15 PM", completed: true }
    ]
  },
  "txn-4": {
    id: "txn-4",
    orderNumber: "#58217",
    buyer: {
      name: "Retail Outlet",
      id: "buyer-4",
      contact: "Shreya Kapoor",
      email: "shreya@retailoutlet.com",
      phone: "+91 65432 10987"
    },
    seller: {
      name: "EcoGoods",
      id: "seller-4",
      contact: "Neha Gupta",
      email: "neha@ecogoods.com",
      phone: "+91 65432 45678"
    },
    amount: "₹18,750",
    tax: "₹3,375",
    total: "₹22,125",
    date: "2023-05-16",
    deliveryDate: "Pending",
    paymentMethod: "UPI",
    status: "pending",
    items: [
      { name: "Bamboo Containers", quantity: "100 units", price: "₹8,000" },
      { name: "Eco-Friendly Bags", quantity: "250 units", price: "₹6,250" },
      { name: "Recycled Paper Products", quantity: "150 units", price: "₹4,500" }
    ],
    timeline: [
      { status: "Order Placed", date: "2023-05-16 03:40 PM", completed: true },
      { status: "Payment Confirmed", date: "Pending", completed: false },
      { status: "Processing", date: "Pending", completed: false },
      { status: "Shipped", date: "Pending", completed: false },
      { status: "Delivered", date: "Pending", completed: false }
    ]
  }
};

const TransactionDetail = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  
  // Get transaction data based on ID
  const transaction = id ? mockTransactionDetails[id as keyof typeof mockTransactionDetails] : null;
  
  if (!transaction) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Transaction not found</h2>
        <Button onClick={() => navigate("/admin/transactions")}>Return to Transactions List</Button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate("/admin/transactions")}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Order {transaction.orderNumber}</h1>
          <span className={`ml-4 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(transaction.status)}`}>
            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-muted-foreground" />
              Buyer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Company:</span> {transaction.buyer.name}
            </div>
            <div>
              <span className="font-medium">Contact Person:</span> {transaction.buyer.contact}
            </div>
            <div>
              <span className="font-medium">Email:</span> {transaction.buyer.email}
            </div>
            <div>
              <span className="font-medium">Phone:</span> {transaction.buyer.phone}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => navigate(`/admin/buyers/${transaction.buyer.id}`)}
            >
              View Buyer Profile
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-muted-foreground" />
              Seller Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Company:</span> {transaction.seller.name}
            </div>
            <div>
              <span className="font-medium">Contact Person:</span> {transaction.seller.contact}
            </div>
            <div>
              <span className="font-medium">Email:</span> {transaction.seller.email}
            </div>
            <div>
              <span className="font-medium">Phone:</span> {transaction.seller.phone}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => navigate(`/admin/sellers/${transaction.seller.id}`)}
            >
              View Seller Profile
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Order Date:</span> {transaction.date}
            </div>
            <div>
              <span className="font-medium">Delivery Date:</span> {transaction.deliveryDate}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Method:</span> {transaction.paymentMethod}
            </div>
            <div>
              <span className="font-medium">Status:</span> 
              <span className={`ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${transaction.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                {transaction.status === "pending" ? "Pending" : "Paid"}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-muted-foreground" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Subtotal:</span> {transaction.amount}
            </div>
            <div>
              <span className="font-medium">Tax:</span> {transaction.tax}
            </div>
            <Separator className="my-2" />
            <div className="font-semibold">
              <span>Total:</span> {transaction.total}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transaction.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-muted-foreground" />
            Order Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transaction.timeline.map((event, index) => (
              <div 
                key={index} 
                className={`flex items-start ${index < transaction.timeline.length - 1 ? "pb-4 border-l-2 border-muted pl-4" : "pl-4"}`}
              >
                <div className={`-ml-[21px] mr-3 flex h-9 w-9 items-center justify-center rounded-full ${event.completed ? "bg-green-100" : "bg-gray-100"}`}>
                  {event.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Package className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{event.status}</p>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/admin/transactions")}>
            Back to Transactions List
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">Download Invoice</Button>
            <Button>Update Status</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TransactionDetail;