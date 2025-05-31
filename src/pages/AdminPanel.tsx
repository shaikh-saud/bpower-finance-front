
import React from "react";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { Routes, Route } from "react-router-dom";
import ProductApproval from "@/components/admin/ProductApproval";
import SellerProfiles from "@/components/admin/SellerProfiles";
import BuyerProfiles from "@/components/admin/BuyerProfiles";
import TransactionMonitor from "@/components/admin/TransactionMonitor";
import { Toaster } from "@/components/ui/toaster";
import SellerDetail from "@/components/admin/SellerDetail";
import BuyerDetail from "@/components/admin/BuyerDetail";
import TransactionDetail from "@/components/admin/TransactionDetail";
import { PanelRightOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";

// Mobile sidebar toggle component
const MobileSidebarToggle = () => {
    const { toggleSidebar } = useSidebar();

    return (
        <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute top-4 left-4 z-30"
            onClick={toggleSidebar}
        >
            <PanelRightOpen className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
        </Button>
    );
};

const AdminPanel = () => {
    return (
        <AdminProtectedRoute>
            <SidebarProvider>
                <div className="flex min-h-screen w-full bg-gray-50 mt-[100px]">
                    <AdminSidebar />
                    <div className="flex-1 p-4">
                        <div className="md:p-4 p-4 pt-16 md:pt-4 relative">
                            <MobileSidebarToggle />
                            <Routes>
                                <Route index element={<AdminDashboard />} />
                                <Route path="products" element={<ProductApproval />} />
                                <Route path="sellers" element={<SellerProfiles />} />
                                <Route path="sellers/:id" element={<SellerDetail />} />
                                <Route path="buyers" element={<BuyerProfiles />} />
                                <Route path="buyers/:id" element={<BuyerDetail />} />
                                <Route path="transactions" element={<TransactionMonitor />} />
                                <Route path="transactions/:id" element={<TransactionDetail />} />
                            </Routes>
                        </div>
                    </div>
                    <Toaster />
                </div>
            </SidebarProvider>
        </AdminProtectedRoute>
    );
};

export default AdminPanel;
