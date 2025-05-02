
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { DateRange } from "react-day-picker";

// Import components
import StatisticsFilters from "@/components/admin/statistics/StatisticsFilters";
import MetricCard from "@/components/admin/statistics/MetricCard";
import RevenueChart from "@/components/admin/charts/RevenueChart";
import OrdersTrendChart from "@/components/admin/charts/OrdersTrendChart";
import PieChartDisplay from "@/components/admin/charts/PieChartDisplay";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminStatistics } from "@/hooks/useAdminStatistics";

// Colors for the pie charts
const COLORS = ["#C75D36", "#61764B", "#283A4E", "#D4B863", "#9F9053", "#A86B4C"];

const Statistics = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [datePeriod, setDatePeriod] = useState("30");

  const {
    statistics,
    metrics,
    isLoading,
    error,
    revenueData,
    orderStatusData,
    ordersByCategoryData
  } = useAdminStatistics();

  const handleExportData = () => {
    // In a real app, implement CSV export functionality here
    alert("Export functionality would be implemented here");
  };

  // Get categories and products for filters
  const categories = statistics ? [
    { id: "all", name: "All Categories" },
    ...Object.keys(statistics.ordersByCategory || {}).map((categoryId) => ({
      id: categoryId,
      name: statistics.categories?.find((c: any) => c.id === categoryId)?.name || "Unknown Category"
    }))
  ] : [];

  const products = statistics ? [
    { id: "all", name: "All Products" },
    ...statistics.bestSellingProducts?.map((p: any) => ({
      id: p.productId,
      name: p.name
    })) || []
  ] : [];

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
      <StatisticsFilters
        selectedCategory={selectedCategory}
        selectedProduct={selectedProduct}
        dateRange={dateRange}
        datePeriod={datePeriod}
        onCategoryChange={setSelectedCategory}
        onProductChange={setSelectedProduct}
        onDateRangeChange={setDateRange}
        onDatePeriodChange={setDatePeriod}
        categories={categories}
        products={products}
      />

      {/* Summary Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {isLoading ? (
          // Loading state with skeletons
          Array(5).fill(0).map((_, idx) => (
            <div key={idx} className="p-6 rounded-lg border">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))
        ) : (
          metrics.map((metric) => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
            />
          ))
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          // Loading state with skeletons for charts
          Array(4).fill(0).map((_, idx) => (
            <div key={idx} className="p-6 rounded-lg border h-80">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="h-64 flex items-center justify-center">
                <Skeleton className="h-full w-full" />
              </div>
            </div>
          ))
        ) : (
          <>
            {/* Revenue Chart */}
            <RevenueChart data={revenueData} />

            {/* Orders Trend Chart */}
            <OrdersTrendChart data={revenueData} />

            {/* Order Status Chart */}
            <PieChartDisplay 
              data={orderStatusData}
              title="Order Status Distribution"
              colors={COLORS}
            />

            {/* Categories Distribution Chart */}
            <PieChartDisplay 
              data={ordersByCategoryData}
              title="Orders by Category"
              colors={COLORS}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Statistics;
