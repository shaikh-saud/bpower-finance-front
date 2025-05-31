
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
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
  Star,
  Eye,
  ArrowUp,
  ArrowDown
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
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts';

// Mock data for seller analytics
const salesData = {
  '24h': [
    { time: '00:00', sales: 120, orders: 5 },
    { time: '06:00', sales: 250, orders: 8 },
    { time: '12:00', sales: 380, orders: 12 },
    { time: '18:00', sales: 290, orders: 9 },
  ],
  'week': [
    { day: 'Mon', sales: 1200, orders: 15 },
    { day: 'Tue', sales: 1890, orders: 23 },
    { day: 'Wed', sales: 2100, orders: 28 },
    { day: 'Thu', sales: 1750, orders: 21 },
    { day: 'Fri', sales: 2300, orders: 31 },
    { day: 'Sat', sales: 2800, orders: 35 },
    { day: 'Sun', sales: 2200, orders: 29 },
  ],
  'month': [
    { week: 'Week 1', sales: 8500, orders: 95 },
    { week: 'Week 2', sales: 12300, orders: 142 },
    { week: 'Week 3', sales: 15600, orders: 178 },
    { week: 'Week 4', sales: 18200, orders: 201 },
  ],
  'year': [
    { month: 'Jan', sales: 45000, orders: 520 },
    { month: 'Feb', sales: 52000, orders: 598 },
    { month: 'Mar', sales: 48000, orders: 545 },
    { month: 'Apr', sales: 61000, orders: 678 },
    { month: 'May', sales: 55000, orders: 612 },
    { month: 'Jun', sales: 67000, orders: 734 },
  ]
};

const topProducts = [
  { name: 'Wireless Headphones', sales: 45, revenue: 22500, views: 1250 },
  { name: 'Smart Watch', sales: 32, revenue: 19200, views: 980 },
  { name: 'Phone Case', sales: 28, revenue: 8400, views: 750 },
  { name: 'Laptop Stand', sales: 22, revenue: 11000, views: 650 },
  { name: 'USB Cable', sales: 18, revenue: 3600, views: 420 },
];

const lowPerformingProducts = [
  { name: 'Gaming Mouse', sales: 2, revenue: 1200, views: 85 },
  { name: 'Keyboard Cover', sales: 1, revenue: 299, views: 45 },
  { name: 'Screen Protector', sales: 3, revenue: 897, views: 120 },
];

const recentTransactions = [
  { id: 'TXN-001', buyer: 'John Doe', product: 'Wireless Headphones', amount: 2499, date: '2024-01-25' },
  { id: 'TXN-002', buyer: 'Jane Smith', product: 'Smart Watch', amount: 5999, date: '2024-01-25' },
  { id: 'TXN-003', buyer: 'Mike Johnson', product: 'Phone Case', amount: 799, date: '2024-01-24' },
];

const SellerDashboard = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [activeTab, setActiveTab] = useState('overview');

  const currentData = salesData[selectedPeriod as keyof typeof salesData];
  const totalRevenue = currentData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = currentData.reduce((sum, item) => sum + item.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-[100px]">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-bpower-blue mb-2">
                Seller Dashboard
              </h1>
              <p className="text-gray-600">Track your business performance and analytics</p>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
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
                        <p className="text-xs text-green-500 flex items-center mt-1">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          +12.5% vs last period
                        </p>
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
                        <p className="text-xs text-green-500 flex items-center mt-1">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          +8.2% vs last period
                        </p>
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
                        <p className="text-xs text-green-500 flex items-center mt-1">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          +4.1% vs last period
                        </p>
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
                        <p className="text-2xl font-bold text-orange-600">24</p>
                        <p className="text-xs text-orange-500 flex items-center mt-1">
                          <ArrowDown className="h-3 w-3 mr-1" />
                          -2 this month
                        </p>
                      </div>
                      <Package className="h-8 w-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sales Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Sales Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={currentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={selectedPeriod === '24h' ? 'time' : selectedPeriod === 'week' ? 'day' : selectedPeriod === 'month' ? 'week' : 'month'} />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [name === 'sales' ? `₹${value}` : value, name === 'sales' ? 'Revenue' : 'Orders']} />
                      <Area type="monotone" dataKey="sales" stackId="1" stroke="#1e40af" fill="#1e40af" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="orders" stackId="2" stroke="#059669" fill="#059669" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-bpower-blue/10 rounded-lg flex items-center justify-center">
                            <DollarSign className="h-6 w-6 text-bpower-blue" />
                          </div>
                          <div>
                            <p className="font-semibold">{transaction.id}</p>
                            <p className="text-sm text-gray-600">{transaction.buyer} • {transaction.product}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{transaction.amount.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
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
                    <CardTitle>Revenue Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={currentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={selectedPeriod === '24h' ? 'time' : selectedPeriod === 'week' ? 'day' : selectedPeriod === 'month' ? 'week' : 'month'} />
                        <YAxis />
                        <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                        <Line type="monotone" dataKey="sales" stroke="#1e40af" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Order Volume</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={currentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={selectedPeriod === '24h' ? 'time' : selectedPeriod === 'week' ? 'day' : selectedPeriod === 'month' ? 'week' : 'month'} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="orders" fill="#059669" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topProducts.map((product, index) => (
                        <div key={product.name} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                            </div>
                            <div>
                              <p className="font-semibold">{product.name}</p>
                              <p className="text-sm text-gray-600">{product.sales} sales • {product.views} views</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">₹{product.revenue.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Low Performing Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {lowPerformingProducts.map((product, index) => (
                        <div key={product.name} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-red-600">!</span>
                            </div>
                            <div>
                              <p className="font-semibold">{product.name}</p>
                              <p className="text-sm text-gray-600">{product.sales} sales • {product.views} views</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">₹{product.revenue.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-bpower-blue/10 rounded-lg flex items-center justify-center">
                            <ShoppingBag className="h-6 w-6 text-bpower-blue" />
                          </div>
                          <div>
                            <p className="font-semibold">{transaction.id}</p>
                            <p className="text-sm text-gray-600">{transaction.product}</p>
                            <p className="text-xs text-gray-500">Buyer: {transaction.buyer}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{transaction.amount.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                          <Badge variant="default">Processing</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="customers">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">156</p>
                      <p className="text-sm text-gray-600">Total Customers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">89%</p>
                      <p className="text-sm text-gray-600">Customer Satisfaction</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">32</p>
                      <p className="text-sm text-gray-600">Repeat Customers</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Top Customers</h3>
                    {recentTransactions.map((transaction, index) => (
                      <div key={transaction.buyer} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-bpower-blue/10 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-bpower-blue" />
                          </div>
                          <div>
                            <p className="font-semibold">{transaction.buyer}</p>
                            <p className="text-sm text-gray-600">Last purchase: {transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{(transaction.amount * (index + 2)).toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Total spent</p>
                        </div>
                      </div>
                    ))}
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

export default SellerDashboard;
