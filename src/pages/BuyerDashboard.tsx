
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, ShoppingBag, TrendingUp, DollarSign, Package } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Mock data for demonstration
const mockOrders = [
  { id: 'ORD-001', date: '2024-01-15', items: 3, total: 2499, status: 'Delivered', seller: 'TechStore Inc' },
  { id: 'ORD-002', date: '2024-01-20', items: 1, total: 899, status: 'Processing', seller: 'Fashion Hub' },
  { id: 'ORD-003', date: '2024-01-25', items: 2, total: 1599, status: 'Shipped', seller: 'Electronics World' },
];

const spendingData = [
  { month: 'Jan', amount: 2499 },
  { month: 'Feb', amount: 1899 },
  { month: 'Mar', amount: 3299 },
  { month: 'Apr', amount: 2799 },
  { month: 'May', amount: 1999 },
  { month: 'Jun', amount: 3599 },
];

const categoryData = [
  { name: 'Electronics', value: 45, color: '#0088FE' },
  { name: 'Fashion', value: 30, color: '#00C49F' },
  { name: 'Home & Garden', value: 15, color: '#FFBB28' },
  { name: 'Books', value: 10, color: '#FF8042' },
];

const BuyerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const totalSpent = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = mockOrders.length;
  const avgOrderValue = totalSpent / totalOrders;

  return (
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
                        <p className="text-sm font-medium text-gray-600">Active Orders</p>
                        <p className="text-2xl font-bold text-orange-600">2</p>
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
                  <div className="space-y-4">
                    {mockOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-bpower-blue/10 rounded-lg flex items-center justify-center">
                            <ShoppingBag className="h-6 w-6 text-bpower-blue" />
                          </div>
                          <div>
                            <p className="font-semibold">{order.id}</p>
                            <p className="text-sm text-gray-600">{order.seller} • {order.items} items</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{order.total.toLocaleString()}</p>
                          <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-bpower-blue/10 rounded-lg flex items-center justify-center">
                            <ShoppingBag className="h-6 w-6 text-bpower-blue" />
                          </div>
                          <div>
                            <p className="font-semibold">{order.id}</p>
                            <p className="text-sm text-gray-600">{order.seller}</p>
                            <p className="text-xs text-gray-500">{order.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{order.total.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">{order.items} items</p>
                          <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Spending Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={spendingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                        <Line type="monotone" dataKey="amount" stroke="#1e40af" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Category Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, value}) => `${name}: ${value}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Account Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Order updates</span>
                        <Button variant="outline" size="sm">Enabled</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Promotional emails</span>
                        <Button variant="outline" size="sm">Disabled</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Share purchase history</span>
                        <Button variant="outline" size="sm">Private</Button>
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
  );
};

export default BuyerDashboard;
