
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Line, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Package, Users, ShoppingCart, DollarSign, Clock, Eye } from "lucide-react";

// Mock data for the dashboard
const statsData = [
  {
    title: "Total Revenue",
    value: "526,500 DZD",
    icon: DollarSign,
    change: "+12.5%",
    changeType: "positive", // positive | negative | neutral
  },
  {
    title: "Delivered Orders Revenue",
    value: "385,200 DZD",
    icon: ShoppingCart,
    change: "+8.2%",
    changeType: "positive",
  },
  {
    title: "Total Orders",
    value: "217",
    icon: Package,
    change: "+24.3%",
    changeType: "positive",
  },
  {
    title: "Total Visitors",
    value: "8,642",
    icon: Users,
    change: "+32.1%",
    changeType: "positive",
  },
];

const revenueData = [
  { name: "Jan", revenue: 45000 },
  { name: "Feb", revenue: 52000 },
  { name: "Mar", revenue: 48000 },
  { name: "Apr", revenue: 61000 },
  { name: "May", revenue: 55000 },
  { name: "Jun", revenue: 67000 },
  { name: "Jul", revenue: 72000 },
];

const recentOrders = [
  {
    id: "ORD-7652",
    customer: "Ahmed Benali",
    phone: "0771234567",
    wilaya: "Algiers",
    products: "Traditional Tajine Pot",
    quantity: 1,
    total: "3,600 DZD",
    status: "Pending"
  },
  {
    id: "ORD-7651",
    customer: "Fatima Zahra",
    phone: "0661234567",
    wilaya: "Oran",
    products: "Handwoven Berber Carpet",
    quantity: 1,
    total: "12,500 DZD",
    status: "Confirmed"
  },
  {
    id: "ORD-7650",
    customer: "Karim Hadj",
    phone: "0551234567",
    wilaya: "Constantine",
    products: "Algerian Olive Oil (1L)",
    quantity: 2,
    total: "2,400 DZD",
    status: "Delivered"
  },
  {
    id: "ORD-7649",
    customer: "Amina Belkacem",
    phone: "0661234567",
    wilaya: "Tlemcen",
    products: "Traditional Dates Box",
    quantity: 3,
    total: "4,500 DZD",
    status: "Confirmed"
  },
  {
    id: "ORD-7648",
    customer: "Youcef Mansouri",
    phone: "0771234567",
    wilaya: "Béjaïa",
    products: "Handmade Pottery Set",
    quantity: 1,
    total: "5,800 DZD",
    status: "Delivered"
  },
];

const popularProducts = [
  {
    id: "1",
    name: "Traditional Tajine Pot",
    category: "Cookware",
    sales: 42,
    revenue: "151,200 DZD",
    status: "In Stock"
  },
  {
    id: "2",
    name: "Handwoven Berber Carpet",
    category: "Home Decor",
    sales: 28,
    revenue: "350,000 DZD",
    status: "In Stock"
  },
  {
    id: "3",
    name: "Algerian Olive Oil (1L)",
    category: "Food",
    sales: 76,
    revenue: "91,200 DZD",
    status: "Low Stock"
  },
  {
    id: "4",
    name: "Traditional Dates Box",
    category: "Food",
    sales: 56,
    revenue: "84,000 DZD",
    status: "In Stock"
  },
  {
    id: "5",
    name: "Handmade Pottery Set",
    category: "Tableware",
    sales: 31,
    revenue: "179,800 DZD",
    status: "In Stock"
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className="h-8 w-8 rounded-full bg-baladi-olive/10 flex items-center justify-center text-baladi-olive">
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.changeType === "positive" ? "text-green-600" : 
                stat.changeType === "negative" ? "text-red-600" : "text-gray-500"
              }`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#61764B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="ghost" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.slice(0, 5).map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Delivered" ? "bg-green-100 text-green-700" : 
                          order.status === "Pending" ? "bg-amber-100 text-amber-700" :
                          "bg-blue-100 text-blue-700"
                        }`}>
                          {order.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Popular Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Popular Products</CardTitle>
            <Button variant="ghost" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {popularProducts.slice(0, 5).map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.sales}</TableCell>
                      <TableCell>{product.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
