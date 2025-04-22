
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FAQSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function FAQSearch({ searchQuery, onSearchChange }: FAQSearchProps) {
  return (
    <div className="relative max-w-lg mx-auto mb-8">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Zoek in veelgestelde vragen..."
        className="pl-9 h-12"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
