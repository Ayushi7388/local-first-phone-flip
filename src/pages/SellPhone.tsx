
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/context/AuthContext';
import { useListings } from '@/context/ListingContext';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { phoneBrands } from '@/data/mockData';
import { Listing } from '@/types/models';

const sellFormSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters' }),
  brand: z.string().min(1, { message: 'Please select a brand' }),
  model: z.string().min(1, { message: 'Please enter the model' }),
  condition: z.enum(['New', 'Like New', 'Good', 'Fair', 'Poor']),
  price: z.coerce.number().positive({ message: 'Price must be positive' }),
  originalPrice: z.coerce.number().positive({ message: 'Original price must be positive' }).optional(),
  location: z.string().min(2, { message: 'Please enter a valid location' }),
});

type SellFormValues = z.infer<typeof sellFormSchema>;

const SellPhone = () => {
  const { user, isAuthenticated } = useAuth();
  const { addListing } = useListings();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SellFormValues>({
    resolver: zodResolver(sellFormSchema),
    defaultValues: {
      title: '',
      description: '',
      brand: '',
      model: '',
      condition: 'Good',
      price: undefined as any,
      originalPrice: undefined as any,
      location: '',
    },
  });

  const onSubmit = async (data: SellFormValues) => {
    if (!isAuthenticated) {
      toast({
        variant: 'destructive',
        title: 'Authentication required',
        description: 'Please sign in to list a phone for sale',
      });
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create new listing object
      const newListing: Omit<Listing, 'id' | 'status' | 'createdAt' | 'updatedAt'> = {
        sellerID: user?.id || 'unknown',
        title: data.title,
        description: data.description,
        brand: data.brand,
        model: data.model,
        condition: data.condition,
        price: data.price,
        originalPrice: data.originalPrice || data.price,
        location: data.location,
        images: ['placeholder.svg'],  // Default placeholder image
      };
      
      // Add the listing to the context
      const listingId = await addListing(newListing);
      
      toast({
        title: 'Phone listed successfully!',
        description: 'Your phone has been listed for sale.',
      });
      
      // Redirect to the listing page
      navigate(`/listing/${listingId}`);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error listing phone',
        description: 'There was a problem listing your phone. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Sell Your Phone</CardTitle>
              <CardDescription className="text-center">
                Fill out the details below to list your phone for sale
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Listing Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. iPhone 13 Pro Max 256GB" {...field} />
                          </FormControl>
                          <FormDescription>
                            Make your title clear and descriptive
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
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
                            Enter your city and state/province
                          </FormDescription>
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
                            placeholder="Describe your phone's condition, age, included accessories, etc." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Be honest and thorough about your phone's condition
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                              <SelectItem value="New">New</SelectItem>
                              <SelectItem value="Like New">Like New</SelectItem>
                              <SelectItem value="Good">Good</SelectItem>
                              <SelectItem value="Fair">Fair</SelectItem>
                              <SelectItem value="Poor">Poor</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price (₹)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g. 25000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="originalPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Original Price (₹) (Optional)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g. 45000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                      {isSubmitting ? 'Listing...' : 'List Phone for Sale'}
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
