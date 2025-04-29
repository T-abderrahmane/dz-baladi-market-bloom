
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  return (
    <section id="about" className="py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Image Grid */}
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden h-48 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1596371311310-8cac1839b5b8" 
                  alt="Marketplace scene" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-64 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1595887543484-d2d67b6ad5f9" 
                  alt="Spice market" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-lg overflow-hidden h-64 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1576439684914-4a8e4e7450d8" 
                  alt="Traditional textiles" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden h-48 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1599940778173-e4c98ce3cfd1" 
                  alt="Handcrafted items" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-baladi-terracotta bg-baladi-terracotta/10 rounded-full">
              Our Story
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-baladi-navy mb-6">
              Bringing <span className="text-baladi-terracotta">Algeria</span> To Your Doorstep
            </h2>
            <p className="text-gray-700 mb-4">
              Baladi Market was founded with a simple mission: to share the rich cultural heritage and unique products of Algeria with the world.
            </p>
            <p className="text-gray-700 mb-6">
              We work directly with local artisans, farmers, and producers across Algeria to bring you authentic, high-quality products that showcase the country's diverse traditions and craftsmanship.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-baladi-cream p-4 rounded-lg">
                <div className="text-2xl font-bold text-baladi-terracotta">150+</div>
                <div className="text-gray-700">Local Artisans</div>
              </div>
              <div className="bg-baladi-cream p-4 rounded-lg">
                <div className="text-2xl font-bold text-baladi-terracotta">20+</div>
                <div className="text-gray-700">Regions Covered</div>
              </div>
              <div className="bg-baladi-cream p-4 rounded-lg">
                <div className="text-2xl font-bold text-baladi-terracotta">5000+</div>
                <div className="text-gray-700">Happy Customers</div>
              </div>
              <div className="bg-baladi-cream p-4 rounded-lg">
                <div className="text-2xl font-bold text-baladi-terracotta">1000+</div>
                <div className="text-gray-700">Products</div>
              </div>
            </div>
            
            <Button className="bg-baladi-navy hover:bg-baladi-navy/90 text-white">
              Learn More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
