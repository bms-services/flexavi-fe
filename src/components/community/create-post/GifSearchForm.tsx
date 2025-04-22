
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface GifSearchFormProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function GifSearchForm({ searchTerm, onSearchTermChange, onSubmit }: GifSearchFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex gap-2 mb-4">
      <Input
        placeholder="Zoek een GIF..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="flex-1"
      />
      <Button type="submit">
        <Search className="h-4 w-4 mr-1" />
        Zoeken
      </Button>
    </form>
  );
}
