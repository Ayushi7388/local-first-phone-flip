
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PlusCircle, MinusCircle, Upload, Smartphone } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { useListings } from '@/context/ListingContext';
import { useToast } from '@/hooks/use-toast';
import { PhoneCondition } from '@/types/models';
import { phoneBrands, phoneConditions } from '@/data/mockData';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Form schema
const listingSchema = z.object({
  title: z.string().min(10, { message: "Title must be at least 10 characters." }),
  brand: z.string().min(1, { message: "Please select a brand." }),
  model: z.string().min(1, { message: "Model is required." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  condition: z.enum(["New", "Like New", "Good", "Fair", "Poor"] as const),
  price: z.coerce.number().positive({ message: "Price must be greater than 0." }),
  originalPrice: z.coerce.number().positive().optional(),
  location: z.string().min(3, { message: "Location is required." }),
  images: z.array(z.string()).min(1, { message: "At least one image is required." }),
});

type ListingFormValues = z.infer<typeof listingSchema>;

const SellPhone = () => {
  const { user, isAuthenticated } = useAuth();
  const { addListing } = useListings();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate('/login', { state: { from: '/sell' } });
    return null;
  }
  
  // Define form
  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: "",
      brand: "",
      model: "",
      description: "",
      condition: "Good",
      price: 0,
      originalPrice: undefined,
      location: user?.location || "",
      images: [],
    },
  });
  
  // Mock file upload
  const handleImageUpload = () => {
    // In a real app, this would upload to a storage service
    // For mock purposes, we'll add a placeholder image URL
    const currentImages = form.getValues("images");
    
    // Get a random image from Unsplash
    const randomId = Math.floor(Math.random() * 1000);
    const imageUrl = `https://images.unsplash.com/photo-1585060544812-6b45742d762f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80&${randomId}`;
    
    form.setValue("images", [...currentImages, imageUrl]);
  };
  
  // Remove image
  const removeImage = (index: number) => {
    const currentImages = form.getValues("images");
    const newImages = [...currentImages];
    newImages.splice(index, 1);
    form.setValue("images", newImages);
  };
  
  // Handle form submission
  const onSubmit = async (data: ListingFormValues) => {
    try {
      // Create a new listing
      const newListing = {
        id: `listing${Date.now()}`,
        ...data,
        sellerID: user!.id,
        status: "Active" as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      addListing(newListing);
      
      toast({
        title: "Listing created!",
        description: "Your phone has been listed successfully.",
      });
      
      navigate(`/listing/${newListing.id}`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error creating listing",
        description: "There was a problem creating your listing. Please try again.",
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-brand mb-6">Sell Your Phone</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Create a Listing</CardTitle>
              <CardDescription>
                Fill in the details about your phone to create a listing. The more information you provide, the faster your phone will sell.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Basic Information</h3>
                    <Separator />
                    
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Listing Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. iPhone 13 Pro Max - 256GB - Pacific Blue" {...field} />
                          </FormControl>
                          <FormDescription>
                            A clear title helps buyers find your phone.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Brand</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select brand" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {phoneBrands.map((brand) => (
                                  <SelectItem key={brand} value={brand}>
                                    {brand}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="model"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Model</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Galaxy S22 Ultra" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your phone's condition, any accessories included, warranty status, etc."
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Be honest about any scratches, dents, or issues with the phone.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Price & Condition</h3>
                    <Separator />
                    
                    <FormField
                      control={form.control}
                      name="condition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Condition</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select condition" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {phoneConditions.map((condition) => (
                                <SelectItem key={condition} value={condition}>
                                  {condition}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            <ul className="text-xs list-disc pl-4 mt-2 space-y-1">
                              <li><strong>New:</strong> Sealed in original packaging</li>
                              <li><strong>Like New:</strong> No scratches or signs of use</li>
                              <li><strong>Good:</strong> Minor scratches, fully functional</li>
                              <li><strong>Fair:</strong> Noticeable wear, but works well</li>
                              <li><strong>Poor:</strong> Heavy wear, may have functionality issues</li>
                            </ul>
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Asking Price (₹)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="e.g. 45000" {...field} />
                            </FormControl>
                            <FormDescription>
                              Set a competitive price to sell faster.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="originalPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Original Purchase Price (₹) (Optional)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="e.g. 79000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Mumbai, Maharashtra" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter your city and state.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Phone Images</h3>
                    <Separator />
                    
                    <FormField
                      control={form.control}
                      name="images"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Upload Images</FormLabel>
                          <FormControl>
                            <div className="space-y-4">
                              <Button
                                type="button"
                                variant="outline"
                                className="w-full h-32 border-dashed flex flex-col items-center justify-center"
                                onClick={handleImageUpload}
                              >
                                <Upload className="h-8 w-8 mb-2 text-gray-400" />
                                <span>Click to upload images</span>
                                <span className="text-xs text-gray-500 mt-1">
                                  Upload at least one image of your phone
                                </span>
                              </Button>
                              
                              {field.value.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                  {field.value.map((image, index) => (
                                    <div key={index} className="relative group">
                                      <img
                                        src={image}
                                        alt={`Phone image ${index + 1}`}
                                        className="h-32 w-full object-cover rounded-md"
                                      />
                                      <button
                                        type="button"
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => removeImage(index)}
                                      >
                                        <MinusCircle className="h-4 w-4" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormDescription>
                            Upload clear photos from multiple angles. Include any accessories.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit" className="w-full">
                      Create Listing
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SellPhone;
