
import React from "react";
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
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

// Mock data - would come from API in real implementation
const mockBuyers = [
    {
        id: "buyer-1",
        name: "Aditya Joshi",
        businessName: "Metro Retail Chain",
        gstin: "27AADCB2230M1ZT",
        email: "aditya@metroretail.com",
        phone: "+91 98765 43210",
        joinDate: "2023-02-05",
        status: "active",
    },
    {
        id: "buyer-2",
        name: "Meena Reddy",
        businessName: "Hotel Supplies Co.",
        gstin: "24AAACT5816Q1ZM",
        email: "meena@hotelsupplies.com",
        phone: "+91 87654 32109",
        joinDate: "2023-02-18",
        status: "active",
    },
    {
        id: "buyer-3",
        name: "Vikram Singh",
        businessName: "Restaurant Chain Ltd",
        gstin: "09AAACD1234F1ZP",
        email: "vikram@restaurantchain.com",
        phone: "+91 76543 21098",
        joinDate: "2023-03-22",
        status: "inactive",
    },
    {
        id: "buyer-4",
        name: "Shreya Kapoor",
        businessName: "Retail Outlet",
        gstin: "07AABCU9603R1ZP",
        email: "shreya@retailoutlet.com",
        phone: "+91 65432 10987",
        joinDate: "2023-04-10",
        status: "active",
    },
];

const BuyerProfiles = () => {
    const navigate = useNavigate();
    const viewBuyerDetails = (buyerId: string) => {
        // In a real app, this would open a modal or navigate to a details page
        console.log(`View buyer details for ID: ${buyerId}`);
        navigate(`/admin/buyers/${buyerId}`);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Buyer Profiles</h1>

            <Card>
                <CardContent className="p-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Business Name</TableHead>
                                <TableHead>GSTIN</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Join Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockBuyers.map((buyer) => (
                                <TableRow key={buyer.id}>
                                    <TableCell className="font-medium">{buyer.name}</TableCell>
                                    <TableCell>{buyer.businessName}</TableCell>
                                    <TableCell>{buyer.gstin}</TableCell>
                                    <TableCell>{buyer.email}</TableCell>
                                    <TableCell>{buyer.phone}</TableCell>
                                    <TableCell>{buyer.joinDate}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${buyer.status === "active"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {buyer.status.charAt(0).toUpperCase() + buyer.status.slice(1)}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => viewBuyerDetails(buyer.id)}
                                        >
                                            <Eye className="h-4 w-4 mr-2" />
                                            View Details
                                        </Button>
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

export default BuyerProfiles;