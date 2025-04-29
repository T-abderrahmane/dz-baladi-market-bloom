
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Calendar as CalendarIcon, Download } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data for charts
const revenueData = [
  { name: "Jan", revenue: 45000 },
  { name: "Feb", revenue: 52000 },
  { name: "Mar", revenue: 48000 },
  { name: "Apr", revenue: 61000 },
  { name: "May", revenue: 55000 },
  { name: "Jun", revenue: 67000 },
  { name: "Jul", revenue: 72000 },
];

const orderStatusData = [
  { name: "Pending", value: 18 },
  { name: "Confirmed", value: 35 },
  { name: "Delivered", value: 143 },
  { name: "Canceled", value: 21 },
];

const ordersByCategoryData = [
  { name: "Cookware", value: 52 },
  { name: "Home Decor", value: 38 },
  { name: "Food", value: 87 },
  { name: "Tableware", value: 23 },
  { name: "Clothing", value: 29 },
  { name: "Accessories", value: 17 },
];

// Colors for the pie charts
const COLORS = ["#C75D36", "#61764B", "#283A4E", "#D4B863", "#9F9053", "#A86B4C"];

// Mock categories and products for filters
const categories = [
  { id: "all", name: "All Categories" },
  { id: "cookware", name: "Cookware" },
  { id: "home-decor", name: "Home Decor" },
  { id: "food", name: "Food" },
  { id: "tableware", name: "Tableware" },
  { id: "clothing", name: "Clothing" },
];

const products = [
  { id: "all", name: "All Products" },
  { id: "tajine", name: "Traditional Tajine Pot" },
  { id: "carpet", name: "Handwoven Berber Carpet" },
  { id: "olive-oil", name: "Algerian Olive Oil (1L)" },
  { id: "dates", name: "Traditional Dates Box" },
  { id: "pottery", name: "Handmade Pottery Set" },
];

const Statistics = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [datePeriod, setDatePeriod] = useState("30");

  // Summary metrics
  const metrics = [
    {
      title: "Total Orders",
      value: "217",
      change: "+12.5%",
      changeType: "positive", // positive | negative | neutral
    },
    {
      title: "Total Revenue",
      value: "526,500 DZD",
      change: "+8.2%",
      changeType: "positive",
    },
    {
      title: "Delivered Revenue",
      value: "385,200 DZD",
      change: "+15.7%",
      changeType: "positive",
    },
    {
      title: "Confirmed Orders",
      value: "35",
      change: "-3.2%",
      changeType: "negative",
    },
    {
      title: "Delivered Orders",
      value: "143",
      change: "+18.5%",
      changeType: "positive",
    },
  ];

  const handleExportData = () => {
    // In a real app, implement CSV export functionality here
    alert("Export functionality would be implemented here");
  };

  // Calculate if date range is selected
  const isDateRangeSelected = !!(dateRange.from && dateRange.to);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Statistics</h1>
        <Button onClick={handleExportData}>
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Product</label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Period</label>
              <Select value={datePeriod} onValueChange={setDatePeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {datePeriod === "custom" && (
              <div>
                <label className="block text-sm font-medium mb-1">Custom Range</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {isDateRangeSelected ? (
                        <>
                          {format(dateRange.from!, "PPP")} - {format(dateRange.to!, "PPP")}
                        </>
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${
                metric.changeType === "positive" ? "text-green-600" : 
                metric.changeType === "negative" ? "text-red-600" : "text-gray-500"
              }`}>
                {metric.change} from previous period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer
              config={{
                revenue: { label: "Revenue", color: "#61764B" },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent labelKey="name" />} />
                  <Bar
                    dataKey="revenue"
                    name="Revenue"
                    fill="var(--color-revenue, #61764B)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Orders Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Orders Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer
              config={{
                orders: { label: "Orders", color: "#C75D36" },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent labelKey="name" />} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    name="Orders"
                    stroke="#C75D36"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Order Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer
              config={{
                orders: { label: "Orders", color: "#C75D36" },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Categories Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Orders by Category</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer
              config={{
                orders: { label: "Orders", color: "#C75D36" },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ordersByCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {ordersByCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Statistics;
