
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock } from 'lucide-react';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Admin authentication logic would go here
      // For demo purposes, using hardcoded credentials
      if (loginForm.email === 'admin@bpower.com' && loginForm.password === 'admin123') {
        toast.success('Admin login successful!');
        navigate('/admin');
      } else {
        toast.error('Invalid admin credentials');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      toast.error('Admin login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-bpower-blue rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-bpower-blue">Admin Portal</h2>
          <p className="mt-2 text-sm text-gray-600">
            Secure access to B-Power administration
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-bpower-blue text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-center">
              <Lock className="h-5 w-5 mr-2" />
              Admin Access
            </CardTitle>
            <CardDescription className="text-blue-100 text-center">
              Enter your administrator credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  placeholder="admin@bpower.com"
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="admin-password">Admin Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="Enter admin password"
                  required
                  className="mt-1"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-bpower-blue hover:bg-bpower-green"
                disabled={isLoading}
              >
                {isLoading ? 'Authenticating...' : 'Access Admin Panel'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                <p className="font-semibold mb-1">Demo Credentials:</p>
                <p>Email: admin@bpower.com</p>
                <p>Password: admin123</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            variant="link"
            className="text-bpower-blue"
            onClick={() => navigate('/')}
          >
            ← Back to Marketplace
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
