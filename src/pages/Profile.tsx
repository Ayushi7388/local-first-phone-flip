
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Package, 
  Heart, 
  Settings, 
  LogOut,
  Edit,
  UploadCloud
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useWishlist } from '@/context/WishlistContext';
import { useListings } from '@/context/ListingContext';
import ListingCard from '@/components/common/ListingCard';

const Profile = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { listings } = useListings();
  const [isEditing, setIsEditing] = useState(false);
  
  // If no user is logged in, redirect to login
  if (!user) {
    navigate('/login');
    return null;
  }
  
  // Get user's wishlist items
  const userWishlistItems = wishlistItems
    .map(item => ({
      ...item,
      listing: listings.find(listing => listing.id === item.listingID)
    }))
    .filter(item => item.listing);
  
  // Get user's listings (if any)
  const userListings = listings.filter(listing => listing.sellerID === user.id);
  
  // Handle logout
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };
  
  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-xl bg-brand-accent text-white">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button size="sm" variant="outline" className="absolute bottom-0 right-0 h-8 w-8 p-0 rounded-full">
                  <UploadCloud className="h-4 w-4" />
                  <span className="sr-only">Upload avatar</span>
                </Button>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-brand mb-1">{user.name}</h1>
                  <p className="text-gray-600">{user.location}</p>
                </div>
                
                <div className="mt-4 md:mt-0 flex justify-center md:justify-end gap-2">
                  {isEditing ? (
                    <>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={() => {
                          setIsEditing(false);
                          toast({
                            title: "Profile updated",
                            description: "Your profile has been updated successfully.",
                          });
                        }}
                      >
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
              
              {isEditing ? (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input 
                      type="email" 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      defaultValue={user.email}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input 
                      type="tel" 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      defaultValue={user.phone}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      defaultValue={user.location}
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Email:</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Phone:</span>
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Member since:</span>
                    <span>{new Date(user.createdAt).toLocaleDateString('en-IN', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="wishlist">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="listings" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              My Listings
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="wishlist">
              <h2 className="text-xl font-semibold mb-4">My Wishlist</h2>
              {userWishlistItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {userWishlistItems.map(item => (
                    <div key={item.id} className="relative">
                      <ListingCard listing={item.listing!} />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 h-8 w-8 p-1 rounded-full"
                        onClick={() => removeFromWishlist(item.listingID)}
                      >
                        <Heart className="h-4 w-4 fill-white" />
                        <span className="sr-only">Remove from wishlist</span>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Heart className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-gray-500">Your wishlist is empty</p>
                    <Button className="mt-4" onClick={() => navigate('/browse')}>
                      Browse Phones
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="listings">
              <h2 className="text-xl font-semibold mb-4">My Listings</h2>
              {userListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {userListings.map(listing => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Package className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-gray-500">You haven't created any listings yet</p>
                    <Button className="mt-4" onClick={() => navigate('/sell')}>
                      Create Listing
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="orders">
              <h2 className="text-xl font-semibold mb-4">My Orders</h2>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Package className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-gray-500">You don't have any orders yet</p>
                  <Button className="mt-4" onClick={() => navigate('/browse')}>
                    Shop Now
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account settings and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Notifications</h3>
                      <Separator className="my-2" />
                      <div className="flex justify-between items-center py-2">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-500">
                            Receive emails about your account activity
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="email-notifications" 
                            defaultChecked={true}
                            className="h-4 w-4"
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <div>
                          <p className="font-medium">Price Alerts</p>
                          <p className="text-sm text-gray-500">
                            Get notified when prices drop for items in your wishlist
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="price-alerts" 
                            defaultChecked={true}
                            className="h-4 w-4"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Security</h3>
                      <Separator className="my-2" />
                      <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start">
                          Change Password
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          Two-Factor Authentication
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="destructive" onClick={handleLogout} className="flex items-center">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
