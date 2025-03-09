
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Shield, Tag } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/common/SearchBar';
import ListingCard from '@/components/common/ListingCard';
import { useListings } from '@/context/ListingContext';
import { phoneBrands } from '@/data/mockData';

const Index = () => {
  const { listings } = useListings();
  
  // Get featured listings (first 4)
  const featuredListings = listings.slice(0, 4);
  
  // Get top brands (first 6)
  const topBrands = phoneBrands.slice(0, 6);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand to-brand-hover py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Buy & Sell Used Phones at the Best Price
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Find great deals on quality second-hand phones or sell your device for the best price.
          </p>
          
          <div className="flex flex-col items-center space-y-4">
            <SearchBar className="max-w-2xl w-full" />
            
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Link to="/sell">
                <Button variant="outline" className="bg-white hover:bg-gray-100 text-brand">
                  Sell Your Phone
                </Button>
              </Link>
              <Link to="/browse">
                <Button className="bg-brand-accent hover:bg-blue-600 text-white">
                  Browse Phones
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Listings */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-brand">Featured Phones</h2>
            <Link to="/browse" className="flex items-center text-brand-accent hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Top Brands */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-brand mb-8 text-center">
            Browse by Brand
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {topBrands.map(brand => (
              <Link 
                key={brand} 
                to={`/browse?brand=${brand}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col items-center"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-3">
                  <Phone className="h-8 w-8 text-brand-accent" />
                </div>
                <span className="font-medium text-brand">{brand}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-brand mb-12 text-center">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-50 mx-auto mb-4">
                <Phone className="h-8 w-8 text-brand-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">List Your Phone</h3>
              <p className="text-gray-600">
                Create a listing with photos and details about your phone's condition and specifications.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-50 mx-auto mb-4">
                <Tag className="h-8 w-8 text-brand-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get the Best Price</h3>
              <p className="text-gray-600">
                Our platform helps you get the optimal price for your device based on market conditions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-50 mx-auto mb-4">
                <Shield className="h-8 w-8 text-brand-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Transaction</h3>
              <p className="text-gray-600">
                Connect with buyers or sellers in your area and complete the transaction safely.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/how-it-works">
              <Button className="bg-brand-accent hover:bg-blue-600">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-brand text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to Buy or Sell Your Phone?
          </h2>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already buying and selling phones on our platform.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-brand">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/browse">
              <Button className="bg-brand-accent hover:bg-blue-600">
                Browse Phones
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
