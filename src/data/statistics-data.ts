
// Mock data for charts
export const revenueData = [
  { name: "Jan", revenue: 45000 },
  { name: "Feb", revenue: 52000 },
  { name: "Mar", revenue: 48000 },
  { name: "Apr", revenue: 61000 },
  { name: "May", revenue: 55000 },
  { name: "Jun", revenue: 67000 },
  { name: "Jul", revenue: 72000 },
];

export const orderStatusData = [
  { name: "Pending", value: 18 },
  { name: "Confirmed", value: 35 },
  { name: "Delivered", value: 143 },
  { name: "Canceled", value: 21 },
];

export const ordersByCategoryData = [
  { name: "Cookware", value: 52 },
  { name: "Home Decor", value: 38 },
  { name: "Food", value: 87 },
  { name: "Tableware", value: 23 },
  { name: "Clothing", value: 29 },
  { name: "Accessories", value: 17 },
];

// Colors for the pie charts
export const COLORS = ["#C75D36", "#61764B", "#283A4E", "#D4B863", "#9F9053", "#A86B4C"];

// Mock categories and products for filters
export const categories = [
  { id: "all", name: "All Categories" },
  { id: "cookware", name: "Cookware" },
  { id: "home-decor", name: "Home Decor" },
  { id: "food", name: "Food" },
  { id: "tableware", name: "Tableware" },
  { id: "clothing", name: "Clothing" },
];

export const products = [
  { id: "all", name: "All Products" },
  { id: "tajine", name: "Traditional Tajine Pot" },
  { id: "carpet", name: "Handwoven Berber Carpet" },
  { id: "olive-oil", name: "Algerian Olive Oil (1L)" },
  { id: "dates", name: "Traditional Dates Box" },
  { id: "pottery", name: "Handmade Pottery Set" },
];

// Summary metrics
export const metrics = [
  {
    title: "Total Orders",
    value: "217",
    change: "+12.5%",
    changeType: "positive" as const, // positive | negative | neutral
  },
  {
    title: "Total Revenue",
    value: "526,500 DZD",
    change: "+8.2%",
    changeType: "positive" as const,
  },
  {
    title: "Delivered Revenue",
    value: "385,200 DZD",
    change: "+15.7%",
    changeType: "positive" as const,
  },
  {
    title: "Confirmed Orders",
    value: "35",
    change: "-3.2%",
    changeType: "negative" as const,
  },
  {
    title: "Delivered Orders",
    value: "143",
    change: "+18.5%",
    changeType: "positive" as const,
  },
];
