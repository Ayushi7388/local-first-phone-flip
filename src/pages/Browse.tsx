
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/common/SearchBar';
import ListingCard from '@/components/common/ListingCard';
import FilterSidebar from '@/components/common/FilterSidebar';
import { useListings } from '@/context/ListingContext';
import { ListingFilters, SortOption } from '@/types/models';
import { useIsMobile } from '@/hooks/use-mobile';

const Browse = () => {
  const { filteredListings, isLoading, filters, sortOption, setFilters, setSortOption } = useListings();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const isMobile = useIsMobile();
  
  // Initialize filters from URL on mount
  useEffect(() => {
    const urlFilters: ListingFilters = {};
    
    const searchQuery = searchParams.get('search');
    if (searchQuery) urlFilters.search = searchQuery;
    
    const brandParam = searchParams.get('brand');
    if (brandParam) urlFilters.brand = [brandParam];
    
    const conditionParam = searchParams.get('condition');
    if (conditionParam) urlFilters.condition = [conditionParam as any];
    
    const priceMinParam = searchParams.get('priceMin');
    if (priceMinParam) urlFilters.priceMin = parseInt(priceMinParam);
    
    const priceMaxParam = searchParams.get('priceMax');
    if (priceMaxParam) urlFilters.priceMax = parseInt(priceMaxParam);
    
    const sortParam = searchParams.get('sort') as SortOption;
    if (sortParam) setSortOption(sortParam);
    
    // Set filters from URL params
    if (Object.keys(urlFilters).length > 0) {
      setFilters(urlFilters);
    }
  }, []);
  
  // Update URL when filters change
  useEffect(() => {
    const newParams = new URLSearchParams();
    
    if (filters.search) newParams.set('search', filters.search);
    
    if (filters.brand && filters.brand.length > 0) {
      newParams.set('brand', filters.brand[0]);
    }
    
    if (filters.condition && filters.condition.length > 0) {
      newParams.set('condition', filters.condition[0]);
    }
    
    if (filters.priceMin !== undefined) {
      newParams.set('priceMin', filters.priceMin.toString());
    }
    
    if (filters.priceMax !== undefined) {
      newParams.set('priceMax', filters.priceMax.toString());
    }
    
    if (sortOption !== 'newest') {
      newParams.set('sort', sortOption);
    }
    
    setSearchParams(newParams, { replace: true });
  }, [filters, sortOption]);
  
  const handleFilterChange = (newFilters: ListingFilters) => {
    setFilters({ ...filters, ...newFilters });
  };
  
  const handleSortChange = (newSort: SortOption) => {
    setSortOption(newSort);
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Search Section */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-brand mb-6">Browse Phones</h1>
            <SearchBar />
          </div>
          
          {/* Mobile Filter Button */}
          {isMobile && (
            <div className="mb-4">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center"
                onClick={() => setShowMobileFilters(true)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters & Sorting
              </Button>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Desktop Sidebar */}
            {!isMobile && (
              <div className="md:w-64 lg:w-72 shrink-0">
                <FilterSidebar 
                  onFilterChange={handleFilterChange}
                  onSortChange={handleSortChange}
                  initialFilters={filters}
                  initialSort={sortOption}
                  className="sticky top-20 shadow-sm"
                />
              </div>
            )}
            
            {/* Mobile Sidebar */}
            {isMobile && showMobileFilters && (
              <div className="fixed inset-0 bg-white z-50 overflow-y-auto p-4">
                <FilterSidebar 
                  onFilterChange={handleFilterChange}
                  onSortChange={handleSortChange}
                  initialFilters={filters}
                  initialSort={sortOption}
                  isMobile={true}
                  onMobileClose={() => setShowMobileFilters(false)}
                />
              </div>
            )}
            
            {/* Results */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">
                  {isLoading ? 'Loading...' : `${filteredListings.length} results`}
                </h2>
                
                {/* Active Filters */}
                {(filters.brand?.length || 
                  filters.condition?.length || 
                  filters.priceMin || 
                  filters.priceMax || 
                  filters.search) && (
                  <Button 
                    variant="ghost" 
                    className="text-sm flex items-center text-red-600 hover:text-red-700"
                    onClick={() => setFilters({})}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear Filters
                  </Button>
                )}
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg h-64 animate-pulse" />
                  ))}
                </div>
              ) : filteredListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredListings.map(listing => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg p-8 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No phones found</h3>
                  <p className="text-gray-600 mb-4">
                    We couldn't find any phones matching your filters. Try adjusting your search criteria.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setFilters({})}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Browse;
