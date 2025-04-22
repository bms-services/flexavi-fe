
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { PostMedia } from "@/types/community";
import { Search, Gif as GifIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";

// Mock GIF zoekresultaten
const mockGifResults = [
  { id: "gif1", url: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif" },
  { id: "gif2", url: "https://media.giphy.com/media/26FPq8u5gvYO9GzoA/giphy.gif" },
  { id: "gif3", url: "https://media.giphy.com/media/l4FGrHErakgV8GRO0/giphy.gif" },
  { id: "gif4", url: "https://media.giphy.com/media/3og0INs7kEnoBYDGNi/giphy.gif" },
  { id: "gif5", url: "https://media.giphy.com/media/3ohhwytHcusSCXXOUg/giphy.gif" },
  { id: "gif6", url: "https://media.giphy.com/media/3ohze2m5cNyumzUMp2/giphy.gif" },
];

interface GifSearchProps {
  onGifSelected: (gif: PostMedia) => void;
}

export function GifSearch({ onGifSelected }: GifSearchProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(mockGifResults);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In een echte applicatie zou hier een API-call naar Giphy/Tenor worden gemaakt
    // Voor deze demo filteren we de mock resultaten op basis van de zoekterm
    const filteredResults = mockGifResults.filter(gif => 
      gif.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSearchResults(filteredResults.length > 0 ? filteredResults : mockGifResults);
  };
  
  const handleSelectGif = (gifUrl: string) => {
    const newGif: PostMedia = {
      id: `gif-${Date.now()}`,
      type: 'gif',
      url: gifUrl,
    };
    
    onGifSelected(newGif);
    setOpen(false);
    toast.success("GIF toegevoegd aan bericht");
  };

  return (
    <>
      <Button 
        type="button" 
        variant="outline" 
        size="sm"
        className="flex items-center gap-1"
        onClick={() => setOpen(true)}
      >
        <GifIcon className="h-4 w-4" />
        <span>GIFs</span>
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>GIF zoeken</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <Input
              placeholder="Zoek een GIF..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-1" />
              Zoeken
            </Button>
          </form>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[300px] overflow-y-auto p-1">
            {searchResults.map((gif) => (
              <div 
                key={gif.id} 
                className="cursor-pointer rounded-md overflow-hidden border hover:border-primary"
                onClick={() => handleSelectGif(gif.url)}
              >
                <img 
                  src={gif.url} 
                  alt="GIF" 
                  className="w-full h-auto aspect-video object-cover"
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
