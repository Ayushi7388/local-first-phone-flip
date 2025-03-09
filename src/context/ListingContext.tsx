
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Listing, ListingFilters, SortOption } from '@/types/models';
import { mockListings } from '@/data/mockData';

interface ListingContextType {
  listings: Listing[];
  filteredListings: Listing[];
  isLoading: boolean;
  error: string | null;
  filters: ListingFilters;
  sortOption: SortOption;
  setFilters: (filters: ListingFilters) => void;
  setSortOption: (option: SortOption) => void;
  addListing: (listing: Omit<Listing, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Promise<Listing>;
  updateListing: (id: string, listing: Partial<Listing>) => Promise<Listing | null>;
  deleteListing: (id: string) => Promise<boolean>;
  getListingById: (id: string) => Listing | undefined;
}

const ListingContext = createContext<ListingContextType | undefined>(undefined);

export const ListingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ListingFilters>({});
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  // Load listings on initial render
  useEffect(() => {
    const loadListings = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay
        
        // Check localStorage first
        const storedListings = localStorage.getItem('phoneflip_listings');
        if (storedListings) {
          const parsed = JSON.parse(storedListings);
          setListings(parsed.map((listing: any) => ({
            ...listing,
            createdAt: new Date(listing.createdAt),
            updatedAt: new Date(listing.updatedAt)
          })));
        } else {
          // Use mock data
          setListings(mockListings);
          // Save to localStorage
          localStorage.setItem('phoneflip_listings', JSON.stringify(mockListings));
        }
      } catch (err) {
        setError('Failed to load listings');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadListings();
  }, []);

  // Apply filters when listings or filters change
  useEffect(() => {
    if (!listings.length) return;
    
    let result = [...listings];
    
    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(listing => 
        listing.title.toLowerCase().includes(searchTerm) ||
        listing.brand.toLowerCase().includes(searchTerm) ||
        listing.model.toLowerCase().includes(searchTerm) ||
        listing.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply brand filter
    if (filters.brand && filters.brand.length > 0) {
      result = result.filter(listing => 
        filters.brand!.includes(listing.brand)
      );
    }
    
    // Apply condition filter
    if (filters.condition && filters.condition.length > 0) {
      result = result.filter(listing => 
        filters.condition!.includes(listing.condition)
      );
    }
    
    // Apply price filter
    if (filters.priceMin !== undefined) {
      result = result.filter(listing => listing.price >= filters.priceMin!);
    }
    
    if (filters.priceMax !== undefined) {
      result = result.filter(listing => listing.price <= filters.priceMax!);
    }
    
    // Apply location filter
    if (filters.location) {
      const locationTerm = filters.location.toLowerCase();
      result = result.filter(listing => 
        listing.location.toLowerCase().includes(locationTerm)
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case "newest":
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case "oldest":
        result.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        break;
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
    }
    
    setFilteredListings(result);
  }, [listings, filters, sortOption]);

  // Add a new listing
  const addListing = async (listingData: Omit<Listing, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Listing> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newListing: Listing = {
      ...listingData,
      id: `listing-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "Active"
    };
    
    const updatedListings = [...listings, newListing];
    setListings(updatedListings);
    
    // Update localStorage
    localStorage.setItem('phoneflip_listings', JSON.stringify(updatedListings));
    
    return newListing;
  };
  
  // Update an existing listing
  const updateListing = async (id: string, listingData: Partial<Listing>): Promise<Listing | null> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const index = listings.findIndex(listing => listing.id === id);
    if (index === -1) return null;
    
    const updatedListing = {
      ...listings[index],
      ...listingData,
      updatedAt: new Date()
    };
    
    const updatedListings = [...listings];
    updatedListings[index] = updatedListing;
    
    setListings(updatedListings);
    
    // Update localStorage
    localStorage.setItem('phoneflip_listings', JSON.stringify(updatedListings));
    
    return updatedListing;
  };
  
  // Delete a listing
  const deleteListing = async (id: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const updatedListings = listings.filter(listing => listing.id !== id);
    
    if (updatedListings.length === listings.length) return false;
    
    setListings(updatedListings);
    
    // Update localStorage
    localStorage.setItem('phoneflip_listings', JSON.stringify(updatedListings));
    
    return true;
  };
  
  // Get a listing by ID
  const getListingById = (id: string): Listing | undefined => {
    return listings.find(listing => listing.id === id);
  };

  return (
    <ListingContext.Provider value={{
      listings,
      filteredListings,
      isLoading,
      error,
      filters,
      sortOption,
      setFilters,
      setSortOption,
      addListing,
      updateListing,
      deleteListing,
      getListingById
    }}>
      {children}
    </ListingContext.Provider>
  );
};

export const useListings = () => {
  const context = useContext(ListingContext);
  if (context === undefined) {
    throw new Error('useListings must be used within a ListingProvider');
  }
  return context;
};
