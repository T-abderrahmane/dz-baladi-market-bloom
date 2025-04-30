
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

interface FiltersProps {
  selectedCategory: string;
  selectedProduct: string;
  dateRange: DateRange;
  datePeriod: string;
  onCategoryChange: (value: string) => void;
  onProductChange: (value: string) => void;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onDatePeriodChange: (value: string) => void;
  categories: { id: string; name: string }[];
  products: { id: string; name: string }[];
}

const StatisticsFilters = ({
  selectedCategory,
  selectedProduct,
  dateRange,
  datePeriod,
  onCategoryChange,
  onProductChange,
  onDateRangeChange,
  onDatePeriodChange,
  categories,
  products
}: FiltersProps) => {
  
  // Calculate if date range is selected
  const isDateRangeSelected = !!(dateRange.from && dateRange.to);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
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
            <Select value={selectedProduct} onValueChange={onProductChange}>
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
            <Select value={datePeriod} onValueChange={onDatePeriodChange}>
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
                    onSelect={(range) => onDateRangeChange(range || { from: undefined, to: undefined })}
                    numberOfMonths={2}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticsFilters;
