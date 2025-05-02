
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export type PurchaseOption = {
  id: string;
  quantity: number;
  price: number;
  savings: number;
};

interface PurchaseOptionsProps {
  options: PurchaseOption[];
  selectedOption: string;
  currency: string;
  onOptionChange: (value: string) => void;
}

const PurchaseOptions = ({ options, selectedOption, currency, onOptionChange }: PurchaseOptionsProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-baladi-navy mb-3">Choose Your Offer:</h3>
      <RadioGroup value={selectedOption} onValueChange={onOptionChange} className="space-y-3">
        {options.map(option => (
          <div key={option.id} className="flex items-center">
            <RadioGroupItem value={option.id} id={option.id} className="text-baladi-olive" />
            <Label htmlFor={option.id} className="ml-2 flex-grow">
              <div className={`rounded-md border p-3 ${selectedOption === option.id ? 'border-baladi-olive bg-baladi-olive/5' : 'border-gray-200'}`}>
                <div className="font-medium">
                  Buy {option.quantity} {option.quantity > 1 ? 'items' : 'item'} - {option.price} {currency}
                </div>
                {option.savings > 0 && (
                  <div className="text-sm text-baladi-terracotta">
                    Save {option.savings} {currency}
                  </div>
                )}
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PurchaseOptions;
