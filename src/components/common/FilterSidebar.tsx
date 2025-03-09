
import React, { useState, useEffect } from 'react';
import { ListingFilters, SortOption } from '@/types/models';
import { phoneBrands, phoneConditions } from '@/data/mockData';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FilterSidebarProps {
  onFilterChange: (filters: ListingFilters) => void;
  onSortChange: (sort: SortOption) => void;
  initialFilters?: ListingFilters;
  initialSort?: SortOption;
  className?: string;
  onMobileClose?: () => void;
  isMobile?: boolean;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  onFilterChange,
  onSortChange,
  initialFilters = {},
  initialSort = 'newest',
  className = '',
  onMobileClose,
  isMobile = false
}) => {
  const [brandFilters, setBrandFilters] = useState<string[]>(initialFilters.brand || []);
  const [conditionFilters, setConditionFilters] = useState<string[]>(
    initialFilters.condition as string[] || []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialFilters.priceMin || 0,
    initialFilters.priceMax || 150000
  ]);
  const [sortOption, setSortOption] = useState<SortOption>(initialSort);
  
  // Apply filters when they change
  useEffect(() => {
    const newFilters: ListingFilters = {
      brand: brandFilters.length > 0 ? brandFilters : undefined,
      condition: conditionFilters.length > 0 ? conditionFilters as any : undefined,
      priceMin: priceRange[0] > 0 ? priceRange[0] : undefined,
      priceMax: priceRange[1] < 150000 ? priceRange[1] : undefined,
    };
    
    onFilterChange(newFilters);
  }, [brandFilters, conditionFilters, priceRange, onFilterChange]);
  
  // Apply sort when it changes
  useEffect(() => {
    onSortChange(sortOption);
  }, [sortOption, onSortChange]);
  
  // Brand filter handlers
  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setBrandFilters([...brandFilters, brand]);
    } else {
      setBrandFilters(brandFilters.filter(b => b !== brand));
    }
  };
  
  // Condition filter handlers
  const handleConditionChange = (condition: string, checked: boolean) => {
    if (checked) {
      setConditionFilters([...conditionFilters, condition]);
    } else {
      setConditionFilters(conditionFilters.filter(c => c !== condition));
    }
  };
  
  // Reset all filters
  const handleResetFilters = () => {
    setBrandFilters([]);
    setConditionFilters([]);
    setPriceRange([0, 150000]);
    setSortOption('newest');
  };
  
  return (
    <div className={`bg-white p-4 rounded-lg ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Filters</h2>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onMobileClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {/* Sort Options */}
      <div className="mb-6">
        <h3 className="font-medium text-sm mb-3 text-gray-700">Sort By</h3>
        <RadioGroup value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="newest" id="sort-newest" />
            <Label htmlFor="sort-newest">Newest First</Label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="oldest" id="sort-oldest" />
            <Label htmlFor="sort-oldest">Oldest First</Label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="price-low-high" id="sort-price-asc" />
            <Label htmlFor="sort-price-asc">Price: Low to High</Label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="price-high-low" id="sort-price-desc" />
            <Label htmlFor="sort-price-desc">Price: High to Low</Label>
          </div>
        </RadioGroup>
      </div>
      
      <Separator className="my-4" />
      
      {/* Brand Filter */}
      <div className="mb-6">
        <h3 className="font-medium text-sm mb-3 text-gray-700">Brand</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {phoneBrands.map(brand => (
            <div className="flex items-center space-x-2" key={brand}>
              <Checkbox 
                id={`brand-${brand}`} 
                checked={brandFilters.includes(brand)}
                onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
              />
              <Label htmlFor={`brand-${brand}`}>{brand}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <Separator className="my-4" />
      
      {/* Condition Filter */}
      <div className="mb-6">
        <h3 className="font-medium text-sm mb-3 text-gray-700">Condition</h3>
        <div className="space-y-2">
          {phoneConditions.map(condition => (
            <div className="flex items-center space-x-2" key={condition}>
              <Checkbox 
                id={`condition-${condition}`} 
                checked={conditionFilters.includes(condition)}
                onCheckedChange={(checked) => handleConditionChange(condition, checked as boolean)}
              />
              <Label htmlFor={`condition-${condition}`}>{condition}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <Separator className="my-4" />
      
      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-medium text-sm mb-3 text-gray-700">Price Range</h3>
        <Slider
          defaultValue={priceRange}
          min={0}
          max={150000}
          step={1000}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          className="my-6"
        />
        <div className="flex justify-between items-center">
          <div className="text-sm">₹{priceRange[0].toLocaleString()}</div>
          <div className="text-sm">₹{priceRange[1].toLocaleString()}</div>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      {/* Reset Filters */}
      <Button 
        variant="outline" 
        className="w-full"
        onClick={handleResetFilters}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;
