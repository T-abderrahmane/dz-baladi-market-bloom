
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { orderService } from '@/services/orderService';
import { OrderStatus, Order } from '@/schema/database';

export const useAdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const { toast } = useToast();

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const data = await orderService.getAll();
      setOrders(data);
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch orders:", err);
      setError(err);
      toast({
        title: "Error",
        description: "Failed to load orders. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleUpdateOrderStatus = async (orderId: string, status: OrderStatus, notes?: string) => {
    try {
      const updatedOrder = await orderService.updateStatus(orderId, status, notes);
      setOrders(orders.map(order => order.id === orderId ? updatedOrder : order));
      setSelectedOrder(prevOrder => prevOrder && prevOrder.id === orderId ? updatedOrder : prevOrder);
      
      toast({
        title: "Order Updated",
        description: `Order ${orderId} status changed to ${status}`,
      });
    } catch (err) {
      console.error("Failed to update order status:", err);
      toast({
        title: "Update Failed",
        description: "Could not update order status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredOrders = orders.filter(order => {
    // Search filter
    const matchesSearch = 
      order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.wilaya?.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleExportData = () => {
    // Implementation for exporting order data
    alert("Export functionality would be implemented here");
  };

  return {
    orders: filteredOrders,
    isLoading,
    error,
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
    refreshOrders: loadOrders,
  };
};
