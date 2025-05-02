
import { Star } from "lucide-react";

interface ProductHeaderProps {
  name: string;
  rating: number;
  reviewCount: number;
  originalPrice: number;
  discountedPrice: number;
  currency: string;
}

const ProductHeader = ({ 
  name, 
  rating, 
  reviewCount, 
  originalPrice, 
  discountedPrice, 
  currency 
}: ProductHeaderProps) => {
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold text-baladi-navy mb-2">{name}</h1>
      
      {/* Rating */}
      <div className="flex items-center mb-4">
        <div className="flex text-baladi-gold">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="h-5 w-5"
              fill={i < Math.floor(rating) ? "currentColor" : "none"}
              strokeWidth={1}
            />
          ))}
        </div>
        <span className="ml-2 text-sm text-baladi-navy/70">{rating}/5 ({reviewCount} reviews)</span>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <span className="text-xl text-gray-500 line-through">{originalPrice} {currency}</span>
          <span className="text-3xl font-bold text-baladi-terracotta">{discountedPrice} {currency}</span>
          <span className="bg-baladi-terracotta/10 text-baladi-terracotta px-2 py-1 rounded text-sm font-semibold">
            {Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)}% OFF
          </span>
        </div>
      </div>
    </>
  );
};

export default ProductHeader;
