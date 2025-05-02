
import { PurchaseOption } from "./PurchaseOptions";

interface OrderSummaryProps {
  selectedOption: PurchaseOption;
  deliveryCost: number;
  currency: string;
}

const OrderSummary = ({ selectedOption, deliveryCost, currency }: OrderSummaryProps) => {
  const totalCost = selectedOption.price + deliveryCost;
  
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-baladi-navy mb-3">Order Summary</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Product ({selectedOption.quantity}x):</span>
          <span>{selectedOption.price} {currency}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery:</span>
          <span>{deliveryCost} {currency}</span>
        </div>
        <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-base">
          <span>Total:</span>
          <span className="text-baladi-terracotta">{totalCost} {currency}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
