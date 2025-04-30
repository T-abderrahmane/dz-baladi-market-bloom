
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

// Import data
import { 
  revenueData, 
  orderStatusData, 
  ordersByCategoryData, 
  COLORS, 
  categories, 
  products, 
  metrics 
} from "@/data/statistics-data";

const Statistics = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [datePeriod, setDatePeriod] = useState("30");

  const handleExportData = () => {
    // In a real app, implement CSV export functionality here
    alert("Export functionality would be implemented here");
  };

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
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
      </div>
    </div>
  );
};

export default Statistics;
