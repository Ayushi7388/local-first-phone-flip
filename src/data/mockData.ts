
import { Listing, User, PhoneCondition } from '@/types/models';

// Mock seller users
export const mockUsers: User[] = [
  {
    id: "user1",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    avatar: "https://i.pravatar.cc/150?img=1",
    createdAt: new Date("2023-01-15")
  },
  {
    id: "user2",
    name: "Priya Singh",
    email: "priya@example.com",
    phone: "+91 87654 32109",
    location: "Delhi, NCR",
    avatar: "https://i.pravatar.cc/150?img=2",
    createdAt: new Date("2023-02-20")
  },
  {
    id: "user3",
    name: "Aman Patel",
    email: "aman@example.com",
    phone: "+91 76543 21098",
    location: "Bangalore, Karnataka",
    avatar: "https://i.pravatar.cc/150?img=3",
    createdAt: new Date("2023-03-05")
  },
];

// Helper function to create date objects a certain number of days ago
const daysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

// Mock listings
export const mockListings: Listing[] = [
  {
    id: "listing1",
    title: "iPhone 14 Pro Max in Perfect Condition",
    brand: "Apple",
    model: "iPhone 14 Pro Max",
    description: "Used for just 6 months. Comes with original box, charger, and earphones. No scratches or dents. Battery health is 98%. AppleCare+ valid until Dec 2023.",
    condition: "Like New" as PhoneCondition,
    price: 89999,
    originalPrice: 129900,
    images: [
      "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1663499482764-4e55ffedeecf?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1663499482504-93cbcbcdb8d6?q=80&w=2070&auto=format&fit=crop"
    ],
    sellerID: "user1",
    location: "Mumbai, Maharashtra",
    status: "Active",
    createdAt: daysAgo(3),
    updatedAt: daysAgo(3)
  },
  {
    id: "listing2",
    title: "Samsung Galaxy S22 Ultra - 1 Year Old",
    brand: "Samsung",
    model: "Galaxy S22 Ultra",
    description: "In good condition with minor wear. 256GB storage, 12GB RAM. Includes all accessories and original box. Screen protector applied since day one. Mystic Black color.",
    condition: "Good" as PhoneCondition,
    price: 59999,
    originalPrice: 109999,
    images: [
      "https://images.unsplash.com/photo-1644501675071-794dc9e81c61?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1643855622693-e428ae6a6e3b?q=80&w=2069&auto=format&fit=crop"
    ],
    sellerID: "user2",
    location: "Delhi, NCR",
    status: "Active",
    createdAt: daysAgo(5),
    updatedAt: daysAgo(5)
  },
  {
    id: "listing3",
    title: "Google Pixel 7 - Like New",
    brand: "Google",
    model: "Pixel 7",
    description: "Purchased 3 months ago. In excellent condition with all original accessories. Obsidian Black, 128GB storage. Comes with case and screen protector. Still under warranty.",
    condition: "Like New" as PhoneCondition,
    price: 44999,
    originalPrice: 59999,
    images: [
      "https://images.unsplash.com/photo-1667479559277-34a58f2c3a54?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1668269125763-e304e7ecce2b?q=80&w=2070&auto=format&fit=crop"
    ],
    sellerID: "user3",
    location: "Bangalore, Karnataka",
    status: "Active",
    createdAt: daysAgo(7),
    updatedAt: daysAgo(7)
  },
  {
    id: "listing4",
    title: "OnePlus 10 Pro - Great Deal",
    brand: "OnePlus",
    model: "10 Pro",
    description: "8 months old. In good condition with minor scratches on the back. 256GB storage, 8GB RAM. Emerald Forest color. Includes charger and case.",
    condition: "Good" as PhoneCondition,
    price: 39999,
    originalPrice: 66999,
    images: [
      "https://images.unsplash.com/photo-1646478704799-1ab1143c6193?q=80&w=2070&auto=format&fit=crop"
    ],
    sellerID: "user1",
    location: "Mumbai, Maharashtra",
    status: "Active",
    createdAt: daysAgo(10),
    updatedAt: daysAgo(10)
  },
  {
    id: "listing5",
    title: "iPhone 13 - 64GB - Rose Gold",
    brand: "Apple",
    model: "iPhone 13",
    description: "Used for 1 year. Minor scratches on the screen, otherwise good condition. Battery health at 92%. Includes charger and case.",
    condition: "Good" as PhoneCondition,
    price: 49999,
    originalPrice: 79900,
    images: [
      "https://images.unsplash.com/photo-1632661674596-618e45e68d54?q=80&w=2055&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?q=80&w=2071&auto=format&fit=crop"
    ],
    sellerID: "user2",
    location: "Delhi, NCR",
    status: "Active",
    createdAt: daysAgo(12),
    updatedAt: daysAgo(12)
  },
  {
    id: "listing6",
    title: "Xiaomi Redmi Note 12 Pro - Almost New",
    brand: "Xiaomi",
    model: "Redmi Note 12 Pro",
    description: "Used for just 2 months. Excellent condition with no scratches. 128GB storage, 8GB RAM. Frost Blue color. Includes original box and accessories.",
    condition: "Like New" as PhoneCondition,
    price: 19999,
    originalPrice: 25999,
    images: [
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1981&auto=format&fit=crop"
    ],
    sellerID: "user3",
    location: "Bangalore, Karnataka",
    status: "Active",
    createdAt: daysAgo(15),
    updatedAt: daysAgo(15)
  },
  {
    id: "listing7",
    title: "Vivo V25 Pro - Midnight Black",
    brand: "Vivo",
    model: "V25 Pro",
    description: "6 months old. In excellent condition with no visible wear. 128GB storage, 8GB RAM. Includes original box and fast charger.",
    condition: "Like New" as PhoneCondition,
    price: 27999,
    originalPrice: 35999,
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2027&auto=format&fit=crop"
    ],
    sellerID: "user1",
    location: "Mumbai, Maharashtra",
    status: "Active",
    createdAt: daysAgo(18),
    updatedAt: daysAgo(18)
  },
  {
    id: "listing8",
    title: "Nothing Phone (1) - Transparent Back",
    brand: "Nothing",
    model: "Phone (1)",
    description: "Used for 9 months. Good condition with some minor scratches on the frame. 256GB storage, 12GB RAM. Unique transparent design with LED lights on the back.",
    condition: "Good" as PhoneCondition,
    price: 25999,
    originalPrice: 33999,
    images: [
      "https://images.unsplash.com/photo-1662947995853-b2cca18f5192?q=80&w=1964&auto=format&fit=crop"
    ],
    sellerID: "user2",
    location: "Delhi, NCR",
    status: "Active",
    createdAt: daysAgo(20),
    updatedAt: daysAgo(20)
  }
];

// Phone brands for filtering
export const phoneBrands = [
  "Apple",
  "Samsung",
  "Google",
  "OnePlus",
  "Xiaomi",
  "Vivo",
  "Nothing",
  "Oppo",
  "Motorola",
  "Realme"
];

// Phone conditions for filtering
export const phoneConditions: PhoneCondition[] = [
  "New",
  "Like New",
  "Good",
  "Fair",
  "Poor"
];
