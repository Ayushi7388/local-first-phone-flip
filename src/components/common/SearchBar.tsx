
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useListings } from '@/context/ListingContext';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { setFilters } = useListings();
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update the filters in the context
    setFilters({ search: searchTerm });
    
    // Navigate to the browse page with the search query
    navigate(`/browse?search=${encodeURIComponent(searchTerm)}`);
  };
  
  return (
    <form 
      onSubmit={handleSearch} 
      className={`flex w-full max-w-2xl relative ${className}`}
    >
      <div className="flex w-full relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search for phones, brands, models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-24 py-6 w-full rounded-full border-gray-300 focus:border-brand-accent"
        />
        <Button 
          type="submit"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-brand-accent hover:bg-blue-600 rounded-full px-6"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
