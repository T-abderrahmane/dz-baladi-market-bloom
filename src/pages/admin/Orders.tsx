
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Download, Edit, Eye, Filter } from "lucide-react";

// Mock orders data
const ordersData = [
  {
    id: "ORD-7652",
    customer: "Ahmed Benali",
    phone: "0771234567",
    wilaya: "Algiers",
    commune: "Bab Ezzouar",
    address: "Cité 20 Août, Bloc 5, No 12",
    products: "Traditional Tajine Pot",
    quantity: 1,
    total: "3,600 DZD",
    status: "Pending",
    deliveryType: "Home"
  },
  {
    id: "ORD-7651",
    customer: "Fatima Zahra",
    phone: "0661234567",
    wilaya: "Oran",
    commune: "Bir El Djir",
    address: "Rue des oliviers, N°7",
    products: "Handwoven Berber Carpet",
    quantity: 1,
    total: "12,500 DZD",
    status: "Confirmed",
    deliveryType: "Post Office"
  },
  {
    id: "ORD-7650",
    customer: "Karim Hadj",
    phone: "0551234567",
    wilaya: "Constantine",
    commune: "Zighoud Youcef",
    address: "Cité El Nasr, Bloc 3, No 22",
    products: "Algerian Olive Oil (1L)",
    quantity: 2,
    total: "2,400 DZD",
    status: "Delivered",
    deliveryType: "Home"
  },
  {
    id: "ORD-7649",
    customer: "Amina Belkacem",
    phone: "0661234567",
    wilaya: "Tlemcen",
    commune: "Mansourah",
    address: "Rue Ali Benosmane, N°15",
    products: "Traditional Dates Box",
    quantity: 3,
    total: "4,500 DZD",
    status: "Confirmed",
    deliveryType: "Home"
  },
  {
    id: "ORD-7648",
    customer: "Youcef Mansouri",
    phone: "0771234567",
    wilaya: "Béjaïa",
    commune: "Souk El Tenine",
    address: "Rue principale, N°32",
    products: "Handmade Pottery Set",
    quantity: 1,
    total: "5,800 DZD",
    status: "Delivered",
    deliveryType: "Post Office"
  },
  {
    id: "ORD-7647",
    customer: "Naima Ayache",
    phone: "0551234567",
    wilaya: "Annaba",
    commune: "El Bouni",
    address: "Cité 1000 logements, Bloc A, No 5",
    products: "Traditional Spices Box",
    quantity: 2,
    total: "3,200 DZD",
    status: "Canceled",
    deliveryType: "Home"
  },
  {
    id: "ORD-7646",
    customer: "Mohamed Benaouda",
    phone: "0661234567",
    wilaya: "Sétif",
    commune: "Ain Arnat",
    address: "Route nationale N°5, Cité El Hidhab",
    products: "Handcrafted Leather Bag",
    quantity: 1,
    total: "7,500 DZD",
    status: "Pending",
    deliveryType: "Home"
  },
  {
    id: "ORD-7645",
    customer: "Salima Hamdi",
    phone: "0771234567",
    wilaya: "Batna",
    commune: "Tazoult",
    address: "Rue des frères Bencheikh, N°8",
    products: "Algerian Honey (500g)",
    quantity: 3,
    total: "6,300 DZD",
    status: "Confirmed",
    deliveryType: "Post Office"
  },
];

const statusColors = {
  Pending: "bg-amber-100 text-amber-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Canceled: "bg-red-100 text-red-700"
};

// Mock product categories
const productCategories = ["All Categories", "Cookware", "Food", "Home Decor", "Tableware", "Clothing"];

// Mock products
const products = [
  "All Products",
  "Traditional Tajine Pot",
  "Handwoven Berber Carpet",
  "Algerian Olive Oil (1L)",
  "Traditional Dates Box",
  "Handmade Pottery Set",
  "Traditional Spices Box",
  "Handcrafted Leather Bag",
  "Algerian Honey (500g)"
];

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [productFilter, setProductFilter] = useState("All Products");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filter orders based on search term and filters
  const filteredOrders = ordersData.filter(order => {
    // Search filter
    const matchesSearch = Object.values(order).some(
      value => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Status filter
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;

    // For product and category filters, in a real app you would have more detailed product data
    // This is simplified for the purpose of this example
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleExportData = () => {
    // In a real app, implement CSV/Excel export functionality here
    alert("Export functionality would be implemented here");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Button onClick={handleExportData}>
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search and filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search orders..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={productFilter} onValueChange={setProductFilter}>
                <SelectTrigger>
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map(product => (
                    <SelectItem key={product} value={product}>{product}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Orders table */}
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Wilaya</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.phone}</TableCell>
                      <TableCell>{order.wilaya}</TableCell>
                      <TableCell>{order.products}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[order.status as keyof typeof statusColors]}`}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredOrders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8">
                        No orders found matching your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order detail dialog */}
      {selectedOrder && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Order Details - {selectedOrder.id}</DialogTitle>
              <DialogDescription>
                Viewing complete information for this order
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Customer Information</h3>
                
                <div className="space-y-2">
                  <div className="grid grid-cols-3">
                    <span className="font-medium">Name:</span>
                    <span className="col-span-2">{selectedOrder.customer}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="font-medium">Phone:</span>
                    <span className="col-span-2">{selectedOrder.phone}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="font-medium">Wilaya:</span>
                    <span className="col-span-2">{selectedOrder.wilaya}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="font-medium">Commune:</span>
                    <span className="col-span-2">{selectedOrder.commune}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="font-medium">Address:</span>
                    <span className="col-span-2">{selectedOrder.address}</span>
                  </div>
                </div>
              </div>

              {/* Order Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Order Information</h3>
                
                <div className="space-y-2">
                  <div className="grid grid-cols-3">
                    <span className="font-medium">Status:</span>
                    <span className="col-span-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[selectedOrder.status as keyof typeof statusColors]}`}>
                        {selectedOrder.status}
                      </span>
                    </span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="font-medium">Product:</span>
                    <span className="col-span-2">{selectedOrder.products}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="font-medium">Quantity:</span>
                    <span className="col-span-2">{selectedOrder.quantity}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="font-medium">Total:</span>
                    <span className="col-span-2 font-semibold">{selectedOrder.total}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="font-medium">Delivery:</span>
                    <span className="col-span-2">{selectedOrder.deliveryType} Delivery</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Update Status</h3>
              <div className="flex space-x-2">
                <Select defaultValue={selectedOrder.status}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Orders;
