
// User Model
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar?: string;
  createdAt: Date;
}

// Phone condition types
export type PhoneCondition = "New" | "Like New" | "Good" | "Fair" | "Poor";

// Listing status types
export type ListingStatus = "Active" | "Sold" | "Pending" | "Rejected";

// Listing Model
export interface Listing {
  id: string;
  title: string;
  brand: string;
  model: string;
  description: string;
  condition: PhoneCondition;
  price: number;
  originalPrice?: number;
  images: string[];
  sellerID: string;
  seller?: User;
  location: string;
  status: ListingStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Wishlist Item Model
export interface WishlistItem {
  id: string;
  userID: string;
  listingID: string;
  listing?: Listing;
  priceAlert?: number;
  createdAt: Date;
}

// Filter options for listings
export interface ListingFilters {
  brand?: string[];
  condition?: PhoneCondition[];
  priceMin?: number;
  priceMax?: number;
  location?: string;
  search?: string;
}

// Sorting options for listings
export type SortOption = "newest" | "oldest" | "price-low-high" | "price-high-low";
