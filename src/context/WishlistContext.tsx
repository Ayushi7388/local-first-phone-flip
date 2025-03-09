
import React, { createContext, useContext, useState, useEffect } from 'react';
import { WishlistItem } from '@/types/models';
import { useAuth } from './AuthContext';
import { useListings } from './ListingContext';

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  isLoading: boolean;
  addToWishlist: (listingId: string, priceAlert?: number) => Promise<WishlistItem | null>;
  removeFromWishlist: (id: string) => Promise<boolean>;
  isInWishlist: (listingId: string) => boolean;
  updatePriceAlert: (id: string, priceAlert: number) => Promise<WishlistItem | null>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { listings } = useListings();

  // Load wishlist items when user changes
  useEffect(() => {
    const loadWishlist = async () => {
      if (!user) {
        setWishlistItems([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
        
        const storedWishlist = localStorage.getItem(`phoneflip_wishlist_${user.id}`);
        if (storedWishlist) {
          const parsed = JSON.parse(storedWishlist);
          setWishlistItems(parsed.map((item: any) => ({
            ...item,
            createdAt: new Date(item.createdAt)
          })));
        } else {
          setWishlistItems([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadWishlist();
  }, [user]);

  // Add an item to wishlist
  const addToWishlist = async (listingId: string, priceAlert?: number): Promise<WishlistItem | null> => {
    if (!user) return null;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newItem: WishlistItem = {
      id: `wishlist-${Date.now()}`,
      userID: user.id,
      listingID: listingId,
      priceAlert,
      createdAt: new Date()
    };
    
    const updatedWishlist = [...wishlistItems, newItem];
    setWishlistItems(updatedWishlist);
    
    // Update localStorage
    localStorage.setItem(`phoneflip_wishlist_${user.id}`, JSON.stringify(updatedWishlist));
    
    return newItem;
  };
  
  // Remove an item from wishlist
  const removeFromWishlist = async (id: string): Promise<boolean> => {
    if (!user) return false;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedWishlist = wishlistItems.filter(item => item.id !== id);
    
    if (updatedWishlist.length === wishlistItems.length) return false;
    
    setWishlistItems(updatedWishlist);
    
    // Update localStorage
    localStorage.setItem(`phoneflip_wishlist_${user.id}`, JSON.stringify(updatedWishlist));
    
    return true;
  };
  
  // Check if a listing is in the wishlist
  const isInWishlist = (listingId: string): boolean => {
    return wishlistItems.some(item => item.listingID === listingId);
  };
  
  // Update price alert for a wishlist item
  const updatePriceAlert = async (id: string, priceAlert: number): Promise<WishlistItem | null> => {
    if (!user) return null;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = wishlistItems.findIndex(item => item.id === id);
    if (index === -1) return null;
    
    const updatedItem = {
      ...wishlistItems[index],
      priceAlert
    };
    
    const updatedWishlist = [...wishlistItems];
    updatedWishlist[index] = updatedItem;
    
    setWishlistItems(updatedWishlist);
    
    // Update localStorage
    localStorage.setItem(`phoneflip_wishlist_${user.id}`, JSON.stringify(updatedWishlist));
    
    return updatedItem;
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      isLoading,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      updatePriceAlert
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
