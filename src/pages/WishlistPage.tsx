
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, BellRing, AlertTriangle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useWishlist } from '@/context/WishlistContext';
import { useListings } from '@/context/ListingContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import ListingCard from '@/components/common/ListingCard';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, setPriceAlert } = useWishlist();
  const { listings } = useListings();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
          <p className="mb-8">Please sign in to view your wishlist</p>
          <Link to="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  // Get wishlist items with their listing details
  const wishlistWithListings = wishlistItems
    .map(item => ({
      ...item,
      listing: listings.find(listing => listing.id === item.listingID)
    }))
    .filter(item => item.listing);
  
  // Handle setting a price alert
  const handlePriceAlert = (listingID: string, currentPrice: number) => {
    // Set alert for 10% lower than current price
    const alertPrice = Math.round(currentPrice * 0.9);
    setPriceAlert(listingID, alertPrice);
    
    toast({
      title: "Price alert set!",
      description: `We'll notify you when this phone drops below ₹${alertPrice.toLocaleString('en-IN')}.`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-brand mb-2">Your Wishlist</h1>
            <p className="text-gray-600">
              {wishlistWithListings.length > 0
                ? `You have ${wishlistWithListings.length} item${wishlistWithListings.length > 1 ? 's' : ''} in your wishlist`
                : 'Your wishlist is empty'}
            </p>
          </div>
          
          {wishlistWithListings.length > 0 && (
            <div className="mt-4 md:mt-0">
              <Button variant="outline" className="flex items-center gap-2">
                <BellRing className="h-4 w-4" />
                Manage Price Alerts
              </Button>
            </div>
          )}
        </div>
        
        {wishlistWithListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistWithListings.map(item => (
              <div key={item.id} className="relative group">
                <ListingCard listing={item.listing!} />
                
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFromWishlist(item.listingID)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-center">
                  {item.priceAlert ? (
                    <div className="flex items-center text-white text-sm">
                      <BellRing className="h-4 w-4 mr-1 text-yellow-400" />
                      <span>Alert: ₹{item.priceAlert.toLocaleString('en-IN')}</span>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white hover:text-white hover:bg-white/20"
                      onClick={() => handlePriceAlert(item.listingID, item.listing!.price)}
                    >
                      <BellRing className="h-4 w-4 mr-1" />
                      Set Price Alert
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center py-12">
              <Heart className="h-16 w-16 text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-6 text-center max-w-md">
                Start adding phones you're interested in to your wishlist to keep track of them.
              </p>
              <Link to="/browse">
                <Button>Browse Phones</Button>
              </Link>
            </CardContent>
          </Card>
        )}
        
        {wishlistWithListings.length > 0 && (
          <div className="mt-12">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800 mb-1">About Price Alerts</h3>
                <p className="text-sm text-yellow-700">
                  Set price alerts to be notified when a phone drops below your desired price.
                  We'll send you an email notification so you can grab the deal before someone else does!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WishlistPage;
