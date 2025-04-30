
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface OrdersTrendChartProps {
  data: { name: string; revenue: number }[];
}

const OrdersTrendChart = ({ data }: OrdersTrendChartProps) => {
  return (
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
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent labelKey="name" />} />
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
  );
};

export default OrdersTrendChart;
