
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const SearchBox = () => {
  return (
    <div className="relative hidden md:block w-48 lg:w-64">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Zoeken..."
        className="pl-8"
      />
    </div>
  );
};
