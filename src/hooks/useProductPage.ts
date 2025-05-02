
import { useState } from "react";
import { PurchaseOption } from "@/components/product/PurchaseOptions";
import { useCart } from "@/hooks/useCart";
import { toast } from "@/components/ui/use-toast";

interface ProductData {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  originalPrice: number;
  discountedPrice: number;
  currency: string;
  description: string;
  features: string[];
  images: string[];
}

export const useProductPage = (product: ProductData) => {
  // Form fields state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("home");
  const [purchaseOption, setPurchaseOption] = useState("option1");

  // Purchase options
  const purchaseOptions: PurchaseOption[] = [
    { 
      id: "option1", 
      quantity: 1, 
      price: product.discountedPrice, 
      savings: product.originalPrice - product.discountedPrice 
    },
    { 
      id: "option2", 
      quantity: 2, 
      price: product.discountedPrice * 2 - 500, 
      savings: (product.originalPrice * 2) - (product.discountedPrice * 2 - 500) 
    },
    { 
      id: "option3", 
      quantity: 3, 
      price: product.discountedPrice * 3 - 1200, 
      savings: (product.originalPrice * 3) - (product.discountedPrice * 3 - 1200) 
    },
  ];

  // Get selected option
  const selectedOption = purchaseOptions.find(option => option.id === purchaseOption) || purchaseOptions[0];

  // Delivery cost calculation
  const deliveryCost = deliveryMethod === "home" ? 600 : 400;
  
  // Total cost calculation
  const totalCost = selectedOption.price + deliveryCost;

  // Cart functionality
  const { addToCart } = useCart();

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

    // Add to cart
    addToCart({
      id: product.id,
      name: product.name,
      price: product.discountedPrice,
      image: product.images[0],
      quantity: selectedOption.quantity
    });

    // Show success message
    toast({
      title: "Order submitted successfully!",
      description: `Your order for ${product.name} has been placed.`,
      duration: 3000,
    });
  };

  return {
    // Form state
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
    setDeliveryMethod,
    
    // Purchase options state
    purchaseOption,
    setPurchaseOption,
    purchaseOptions,
    selectedOption,

    // Delivery info
    deliveryCost,
    totalCost,

    // Handlers
    handleSubmit,
  };
};
