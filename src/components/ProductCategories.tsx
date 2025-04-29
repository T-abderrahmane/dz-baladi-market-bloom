
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";

const ProductCategories = () => {
  const featuredCategories = [
    { name: "Spices & Herbs", icon: "🌶️", description: "Authentic Algerian flavors for your kitchen" },
    { name: "Dates & Fruits", icon: "🌴", description: "Premium quality dates from Algerian oases" },
    { name: "Ceramics", icon: "🏺", description: "Traditional handcrafted pottery and ceramics" },
    { name: "Textiles", icon: "🧵", description: "Handwoven carpets, blankets and fabrics" },
  ];

  const featuredProducts = [
    {
      name: "Premium Deglet Noor Dates",
      price: "1200 DA",
      image: "https://images.unsplash.com/photo-1581165417938-3425e9b00491",
      category: "Dates"
    },
    {
      name: "Handcrafted Berber Pottery Bowl",
      price: "3500 DA",
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa",
      category: "Ceramics",
      discount: "15%"
    },
    {
      name: "Ras El Hanout Spice Blend",
      price: "850 DA",
      image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757",
      category: "Spices"
    },
    {
      name: "Traditional Kabylie Olive Oil",
      price: "1800 DA",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
      category: "Oils",
      discount: "10%"
    },
  ];

  return (
    <section id="products" className="py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-baladi-navy mb-4">
            Explore Our <span className="text-baladi-terracotta">Categories</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Discover the finest selection of authentic Algerian products, carefully curated from local artisans and producers
          </p>
        </div>
        
        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {featuredCategories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-bold text-baladi-navy text-lg mb-2">{category.name}</h3>
              <p className="text-gray-600 text-sm">{category.description}</p>
              <Button variant="link" className="mt-3 text-baladi-terracotta">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        
        {/* Featured Products */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-baladi-navy">Featured Products</h3>
            <Button variant="outline" className="border-baladi-terracotta text-baladi-terracotta hover:bg-baladi-terracotta hover:text-white">
              View All Products
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
