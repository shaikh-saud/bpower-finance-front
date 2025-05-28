
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
import { Eye, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data - would come from API in real implementation
const mockTransactions = [
    {
        id: "txn-1",
        orderNumber: "#58214",
        buyer: "Metro Retail Chain",
        seller: "Organic Foods Ltd",
        amount: "₹125,000",
        date: "2023-05-15",
        status: "completed",
    },
    {
        id: "txn-2",
        orderNumber: "#58215",
        buyer: "Hotel Supplies Co.",
        seller: "Textile House",
        amount: "₹78,500",
        date: "2023-05-15",
        status: "processing",
    },
    {
        id: "txn-3",
        orderNumber: "#58216",
        buyer: "Restaurant Chain Ltd",
        seller: "Artisan Crafts Co.",
        amount: "₹42,000",
        date: "2023-05-16",
        status: "completed",
    },
    {
        id: "txn-4",
        orderNumber: "#58217",
        buyer: "Retail Outlet",
        seller: "EcoGoods",
        amount: "₹18,750",
        date: "2023-05-16",
        status: "pending",
    },
];

const TransactionMonitor = () => {
    const [sortField, setSortField] = useState("date");
    const [sortDirection, setSortDirection] = useState("desc");

    const navigate = useNavigate();

    const handleSort = (field: string) => {
        if (field === sortField) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const getSortIcon = (field: string) => {
        if (field === sortField) {
            return sortDirection === "asc" ? (
                <ChevronUp className="h-4 w-4" />
            ) : (
                <ChevronDown className="h-4 w-4" />
            );
        }
        return null;
    };

    const viewTransactionDetails = (transactionId: string) => {
        // In a real app, this would open a modal or navigate to a details page
        console.log(`View transaction details for ID: ${transactionId}`);
        navigate(`/admin/transactions/${transactionId}`);

    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Transaction Monitor</h1>

            <Card>
                <CardContent className="p-6">
                    <div className="flex justify-between mb-4">
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                                All Transactions
                            </Button>
                            <Button variant="outline" size="sm">
                                Completed
                            </Button>
                            <Button variant="outline" size="sm">
                                Processing
                            </Button>
                            <Button variant="outline" size="sm">
                                Pending
                            </Button>
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead
                                    className="cursor-pointer"
                                    onClick={() => handleSort("orderNumber")}
                                >
                                    <div className="flex items-center">
                                        Order Number
                                        {getSortIcon("orderNumber")}
                                    </div>
                                </TableHead>
                                <TableHead>Buyer</TableHead>
                                <TableHead>Seller</TableHead>
                                <TableHead
                                    className="cursor-pointer"
                                    onClick={() => handleSort("amount")}
                                >
                                    <div className="flex items-center">
                                        Amount
                                        {getSortIcon("amount")}
                                    </div>
                                </TableHead>
                                <TableHead
                                    className="cursor-pointer"
                                    onClick={() => handleSort("date")}
                                >
                                    <div className="flex items-center">
                                        Date
                                        {getSortIcon("date")}
                                    </div>
                                </TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockTransactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell className="font-medium">
                                        {transaction.orderNumber}
                                    </TableCell>
                                    <TableCell>{transaction.buyer}</TableCell>
                                    <TableCell>{transaction.seller}</TableCell>
                                    <TableCell>{transaction.amount}</TableCell>
                                    <TableCell>{transaction.date}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${transaction.status === "completed"
                                                ? "bg-green-100 text-green-800"
                                                : transaction.status === "processing"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                            }`}
                                        >
                                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => viewTransactionDetails(transaction.id)}
                                        >
                                            <Eye className="h-4 w-4 mr-2" />
                                            Details
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

export default TransactionMonitor;