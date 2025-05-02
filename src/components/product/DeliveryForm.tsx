
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Mock data for Algerian wilayas (provinces)
const wilayas = [
  { id: "1", name: "Adrar" },
  { id: "2", name: "Chlef" },
  { id: "3", name: "Laghouat" },
  { id: "4", name: "Oum El Bouaghi" },
  { id: "5", name: "Batna" },
  { id: "6", name: "Béjaïa" },
  { id: "7", name: "Biskra" },
  // Add more wilayas as needed
];

// Mock data for communes by wilaya
const communesByWilaya = {
  "1": [{ id: "101", name: "Adrar" }, { id: "102", name: "Reggane" }],
  "2": [{ id: "201", name: "Chlef" }, { id: "202", name: "Ténès" }],
  "3": [{ id: "301", name: "Laghouat" }, { id: "302", name: "Aflou" }],
  "4": [{ id: "401", name: "Oum El Bouaghi" }, { id: "402", name: "Aïn Beïda" }],
  "5": [{ id: "501", name: "Batna" }, { id: "502", name: "Barika" }],
  "6": [{ id: "601", name: "Béjaïa" }, { id: "602", name: "Akbou" }],
  "7": [{ id: "701", name: "Biskra" }, { id: "702", name: "Ouled Djellal" }],
  // Add more communes by wilaya as needed
};

interface DeliveryFormProps {
  name: string;
  setName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  selectedWilaya: string;
  setSelectedWilaya: (value: string) => void;
  selectedCommune: string;
  setSelectedCommune: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  deliveryMethod: string;
  setDeliveryMethod: (value: string) => void;
}

const DeliveryForm = ({
  name,
  setName,
  phone,
  setPhone,
  selectedWilaya,
  setSelectedWilaya,
  selectedCommune,
  setSelectedCommune,
  address,
  setAddress,
  deliveryMethod,
  setDeliveryMethod
}: DeliveryFormProps) => {
  // Get available communes based on selected wilaya
  const availableCommunes = selectedWilaya 
    ? communesByWilaya[selectedWilaya as keyof typeof communesByWilaya] || [] 
    : [];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-baladi-navy">Delivery Information:</h3>
      
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input 
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          required
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input 
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="e.g., 0771234567"
          pattern="^(0)(5|6|7)[0-9]{8}$"
          title="Please enter a valid Algerian mobile number"
          required
        />
      </div>

      <div>
        <Label htmlFor="wilaya">Wilaya (Province)</Label>
        <Select
          value={selectedWilaya}
          onValueChange={(value) => {
            setSelectedWilaya(value);
            setSelectedCommune("");
          }}
        >
          <SelectTrigger id="wilaya">
            <SelectValue placeholder="Select your wilaya" />
          </SelectTrigger>
          <SelectContent>
            {wilayas.map(wilaya => (
              <SelectItem key={wilaya.id} value={wilaya.id}>{wilaya.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="commune">Commune (Municipality)</Label>
        <Select
          value={selectedCommune}
          onValueChange={setSelectedCommune}
          disabled={!selectedWilaya}
        >
          <SelectTrigger id="commune">
            <SelectValue placeholder="Select your commune" />
          </SelectTrigger>
          <SelectContent>
            {availableCommunes.map(commune => (
              <SelectItem key={commune.id} value={commune.id}>{commune.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="address">Detailed Address</Label>
        <Input 
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="House/Building number, Street name, Landmark"
          required
        />
      </div>

      <div>
        <h4 className="font-medium mb-2">Delivery Method</h4>
        <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod} className="space-y-2">
          <div className="flex items-center">
            <RadioGroupItem value="home" id="home-delivery" className="text-baladi-olive" />
            <Label htmlFor="home-delivery" className="ml-2">
              <div className="font-medium">Home Delivery</div>
              <div className="text-sm text-baladi-navy/70">600 DZD</div>
            </Label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem value="post" id="post-delivery" className="text-baladi-olive" />
            <Label htmlFor="post-delivery" className="ml-2">
              <div className="font-medium">Delivery to Post Office</div>
              <div className="text-sm text-baladi-navy/70">400 DZD</div>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default DeliveryForm;
