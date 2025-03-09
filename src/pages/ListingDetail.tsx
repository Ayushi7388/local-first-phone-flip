
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  PhoneCall, 
  MessageCircle, 
  Heart, 
  Share2, 
  ArrowLeft, 
  Calendar, 
  MapPin,
  Shield,
  CheckCircle2,
  BatteryFull,
  Smartphone,
  Tag,
  Truck
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useListings } from '@/context/ListingContext';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ListingCard from '@/components/common/ListingCard';

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { listings } = useListings();
  const { isAuthenticated } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Find current listing
  const listing = listings.find(item => item.id === id);
  
  // Find similar listings (same brand, different ID)
  const similarListings = listings
    .filter(item => item.brand === listing?.brand && item.id !== id)
    .slice(0, 4);
  
  if (!listing) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Listing Not Found</h1>
          <p className="mb-8">The listing you're looking for doesn't exist or has been removed.</p>
          <Link to="/browse">
            <Button>Browse All Phones</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add items to your wishlist",
        variant: "destructive",
      });
      return;
    }
    
    if (isInWishlist(listing.id)) {
      removeFromWishlist(listing.id);
      toast({
        title: "Removed from wishlist",
        description: "The item has been removed from your wishlist",
      });
    } else {
      addToWishlist(listing.id);
      toast({
        title: "Added to wishlist",
        description: "The item has been added to your wishlist",
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: listing.title,
        text: `Check out this ${listing.brand} ${listing.model} on MobiKharidar!`,
        url: window.location.href,
      })
      .catch((error) => {
        toast({
          title: "Error sharing",
          description: "Could not share this listing",
          variant: "destructive",
        });
      });
    } else {
      // Fallback for browsers that don't support the Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Listing link copied to clipboard",
      });
    }
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };
  
  const calculateDiscount = () => {
    if (listing.originalPrice) {
      const discount = ((listing.originalPrice - listing.price) / listing.originalPrice) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link to="/browse" className="flex items-center text-brand-accent hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <div className="aspect-w-3 aspect-h-2">
                <img 
                  src={listing.images[activeImageIndex]} 
                  alt={listing.title}
                  className="w-full h-80 object-contain p-4"
                />
              </div>
              
              {/* Thumbnail Navigation */}
              {listing.images.length > 1 && (
                <div className="flex overflow-x-auto p-4 space-x-2">
                  {listing.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                        activeImageIndex === index ? 'border-brand-accent' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Product Information */}
          <div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="outline" className="text-xs font-semibold text-brand-accent border-brand-accent">
                    {listing.condition}
                  </Badge>
                  {listing.originalPrice && (
                    <Badge variant="secondary" className="bg-red-50 text-red-600 border-red-200">
                      {calculateDiscount()}% OFF
                    </Badge>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-brand mb-2">{listing.title}</h1>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{listing.location}</span>
                  <span className="mx-2">•</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">Listed on {formatDate(listing.createdAt)}</span>
                </div>
                
                <div className="mt-4 mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-brand">₹{listing.price.toLocaleString('en-IN')}</span>
                    {listing.originalPrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ₹{listing.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Button className="w-full bg-brand-accent hover:bg-blue-600">
                    Buy Now
                  </Button>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="flex items-center justify-center" onClick={handleWishlistToggle}>
                      <Heart className={`h-4 w-4 mr-2 ${isInWishlist(listing.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      <span className="sr-only md:not-sr-only md:text-xs">Wishlist</span>
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      <span className="sr-only md:not-sr-only md:text-xs">Message</span>
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center" onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-2" />
                      <span className="sr-only md:not-sr-only md:text-xs">Share</span>
                    </Button>
                  </div>
                  
                  <Button variant="outline" className="w-full flex items-center justify-center">
                    <PhoneCall className="h-4 w-4 mr-2" />
                    Call Seller
                  </Button>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="font-semibold mb-3 text-brand">Highlights</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Smartphone className="h-4 w-4 mr-2 text-brand-accent mt-1" />
                    <span className="text-sm">{listing.brand} {listing.model}</span>
                  </li>
                  <li className="flex items-start">
                    <Tag className="h-4 w-4 mr-2 text-brand-accent mt-1" />
                    <span className="text-sm">{listing.condition} condition</span>
                  </li>
                  <li className="flex items-start">
                    <BatteryFull className="h-4 w-4 mr-2 text-brand-accent mt-1" />
                    <span className="text-sm">Battery Health: 95%</span>
                  </li>
                  <li className="flex items-start">
                    <Truck className="h-4 w-4 mr-2 text-brand-accent mt-1" />
                    <span className="text-sm">Free shipping in your city</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-4 w-4 mr-2 text-brand-accent mt-1" />
                    <span className="text-sm">7-day return policy</span>
                  </li>
                </ul>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="font-semibold mb-3 text-brand">Seller Information</h3>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                    {listing.seller?.avatar && (
                      <img 
                        src={listing.seller.avatar} 
                        alt={listing.seller.name}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{listing.seller?.name}</p>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                      <span>Verified Seller</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Description and Details Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="description">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="warranty">Warranty & Returns</TabsTrigger>
            </TabsList>
            <div className="mt-4 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <TabsContent value="description">
                <h3 className="text-lg font-semibold mb-3">Product Description</h3>
                <p className="text-gray-700">{listing.description}</p>
              </TabsContent>
              <TabsContent value="specifications">
                <h3 className="text-lg font-semibold mb-3">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Brand</span>
                      <span className="font-medium">{listing.brand}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Model</span>
                      <span className="font-medium">{listing.model}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Condition</span>
                      <span className="font-medium">{listing.condition}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Storage</span>
                      <span className="font-medium">128GB</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">RAM</span>
                      <span className="font-medium">8GB</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Color</span>
                      <span className="font-medium">Midnight Black</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="warranty">
                <h3 className="text-lg font-semibold mb-3">Warranty & Return Policy</h3>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium flex items-center text-brand-accent mb-2">
                        <Shield className="h-4 w-4 mr-2" />
                        7-Day Return Policy
                      </h4>
                      <p className="text-sm text-gray-600">
                        If you're not satisfied with your purchase, you can return the device within 7 days for a full refund.
                        The device must be in the same condition as when you received it.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium flex items-center text-brand-accent mb-2">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Remaining Manufacturer Warranty
                      </h4>
                      <p className="text-sm text-gray-600">
                        This device may have remaining manufacturer warranty. Please check with the seller for details.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        {/* Similar Listings */}
        {similarListings.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-brand mb-6">Similar Phones</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarListings.map(item => (
                <ListingCard key={item.id} listing={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ListingDetail;
