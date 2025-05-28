
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { TrendingUp, TrendingDown, Users, ShoppingBag, User, Database } from "lucide-react";

const data = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 300 },
  { name: "Mar", sales: 500 },
  { name: "Apr", sales: 280 },
  { name: "May", sales: 590 },
  { name: "Jun", sales: 320 },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Active Sellers"
          value="124"
          trend="+12%"
          increasing={true}
          icon={<Users className="h-8 w-8 text-blue-500" />}
        />
        <StatCard 
          title="Active Buyers" 
          value="1,432" 
          trend="+18%" 
          increasing={true}
          icon={<User className="h-8 w-8 text-green-500" />}
        />
        <StatCard 
          title="Pending Approvals" 
          value="28" 
          trend="-5%" 
          increasing={false}
          icon={<ShoppingBag className="h-8 w-8 text-amber-500" />}
        />
        <StatCard 
          title="Total Sales" 
          value="₹52L" 
          trend="+24%" 
          increasing={true}
          icon={<Database className="h-8 w-8 text-purple-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "2 hours ago", text: "New seller registration: Organic Foods Ltd" },
                { time: "5 hours ago", text: "Product listing approved: Handmade Ceramic Plates" },
                { time: "1 day ago", text: "Transaction completed: Order #58214" },
                { time: "2 days ago", text: "New buyer registration: Metro Retail Chain" },
                { time: "3 days ago", text: "Product listing rejected: Non-compliant Electronics" },
              ].map((activity, index) => (
                <div key={index} className="flex justify-between border-b pb-2 last:border-0">
                  <p>{activity.text}</p>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper component for dashboard stats
const StatCard = ({ 
  title, 
  value, 
  trend, 
  increasing, 
  icon 
}: { 
  title: string; 
  value: string; 
  trend: string; 
  increasing: boolean; 
  icon: React.ReactNode;
}) => {
  return (
    <Card>
      <CardContent className="flex items-center p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          <div className="flex items-center mt-1">
            {increasing ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={increasing ? "text-green-500" : "text-red-500"}>
              {trend}
            </span>
          </div>
        </div>
        <div>{icon}</div>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;