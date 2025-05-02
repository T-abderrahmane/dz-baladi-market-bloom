
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  discount?: string;
}

const ProductCard = ({ id, name, price, image, category, discount }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <Link to={`/product/${id}`} className="block">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {discount && (
            <div className="absolute top-3 right-3 bg-baladi-terracotta text-white text-sm font-bold px-2 py-1 rounded-md">
              {discount} OFF
            </div>
          )}
          <div className="absolute top-3 left-3 bg-baladi-navy/80 text-white text-xs px-2 py-1 rounded-full">
            {category}
          </div>
        </div>
      </Link>
      
      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 hover:text-baladi-terracotta transition-colors">{name}</h3>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <p className="text-baladi-terracotta font-bold">{price}</p>
          <Button size="sm" className="bg-baladi-olive hover:bg-baladi-olive/90 text-white">
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
