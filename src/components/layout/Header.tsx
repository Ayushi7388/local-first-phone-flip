
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-brand">
              Phone<span className="text-brand-accent">Flip</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/browse" className="text-gray-700 hover:text-brand-accent transition-colors">
              Browse Phones
            </Link>
            <Link to="/sell" className="text-gray-700 hover:text-brand-accent transition-colors">
              Sell a Phone
            </Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-brand-accent transition-colors">
              How It Works
            </Link>
          </nav>

          {/* User Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="text-gray-700 hover:text-brand-accent">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-brand-accent">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="default" size="sm" className="bg-brand-accent hover:bg-blue-600 text-white">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              to="/browse" 
              className="block text-gray-700 hover:text-brand-accent px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Phones
            </Link>
            <Link 
              to="/sell" 
              className="block text-gray-700 hover:text-brand-accent px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Sell a Phone
            </Link>
            <Link 
              to="/how-it-works" 
              className="block text-gray-700 hover:text-brand-accent px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between">
                <Link 
                  to="/login" 
                  className="w-1/2 pr-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link 
                  to="/register" 
                  className="w-1/2 pl-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="default" className="w-full bg-brand-accent hover:bg-blue-600">Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
