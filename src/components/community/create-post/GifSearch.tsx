
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PostMedia } from "@/types/community";
import { Image as ImageIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { GifSearchForm } from "./GifSearchForm";
import { GifGrid } from "./GifGrid";
import { useGifSearch } from "@/hooks/use-gif-search";

interface GifSearchProps {
  onGifSelected: (gif: PostMedia) => void;
}

export function GifSearch({ onGifSelected }: GifSearchProps) {
  const [open, setOpen] = useState(false);
  const { searchTerm, setSearchTerm, searchResults, handleSearch } = useGifSearch();
  
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
        <ImageIcon className="h-4 w-4" />
        <span>GIFs</span>
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>GIF zoeken</DialogTitle>
          </DialogHeader>
          
          <GifSearchForm
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            onSubmit={handleSearch}
          />
          
          <GifGrid
            searchResults={searchResults}
            onSelectGif={handleSelectGif}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
