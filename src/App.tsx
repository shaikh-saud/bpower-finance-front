import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Marketplace from "./pages/Marketplace";
import NavBar from "./components/NavBar";
import SignUp from "./pages/SignUp";
import AdminPanel from "./pages/AdminPanel";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useSidebar } from "./components/ui/sidebar";
import PaymentGateway from "./pages/PaymentGateway";
import BlogDetail from "./pages/BlogDetail";
import Blog from "./pages/Blog";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const MobileSidebarToggle = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden fixed top-4 left-4 z-50"
      onClick={toggleSidebar}
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  );
};

// Helper to access location inside App
const AppContent = () => {
  const location = useLocation();
  const hideNav = location.pathname === "/payment";

  return (
    <>
      {!hideNav && <NavBar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/payment" element={<PaymentGateway />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
