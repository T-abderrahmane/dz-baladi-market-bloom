
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, Search, User, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-baladi-navy font-noto-kufi font-bold text-2xl">بلادي</span>
            <span className="ml-2 text-baladi-terracotta font-semibold">Market</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-baladi-terracotta transition-colors">Home</Link>
          <a href="#products" className="text-gray-700 hover:text-baladi-terracotta transition-colors">Products</a>
          <a href="#about" className="text-gray-700 hover:text-baladi-terracotta transition-colors">About Us</a>
          <a href="#contact" className="text-gray-700 hover:text-baladi-terracotta transition-colors">Contact</a>
          <Link to="/admin" className="text-gray-700 hover:text-baladi-terracotta transition-colors flex items-center">
            <LayoutDashboard className="h-4 w-4 mr-1" />
            Admin
          </Link>
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5 text-gray-700" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5 text-gray-700" />
          </Button>
          <Button className="bg-baladi-terracotta hover:bg-baladi-terracotta/90 text-white">
            <ShoppingCart className="h-5 w-5 mr-2" />
            <span>Cart (0)</span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5 text-gray-700" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5 text-gray-700" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white p-4 shadow-md z-20">
          <div className="flex flex-col space-y-3">
            <Link to="/" className="text-gray-700 hover:text-baladi-terracotta py-2 transition-colors">Home</Link>
            <a href="#products" className="text-gray-700 hover:text-baladi-terracotta py-2 transition-colors">Products</a>
            <a href="#about" className="text-gray-700 hover:text-baladi-terracotta py-2 transition-colors">About Us</a>
            <a href="#contact" className="text-gray-700 hover:text-baladi-terracotta py-2 transition-colors">Contact</a>
            <Link to="/admin" className="text-gray-700 hover:text-baladi-terracotta py-2 transition-colors flex items-center">
              <LayoutDashboard className="h-4 w-4 mr-1" />
              Admin
            </Link>
            <div className="flex items-center pt-2">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5 text-gray-700" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5 text-gray-700" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
