
import { Button } from "@/components/ui/button";

const SpecialOffers = () => {
  return (
    <section className="py-16 px-4 sm:px-6 bg-baladi-sand">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* First Offer */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1603118750482-b974feb68808" 
                alt="Special Offer" 
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-white bg-baladi-gold rounded-full">
                Limited Time
              </div>
              <h3 className="text-2xl font-bold text-baladi-navy mb-3">
                Ramadan Special Bundle
              </h3>
              <p className="text-gray-600 mb-4">
                Get our special Ramadan bundle with premium dates, traditional sweets, and special spice mixes.
              </p>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl font-bold text-baladi-terracotta">5500 DA</span>
                <span className="text-gray-500 line-through">7200 DA</span>
                <span className="bg-baladi-terracotta/10 text-baladi-terracotta px-2 py-0.5 text-sm font-medium rounded">
                  Save 24%
                </span>
              </div>
              <Button className="w-full bg-baladi-olive hover:bg-baladi-olive/90 text-white">
                Shop Now
              </Button>
            </div>
          </div>
          
          {/* Second Offer */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1590779033043-2cf5d0ed4192" 
                alt="Special Offer" 
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-white bg-baladi-gold rounded-full">
                New Collection
              </div>
              <h3 className="text-2xl font-bold text-baladi-navy mb-3">
                Artisan Ceramics Set
              </h3>
              <p className="text-gray-600 mb-4">
                Beautifully handcrafted ceramics from Kabylie region, perfect for your home or as a gift.
              </p>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl font-bold text-baladi-terracotta">8900 DA</span>
                <span className="text-gray-500 line-through">10500 DA</span>
                <span className="bg-baladi-terracotta/10 text-baladi-terracotta px-2 py-0.5 text-sm font-medium rounded">
                  Save 15%
                </span>
              </div>
              <Button className="w-full bg-baladi-olive hover:bg-baladi-olive/90 text-white">
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
