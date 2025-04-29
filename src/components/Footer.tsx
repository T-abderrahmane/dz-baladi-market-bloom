
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer id="contact" className="bg-baladi-cream text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Newsletter Section */}
        <div className="bg-baladi-navy text-white p-8 rounded-lg shadow-lg mb-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-pattern"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-2">Join Our Newsletter</h3>
              <p className="text-gray-300">Stay updated with new products, special offers and Algerian cultural events!</p>
            </div>
            <div className="md:w-1/3 w-full">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-2 rounded-l-md focus:outline-none text-gray-800"
                />
                <Button className="bg-baladi-terracotta hover:bg-baladi-terracotta/90 rounded-l-none">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h4 className="text-lg font-bold text-baladi-navy mb-4">About Baladi Market</h4>
            <p className="text-gray-600 mb-4">
              Connecting Algerian artisans and producers with customers worldwide, bringing authentic products to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-baladi-terracotta">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-baladi-terracotta">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-baladi-terracotta">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-baladi-navy mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-baladi-terracotta">Home</a></li>
              <li><a href="#products" className="text-gray-600 hover:text-baladi-terracotta">Products</a></li>
              <li><a href="#about" className="text-gray-600 hover:text-baladi-terracotta">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-baladi-terracotta">Blog</a></li>
              <li><a href="#contact" className="text-gray-600 hover:text-baladi-terracotta">Contact</a></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold text-baladi-navy mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-baladi-terracotta">Spices & Herbs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-baladi-terracotta">Dates & Fruits</a></li>
              <li><a href="#" className="text-gray-600 hover:text-baladi-terracotta">Ceramics</a></li>
              <li><a href="#" className="text-gray-600 hover:text-baladi-terracotta">Textiles</a></li>
              <li><a href="#" className="text-gray-600 hover:text-baladi-terracotta">Olive Oil</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-baladi-navy mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-baladi-terracotta shrink-0 mt-0.5" />
                <span className="text-gray-600">123 Market Street, Algiers, Algeria</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-baladi-terracotta shrink-0" />
                <span className="text-gray-600">+213 555 123 456</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-baladi-terracotta shrink-0" />
                <span className="text-gray-600">info@baladimarket.dz</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="pt-6 border-t border-gray-200 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-600 mb-2 md:mb-0">
            &copy; 2025 Baladi Market. All rights reserved.
          </p>
          <div className="space-x-4">
            <a href="#" className="text-gray-600 hover:text-baladi-terracotta">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-baladi-terracotta">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-baladi-terracotta">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
