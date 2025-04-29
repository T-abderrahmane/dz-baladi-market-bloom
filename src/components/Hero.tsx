
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-baladi-navy to-baladi-navy/90 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-pattern"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 space-y-6 z-10">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-shadow-lg">
            <span className="block text-baladi-gold">بلادي ماركت</span>
            <span className="block mt-2">Authentic Algerian Products</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-lg">
            Experience the flavors and crafts of Algeria delivered to your doorstep. From traditional spices to handcrafted treasures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button className="bg-baladi-terracotta hover:bg-baladi-terracotta/90 text-white text-lg">
              Shop Now
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-baladi-navy text-lg">
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center md:justify-end z-10 animate-float">
          <div className="h-80 w-80 md:h-96 md:w-96 bg-[url('https://images.unsplash.com/photo-1578657425142-04d33a312dd0')] bg-cover bg-center rounded-full border-8 border-white/20 shadow-2xl"></div>
        </div>
      </div>
      
      {/* Curved bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full text-baladi-cream">
          <path fill="currentColor" fillOpacity="1" d="M0,224L60,208C120,192,240,160,360,170.7C480,181,600,235,720,245.3C840,256,960,224,1080,186.7C1200,149,1320,107,1380,85.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
