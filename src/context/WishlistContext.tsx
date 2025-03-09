
import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

type WishlistItem = {
  id: string;
  userID: string;
  listingID: string;
  addedAt: Date;
  priceAlert: number | null;
};

type WishlistContextType = {
  wishlistItems: WishlistItem[];
  addToWishlist: (listingID: string) => void;
  removeFromWishlist: (listingID: string) => void;
  isInWishlist: (listingID: string) => boolean;
  setPriceAlert: (listingID: string, price: number) => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    const savedItems = localStorage.getItem('wishlist');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (listingID: string) => {
    // Mock userID - in a real app, this would come from authentication
    const userID = 'user123';
    
    // Check if item already exists in wishlist
    if (!isInWishlist(listingID)) {
      const newItem: WishlistItem = {
        id: uuidv4(),
        userID,
        listingID,
        addedAt: new Date(),
        priceAlert: null,
      };
      
      setWishlistItems(prev => [...prev, newItem]);
    }
  };

  const removeFromWishlist = (listingID: string) => {
    setWishlistItems(prev => prev.filter(item => item.listingID !== listingID));
  };

  const isInWishlist = (listingID: string) => {
    return wishlistItems.some(item => item.listingID === listingID);
  };

  const setPriceAlert = (listingID: string, price: number) => {
    setWishlistItems(prev => 
      prev.map(item => 
        item.listingID === listingID 
          ? { ...item, priceAlert: price } 
          : item
      )
    );
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    setPriceAlert
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
