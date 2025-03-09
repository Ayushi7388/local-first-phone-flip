
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Listing } from '@/types/models';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const isWishlisted = isInWishlist(listing.id);
  
  // Get primary image or fallback
  const primaryImage = listing.images && listing.images.length > 0 
    ? listing.images[0] 
    : 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080&auto=format&fit=crop';
  
  // Calculate discount percentage
  const discountPercentage = listing.originalPrice 
    ? Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100) 
    : 0;
  
  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add items to your wishlist",
        variant: "destructive"
      });
      return;
    }
    
    try {
      if (isWishlisted) {
        // Find the wishlist item with this listing ID
        await removeFromWishlist(listing.id);
        toast({
          title: "Removed from wishlist",
          description: `${listing.title} has been removed from your wishlist`,
        });
      } else {
        await addToWishlist(listing.id);
        toast({
          title: "Added to wishlist",
          description: `${listing.title} has been added to your wishlist`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update wishlist",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-[1.01]">
      <Link to={`/listing/${listing.id}`}>
        <div className="relative">
          <div className="relative w-full h-44 overflow-hidden">
            <img 
              src={primaryImage} 
              alt={listing.title} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            {listing.originalPrice && (
              <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                {discountPercentage}% OFF
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-2 right-2 bg-white/80 hover:bg-white drop-shadow-md ${isWishlisted ? 'text-red-500' : 'text-gray-600'}`}
              onClick={handleWishlistToggle}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </Button>
          </div>
          
          <CardContent className="p-4">
            <div className="mb-2">
              <h3 className="font-semibold text-lg line-clamp-1 mb-1">{listing.title}</h3>
              <p className="text-sm text-gray-500 mb-1">{listing.brand} · {listing.model}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="line-clamp-1">{listing.location}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-lg">₹{listing.price.toLocaleString()}</span>
                {listing.originalPrice && (
                  <span className="text-gray-500 text-sm line-through">₹{listing.originalPrice.toLocaleString()}</span>
                )}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                listing.condition === 'New' ? 'bg-green-100 text-green-800' :
                listing.condition === 'Like New' ? 'bg-blue-100 text-blue-800' :
                listing.condition === 'Good' ? 'bg-yellow-100 text-yellow-800' :
                listing.condition === 'Fair' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {listing.condition}
              </span>
            </div>
          </CardContent>
        </div>
      </Link>
    </Card>
  );
};

export default ListingCard;
