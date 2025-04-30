
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
}

const MetricCard = ({ title, value, change, changeType }: MetricCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${
          changeType === "positive" ? "text-green-600" : 
          changeType === "negative" ? "text-red-600" : "text-gray-500"
        }`}>
          {change} from previous period
        </p>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
