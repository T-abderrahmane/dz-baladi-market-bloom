
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { statisticsService } from '@/services/statisticsService';

export const useAdminStatistics = () => {
  const [statistics, setStatistics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const loadStatistics = async () => {
    setIsLoading(true);
    try {
      const data = await statisticsService.getOverallStatistics();
      setStatistics(data);
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch statistics:", err);
      setError(err);
      toast({
        title: "Error",
        description: "Failed to load statistics. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStatistics();
  }, []);

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString('fr-DZ')} DZD`;
  };

  // Prepare data for display
  const metrics = statistics ? [
    {
      title: "Total Orders",
      value: `${statistics.totalOrders}`,
      change: "+12.5%", // In a real app, would calculate this dynamically
      changeType: "positive" as const,
    },
    {
      title: "Total Revenue",
      value: formatCurrency(statistics.totalRevenue),
      change: "+8.2%",
      changeType: "positive" as const,
    },
    {
      title: "Delivered Revenue",
      value: formatCurrency(statistics.deliveredRevenue),
      change: "+15.7%",
      changeType: "positive" as const,
    },
    {
      title: "Confirmed Orders",
      value: `${statistics.confirmedOrders}`,
      change: "-3.2%",
      changeType: "negative" as const,
    },
    {
      title: "Delivered Orders",
      value: `${statistics.deliveredOrders}`,
      change: "+18.5%",
      changeType: "positive" as const,
    },
  ] : [];

  return {
    statistics,
    metrics,
    isLoading,
    error,
    revenueData: statistics?.revenueData || [],
    orderStatusData: statistics?.orderStatusData || [],
    ordersByCategoryData: statistics?.ordersByCategoryData || [],
    refreshStatistics: loadStatistics,
  };
};
