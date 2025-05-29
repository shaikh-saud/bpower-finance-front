
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Marketplace from "./pages/Marketplace";
import NavBar from "./components/NavBar";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useSidebar } from "./components/ui/sidebar";
import PaymentGateway from "./pages/PaymentGateway";
import BlogDetail from "./pages/BlogDetail";
import Blog from "./pages/Blog";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
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

// Component to handle auth-based redirects
const AuthRedirect = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return <Navigate to="/login" replace />;
};

// Helper to access location inside App
const AppContent = () => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const hideNav = location.pathname === "/payment" || location.pathname === "/auth";

  // Don't render anything until auth is loaded
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bpower-blue mx-auto"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {!hideNav && <NavBar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/signup" element={user ? <Navigate to="/" replace /> : <SignUp />} />
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/auth" element={<AuthRedirect />} />
        <Route path="/profile" element={<Profile />} />
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
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
