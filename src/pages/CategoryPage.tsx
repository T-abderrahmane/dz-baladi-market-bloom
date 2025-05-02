
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Filter, Grid2X2, List } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock data for categories
const categories = {
  "spices": {
    name: "Spices & Herbs",
    description: "Authentic Algerian spices and herbs for your kitchen",
    banner: "https://images.unsplash.com/photo-1532336414038-cf19250c5757",
    products: [
      {
        id: "1",
        name: "Ras El Hanout Spice Blend",
        price: "850 DA",
        image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757",
        category: "Spices"
      },
      {
        id: "2",
        name: "Harissa Paste",
        price: "600 DA",
        image: "https://images.unsplash.com/photo-1589113182021-633234e4e06d",
        category: "Spices",
        discount: "10%"
      },
      {
        id: "3",
        name: "Dried Mint",
        price: "450 DA",
        image: "https://images.unsplash.com/photo-1501163109389-c06053ef0616",
        category: "Spices"
      },
      {
        id: "4",
        name: "Cumin Powder",
        price: "380 DA",
        image: "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d",
        category: "Spices",
        discount: "15%"
      }
    ]
  },
  "dates": {
    name: "Dates & Fruits",
    description: "Premium quality dates from Algerian oases",
    banner: "https://images.unsplash.com/photo-1581165417938-3425e9b00491",
    products: [
      {
        id: "5",
        name: "Premium Deglet Noor Dates",
        price: "1200 DA",
        image: "https://images.unsplash.com/photo-1581165417938-3425e9b00491",
        category: "Dates"
      },
      {
        id: "6",
        name: "Dried Figs Box",
        price: "950 DA",
        image: "https://images.unsplash.com/photo-1606050309588-31970ef0a848",
        category: "Fruits"
      },
      {
        id: "7",
        name: "Organic Medjool Dates",
        price: "1800 DA",
        image: "https://images.unsplash.com/photo-1563435104254-181f5cc9debe",
        category: "Dates",
        discount: "5%"
      }
    ]
  },
  "ceramics": {
    name: "Ceramics",
    description: "Traditional handcrafted pottery and ceramics",
    banner: "https://images.unsplash.com/photo-1610701596007-11502861dcfa",
    products: [
      {
        id: "8",
        name: "Handcrafted Berber Pottery Bowl",
        price: "3500 DA",
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa",
        category: "Ceramics",
        discount: "15%"
      },
      {
        id: "9",
        name: "Traditional Algerian Ceramic Tajine Pot",
        price: "4500 DA",
        image: "https://images.unsplash.com/photo-1579656450812-5b1da79e2474",
        category: "Ceramics"
      },
      {
        id: "10",
        name: "Decorative Ceramic Plate",
        price: "2800 DA",
        image: "https://images.unsplash.com/photo-1577576904422-0e163bd9f14e",
        category: "Ceramics"
      }
    ]
  },
  "textiles": {
    name: "Textiles",
    description: "Handwoven carpets, blankets and fabrics",
    banner: "https://images.unsplash.com/photo-1550381261-343182a82e22",
    products: [
      {
        id: "11",
        name: "Traditional Berber Carpet",
        price: "12000 DA",
        image: "https://images.unsplash.com/photo-1550381261-343182a82e22",
        category: "Textiles",
        discount: "10%"
      },
      {
        id: "12",
        name: "Handwoven Throw Blanket",
        price: "4500 DA",
        image: "https://images.unsplash.com/photo-1580301762395-83eecffca450",
        category: "Textiles"
      }
    ]
  },
  "oils": {
    name: "Oils & Essentials",
    description: "Premium natural oils and essentials from Algeria",
    banner: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
    products: [
      {
        id: "13",
        name: "Traditional Kabylie Olive Oil",
        price: "1800 DA",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
        category: "Oils",
        discount: "10%"
      },
      {
        id: "14",
        name: "Argan Oil",
        price: "2500 DA",
        image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108",
        category: "Oils"
      }
    ]
  }
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const isMobile = useIsMobile();
  
  // Fallback for unknown category
  if (!categoryId || !categories[categoryId as keyof typeof categories]) {
    return (
      <div className="min-h-screen flex flex-col bg-baladi-cream">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-baladi-navy mb-4">Category Not Found</h1>
          <p className="mb-8">The category you're looking for doesn't exist.</p>
          <Button asChild>
            <a href="/">Return to Home</a>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  const category = categories[categoryId as keyof typeof categories];
  
  return (
    <div className="min-h-screen flex flex-col bg-baladi-cream">
      <Navbar />
      
      {/* Hero Banner */}
      <div 
        className="w-full h-64 md:h-80 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${category.banner})` }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{category.name}</h1>
            <p className="text-lg md:text-xl max-w-2xl">{category.description}</p>
          </div>
        </div>
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Filters and View Toggle */}
        <div className="flex flex-wrap justify-between items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-baladi-navy">
              {category.products.length} Products
            </h2>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className={isMobile ? "sr-only" : ""}>Filter</span>
            </Button>
            
            <div className="bg-white rounded-md border border-gray-200 flex">
              <Button 
                variant={viewMode === 'grid' ? "default" : "ghost"} 
                size="icon"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? "bg-baladi-navy text-white" : ""}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? "bg-baladi-navy text-white" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Products Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {category.products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {category.products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col sm:flex-row"
              >
                <div className="w-full sm:w-48 h-48">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <span className="inline-block bg-baladi-navy/80 text-white text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-baladi-terracotta font-bold">{product.price}</p>
                    <Button size="sm" className="bg-baladi-olive hover:bg-baladi-olive/90 text-white">
                      View Product
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
