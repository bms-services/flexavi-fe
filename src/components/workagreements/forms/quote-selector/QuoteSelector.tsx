
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Quote } from "@/types";

interface QuoteSelectorProps {
  quote: Quote | null;
  filteredQuotes: Quote[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onQuoteSelect: (quote: Quote) => void;
  disabled?: boolean;
}

export const QuoteSelector: React.FC<QuoteSelectorProps> = ({
  quote,
  filteredQuotes,
  searchTerm,
  onSearchChange,
  onQuoteSelect,
  disabled = false
}) => {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Zoek geaccepteerde offertes..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          disabled={disabled}
        />
      </div>
      <div className="border rounded-md h-32 overflow-y-auto">
        {filteredQuotes.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            Geen geaccepteerde offertes gevonden
          </div>
        ) : (
          <div className="divide-y">
            {filteredQuotes.map((q) => (
              <div 
                key={q.id} 
                className={`p-2 hover:bg-gray-50 cursor-pointer ${quote?.id === q.id ? 'bg-primary/5 border-l-4 border-primary' : ''}`}
                onClick={() => !disabled && onQuoteSelect(q)}
              >
                <div className="font-medium">
                  {q.id.replace("quote-", "OF-")}
                </div>
                <div className="text-sm text-muted-foreground">
                  {q.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
