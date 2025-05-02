
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { orderService } from '@/services/orderService';
import { statisticsService } from '@/services/statisticsService';
import { Order } from '@/schema/database';

export const useAdminDashboard = () => {
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [orders, stats] = await Promise.all([
        orderService.getAll(),
        statisticsService.getOverallStatistics()
      ]);
      
      setRecentOrders(orders.slice(0, 5)); // Take only 5 most recent orders
      setStatistics(stats);
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch dashboard data:", err);
      setError(err);
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString('fr-DZ')} DZD`;
  };

  // Prepare data for display
  const statsData = statistics ? [
    {
      title: "Total Revenue",
      value: formatCurrency(statistics.totalRevenue),
      icon: "DollarSign" as const,
      change: "+12.5%", // In a real app, would calculate this dynamically
      changeType: "positive" as const,
    },
    {
      title: "Delivered Orders Revenue",
      value: formatCurrency(statistics.deliveredRevenue),
      icon: "ShoppingCart" as const,
      change: "+8.2%",
      changeType: "positive" as const,
    },
    {
      title: "Total Orders",
      value: `${statistics.totalOrders}`,
      icon: "Package" as const,
      change: "+24.3%",
      changeType: "positive" as const,
    },
    {
      title: "Total Visitors",
      value: "8,642", // Placeholder - would be from analytics in a real app
      icon: "Users" as const,
      change: "+32.1%",
      changeType: "positive" as const,
    },
  ] : [];

  const popularProducts = statistics?.bestSellingProducts?.map((product: any) => ({
    id: product.productId,
    name: product.name,
    sales: product.count,
    revenue: formatCurrency(product.revenue),
    status: product.revenue > 10000 ? "In Stock" : (product.revenue > 5000 ? "Low Stock" : "Out of Stock")
  })) || [];

  return {
    recentOrders,
    popularProducts,
    statsData,
    revenueData: statistics?.revenueData || [],
    isLoading,
    error,
    refreshDashboard: loadDashboardData,
  };
};
