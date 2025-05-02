
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative h-[400px] md:h-[500px]">
        <img 
          src={images[selectedImage]} 
          alt={productName}
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
        {images.map((image, index) => (
          <div 
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`cursor-pointer flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
              selectedImage === index ? 'border-baladi-terracotta' : 'border-transparent'
            }`}
          >
            <img 
              src={image} 
              alt={`${productName} - view ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
