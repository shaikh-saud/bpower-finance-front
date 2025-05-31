
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Package, 
  AlertCircle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar
} from 'recharts';
import RoleProtectedRoute from '@/components/RoleProtectedRoute';
import { useUserData } from '@/hooks/useUserData';

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  quantity: number;
  buyer_id: string;
  products: {
    name: string;
  };
}

interface Product {
  id: string;
  name: string;
  price: number;
  status: string;
  stock_quantity: number;
  created_at: string;
}

const SellerDashboard = () => {
  const { user } = useAuth();
  const { sellerStatus, loading: userLoading } = useUserData();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (sellerStatus === 'approved') {
      fetchSellerData();
    }
  }, [user, sellerStatus]);

  const fetchSellerData = async () => {
    if (!user) return;

    try {
      // Fetch orders for seller's products
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          id,
          created_at,
          total_amount,
          status,
          quantity,
          buyer_id,
          products (
            name
          )
        `)
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // Fetch seller's products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;

      setOrders(ordersData || []);
      setProducts(productsData || []);
    } catch (error) {
      console.error('Error fetching seller data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (userLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bpower-blue"></div>
      </div>
    );
  }

  // Show different content based on seller status
  if (sellerStatus !== 'approved') {
    return (
      <RoleProtectedRoute allowedRoles={['seller']}>
        <div className="min-h-screen bg-gray-50 py-12 mt-[100px]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="p-8">
                  <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    {sellerStatus === 'pending' ? 'Application Under Review' : 
                     sellerStatus === 'rejected' ? 'Application Rejected' : 
                     'Seller Application Required'}
                  </h1>
                  <p className="text-gray-600 mb-6">
                    {sellerStatus === 'pending' ? 
                      'Your seller application is currently being reviewed by our admin team. You will be notified once approved.' :
                     sellerStatus === 'rejected' ? 
                      'Your seller application was rejected. Please contact support for more information.' :
                      'You need to submit a seller application to access the seller dashboard.'
                    }
                  </p>
                  {!sellerStatus && (
                    <Button onClick={() => window.location.href = '/seller-application'}>
                      Apply to Become a Seller
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </RoleProtectedRoute>
    );
  }

  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const activeProducts = products.filter(p => p.status === 'active').length;

  const salesData = orders.reduce((acc, order) => {
    const date = new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.sales += Number(order.total_amount);
      existing.orders += 1;
    } else {
      acc.push({ date, sales: Number(order.total_amount), orders: 1 });
    }
    return acc;
  }, [] as { date: string; sales: number; orders: number }[]);

  return (
    <RoleProtectedRoute allowedRoles={['seller']}>
      <div className="min-h-screen bg-gray-50 py-12 mt-[100px]">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-bpower-blue mb-2">
                Seller Dashboard
              </h1>
              <p className="text-gray-600">Track your business performance and analytics</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                          <p className="text-2xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Orders</p>
                          <p className="text-2xl font-bold text-blue-600">{totalOrders}</p>
                        </div>
                        <ShoppingBag className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                          <p className="text-2xl font-bold text-purple-600">₹{Math.round(avgOrderValue).toLocaleString()}</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-purple-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Active Products</p>
                          <p className="text-2xl font-bold text-orange-600">{activeProducts}</p>
                        </div>
                        <Package className="h-8 w-8 text-orange-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Orders */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {orders.length === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No orders yet. Add products to start selling!</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.slice(0, 5).map((order) => (
                          <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-bpower-blue/10 rounded-lg flex items-center justify-center">
                                <ShoppingBag className="h-6 w-6 text-bpower-blue" />
                              </div>
                              <div>
                                <p className="font-semibold">{order.products?.name || 'Product'}</p>
                                <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                                <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">₹{Number(order.total_amount).toLocaleString()}</p>
                              <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {salesData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip formatter={(value, name) => [name === 'sales' ? `₹${value}` : value, name === 'sales' ? 'Revenue' : 'Orders']} />
                          <Line type="monotone" dataKey="sales" stroke="#1e40af" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-600">No sales data available yet.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="products" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {products.length === 0 ? (
                      <div className="text-center py-8">
                        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No products added yet. Start by adding your first product!</p>
                        <Button className="mt-4">Add Product</Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {products.map((product) => (
                          <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-semibold">{product.name}</p>
                              <p className="text-sm text-gray-600">Stock: {product.stock_quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">₹{Number(product.price).toLocaleString()}</p>
                              <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                                {product.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {orders.length === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No orders yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-bpower-blue/10 rounded-lg flex items-center justify-center">
                                <ShoppingBag className="h-6 w-6 text-bpower-blue" />
                              </div>
                              <div>
                                <p className="font-semibold">{order.products?.name || 'Product'}</p>
                                <p className="text-sm text-gray-600">Order: {order.id.slice(0, 8)}</p>
                                <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">₹{Number(order.total_amount).toLocaleString()}</p>
                              <p className="text-sm text-gray-600">Qty: {order.quantity}</p>
                              <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </RoleProtectedRoute>
  );
};

export default SellerDashboard;
