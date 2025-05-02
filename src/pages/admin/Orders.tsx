
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Download, Edit, Eye, Filter } from "lucide-react";
import { useAdminOrders } from "@/hooks/useAdminOrders";
import { Textarea } from "@/components/ui/textarea";
import { OrderStatus } from "@/schema/database";
import { Skeleton } from "@/components/ui/skeleton";

const statusColors: Record<string, string> = {
  [OrderStatus.PENDING]: "bg-amber-100 text-amber-700",
  [OrderStatus.CONFIRMED]: "bg-blue-100 text-blue-700",
  [OrderStatus.DELIVERED]: "bg-green-100 text-green-700",
  [OrderStatus.SHIPPED]: "bg-indigo-100 text-indigo-700",
  [OrderStatus.CANCELED]: "bg-red-100 text-red-700",
};

const Orders = () => {
  const {
    orders,
    isLoading,
    selectedOrder,
    dialogOpen,
    setDialogOpen,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleViewOrder,
    handleUpdateOrderStatus,
    handleExportData,
  } = useAdminOrders();
  
  const [newStatus, setNewStatus] = useState<OrderStatus | string>("");
  const [orderNotes, setOrderNotes] = useState("");

  const saveOrderChanges = () => {
    if (selectedOrder && newStatus && Object.values(OrderStatus).includes(newStatus as OrderStatus)) {
      handleUpdateOrderStatus(selectedOrder.id, newStatus as OrderStatus, orderNotes);
      setDialogOpen(false);
    }
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
                  <SelectItem value={OrderStatus.PENDING}>{OrderStatus.PENDING}</SelectItem>
                  <SelectItem value={OrderStatus.CONFIRMED}>{OrderStatus.CONFIRMED}</SelectItem>
                  <SelectItem value={OrderStatus.SHIPPED}>{OrderStatus.SHIPPED}</SelectItem>
                  <SelectItem value={OrderStatus.DELIVERED}>{OrderStatus.DELIVERED}</SelectItem>
                  <SelectItem value={OrderStatus.CANCELED}>{OrderStatus.CANCELED}</SelectItem>
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
                  {isLoading ? (
                    // Loading state with skeletons
                    Array(5).fill(0).map((_, idx) => (
                      <TableRow key={idx}>
                        {Array(9).fill(0).map((_, cellIdx) => (
                          <TableCell key={cellIdx}>
                            <Skeleton className="h-6 w-20" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : orders.length > 0 ? (
                    orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id.substring(0, 8)}</TableCell>
                        <TableCell>{order.customer_name}</TableCell>
                        <TableCell>{order.customer_phone}</TableCell>
                        <TableCell>{order.wilaya}</TableCell>
                        <TableCell>{(order.products as any)?.name || 'Unknown Product'}</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>{`${(order.price * order.quantity).toLocaleString('fr-DZ')} DZD`}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
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
                    ))
                  ) : (
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
              <DialogTitle>Order Details - {selectedOrder.id.substring(0, 8)}</DialogTitle>
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
                    <span className="col-span-2">{selectedOrder.customer_name}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="font-medium">Phone:</span>
                    <span className="col-span-2">{selectedOrder.customer_phone}</span>
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
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[selectedOrder.status]}`}>
                        {selectedOrder.status}
                      </span>
                    </span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="font-medium">Product:</span>
                    <span className="col-span-2">{(selectedOrder.products as any)?.name || 'Unknown Product'}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="font-medium">Quantity:</span>
                    <span className="col-span-2">{selectedOrder.quantity}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="font-medium">Total:</span>
                    <span className="col-span-2 font-semibold">
                      {`${(selectedOrder.price * selectedOrder.quantity).toLocaleString('fr-DZ')} DZD`}
                    </span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="font-medium">Date:</span>
                    <span className="col-span-2">
                      {new Date(selectedOrder.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Update Status</h3>
              
              <div className="space-y-3">
                <Select 
                  defaultValue={selectedOrder.status} 
                  onValueChange={(value) => setNewStatus(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={OrderStatus.PENDING}>{OrderStatus.PENDING}</SelectItem>
                    <SelectItem value={OrderStatus.CONFIRMED}>{OrderStatus.CONFIRMED}</SelectItem>
                    <SelectItem value={OrderStatus.SHIPPED}>{OrderStatus.SHIPPED}</SelectItem>
                    <SelectItem value={OrderStatus.DELIVERED}>{OrderStatus.DELIVERED}</SelectItem>
                    <SelectItem value={OrderStatus.CANCELED}>{OrderStatus.CANCELED}</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="space-y-2">
                  <Label htmlFor="order-notes">Notes (Optional)</Label>
                  <Textarea 
                    id="order-notes" 
                    placeholder="Add notes about this order status change"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveOrderChanges}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Orders;
