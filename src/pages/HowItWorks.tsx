
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, HelpCircle, PhoneCall, Shield, Tag, Truck, User, AlertCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const HowItWorks = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-brand mb-4">How MobiKharidar Works</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            MobiKharidar makes buying and selling used phones simple, secure, and transparent. 
            Follow these easy steps to get started.
          </p>
        </div>
        
        {/* Seller Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-brand mb-8 text-center">For Sellers</h2>
          
          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            <Card className="border-2 border-brand-accent/10 hover:border-brand-accent/30 transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent mb-4">
                  <User className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl mb-2">Create Your Listing</CardTitle>
                <CardDescription className="text-base">
                  Sign up and create a detailed listing with photos, specifications, and the condition of your phone.
                </CardDescription>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm">Add clear photos from multiple angles</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm">Mention any accessories included</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm">Be honest about the condition</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-brand-accent/10 hover:border-brand-accent/30 transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent mb-4">
                  <Tag className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl mb-2">Set Your Price</CardTitle>
                <CardDescription className="text-base">
                  Our system suggests the best price based on the market, but you have the final say on your asking price.
                </CardDescription>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm">Get price recommendations based on condition</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm">Set a competitive price to sell faster</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm">Option to include original price for comparison</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-brand-accent/10 hover:border-brand-accent/30 transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent mb-4">
                  <PhoneCall className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl mb-2">Connect with Buyers</CardTitle>
                <CardDescription className="text-base">
                  Receive inquiries from interested buyers. Communicate securely through our platform to arrange the sale.
                </CardDescription>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm">Respond to inquiries promptly</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm">Negotiate with potential buyers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm">Arrange safe meeting places for local transactions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/sell">
              <Button size="lg" className="bg-brand-accent hover:bg-blue-600">
                Start Selling
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Buyer Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-brand mb-8 text-center">For Buyers</h2>
          
          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            <Card className="border-2 border-brand-accent/10 hover:border-brand-accent/30 transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent mb-4">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl mb-2">Find Your Phone</CardTitle>
                <CardDescription className="text-base">
                  Browse available listings using our search and filtering options to find the perfect phone for you.
                </CardDescription>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm">Filter by brand, condition, and price</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm">Compare multiple listings</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm">Add favorites to your wishlist</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-brand-accent/10 hover:border-brand-accent/30 transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent mb-4">
                  <PhoneCall className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl mb-2">Contact the Seller</CardTitle>
                <CardDescription className="text-base">
                  Reach out to the seller with any questions and arrange to purchase the phone.
                </CardDescription>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm">Ask about the phone's history</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm">Verify details not mentioned in the listing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm">Negotiate the price if needed</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-brand-accent/10 hover:border-brand-accent/30 transition-colors">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent mb-4">
                  <Truck className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl mb-2">Complete the Purchase</CardTitle>
                <CardDescription className="text-base">
                  Make the payment securely and receive your phone either through shipping or local pickup.
                </CardDescription>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm">Pay securely through our platform</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm">Inspect the phone upon receipt</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-sm">7-day return policy for peace of mind</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/browse">
              <Button size="lg" className="bg-brand-accent hover:bg-blue-600">
                Start Browsing
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Safety Tips */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-brand mb-6 text-center">Safety Tips</h2>
          
          <div className="bg-brand-accent/5 border border-brand-accent/20 rounded-lg p-6 max-w-3xl mx-auto">
            <div className="flex items-start mb-4">
              <Shield className="h-6 w-6 text-brand-accent mr-3 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Stay Safe When Buying & Selling</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                    <span>Always meet in public places for local transactions, like cafes or shopping malls.</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                    <span>Verify the IMEI number before purchasing to ensure the phone isn't stolen.</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                    <span>Test the phone thoroughly before making payment.</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                    <span>Be cautious of deals that seem too good to be true.</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 shrink-0 mt-0.5" />
                    <span>Use our secure payment system to protect your transaction.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQs */}
        <div className="mb-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-brand mb-8 text-center">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I know if a phone is in good condition?</AccordionTrigger>
              <AccordionContent>
                Look for details in the listing about scratches, dents, and battery health. Ask the seller for additional photos if needed. Always check the phone thoroughly before completing the purchase, including testing all functions, ports, and buttons.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
              <AccordionContent>
                We support various payment methods including UPI, bank transfers, and cash for in-person transactions. For your security, we recommend using our platform's payment system which offers buyer protection.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I return a phone if it's not as described?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer a 7-day return policy if the phone's condition doesn't match the description in the listing. Contact our support team immediately if you encounter any issues with your purchase.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>How does shipping work?</AccordionTrigger>
              <AccordionContent>
                Sellers can choose to offer shipping or local pickup. If shipping is selected, the seller will arrange to ship the phone through a reliable courier service. Tracking information will be provided to you once the item is shipped.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>How do I verify the phone isn't stolen?</AccordionTrigger>
              <AccordionContent>
                Always check the IMEI number of the phone before purchasing. You can verify the status of the IMEI by dialing *#06# on the phone and checking it against online IMEI verification services. Our platform also implements verification steps to reduce the risk of stolen phones being listed.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* CTA */}
        <div className="text-center pb-8">
          <h2 className="text-2xl font-bold text-brand mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied users who are buying and selling phones on MobiKharidar every day.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="default" className="bg-brand hover:bg-brand-hover">
                Create Account
              </Button>
            </Link>
            <Link to="/browse">
              <Button size="lg" className="bg-brand-accent hover:bg-blue-600">
                Browse Phones
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorks;
