
import { useParams } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/product/ProductGallery";
import ProductHeader from "@/components/product/ProductHeader";
import ProductDescription from "@/components/product/ProductDescription";
import PurchaseOptions from "@/components/product/PurchaseOptions";
import DeliveryForm from "@/components/product/DeliveryForm";
import OrderSummary from "@/components/product/OrderSummary";
import Breadcrumb from "@/components/product/Breadcrumb";
import { useProductPage } from "@/hooks/useProductPage";

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

const ProductPage = () => {
  const { id } = useParams();
  const product = productData; // In a real app, you would fetch data based on the ID

  const {
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
    purchaseOption,
    setPurchaseOption,
    purchaseOptions,
    selectedOption,
    deliveryCost,
    handleSubmit,
  } = useProductPage(product);

  return (
    <div className="min-h-screen flex flex-col bg-baladi-cream">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb productName={product.name} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Gallery */}
          <ProductGallery images={product.images} productName={product.name} />

          {/* Product Info and Order Form */}
          <div>
            <ProductHeader 
              name={product.name}
              rating={product.rating}
              reviewCount={product.reviewCount}
              originalPrice={product.originalPrice}
              discountedPrice={product.discountedPrice}
              currency={product.currency}
            />

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Purchase Options */}
              <PurchaseOptions 
                options={purchaseOptions}
                selectedOption={purchaseOption}
                currency={product.currency}
                onOptionChange={setPurchaseOption}
              />

              <DeliveryForm
                name={name}
                setName={setName}
                phone={phone}
                setPhone={setPhone}
                selectedWilaya={selectedWilaya}
                setSelectedWilaya={setSelectedWilaya}
                selectedCommune={selectedCommune}
                setSelectedCommune={setSelectedCommune}
                address={address}
                setAddress={setAddress}
                deliveryMethod={deliveryMethod}
                setDeliveryMethod={setDeliveryMethod}
              />

              {/* Order Summary */}
              <OrderSummary 
                selectedOption={selectedOption} 
                deliveryCost={deliveryCost}
                currency={product.currency}
              />

              <Button type="submit" className="w-full py-6 text-lg bg-baladi-terracotta hover:bg-baladi-terracotta/90">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Buy Now – Cash on Delivery
              </Button>
            </form>
          </div>
        </div>

        {/* Product Description */}
        <ProductDescription 
          description={product.description}
          features={product.features}
        />
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
