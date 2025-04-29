
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, ShoppingCart, ChevronRight, ChevronLeft } from "lucide-react";

// Mock data for product
const productData = {
  id: "1",
  name: "Traditional Algerian Ceramic Tajine Pot",
  rating: 4.8,
  reviewCount: 124,
  originalPrice: 4500,
  discountedPrice: 3600,
  currency: "DZD",
  description: "Authentic handcrafted ceramic tajine pot made by skilled artisans from Kabylie. Perfect for slow-cooking traditional Algerian dishes while preserving all the flavors and nutrients. The unique conical design creates a natural condensation cycle that keeps food moist and tender.",
  features: [
    "Handcrafted from high-quality clay",
    "Beautiful traditional Algerian designs",
    "Naturally non-stick cooking surface",
    "Preserves nutrients and enhances flavors",
    "Suitable for both cooking and serving"
  ],
  images: [
    "https://images.unsplash.com/photo-1579656450812-5b1da79e2474?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1637275934260-ea138c3bbabf?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1700140754261-e29f572cc317?q=80&w=1938&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1605479420603-1dc4d7310dba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  ]
};

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

type PurchaseOption = {
  id: string;
  quantity: number;
  price: number;
  savings: number;
};

const ProductPage = () => {
  const { id } = useParams();
  const product = productData; // In a real app, you would fetch data based on the ID

  // State for form fields
  const [selectedImage, setSelectedImage] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("home");
  const [purchaseOption, setPurchaseOption] = useState("option1");

  // Purchase options
  const purchaseOptions: PurchaseOption[] = [
    { id: "option1", quantity: 1, price: product.discountedPrice, savings: product.originalPrice - product.discountedPrice },
    { id: "option2", quantity: 2, price: product.discountedPrice * 2 - 500, savings: (product.originalPrice * 2) - (product.discountedPrice * 2 - 500) },
    { id: "option3", quantity: 3, price: product.discountedPrice * 3 - 1200, savings: (product.originalPrice * 3) - (product.discountedPrice * 3 - 1200) },
  ];

  // Get selected option
  const selectedOption = purchaseOptions.find(option => option.id === purchaseOption) || purchaseOptions[0];

  // Delivery cost calculation
  const deliveryCost = deliveryMethod === "home" ? 600 : 400;
  
  // Total cost calculation
  const totalCost = selectedOption.price + deliveryCost;

  // Image gallery navigation
  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  // Get available communes based on selected wilaya
  const availableCommunes = selectedWilaya ? communesByWilaya[selectedWilaya as keyof typeof communesByWilaya] || [] : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would process the order here
    console.log({
      product,
      order: {
        name,
        phone,
        wilaya: selectedWilaya,
        commune: selectedCommune,
        address,
        deliveryMethod,
        purchaseOption: selectedOption,
        totalCost
      }
    });
    // Show success message or redirect
    alert("Order submitted successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-baladi-cream">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <nav className="flex items-center text-sm text-baladi-navy/70">
            <a href="/" className="hover:text-baladi-terracotta">Home</a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <a href="/products" className="hover:text-baladi-terracotta">Products</a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-baladi-terracotta font-semibold">{product.name}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Gallery */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative h-[400px] md:h-[500px]">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white"
              >
                <ChevronLeft className="h-6 w-6 text-baladi-navy" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white"
              >
                <ChevronRight className="h-6 w-6 text-baladi-navy" />
              </button>
            </div>
            
            <div className="p-4 overflow-x-auto flex space-x-2">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`cursor-pointer flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? 'border-baladi-terracotta' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info and Order Form */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-baladi-navy mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex text-baladi-gold">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5"
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                    strokeWidth={1}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-baladi-navy/70">{product.rating}/5 ({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-xl text-gray-500 line-through">{product.originalPrice} {product.currency}</span>
                <span className="text-3xl font-bold text-baladi-terracotta">{product.discountedPrice} {product.currency}</span>
                <span className="bg-baladi-terracotta/10 text-baladi-terracotta px-2 py-1 rounded text-sm font-semibold">
                  {Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)}% OFF
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Purchase Options */}
              <div>
                <h3 className="text-lg font-semibold text-baladi-navy mb-3">Choose Your Offer:</h3>
                <RadioGroup value={purchaseOption} onValueChange={setPurchaseOption} className="space-y-3">
                  {purchaseOptions.map(option => (
                    <div key={option.id} className="flex items-center">
                      <RadioGroupItem value={option.id} id={option.id} className="text-baladi-olive" />
                      <Label htmlFor={option.id} className="ml-2 flex-grow">
                        <div className={`rounded-md border p-3 ${purchaseOption === option.id ? 'border-baladi-olive bg-baladi-olive/5' : 'border-gray-200'}`}>
                          <div className="font-medium">
                            Buy {option.quantity} {option.quantity > 1 ? 'items' : 'item'} - {option.price} {product.currency}
                          </div>
                          {option.savings > 0 && (
                            <div className="text-sm text-baladi-terracotta">
                              Save {option.savings} {product.currency}
                            </div>
                          )}
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

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

              {/* Order Summary */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="text-lg font-semibold text-baladi-navy mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Product ({selectedOption.quantity}x):</span>
                    <span>{selectedOption.price} {product.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span>{deliveryCost} {product.currency}</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-base">
                    <span>Total:</span>
                    <span className="text-baladi-terracotta">{totalCost} {product.currency}</span>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full py-6 text-lg bg-baladi-terracotta hover:bg-baladi-terracotta/90">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Buy Now – Cash on Delivery
              </Button>
            </form>
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold text-baladi-navy mb-4">About this product</h2>
          <p className="text-baladi-navy/80 mb-6">{product.description}</p>
          
          <h3 className="text-xl font-semibold text-baladi-navy mb-3">Key Features</h3>
          <ul className="list-disc pl-5 space-y-2 text-baladi-navy/80">
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
