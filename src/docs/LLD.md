
# Low-Level Design (LLD)

## Data Models

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar?: string;
  createdAt: Date;
}
```

### Listing
```typescript
interface Listing {
  id: string;
  title: string;
  brand: string;
  model: string;
  description: string;
  condition: "New" | "Like New" | "Good" | "Fair" | "Poor";
  price: number;
  originalPrice?: number;
  images: string[];
  sellerID: string;
  location: string;
  status: "Active" | "Sold" | "Pending" | "Rejected";
  createdAt: Date;
  updatedAt: Date;
}
```

### Wishlist
```typescript
interface WishlistItem {
  id: string;
  userID: string;
  listingID: string;
  priceAlert?: number;
  createdAt: Date;
}
```

## Component Breakdown

### Pages
- **HomePage**: Featured listings, search, category navigation
- **BrowsePage**: Listing results with filters and sorting
- **ListingDetailPage**: Full details, images, seller info, contact options
- **ProfilePage**: User info, listings, wishlist
- **CreateListingPage**: Form to create or edit a listing
- **AuthPages**: Login, Register, Reset Password

### Reusable Components
- **ListingCard**: Preview card for listings in grid/list views
- **SearchBar**: Search input with suggestions
- **FilterPanel**: Filtering options for listings
- **ImageGallery**: Display and navigate through listing images
- **UserInfo**: Display user information with avatar
- **ListingForm**: Form for creating/editing listings

## State Management
Using React Context API for:
- **AuthContext**: Handle user authentication state
- **ListingContext**: Manage listing data and operations
- **WishlistContext**: Handle user wishlist and alerts
- **UIContext**: Manage UI state (modals, notifications)

## Form Validation
- Client-side validation using zod schema
- Form state management with react-hook-form

## Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Route Structure
- `/`: Home page
- `/browse`: Browse all listings
- `/listing/:id`: Listing detail page
- `/profile`: User profile
- `/profile/listings`: User's listings
- `/profile/wishlist`: User's wishlist
- `/create-listing`: Create a new listing
- `/login`: Login page
- `/register`: Registration page
