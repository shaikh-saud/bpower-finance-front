
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
import { Eye, User } from "lucide-react";

import { useNavigate } from "react-router-dom";

// Mock data - would come from API in real implementation
const mockSellers = [
    {
        id: "seller-1",
        businessName: "Organic Foods Ltd",
        ownerName: "Rajesh Sharma",
        gstin: "27AADCB2230M1ZT",
        turnover: "₹28 Cr",
        joinDate: "2023-01-15",
        status: "active",
    },
    {
        id: "seller-2",
        businessName: "Artisan Crafts Co.",
        ownerName: "Priya Patel",
        gstin: "24AAACT5816Q1ZM",
        turnover: "₹5 Cr",
        joinDate: "2023-02-22",
        status: "active",
    },
    {
        id: "seller-3",
        businessName: "Textile House",
        ownerName: "Sunil Agarwal",
        gstin: "09AAACD1234F1ZP",
        turnover: "₹12 Cr",
        joinDate: "2023-03-10",
        status: "inactive",
    },
    {
        id: "seller-4",
        businessName: "EcoGoods",
        ownerName: "Neha Gupta",
        gstin: "07AABCU9603R1ZP",
        turnover: "₹3.5 Cr",
        joinDate: "2023-03-18",
        status: "active",
    },
];

const SellerProfiles = () => {


    const navigate = useNavigate();

    const viewSellerDetails = (sellerId: string) => {
        // In a real app, this would open a modal or navigate to a details page
        console.log(`View seller details for ID: ${sellerId}`);
        navigate(`/admin/sellers/${sellerId}`);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Seller Profiles</h1>

            <Card>
                <CardContent className="p-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Business Name</TableHead>
                                <TableHead>Owner</TableHead>
                                <TableHead>GSTIN</TableHead>
                                <TableHead>Annual Turnover</TableHead>
                                <TableHead>Join Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockSellers.map((seller) => (
                                <TableRow key={seller.id}>
                                    <TableCell className="font-medium">{seller.businessName}</TableCell>
                                    <TableCell>{seller.ownerName}</TableCell>
                                    <TableCell>{seller.gstin}</TableCell>
                                    <TableCell>{seller.turnover}</TableCell>
                                    <TableCell>{seller.joinDate}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${seller.status === "active"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {seller.status.charAt(0).toUpperCase() + seller.status.slice(1)}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => viewSellerDetails(seller.id)}
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

export default SellerProfiles;