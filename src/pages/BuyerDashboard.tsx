
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, ShoppingBag, TrendingUp, DollarSign, Package } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import RoleProtectedRoute from '@/components/RoleProtectedRoute';

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  quantity: number;
  products: {
    name: string;
    image_url: string;
  };
}

const BuyerDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          created_at,
          total_amount,
          status,
          quantity,
          products (
            name,
            image_url
          )
        `)
        .eq('buyer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalSpent = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;
  const completedOrders = orders.filter(order => order.status === 'delivered').length;

  const spendingData = orders.reduce((acc, order) => {
    const month = new Date(order.created_at).toLocaleDateString('en-US', { month: 'short' });
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.amount += Number(order.total_amount);
    } else {
      acc.push({ month, amount: Number(order.total_amount) });
    }
    return acc;
  }, [] as { month: string; amount: number }[]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bpower-blue"></div>
      </div>
    );
  }

  return (
    <RoleProtectedRoute allowedRoles={['buyer']}>
      <div className="min-h-screen bg-gray-50 py-12 mt-[100px]">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-bpower-blue mb-2">
                Welcome back, {user?.user_metadata?.full_name || 'Buyer'}!
              </h1>
              <p className="text-gray-600">Here's your purchasing overview and analytics</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="orders">Order History</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Spent</p>
                          <p className="text-2xl font-bold text-green-600">₹{totalSpent.toLocaleString()}</p>
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
                          <p className="text-sm font-medium text-gray-600">Completed Orders</p>
                          <p className="text-2xl font-bold text-orange-600">{completedOrders}</p>
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
                        <p className="text-gray-600">No orders found. Start shopping to see your orders here!</p>
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

              <TabsContent value="orders" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>All Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {orders.length === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No orders found. Start shopping to see your orders here!</p>
                        <Button className="mt-4" onClick={() => window.location.href = '/marketplace'}>
                          Browse Products
                        </Button>
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
                                <p className="text-sm text-gray-600">Order ID: {order.id.slice(0, 8)}</p>
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

              <TabsContent value="analytics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Spending Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {spendingData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={spendingData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                          <Line type="monotone" dataKey="amount" stroke="#1e40af" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-600">No spending data available yet.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>Email</span>
                          <span className="text-gray-600">{user?.email}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Account Type</span>
                          <Badge>Buyer</Badge>
                        </div>
                      </div>
                    </div>
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

export default BuyerDashboard;
